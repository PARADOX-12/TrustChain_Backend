import { Request, Response } from 'express';
import { BlockchainService } from '../services/blockchain.service';

const blockchainService = new BlockchainService();

export class BlockchainController {
    // Drug Management
    async registerDrug(req: Request, res: Response) {
        try {
            const { name, ndc, description } = req.body;
            const result = await blockchainService.registerDrug(name, ndc, description);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to register drug' });
        }
    }

    // Batch Management
    async registerBatch(req: Request, res: Response) {
        try {
            const { batchNumber, drugNdc, manufactureDate, expiryDate, ipfsHash } = req.body;
            const result = await blockchainService.registerBatch(
                batchNumber,
                drugNdc,
                manufactureDate,
                expiryDate,
                ipfsHash
            );
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to register batch' });
        }
    }

    // Supply Chain Tracking
    async shipBatch(req: Request, res: Response) {
        try {
            const { batchNumber, to } = req.body;
            const result = await blockchainService.shipBatch(batchNumber, to);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to ship batch' });
        }
    }

    async receiveBatch(req: Request, res: Response) {
        try {
            const { batchNumber } = req.body;
            const result = await blockchainService.receiveBatch(batchNumber);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to receive batch' });
        }
    }

    // Verification
    async verifyBatch(req: Request, res: Response) {
        try {
            const { batchNumber } = req.body;
            const result = await blockchainService.verifyBatch(batchNumber);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to verify batch' });
        }
    }

    // Dispensing
    async dispenseBatch(req: Request, res: Response) {
        try {
            const { batchNumber } = req.body;
            const result = await blockchainService.dispenseBatch(batchNumber);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to dispense batch' });
        }
    }

    // Recall
    async recallBatch(req: Request, res: Response) {
        try {
            const { batchNumber } = req.body;
            const result = await blockchainService.recallBatch(batchNumber);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to recall batch' });
        }
    }

    // Authorization
    async authorizeManufacturer(req: Request, res: Response) {
        try {
            const { address } = req.body;
            const result = await blockchainService.authorizeManufacturer(address);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to authorize manufacturer' });
        }
    }

    async authorizeDistributor(req: Request, res: Response) {
        try {
            const { address } = req.body;
            const result = await blockchainService.authorizeDistributor(address);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to authorize distributor' });
        }
    }

    async authorizePharmacy(req: Request, res: Response) {
        try {
            const { address } = req.body;
            const result = await blockchainService.authorizePharmacy(address);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to authorize pharmacy' });
        }
    }

    async authorizeRegulator(req: Request, res: Response) {
        try {
            const { address } = req.body;
            const result = await blockchainService.authorizeRegulator(address);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Failed to authorize regulator' });
        }
    }

    // View Functions
    async getBatchStatus(req: Request, res: Response) {
        try {
            console.log('Received GET request for batch status');
            const { batchNumber } = req.params;
            console.log('Batch number from params:', batchNumber);
            const status = await blockchainService.getBatchStatus(batchNumber);
            console.log('Batch status from service:', status);
            res.json({ status: status.toString() });
        } catch (error) {
            console.error('Error in getBatchStatus controller:', error);
            res.status(500).json({ error: 'Failed to get batch status' });
        }
    }

    async getBatchTransactions(req: Request, res: Response) {
        try {
            const { batchNumber } = req.params;
            const transactions = await blockchainService.getBatchTransactions(batchNumber);
            res.json({ transactions });
        } catch (error) {
            res.status(500).json({ error: 'Failed to get batch transactions' });
        }
    }

    async isBatchVerified(req: Request, res: Response) {
        try {
            const { batchNumber } = req.params;
            const isVerified = await blockchainService.isBatchVerified(batchNumber);
            res.json({ isVerified });
        } catch (error) {
            res.status(500).json({ error: 'Failed to check batch verification' });
        }
    }
} 