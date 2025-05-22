import { ethers } from 'ethers';
import DrugVerificationArtifact from '../../artifacts/contracts/DrugVerification.sol/DrugVerification.json' assert { type: 'json' };
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class BlockchainService {
    private provider: ethers.JsonRpcProvider;
    private contract: ethers.Contract;
    private wallet: ethers.Wallet;

    constructor() {
        // Initialize provider with Sepolia network
        this.provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
        
        // Initialize wallet with private key
        this.wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, this.provider);
        
        // Initialize contract
        this.contract = new ethers.Contract(
            process.env.CONTRACT_ADDRESS!,
            DrugVerificationArtifact.abi,
            this.wallet
        );
    }

    // Drug Management
    async registerDrug(name: string, ndc: string, description: string) {
        try {
            const tx = await this.contract.registerDrug(name, ndc, description);
            await tx.wait();
            return { success: true, transactionHash: tx.hash };
        } catch (error) {
            console.error('Error registering drug:', error);
            throw error;
        }
    }

    // Batch Management
    async registerBatch(
        batchNumber: string,
        drugNdc: string,
        manufactureDate: number,
        expiryDate: number,
        ipfsHash: string
    ) {
        try {
            const tx = await this.contract.registerBatch(
                batchNumber,
                drugNdc,
                manufactureDate,
                expiryDate,
                ipfsHash
            );
            await tx.wait();
            return { success: true, transactionHash: tx.hash };
        } catch (error) {
            console.error('Error registering batch:', error);
            throw error;
        }
    }

    // Supply Chain Tracking
    async shipBatch(batchNumber: string, to: string) {
        try {
            const tx = await this.contract.shipBatch(batchNumber, to);
            await tx.wait();
            return { success: true, transactionHash: tx.hash };
        } catch (error) {
            console.error('Error shipping batch:', error);
            throw error;
        }
    }

    async receiveBatch(batchNumber: string) {
        try {
            const tx = await this.contract.receiveBatch(batchNumber);
            await tx.wait();
            return { success: true, transactionHash: tx.hash };
        } catch (error) {
            console.error('Error receiving batch:', error);
            throw error;
        }
    }

    // Verification
    async verifyBatch(batchNumber: string) {
        try {
            const tx = await this.contract.verifyBatch(batchNumber);
            await tx.wait();
            return { success: true, transactionHash: tx.hash };
        } catch (error) {
            console.error('Error verifying batch:', error);
            throw error;
        }
    }

    // Dispensing
    async dispenseBatch(batchNumber: string) {
        try {
            const tx = await this.contract.dispenseBatch(batchNumber);
            await tx.wait();
            return { success: true, transactionHash: tx.hash };
        } catch (error) {
            console.error('Error dispensing batch:', error);
            throw error;
        }
    }

    // Recall
    async recallBatch(batchNumber: string) {
        try {
            const tx = await this.contract.recallBatch(batchNumber);
            await tx.wait();
            return { success: true, transactionHash: tx.hash };
        } catch (error) {
            console.error('Error recalling batch:', error);
            throw error;
        }
    }

    // Authorization
    async authorizeManufacturer(address: string) {
        try {
            const tx = await this.contract.authorizeManufacturer(address);
            await tx.wait();
            return { success: true, transactionHash: tx.hash };
        } catch (error) {
            console.error('Error authorizing manufacturer:', error);
            throw error;
        }
    }

    async authorizeDistributor(address: string) {
        try {
            const tx = await this.contract.authorizeDistributor(address);
            await tx.wait();
            return { success: true, transactionHash: tx.hash };
        } catch (error) {
            console.error('Error authorizing distributor:', error);
            throw error;
        }
    }

    async authorizePharmacy(address: string) {
        try {
            const tx = await this.contract.authorizePharmacy(address);
            await tx.wait();
            return { success: true, transactionHash: tx.hash };
        } catch (error) {
            console.error('Error authorizing pharmacy:', error);
            throw error;
        }
    }

    async authorizeRegulator(address: string) {
        try {
            const tx = await this.contract.authorizeRegulator(address);
            await tx.wait();
            return { success: true, transactionHash: tx.hash };
        } catch (error) {
            console.error('Error authorizing regulator:', error);
            throw error;
        }
    }

    // View Functions
    async getBatchStatus(batchNumber: string) {
        try {
            console.log('BlockchainService: Getting batch status for:', batchNumber);
            const status = await this.contract.getBatchStatus(batchNumber);
            console.log('BlockchainService: Received batch status:', status);
            return status;
        } catch (error) {
            console.error('BlockchainService: Error getting batch status:', error);
            throw error;
        }
    }

    async getBatchTransactions(batchNumber: string) {
        try {
            const transactions = await this.contract.getBatchTransactions(batchNumber);
            return transactions;
        } catch (error) {
            console.error('Error getting batch transactions:', error);
            throw error;
        }
    }

    async isBatchVerified(batchNumber: string) {
        try {
            const isVerified = await this.contract.isBatchVerified(batchNumber);
            return isVerified;
        } catch (error) {
            console.error('Error checking batch verification:', error);
            throw error;
        }
    }
} 