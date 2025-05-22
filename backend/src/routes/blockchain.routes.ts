import { Router } from 'express';
import { BlockchainController } from '../controllers/blockchain.controller';
import { protect, restrictTo } from '../middleware/auth.middleware.js';

const router = Router();
const blockchainController = new BlockchainController();

// Drug Management
router.post('/drugs', protect, restrictTo('MANUFACTURER'), blockchainController.registerDrug.bind(blockchainController));

// Batch Management
router.post('/batches', protect, restrictTo('MANUFACTURER'), blockchainController.registerBatch.bind(blockchainController));

// Supply Chain Tracking
router.post('/batches/ship', protect, blockchainController.shipBatch.bind(blockchainController));
router.post('/batches/receive', protect, blockchainController.receiveBatch.bind(blockchainController));

// Verification
router.post('/batches/verify', protect, blockchainController.verifyBatch.bind(blockchainController));

// Dispensing
router.post('/batches/dispense', protect, blockchainController.dispenseBatch.bind(blockchainController));

// Recall
router.post('/batches/recall', protect, restrictTo('REGULATOR'), blockchainController.recallBatch.bind(blockchainController));

// Authorization
router.post('/authorize/manufacturer', protect, restrictTo('ADMIN'), blockchainController.authorizeManufacturer.bind(blockchainController));
router.post('/authorize/distributor', protect, restrictTo('ADMIN'), blockchainController.authorizeDistributor.bind(blockchainController));
router.post('/authorize/pharmacy', protect, restrictTo('ADMIN'), blockchainController.authorizePharmacy.bind(blockchainController));
router.post('/authorize/regulator', protect, restrictTo('ADMIN'), blockchainController.authorizeRegulator.bind(blockchainController));

// View Functions
router.get('/batches/:batchNumber/status', protect, blockchainController.getBatchStatus.bind(blockchainController));
router.get('/batches/:batchNumber/transactions', protect, blockchainController.getBatchTransactions.bind(blockchainController));
router.get('/batches/:batchNumber/verified', protect, blockchainController.isBatchVerified.bind(blockchainController));

export default router; 