import { ethers } from "ethers";

async function main() {
  const provider = new ethers.JsonRpcProvider("https://sepolia.drpc.org");

  const abi = [
    "function getCount() public view returns (uint)",
    "function increment() public"
  ];
  const contractAddress = "0x88134531C358d851C959c78d66B03d3104aE0372"; // Replace with your contract address

  const contract = new ethers.Contract(contractAddress, abi, provider);

  const count = await contract.getCount();
  console.log("Current count is:", count.toString());
}

main().catch(console.error);
