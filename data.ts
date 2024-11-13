import { http, createConfig } from 'wagmi';
import mongoose from 'mongoose';
import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import dotenv from 'dotenv';

dotenv.config();

// Infura URL'sini .env dosyasından al
const infuraUrl = process.env.API_INFURA_URL as string;

// Chain türünü elle tanımla
interface Chain {
  id: number;
  name: string;
  network: string;
  rpcUrls: {
    default: {
      http: string[];
    };
  };
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

// Alternatif olarak mainnet ve sepolia tanımları
const mainnet: Chain = {
  id: 1,
  name: "Mainnet",
  network: "mainnet",
  rpcUrls: {
    default: {
      http: infuraUrl ? [infuraUrl] : [], // Eğer infuraUrl tanımlı değilse boş bir dizi kullanın
    },
  },
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
};

const sepolia: Chain = {
  id: 11155111,
  name: "Sepolia",
  network: "sepolia",
  rpcUrls: {
    default: {
      http: infuraUrl ? [infuraUrl.replace("mainnet", "sepolia")] : [], // Eğer infuraUrl tanımlı değilse boş bir dizi kullanın
    },
  },
  nativeCurrency: {
    name: "SepoliaETH",
    symbol: "SEP",
    decimals: 18,
  },
};

// Wagmi Konfigürasyonu
export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

// Alchemy ve MongoDB Ayarları
const alchemyApiKey = process.env.ALCHEMY_API_KEY as string;
const alchemyUrl = process.env.ALCHEMY_URL as string;

const alchemyWeb3 = createAlchemyWeb3(alchemyUrl);

const mongoUri = process.env.MONGO_URI as string;
mongoose.connect(mongoUri, {});

// MongoDB bağlantı durumu
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB bağlantı hatası:'));
db.once('open', function () {
  console.log('MongoDB bağlantısı başarılı.');
});

// Veri izleme fonksiyonu
export async function observeData(userId: string, query: string) {
  console.log(`Kullanıcı ${userId} tarafından yapılan sorgu: ${query}`);
  // Mongoose ile izleme ve güvenlik işlemleri burada yapılır
}

export { alchemyWeb3, db };
