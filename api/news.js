import fs from 'fs';
import path from 'path';

const TMP_FILE = path.join('/tmp', 'thienthanh_news_store.json');
let inMemoryStore = null;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
      if (Array.isArray(data)) {
        inMemoryStore = data;
        try {
          fs.writeFileSync(TMP_FILE, JSON.stringify(data));
        } catch {}
      }
      return res.status(200).json({ success: true, data: inMemoryStore });
    } catch (e) {
      return res.status(400).json({ success: false, message: e.message });
    }
  }

  if (req.method === 'GET') {
    let data = inMemoryStore;
    if (!data) {
      try {
        if (fs.existsSync(TMP_FILE)) {
          const content = fs.readFileSync(TMP_FILE, 'utf8');
          data = JSON.parse(content);
          inMemoryStore = data;
        }
      } catch {}
    }
    return res.status(200).json({ success: true, data });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
