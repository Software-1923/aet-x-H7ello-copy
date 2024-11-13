import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import mongoose from 'mongoose';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { Client } from 'pg';
import arcjet, { detectBot, shield, tokenBucket, createMiddleware } from "@arcjet/next";
import dotenv from 'dotenv';
import { NextResponse } from "next/server";

dotenv.config();

// .env değişkenlerinin varlığını kontrol edin
const requiredEnvVars = ['ALCHEMY_API_KEY', 'ALCHEMY_URL', 'MONGO_URI', 'PG_URI', 'ARCJET_KEY'];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Environment variable ${varName} is required but not defined`);
  }
});

// Wagmi Konfigürasyonu
export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// Alchemy ve MongoDB Ayarları
const alchemyUrl = process.env.ALCHEMY_URL as string;
const alchemyWeb3 = createAlchemyWeb3(alchemyUrl);

const mongoUri = process.env.MONGO_URI as string;
mongoose.connect(mongoUri, {}).catch((err) => console.error('MongoDB bağlantı hatası:', err));

// MongoDB bağlantı durumu
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));
db.once('open', function () {
  console.log('MongoDB bağlantısı başarılı.');
});

// PostgreSQL Bağlantısı
const pgClient = new Client({
  connectionString: process.env.PG_URI,
});
pgClient.connect((err) => {
  if (err) {
    console.error('PostgreSQL bağlantı hatası:', err.stack);
  } else {
    console.log('PostgreSQL bağlantısı başarılı.');
  }
});

// MongoDB Log Schema tanımı ve modeli
const LogSchema = new mongoose.Schema({
  userId: String,
  query: String,
  timestamp: { type: Date, default: Date.now },
});
const Log = mongoose.model('Log', LogSchema);

// Veri izleme fonksiyonu
export async function observeData(userId: string, query: string) {
  console.log(`Kullanıcı ${userId} tarafından yapılan sorgu: ${query}`);
  
  // MongoDB'ye izleme verisi kaydet
  await new Log({ userId, query }).save();

  // PostgreSQL'e izleme verisi kaydet
  const queryText = 'INSERT INTO logs(user_id, query, timestamp) VALUES($1, $2, NOW())';
  await pgClient.query(queryText, [userId, query]);
}

// Arcjet Güvenlik Ayarları
const aj = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

// Arcjet middleware konfigürasyonu
export const arcjetConfig = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

// GET İsteği İşleyicisi
export async function GET(req: Request) {
  const userId = req.headers.get('x-user-id') || 'anonymous';
  const query = req.url;

  // Kullanıcı sorgusunu kaydet
  await observeData(userId, query);

  // Arcjet güvenlik kontrolü
  const decision = await aj.protect(req, { requested: 5 }); // Token bucket'tan 5 token düşer
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    const status = decision.reason.isRateLimit() ? 429 : 403;
    const errorMessage = decision.reason.isRateLimit()
      ? "Too Many Requests"
      : "Forbidden";
    return NextResponse.json(
      { error: errorMessage, reason: decision.reason },
      { status }
    );
  }

  return NextResponse.json({ message: "Hello world" });
}

// Middleware İşlevi
export default async function middleware(req: Request) {
  const userId = req.headers.get('x-user-id') || 'anonymous';
  const query = req.url;

  // İzleme verisini kaydet
  await observeData(userId, query);

  // Güvenlik koruması ekle
  return createMiddleware(aj)(req);
}

export { alchemyWeb3, db, pgClient };
