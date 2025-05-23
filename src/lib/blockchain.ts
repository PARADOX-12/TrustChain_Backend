import axios from 'axios';

const API_URL = 'http://localhost:3000/api/blockchain';

export interface DrugRegistration {
    name: string;
    ndc: string;
    description: string;
}

export interface BatchRegistration {
    batchNumber: string;
    drugNdc: string;
    manufactureDate: number;
    expiryDate: number;
    ipfsHash: string;
}

export class BlockchainService {
    private static getHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    // Drug Management
    static async registerDrug(drug: DrugRegistration) {
        try {
            const response = await axios.post(`${API_URL}/drugs`, drug, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error registering drug:', error);
            throw error;
        }
    }

    // Batch Management
    static async registerBatch(batch: BatchRegistration) {
        try {
            const response = await axios.post(`${API_URL}/batches`, batch, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error registering batch:', error);
            throw error;
        }
    }

    // Supply Chain Tracking
    static async shipBatch(batchNumber: string, to: string) {
        try {
            const response = await axios.post(`${API_URL}/batches/ship`, { batchNumber, to }, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error shipping batch:', error);
            throw error;
        }
    }

    static async receiveBatch(batchNumber: string) {
        try {
            const response = await axios.post(`${API_URL}/batches/receive`, { batchNumber }, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error receiving batch:', error);
            throw error;
        }
    }

    // Verification
    static async verifyBatch(batchNumber: string) {
        try {
            const response = await axios.post(`${API_URL}/batches/verify`, { batchNumber }, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error verifying batch:', error);
            throw error;
        }
    }

    // View Functions
    static async getBatchStatus(batchNumber: string) {
        try {
            const response = await axios.get(`${API_URL}/batches/${batchNumber}/status`, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error getting batch status:', error);
            throw error;
        }
    }

    static async getBatchTransactions(batchNumber: string) {
        try {
            const response = await axios.get(`${API_URL}/batches/${batchNumber}/transactions`, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error getting batch transactions:', error);
            throw error;
        }
    }

    static async isBatchVerified(batchNumber: string) {
        try {
            const response = await axios.get(`${API_URL}/batches/${batchNumber}/verified`, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error checking batch verification:', error);
            throw error;
        }
    }

    static async getBatchDetails(batchNumber: string) {
        try {
            const response = await axios.get(`${API_URL}/batches/${batchNumber}`, {
                headers: this.getHeaders()
            });
            return response.data;
        } catch (error) {
            console.error('Error getting batch details:', error);
            throw error;
        }
    }
} 