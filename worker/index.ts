export interface Env {
  BUCKET?: R2Bucket;
  GOOGLE_APPS_SCRIPT_URL?: string;
  ADMIN_API_SECRET?: string;
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    try {
      // 1. Health check
      if (url.pathname === '/api/health') {
        return Response.json({ status: 'ok', time: new Date().toISOString() }, { headers: corsHeaders });
      }

      // 2. Contact form API -> proxy to Google Apps Script
      if (url.pathname === '/api/contact' && request.method === 'POST') {
        const body: any = await request.json();

        // Spam honeypot check
        if (body.honeypot) {
          return Response.json({ success: true, message: 'Form submitted' }, { headers: corsHeaders });
        }

        if (!body.name || !body.phone || !body.email) {
          return Response.json({ success: false, message: 'Vui lòng điền đầy đủ các thông tin bắt buộc (*)' }, { status: 400, headers: corsHeaders });
        }

        if (env.GOOGLE_APPS_SCRIPT_URL) {
          const appsScriptRes = await fetch(env.GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...body,
              createdAt: new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }),
              source: 'Website Kiot Thiên Thanh'
            }),
          });
          const result = await appsScriptRes.json();
          return Response.json(result, { headers: corsHeaders });
        }

        return Response.json({
          success: true,
          message: 'Đã nhận thông tin liên hệ thành công.'
        }, { headers: corsHeaders });
      }

      // 3. Image Upload API -> Cloudflare R2
      if (url.pathname === '/api/upload/product' && request.method === 'POST') {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const productId = (formData.get('productId') as string) || 'general';

        if (!file) {
          return Response.json({ success: false, message: 'Không tìm thấy file' }, { status: 400, headers: corsHeaders });
        }

        const objectKey = `products/${productId}/${Date.now()}_${file.name.replace(/\s+/g, '_')}`;

        if (env.BUCKET) {
          await env.BUCKET.put(objectKey, file.stream(), {
            httpMetadata: { contentType: file.type }
          });
        }

        const publicUrl = `https://assets.kiotthienthanh.vn/${objectKey}`;

        return Response.json({
          success: true,
          url: publicUrl,
          objectKey,
          fileName: file.name
        }, { headers: corsHeaders });
      }

      return Response.json({ message: 'Endpoint not found' }, { status: 404, headers: corsHeaders });

    } catch (err: any) {
      return Response.json({ success: false, message: err.message || 'Server error' }, { status: 500, headers: corsHeaders });
    }
  }
};
