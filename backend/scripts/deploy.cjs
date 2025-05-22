const hre = require("hardhat");

async function main() {
  console.log("Deploying DrugVerification contract...");

  const DrugVerification = await hre.ethers.getContractFactory("DrugVerification");
  const contract = await DrugVerification.deploy();
  
  console.log("Waiting for deployment transaction to be mined...");
  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("DrugVerification deployed to:", address);

  // Wait for a few block confirmations
  console.log("Waiting for block confirmations...");
  const deploymentTx = contract.deploymentTransaction();
  if (deploymentTx) {
    await deploymentTx.wait(5);
    console.log("Contract deployment completed!");
    console.log("Contract address:", address);
  } else {
    console.log("Warning: Could not get deployment transaction");
    console.log("Contract address:", address);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); 