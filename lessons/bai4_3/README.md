# Bài 4.3 – Voting Smart Contract

## 🎯 Mục tiêu
- Thực hành làm bài tập tổng hợp tuần 4.
- Kết hợp struct, mapping, modifier, event để xây dựng voting contract.

## 📄 Đề bài
Viết một smart contract `Voting`:
- Admin (owner) tạo danh sách ứng viên.
- Người dùng chỉ được vote 1 lần cho 1 ứng viên.
- Ghi log mỗi lần vote thành công bằng event.

### Yêu cầu:
1️⃣ Struct `Candidate` gồm `name (string)`, `voteCount (uint)`  
2️⃣ Mapping `candidates(uint => Candidate)`  
3️⃣ Mapping `hasVoted(address => bool)`  
4️⃣ Modifier `onlyOwner` để kiểm soát việc tạo ứng viên  
5️⃣ Event `Voted(address voter, uint candidateId)`

## 💻 Cách chạy
- Dán code vào Remix IDE: https://remix.ethereum.org
- Deploy → Thêm ứng viên → Thực hiện vote → Kiểm tra event log và kết quả đếm phiếu.


![alt text](image.png)