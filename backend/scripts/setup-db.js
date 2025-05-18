#!/usr/bin/env node

/**
 * This script helps set up the database for development.
 * It creates a .env file with the database URL and JWT secret.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Generate a random JWT secret
const generateJwtSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Ask for database credentials
const askDatabaseCredentials = () => {
  return new Promise((resolve) => {
    console.log('\n=== Database Configuration ===');
    
    rl.question('Database username (default: postgres): ', (username) => {
      username = username || 'postgres';
      
      rl.question('Database password: ', (password) => {
        
        rl.question('Database host (default: localhost): ', (host) => {
          host = host || 'localhost';
          
          rl.question('Database port (default: 5432): ', (port) => {
            port = port || '5432';
            
            rl.question('Database name (default: trustchain): ', (dbName) => {
              dbName = dbName || 'trustchain';
              
              resolve({
                username,
                password,
                host,
                port,
                dbName
              });
            });
          });
        });
      });
    });
  });
};

// Create .env file
const createEnvFile = (dbConfig) => {
  const jwtSecret = generateJwtSecret();
  const envContent = `# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://${dbConfig.username}:${dbConfig.password}@${dbConfig.host}:${dbConfig.port}/${dbConfig.dbName}?schema=public"

# JWT Configuration
JWT_SECRET=${jwtSecret}
JWT_EXPIRES_IN=90d

# Blockchain Configuration (for future use)
ETHEREUM_RPC_URL=
WALLET_PRIVATE_KEY=
CONTRACT_ADDRESS=
`;

  fs.writeFileSync(path.join(rootDir, '.env'), envContent);
  console.log('\n✅ .env file created successfully!');
};

// Main function
const main = async () => {
  console.log('🚀 TrustChain Database Setup');
  console.log('============================');
  console.log('This script will help you set up the database configuration for TrustChain.');
  
  const dbConfig = await askDatabaseCredentials();
  createEnvFile(dbConfig);
  
  console.log('\n📝 Next steps:');
  console.log('1. Make sure PostgreSQL is running');
  console.log(`2. Create a database named '${dbConfig.dbName}'`);
  console.log('3. Run the following commands:');
  console.log('   npm run prisma:generate');
  console.log('   npm run migrate:dev');
  console.log('\n🎉 You are all set!');
  
  rl.close();
};

main().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
