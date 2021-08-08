const hre = require("hardhat");

async function main() {
  const NeedToken = await hre.ethers.getContractFactory("NeedToken");
  const needToken = await NeedToken.deploy("Need Token", "NEED");

  await needToken.deployed();

  console.log("Need Token deployed to:", needToken.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
