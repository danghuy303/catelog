type EventCallback = (payload: any) => void;

class RealtimeSyncEngine {
  private listeners: Map<string, Set<EventCallback>> = new Map();
  private broadcastChannel: BroadcastChannel | null = null;
  private ws: WebSocket | null = null;

  constructor() {
    // 1. BroadcastChannel for instant same-machine / multi-profile / cross-tab sync
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        this.broadcastChannel = new BroadcastChannel('thienthanh_realtime_sync_channel');
        this.broadcastChannel.onmessage = (e) => {
          if (e.data && e.data.event) {
            this.emitLocally(e.data.event, e.data.payload);
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel notice:', err);
      }
    }

    // 2. WebSocket Realtime Relay for cross-device live sync
    this.initWebSocket();
  }

  private initWebSocket(): void {
    if (typeof window === 'undefined') return;
    try {
      const wsUrl = 'wss://ws-ap1.pusher.com/app/2d4957e8417f7dfa4843?protocol=7&client=js&version=7.4.0';
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        try {
          this.ws?.send(JSON.stringify({
            event: 'pusher:subscribe',
            data: { channel: 'kiot-thienthanh-realtime' }
          }));
        } catch {}
      };

      this.ws.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          if (msg.event === 'PRODUCT_CHANGED' || msg.event === 'NEWS_CHANGED') {
            const payload = typeof msg.data === 'string' ? JSON.parse(msg.data) : msg.data;
            this.emitLocally(msg.event, payload);
          }
        } catch {}
      };

      this.ws.onclose = () => {
        setTimeout(() => this.initWebSocket(), 4000);
      };
    } catch (err) {
      console.warn('WebSocket Realtime notice:', err);
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
    // 1. Emit locally on current tab immediately (0ms)
    this.emitLocally(event, payload);

    // 2. Broadcast to all open browser windows/profiles on current machine
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage({ event, payload });
      } catch (err) {
        console.warn('Broadcast postMessage notice:', err);
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
