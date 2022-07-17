
const hre = require("hardhat");

async function main() {
  const Certificates = await hre.ethers.getContractFactory("Certificates");
  const certificates = await Certificates.deploy();

  await certificates.deployed();

  console.log("Certificates with 1 ETH deployed to:", certificates.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
