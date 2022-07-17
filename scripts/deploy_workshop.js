
const hre = require("hardhat");

async function main() {
  const Workshop = await hre.ethers.getContractFactory("WorkshopChain");
  const workshop = await Workshop.deploy();

  await workshop.deployed();

  console.log("Workshop with 1 ETH deployed to:", workshop.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
