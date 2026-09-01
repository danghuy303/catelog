type EventCallback = (payload: any) => void;

class RealtimeSyncEngine {
  private listeners: Map<string, Set<EventCallback>> = new Map();
  private broadcastChannel: BroadcastChannel | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.broadcastChannel = new BroadcastChannel('thienthanh_realtime_sync_channel');
        this.broadcastChannel.onmessage = (e) => {
          if (e.data && e.data.event) {
            this.emitLocally(e.data.event, e.data.payload);
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel error:', err);
      }
    }
  }

  public subscribe(event: string, callback: EventCallback): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);

    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  public publish(event: string, payload: any): void {
    // 1. Emit to current tab immediately
    this.emitLocally(event, payload);

    // 2. Broadcast to all open tabs/windows on the same machine
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ event, payload });
      } catch (err) {
        console.warn('Broadcast postMessage error:', err);
      }
    }
  }

  private emitLocally(event: string, payload: any): void {
    const callbacks = this.listeners.get(event);
    if (callbacks) {
      callbacks.forEach(cb => {
        try {
          cb(payload);
        } catch (e) {
          console.error('Error in realtime subscriber callback:', e);
        }
      });
    }
  }
}

export const realtimeSync = new RealtimeSyncEngine();
