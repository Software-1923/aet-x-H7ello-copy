import express, { Request, Response } from 'express';
import axios from 'axios';
import { WebSocket } from 'ws';
import expressWs from 'express-ws';
import path from 'path';
import fs from 'fs';
import * as THREE from 'three';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import next from 'next';
import { JsonRpcProvider } from 'ethers';
import Web3 from 'web3';
import crypto from 'crypto';
import http from 'http';

// dotenv yapılandırması
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Express ve WebSocket için gerekli yapılandırmalar
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const server = express();
const wsInstance = expressWs(server); // WebSocket desteği ekleniyor

const ethereumProviderUrl = process.env.API_INFURA_URL || 'https://mainnet.infura.io/v3/api';
const provider = new JsonRpcProvider(ethereumProviderUrl);
const PORT = process.env.PORT || 3000;
const loadRemoteIndexUrl = process.env.MAIN_SERVER_LOAD_REMOTE_INDEX_URL || '';

const web3 = new Web3(ethereumProviderUrl); // Web3 için Infura bağlantısını yapıyoruz

// Güvenlik başlıkları için middleware
server.use((req: Request, res: Response, next: Function) => {
  res.set('Cache-Control', 'public, max-age=0, must-revalidate');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('X-Frame-Options', 'DENY');
  res.set('X-XSS-Protection', '1; mode=block');
  next();
});

// CORS ve ön kontrol isteklerini işleyen middleware
server.use((req: Request, res: Response, next: Function) => {
  const origin = req.headers.origin;
  const allowedOrigins = ['http://localhost:3000', 'https://aet-x-h7ello.vercel.app/'];

  // origin string olduğunda
  if (typeof origin === 'string' && allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  }
  // origin bir array olduğunda, array'in ilk elemanını kullan
  else if (Array.isArray(origin) && allowedOrigins.includes(origin[0])) {
    res.set('Access-Control-Allow-Origin', origin[0]);
  }

  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-api-key');

  // OPTIONS istekleri için 200 dönüşü
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 'public' klasöründen statik dosyaları sunma
server.use(express.static(path.join(__dirname, 'public')));
server.use(express.json());

// Dosyaları uygun hata yönetimi ile sunma
server.use('/get-file/:fileName', async (req: Request, res: Response) => {
  const fileName = req.params.fileName;

  if (!fileName) {
    return res.status(400).send('File name not provided.');
  }

  try {
    const fileContent = await fs.promises.readFile(path.join(__dirname, '..', 'public', fileName), 'utf8');
    res.send(fileContent);
  } catch (error) {
    res.redirect('/cli-error/not-found');
  }
});

// Uzak dizini yükleme
server.get('/load-remote-index', async (req: Request, res: Response) => {
  try {
    const response = await axios.get(loadRemoteIndexUrl);
    res.set('Content-Type', response.headers['content-type']);
    res.send(response.data);
  } catch (error) {
    res.redirect('/cli-error/not-found');
  }
});

// Web3 bağlantı bilgilerini döndüren rota
server.get('/web3-info', async (req: Request, res: Response) => {
  try {
    const responseData = {
      connectedAccounts: await provider.listAccounts(),
    };
    res.json(responseData);
  } catch (error) {
    console.error('Web3 interaction error:', (error as Error).message);
    res.status(500).send('Error during Web3 interaction');
  }
});

// WebSocket rotası
wsInstance.app.ws('/web3', (ws: WebSocket) => {
  ws.on('message', async (message: string) => {
    try {
      const accounts = await provider.listAccounts();

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();

      renderer.setSize(800, 600);

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      const animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();

      ws.send(`Connected accounts: ${accounts.join(', ')}`);
    } catch (error) {
      console.error('Web3 interaction error:', (error as Error).message);
      ws.send('Error during Web3 interaction');
    }
  });
});

// Blok kök hash permütasyonlarını ve Luhn doğrulamasını döndüren API rotası
server.get('/block-permutations/:blockNumber', async (req: Request, res: Response) => {
  const blockNumber = parseInt(req.params.blockNumber, 10);

  if (isNaN(blockNumber)) {
    return res.status(400).send('Geçersiz blok numarası.');
  }

  try {
    const result = await getBlockRootPermutations(blockNumber);
    res.json(result);
  } catch (error) {
    console.error('Error fetching block data:', (error as Error).message);
    res.status(500).send('Error fetching block data');
  }
});

// Permütasyon fonksiyonları ve Luhn algoritması
async function getBlockRootPermutations(blockNumber: number) {
  const block = await web3.eth.getBlock(blockNumber);
  if (!block) throw new Error('Blok bulunamadı!');

  const rootHash = block.hash ?? ''; // rootHash için varsayılan bir boş string atanabilir
  if (!rootHash) {
    throw new Error("Block hash değeri bulunamadı."); // Uygun bir hata mesajı
  }
  
  const permutations = generatePermutations(rootHash);
  const luhnValid = validateLuhn(permutations[0]);
  
  return { rootHash, permutations, luhnValid };
}

function generatePermutations(hash: string): string[] {
  const permutations: string[] = [];
  for (let i = 0; i < hash.length; i++) {
    permutations.push(crypto.createHash('sha256').update(hash + i).digest('hex'));
  }
  return permutations;
}

function validateLuhn(number: string): boolean {
  let sum = 0;
  let alternate = false;
  for (let i = number.length - 1; i >= 0; i--) {
    let n = parseInt(number[i], 10);
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }
  return sum % 10 === 0;
}

// Kod şifrelemesi için rastgelelik bazlı bir fonksiyon
function encryptCode(code: string): string {
  const cipher = crypto.createCipher('aes-256-cbc', process.env.BETTER_AUTH_SECRET || '');
  let encrypted = cipher.update(code, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

// Next.js sayfalarını işleyen catch-all route
server.get('*', (req: Request, res: Response) => {
  return handle(req, res);
});

app.prepare().then(() => {
  server.listen(PORT, (err?: any) => {
    if (err) throw err;
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
