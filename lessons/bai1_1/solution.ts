import { sha256, toUtf8Bytes } from "ethers";

export type Block = {
  index: number;
  timestamp: string;
  transactions: any[];
  previous_hash: string;
  current_hash: string;
};

// ✍️ TODO: Viết hàm tại đây
export function isValidBlock(block: Block): boolean {
  const data = block.index + block.timestamp + JSON.stringify(block.transactions) + block.previous_hash;
  const hash = sha256(toUtf8Bytes(data));
  // slice(2) để bỏ đi 2 ký tự đầu tiên là '0x'
  return block.current_hash === hash.slice(2);
}
