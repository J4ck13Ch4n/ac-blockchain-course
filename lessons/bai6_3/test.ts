import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia-rpc.publicnode.com");
  const privateKey = "7bad5bd22cd3d968045c2e6179c5817660343d251a575f0eae19a493f10776e1";
  const wallet = new ethers.Wallet(privateKey, provider);

  const abi = [
    "function mint(address to) external",
    "function ownerOf(uint256 tokenId) view returns (address)",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function nextTokenId() view returns (uint256)"
  ];
  const contractAddress = "0xD672160271cc6064B3eA266ECb7916D0861876D0";
  const contract = new ethers.Contract(contractAddress, abi, wallet);

  console.log("Contract address:", contractAddress);
  console.log("Deployer address:", wallet.address);

  const name = await contract.name();
  const symbol = await contract.symbol();
  const nextTokenId = await contract.nextTokenId();
  
  console.log("NFT Name:", name);
  console.log("NFT Symbol:", symbol);
  console.log("Next Token ID:", nextTokenId.toString());

  const tx = await contract.mint(wallet.address);
  console.log("Minting NFT... Tx hash:", tx.hash);
  await tx.wait();
  
  const newNextTokenId = await contract.nextTokenId();
  const ownerOfLastToken = await contract.ownerOf(newNextTokenId - 1n);
  
  console.log("New Next Token ID:", newNextTokenId.toString());
  console.log("Owner of token", (newNextTokenId - 1n).toString() + ":", ownerOfLastToken);
}

main().catch(console.error);
