import express, { Request, Response } from 'express';
import axios from 'axios';
import expressWs from 'express-ws';
import { WebSocketServer } from 'ws';
import type { WebSocket } from 'ws'; 
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import next from 'next';
import { JsonRpcProvider } from 'ethers';
import Web3 from 'web3';
import crypto from 'crypto';
import { db } from './src/db/db';
import { productsTable } from './src/db/schema';

// dotenv yapılandırması
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Next.js ve Express yapılandırması
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const wsInstance = expressWs(express());
const server = wsInstance.app; // express-ws, Express uygulamasını genişletiyor


const PORT = process.env.PORT || 3000;
const ethereumProviderUrl = process.env.API_INFURA_URL || 'https://mainnet.infura.io/v3/api';
const loadRemoteIndexUrl = process.env.MAIN_SERVER_LOAD_REMOTE_INDEX_URL || '';
const provider = new JsonRpcProvider(ethereumProviderUrl);
const web3 = new Web3(ethereumProviderUrl);

// Middleware'ler
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.json());

// Güvenlik başlıkları
server.use((req: Request, res: Response, next: Function) => {
  res.set('Cache-Control', 'public, max-age=0, must-revalidate');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('X-XSS-Protection', '1; mode=block');
  next();
});

// CORS yönetimi
server.use((req: Request, res: Response, next: Function) => {
  const origin = req.headers.origin as string | undefined;
  const allowedOrigins = ['http://localhost:3000', 'https://aet-x-h7ello.vercel.app', 'https://datafortress.website', 'https://www.datafortress.website', 'https://clerk.datafortress.website/npm/@clerk/clerk-js@5/dist/clerk.browser.js', 'https://aet-x-h7ello-goldj36oe-webs-projects-4ddef413.vercel.app'];

  // Alt domain kontrolü
  const isAllowedSubdomain = origin?.endsWith('.datafortress.website');

  if (origin && (allowedOrigins.includes(origin) || isAllowedSubdomain)) {
    res.set('Access-Control-Allow-Origin', origin);
    res.set('Access-Control-Allow-Credentials', 'true'); // Cookie kullanımı için gerekli
  }

  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-api-key');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200); // Preflight request'lere hızlı yanıt
  } else {
    next();
  }
});

// WebSocket rotası
server.ws('/web3', (ws, req) => {
  console.log(`Client connected: ${req.socket.remoteAddress}`);

  ws.on('message', async (message) => {
    console.log(`Message received: ${message}`);
    try {
      const accounts = await provider.listAccounts(); // Web3 sağlayıcısından hesapları al
      ws.send(`Connected accounts: ${accounts.join(', ')}`);
    } catch (error) {
      console.error('WebSocket error:', error);
      ws.send('Error during Web3 interaction');
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Statik dosya servisi
server.get('/get-file/:fileName', async (req: Request, res: Response) => {
  const fileName = req.params.fileName;

  if (!fileName) {
    return res.status(400).send('File name not provided.');
  }

  try {
    const fileContent = await fs.promises.readFile(path.join(__dirname, 'public', fileName), 'utf8');
    res.send(fileContent);
  } catch {
    res.redirect('/cli-error/not-found');
  }
});

// Uzak dizin yükleme
server.get('/load-remote-index', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(loadRemoteIndexUrl);
    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch {
    res.redirect('/cli-error/not-found');
  }
});

// Web3 API
server.get('/web3-info', async (req: Request, res: Response) => {
  try {
    const responseData = {
      connectedAccounts: await provider.listAccounts(),
    };
    res.json(responseData);
  } catch (error) {
    console.error('Web3 interaction error:', error);
    res.status(500).send('Error during Web3 interaction');
  }
});

// Blok kök hash permütasyonları ve Luhn doğrulaması
server.get('/block-permutations/:blockNumber', async (req: Request, res: Response) => {
  const blockNumber = parseInt(req.params.blockNumber, 10);

  if (isNaN(blockNumber)) {
    return res.status(400).send('Invalid block number.');
  }

  try {
    const result = await getBlockRootPermutations(blockNumber);
    res.json(result);
  } catch (error) {
    console.error('Error fetching block data:', error);
    res.status(500).send('Error fetching block data');
  }
});

async function getBlockRootPermutations(blockNumber: number) {
  const block = await web3.eth.getBlock(blockNumber);
  if (!block) throw new Error('Block not found.');

  const rootHash = block.hash || '';
  const permutations = generatePermutations(rootHash);
  const luhnValid = validateLuhn(permutations[0]);

  return { rootHash, permutations, luhnValid };
}

function generatePermutations(hash: string): string[] {
  return Array.from({ length: hash.length }, (_, i) =>
    crypto.createHash('sha256').update(hash + i).digest('hex')
  );
}

function validateLuhn(number: string): boolean {
  let sum = 0;
  let alternate = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let n = parseInt(number[i], 10);
    if (alternate) n = n * 2 > 9 ? n * 2 - 9 : n * 2;
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

// Ürünler API
server.get('/api/products', async (req: Request, res: Response) => {
  try {
    const products = await db.select().from(productsTable).all();
    res.status(200).json(products);
  } catch (error) {
    console.error('Ürünler alınırken hata oluştu:', error);
    res.status(500).json({ error: 'Ürünler alınırken bir hata oluştu.' });
  }
});

// Next.js işlemleri
server.get('*', (req: Request, res: Response) => {
  return handle(req, res);
});

// Sunucuyu başlatma
app.prepare().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
