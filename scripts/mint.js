// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const tokenContractJSON = require("../artifacts/contracts/rawrNFT.sol/rawrNFT.json");
require("dotenv").config();

const tokenAddress = "0xABFF2fBbC471d9d1D7a7f4eBaEe0BdFD6a0b8df9"; // place your erc20 contract address here
const tokenABI = tokenContractJSON.abi;
const walletAddress = "0x3FB380D3E981106F962486e91D7E558E2815E953"; // place your public address for your wallet here

async function main() {
  const imageUrls = [
    "https://cyan-manual-crayfish-417.mypinata.cloud/ipfs/QmQ9DDwVLY3faExFLSFcHBwK7sWoEqsdtprzuPVwH9H9HM",
    "https://cyan-manual-crayfish-417.mypinata.cloud/ipfs/Qma1sbZjjLek5ZqPYG3owN4EDJ1h1BQo7pgMQMjHLN7iwF",
    "https://cyan-manual-crayfish-417.mypinata.cloud/ipfs/QmWf2WbDqmUbxZgtqKmxLhay2oihJFFYsLaMLXCnmjKHq3",
    "https://cyan-manual-crayfish-417.mypinata.cloud/ipfs/QmQzwmBUqBwjE3sHEUq4xJFzppbFGyUjXFqa1UpWZMuF3W",
    "https://cyan-manual-crayfish-417.mypinata.cloud/ipfs/QmZiyVmHckbzR5bgFW6H9PH5U4PTUUFabLEVortDGuihw9",
  ];

  const prompts = [
    "A futuristic city skyline at sunset",
    "A serene mountain landscape with a river",
    "An abstract painting of a colorful explosion",
    "A fantasy world with dragons and castles",
    "A detailed map of an imaginary land"
  ];

  const token = await hre.ethers.getContractAt(tokenABI, tokenAddress);

  const tx = await token.mintNft(imageUrls, prompts);
  await tx.wait();

  console.log(`You now have minted ${imageUrls.length} NFTs`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
