// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract DrugVerification {
    struct Drug {
        string name;
        string ndc;
        address manufacturer;
        string description;
        bool exists;
        uint256 createdAt;
        uint256 updatedAt;
    }

    struct Batch {
        string batchNumber;
        string drugNdc;
        uint256 manufactureDate;
        uint256 expiryDate;
        address creator;
        BatchStatus status;
        bool exists;
        uint256 createdAt;
        uint256 updatedAt;
        string ipfsHash; // For storing additional documentation
    }

    struct Transaction {
        string batchNumber;
        address from;
        address to;
        TransactionType txType;
        uint256 timestamp;
        string ipfsHash; // For storing transaction details
    }

    enum BatchStatus {
        CREATED,
        IN_TRANSIT,
        DELIVERED,
        VERIFIED,
        DISPENSED,
        RECALLED
    }

    enum TransactionType {
        MANUFACTURE,
        SHIP,
        RECEIVE,
        VERIFY,
        DISPENSE
    }

    // Mappings
    mapping(string => Drug) public drugs;
    mapping(string => Batch) public batches;
    mapping(string => Transaction[]) public batchTransactions;
    mapping(address => bool) public authorizedManufacturers;
    mapping(address => bool) public authorizedDistributors;
    mapping(address => bool) public authorizedPharmacies;
    mapping(address => bool) public authorizedRegulators;

    // Events
    event DrugRegistered(string ndc, string name, address manufacturer);
    event BatchRegistered(string batchNumber, string drugNdc, address creator);
    event BatchStatusUpdated(string batchNumber, BatchStatus newStatus);
    event TransactionRecorded(string batchNumber, address from, address to, TransactionType txType);
    event BatchVerified(string batchNumber, address verifier);
    event BatchRecalled(string batchNumber, address recalledBy);
    event Authorized(address account, string role);

    // Modifiers
    modifier onlyManufacturer(string memory ndc) {
        require(drugs[ndc].exists, "Drug does not exist");
        require(drugs[ndc].manufacturer == msg.sender, "Not the manufacturer");
        _;
    }

    modifier onlyAuthorizedManufacturer() {
        require(authorizedManufacturers[msg.sender], "Not an authorized manufacturer");
        _;
    }

    modifier onlyAuthorizedDistributor() {
        require(authorizedDistributors[msg.sender], "Not an authorized distributor");
        _;
    }

    modifier onlyAuthorizedPharmacy() {
        require(authorizedPharmacies[msg.sender], "Not an authorized pharmacy");
        _;
    }

    modifier onlyAuthorizedRegulator() {
        require(authorizedRegulators[msg.sender], "Not an authorized regulator");
        _;
    }

    // Drug Management
    function registerDrug(
        string memory name,
        string memory ndc,
        string memory description
    ) public onlyAuthorizedManufacturer {
        require(!drugs[ndc].exists, "Drug already registered");
        drugs[ndc] = Drug({
            name: name,
            ndc: ndc,
            manufacturer: msg.sender,
            description: description,
            exists: true,
            createdAt: block.timestamp,
            updatedAt: block.timestamp
        });
        emit DrugRegistered(ndc, name, msg.sender);
    }

    // Batch Management
    function registerBatch(
        string memory batchNumber,
        string memory drugNdc,
        uint256 manufactureDate,
        uint256 expiryDate,
        string memory ipfsHash
    ) public onlyManufacturer(drugNdc) {
        require(!batches[batchNumber].exists, "Batch already registered");
        batches[batchNumber] = Batch({
            batchNumber: batchNumber,
            drugNdc: drugNdc,
            manufactureDate: manufactureDate,
            expiryDate: expiryDate,
            creator: msg.sender,
            status: BatchStatus.CREATED,
            exists: true,
            createdAt: block.timestamp,
            updatedAt: block.timestamp,
            ipfsHash: ipfsHash
        });
        emit BatchRegistered(batchNumber, drugNdc, msg.sender);
    }

    // Supply Chain Tracking
    function shipBatch(string memory batchNumber, address to) public onlyAuthorizedDistributor {
        require(batches[batchNumber].exists, "Batch does not exist");
        require(batches[batchNumber].status == BatchStatus.CREATED, "Invalid batch status");
        
        batches[batchNumber].status = BatchStatus.IN_TRANSIT;
        batches[batchNumber].updatedAt = block.timestamp;
        
        batchTransactions[batchNumber].push(Transaction({
            batchNumber: batchNumber,
            from: msg.sender,
            to: to,
            txType: TransactionType.SHIP,
            timestamp: block.timestamp,
            ipfsHash: ""
        }));
        
        emit BatchStatusUpdated(batchNumber, BatchStatus.IN_TRANSIT);
        emit TransactionRecorded(batchNumber, msg.sender, to, TransactionType.SHIP);
    }

    function receiveBatch(string memory batchNumber) public onlyAuthorizedDistributor {
        require(batches[batchNumber].exists, "Batch does not exist");
        require(batches[batchNumber].status == BatchStatus.IN_TRANSIT, "Invalid batch status");
        
        batches[batchNumber].status = BatchStatus.DELIVERED;
        batches[batchNumber].updatedAt = block.timestamp;
        
        batchTransactions[batchNumber].push(Transaction({
            batchNumber: batchNumber,
            from: msg.sender,
            to: msg.sender,
            txType: TransactionType.RECEIVE,
            timestamp: block.timestamp,
            ipfsHash: ""
        }));
        
        emit BatchStatusUpdated(batchNumber, BatchStatus.DELIVERED);
        emit TransactionRecorded(batchNumber, msg.sender, msg.sender, TransactionType.RECEIVE);
    }

    // Verification
    function verifyBatch(string memory batchNumber) public onlyAuthorizedRegulator {
        require(batches[batchNumber].exists, "Batch does not exist");
        require(batches[batchNumber].status == BatchStatus.DELIVERED, "Invalid batch status");
        
        batches[batchNumber].status = BatchStatus.VERIFIED;
        batches[batchNumber].updatedAt = block.timestamp;
        
        batchTransactions[batchNumber].push(Transaction({
            batchNumber: batchNumber,
            from: msg.sender,
            to: msg.sender,
            txType: TransactionType.VERIFY,
            timestamp: block.timestamp,
            ipfsHash: ""
        }));
        
        emit BatchVerified(batchNumber, msg.sender);
        emit BatchStatusUpdated(batchNumber, BatchStatus.VERIFIED);
        emit TransactionRecorded(batchNumber, msg.sender, msg.sender, TransactionType.VERIFY);
    }

    // Dispensing
    function dispenseBatch(string memory batchNumber) public onlyAuthorizedPharmacy {
        require(batches[batchNumber].exists, "Batch does not exist");
        require(batches[batchNumber].status == BatchStatus.VERIFIED, "Invalid batch status");
        
        batches[batchNumber].status = BatchStatus.DISPENSED;
        batches[batchNumber].updatedAt = block.timestamp;
        
        batchTransactions[batchNumber].push(Transaction({
            batchNumber: batchNumber,
            from: msg.sender,
            to: msg.sender,
            txType: TransactionType.DISPENSE,
            timestamp: block.timestamp,
            ipfsHash: ""
        }));
        
        emit BatchStatusUpdated(batchNumber, BatchStatus.DISPENSED);
        emit TransactionRecorded(batchNumber, msg.sender, msg.sender, TransactionType.DISPENSE);
    }

    // Recall
    function recallBatch(string memory batchNumber) public onlyAuthorizedRegulator {
        require(batches[batchNumber].exists, "Batch does not exist");
        require(batches[batchNumber].status != BatchStatus.RECALLED, "Batch already recalled");
        
        batches[batchNumber].status = BatchStatus.RECALLED;
        batches[batchNumber].updatedAt = block.timestamp;
        
        emit BatchRecalled(batchNumber, msg.sender);
        emit BatchStatusUpdated(batchNumber, BatchStatus.RECALLED);
    }

    // Authorization Management
    function authorizeManufacturer(address account) public {
        authorizedManufacturers[account] = true;
        emit Authorized(account, "MANUFACTURER");
    }

    function authorizeDistributor(address account) public {
        authorizedDistributors[account] = true;
        emit Authorized(account, "DISTRIBUTOR");
    }

    function authorizePharmacy(address account) public {
        authorizedPharmacies[account] = true;
        emit Authorized(account, "PHARMACY");
    }

    function authorizeRegulator(address account) public {
        authorizedRegulators[account] = true;
        emit Authorized(account, "REGULATOR");
    }

    // View Functions
    function getBatchStatus(string memory batchNumber) public view returns (BatchStatus) {
        require(batches[batchNumber].exists, "Batch does not exist");
        return batches[batchNumber].status;
    }

    function getBatchTransactions(string memory batchNumber) public view returns (Transaction[] memory) {
        require(batches[batchNumber].exists, "Batch does not exist");
        return batchTransactions[batchNumber];
    }

    function isBatchVerified(string memory batchNumber) public view returns (bool) {
        require(batches[batchNumber].exists, "Batch does not exist");
        return batches[batchNumber].status == BatchStatus.VERIFIED;
    }
} 