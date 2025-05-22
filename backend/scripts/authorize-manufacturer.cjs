const { ethers } = require("hardhat");

async function main() {
  // Replace with your deployed contract address
  const contractAddress = "0xaB09bD6dDb7CCC2bC631a8d486CAE459D5944941";
  // Backend wallet address to authorize
  const manufacturerAddress = "0x53510C08f5AD7FBD13f338f31aA48c8ce3bA8507";

  const contract = await ethers.getContractAt("DrugVerification", contractAddress);
  const tx = await contract.authorizeManufacturer(manufacturerAddress);
  await tx.wait();
  console.log("Manufacturer authorized:", manufacturerAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
