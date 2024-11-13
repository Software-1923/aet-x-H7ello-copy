<div align="center">
  <a href=".">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/dchtm308u/image/upload/v1730200723/n4cditvw3ikmn0mk3vnu.jpg">
      <img alt="Aether logo" src="https://res.cloudinary.com/dchtm308u/image/upload/v1730200723/n4cditvw3ikmn0mk3vnu.jpg" height="128" style="border-radius: 5px;">
    </picture>
  </a>
  <h1>Aether Web3 DApp</h1>
</div>

---

## Overview

The **Aether Web3 DApp** offers a robust interface for Web3 transactions, secure data handling, and seamless database integration. This guide provides setup instructions, configuration tips, and security best practices.

---

### Getting Started

### 1. Environment Setup

Define essential environment variables to configure your DApp for development or production.

- **Server Port**  
  Set the default server port:

  ```shell
  PORT=3000
  ```

### 2. Security Settings

Aether integrates **Arcjet Shield** for enhanced client-side security. Configure your Arcjet environment and key:

- **Arcjet Configuration**

  ```shell
  ARCJET_ENV=development
  ARCJET_KEY=ajkey_yourkey
  ```

> Obtain your `ARCJET_KEY` from [Arcjet](https://app.arcjet.com).

### 3. Database Settings

- **MongoDB & Turso Database Connection**

  Configure the following for data storage and retrieval:

  ```shell
  MONGODB_URI=
  TURSO_DATABASE_URL=
  TURSO_AUTH_TOKEN=
  ```

### 4. Visual Data Management

- **Cloudinary Integration**

  Configure Cloudinary to manage media files.

  ```shell
  CLOUDINARY_URL=
  NEXT_PUBLIC_CLOUDINARY_URL=
  ```

### 5. Deployment and Analytics

Enable analytics for better insights during deployment.

  ```shell
  ANALYZE=true yarn build
  NODE_ENV=production
  VITE_NODE_ENV=production
  ```

### 6. Server Configuration

Define the main server load URL for remote indexing.

  ```shell
  MAIN_SERVER_LOAD_REMOTE_INDEX_URL=http://localhost:3001/load-remote-index
  ```

### 7. Web3 Tools Integration

Set up API keys for Alchemy and Infura to enable Web3 transactions.

  ```shell
  ALCHEMY_API_KEY=
  ALCHEMY_URL=
  API_INFURA_URL=
  ```

### 8. Secret Key Configuration

Secure the app by setting a strong, unique secret key.

  ```shell
  BETTER_AUTH_SECRET=
  ```

### 9. Alternative Authentication Settings

- **WebSocket Connection to SQLD Server**

  ```shell
  URL=ws://localhost:8080
  JWT=Example_Token_JWT
  ```

### 10. Authentication with Clerk

Set up **Clerk** API keys as an alternative authentication method.

  ```shell
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
  CLERK_SECRET_KEY=YOUR_SECRET_KEY
  ```

---

## Web3 Requests

Web3 operations can be accessed via `/web3` and `/web3-info` routes.

---

### Web3 Connection via Infura

1. Create an **Infura** account and set your role as **Founder/Administrator**.
2. Generate an API key in **My First Key**.
3. Update the `server.ts` file at line 28 to sync with your Infura API key:

   ```typescript
   const ethereumProviderUrl = process.env.API_INFURA_URL || 'https://mainnet.infura.io/v3/api';
   ```

Ensure `API_INFURA_URL` is correctly set in `.env`.

---

### Web3 Integration with Alchemy

Get a free **Alchemy** API key, then configure `.env` and `server.ts` files with:
- MetaMask Secret Key
- Etherscan API Key
- MongoDB Connection String

---

### Installation

Install dependencies using npm:

```shell
npm install
```

---

