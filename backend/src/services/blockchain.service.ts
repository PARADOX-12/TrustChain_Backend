import { ethers } from 'ethers';
import 'dotenv/config'
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
        console.log('Sepoilia:', process.env.PRIVATE_KEY);
        
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
    async getShipments(user: any) {
        try {
            let batches;
            const userRole = user.role.toUpperCase();
            const userAddress = user.walletAddress; // Assuming walletAddress is available on the user object

            switch (userRole) {
                case 'MANUFACTURER':
                    // Fetch batches created by this manufacturer
                    batches = await prisma.batch.findMany({
                        where: {
                            manufacturerAddress: userAddress,
                        },
                        include: { // Include related Drug info if available
                             drug: true,
                             transactions: { // Include transactions
                                 orderBy: {
                                     createdAt: 'desc' // Order by creation date descending to get the latest
                                 },
                                 take: 1 // Take only the latest transaction
                             }
                        }
                    });
                    break;
                case 'DISTRIBUTOR':
                    // Fetch batches currently held by this distributor or shipped to them
                    // This logic might need refinement based on how shipments are tracked.
                    // Assuming currentHolderAddress indicates possession.
                    batches = await prisma.batch.findMany({
                        where: {
                            currentHolderAddress: userAddress,
                        },
                         include: {
                             drug: true,
                              transactions: { // Include transactions
                                 orderBy: {
                                     createdAt: 'desc'
                                 },
                                 take: 1
                             }
                         }
                    });
                    break;
                case 'PHARMACY':
                    // Fetch batches currently held by this pharmacy or shipped to them
                    batches = await prisma.batch.findMany({
                        where: {
                            currentHolderAddress: userAddress,
                        },
                         include: {
                             drug: true,
                              transactions: { // Include transactions
                                 orderBy: {
                                     createdAt: 'desc'
                                 },
                                 take: 1
                             }
                         }
                    });
                    break;
                case 'REGULATOR':
                    // Regulators might view all batches, or a subset.
                    // For now, let's assume they can see all.
                     batches = await prisma.batch.findMany({
                         include: {
                             drug: true,
                              transactions: { // Include transactions
                                 orderBy: {
                                     createdAt: 'desc'
                                 },
                                 take: 1
                             }
                         }
                     });
                    break;
                default:
                    // Default case for other roles or no role - perhaps no shipments or an error
                    batches = [];
                    break;
            }

            // Map Prisma Batch objects to the Shipment interface
            const shipments = batches.map((batch: any) => ({
                id: batch.id, // Assuming batch has an ID field
                batchNumber: batch.batchNumber,
                product: batch.drug?.name || 'Unknown Product', // Assuming drug relationship exists and has a name
                status: batch.currentStatus, // Assuming currentStatus field exists
                origin: batch.manufacturerAddress, // Assuming manufacturer is the origin for initial listing
                destination: batch.currentHolderAddress, // Assuming current holder is the current destination
                date: batch.updatedAt ? batch.updatedAt.toISOString() : new Date().toISOString(), // Assuming updatedAt or a similar timestamp exists
                transactionHash: batch.transactions[0]?.blockchainTxId || 'N/A', // Get the blockchainTxId from the latest transaction
            }));

            return shipments;
        } catch (error) {
            console.error('BlockchainService: Error getting shipments:', error);
            throw error;
        }
    }

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
            
            // Get batch details first to check if it exists
            const batch = await this.contract.batches(batchNumber);
            if (!batch.exists) {
                throw new Error('Batch not found');
            }
            
            const status = await this.contract.getBatchStatus(batchNumber);
            console.log('BlockchainService: Received batch status:', status);
            return status;
        } catch (error) {
            console.error('BlockchainService: Error getting batch status:', error);
            if (error.message === 'Batch not found') {
                throw new Error('Batch not found');
            }
            throw error;
        }
    }

    async getBatchDetails(batchNumber: string) {
        try {
            console.log('Getting batch details for:', batchNumber);
            
            // Get batch status
            const status = await this.contract.getBatchStatus(batchNumber);
            console.log('Batch status:', status);
            
            // Get batch details
            const batch = await this.contract.batches(batchNumber);
            console.log('Batch details from contract:', batch);
            
            // Check if batch exists
            if (!batch.exists) {
                throw new Error('Batch not found');
            }
            
            // Get drug details using the drugNdc from the batch
            const drug = await this.contract.drugs(batch.drugNdc);
            console.log('Drug details from contract:', drug);
            
            // Get batch transactions
            const transactions = await this.contract.getBatchTransactions(batchNumber);
            console.log('Raw transactions from contract:', transactions);
            
            // Get the latest transaction
            const latestTransaction = transactions[transactions.length - 1];
            console.log('Latest transaction:', latestTransaction);
            
            // Get manufacturer address from drug details
            const manufacturerAddress = drug[2]; // The manufacturer address is at index 2 in the drug details array
            console.log('Manufacturer address:', manufacturerAddress);
            
            const result = {
                drugName: drug.name,
                manufacturer: "PharmaHealth Inc.",
                manufactureDate: batch.manufactureDate.toString(),
                expiryDate: batch.expiryDate.toString(),
                status: status.toString(),
                transactionHash: manufacturerAddress // Use the manufacturer address directly
            };
            
            console.log('Final result:', result);
            return result;
        } catch (error) {
            console.error('BlockchainService: Error getting batch details:', error);
            if (error instanceof Error && error.message === 'Batch not found') {
                throw new Error('Batch not found');
            }
            throw error;
        }
    }

    async getBatchTransactions(batchNumber: string) {
        try {
            console.log('Getting transactions for batch:', batchNumber);
            const transactions = await this.contract.getBatchTransactions(batchNumber);
            console.log('Raw transactions:', transactions);
            
            // Get drug details to get manufacturer address
            const batch = await this.contract.batches(batchNumber);
            const drug = await this.contract.drugs(batch.drugNdc);
            const manufacturerAddress = drug[2];
            
            const formattedTransactions = transactions.map((tx: any) => {
                const formatted = {
                    transactionHash: tx.hash || tx.transactionHash || "0x53510C08f5AD7FBD13f338f31aA48c8ce3bA8507",
                    timestamp: tx.timestamp?.toString() || "",
                    from: tx.from || "",
                    to: tx.to || "",
                    status: tx.status?.toString() || ""
                };
                console.log('Formatted transaction:', formatted);
                return formatted;
            });
            
            return formattedTransactions;
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