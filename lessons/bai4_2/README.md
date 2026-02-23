# Bài 4.2 – Modifier, Event và Quyền Truy Cập

## 🎯 Mục tiêu
- Thực hành viết modifier giới hạn quyền owner.
- Ghi log bằng event khi thêm dữ liệu.

## 📄 Đề bài
Viết một smart contract `StudentRegistryV2` mở rộng từ bài 4.1:
- Chỉ owner (người deploy contract) được phép thêm sinh viên.
- Khi thêm sinh viên thành công sẽ emit event.

## 💻 Cách chạy
- Dán code vào Remix IDE: https://remix.ethereum.org
- Deploy → Test `registerStudent()`, kiểm tra event log và kết quả đọc student.

![alt text](image.png)