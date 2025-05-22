import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import blockchainRoutes from './routes/blockchain.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Blockchain routes
app.use('/api/blockchain', blockchainRoutes);

// ... other routes ...

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 