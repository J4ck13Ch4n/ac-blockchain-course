import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");

  const abi = [
    "function balanceOf(address owner) view returns (uint256)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)"
  ];
  const contractAddress = "0xd98915fC75f174E239F972dC46D5908abD089cc1";
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const deployerAddress = "0x619ad5E2bB56fa7161267d91EaE5BE27CCe6F91c";

  const name = await contract.name();
  const symbol = await contract.symbol();
  const totalSupply = await contract.totalSupply();
  const balance = await contract.balanceOf(deployerAddress);

  console.log("Token Name:", name);
  console.log("Token Symbol:", symbol);
  console.log("Total Supply:", ethers.formatUnits(totalSupply, 18));
  console.log("Deployer Balance:", ethers.formatUnits(balance, 18));
}

main().catch(console.error);
