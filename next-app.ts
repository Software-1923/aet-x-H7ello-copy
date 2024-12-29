import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import path from 'path';
import crypto from 'crypto';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// Beyaz liste: İzin verilen dosyalar ve yollar
const whitelistFiles = [
  'server.ts',
  'data.ts',
  'package.json',
  'tsconfig.json',
  'components.json',
  '.swcrc',
  'next.config.ts',
  'vite.config.ts',
  'middleware.ts',
  './src/**/*.{js,ts,jsx,tsx}'
];

// Fonksiyon: Parametreleri şifreleme (SHA-384, SHA-256, SHA-512)
function encryptParam(param: string): string {
  const sha384Hash = crypto.createHash('sha384').update(param).digest('hex');
  const sha256Hash = crypto.createHash('sha256').update(sha384Hash).digest('hex');
  const sha512Hash = crypto.createHash('sha512').update(sha256Hash).digest('hex');
  return sha512Hash;
}

// Beyaz liste kontrol fonksiyonu
function isWhitelisted(pathname: string): boolean {
  const normalizedPath = path.normalize(pathname);
  return whitelistFiles.some((pattern) => normalizedPath.startsWith(pattern));
}

app.prepare().then(() => {
  createServer(async (req, res) => {
    const parsedUrl = parse(req.url!, true);
    const { pathname } = parsedUrl;

    if (!isWhitelisted(pathname!)) {
      res.statusCode = 403; // Erişim engellendi
      res.end('Forbidden: İzin verilmeyen dosya isteği.');
      return;
    }

    await handle(req, res, parsedUrl);
  }).listen(3001, (err?: Error) => { 
    if (err) {
      console.error(err);
      return;
    }
    console.log('Server is running on port 3001.');
  });
});
