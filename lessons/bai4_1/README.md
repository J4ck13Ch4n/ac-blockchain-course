# Bài 4.1 – Mapping, Struct, Array

## 🎯 Mục tiêu
- Thực hành lưu trữ dữ liệu bằng struct, mapping.
- Biết cách thêm, đọc, kiểm tra dữ liệu trong smart contract.

## 📄 Đề bài
Viết một smart contract tên `StudentRegistry`:
- Tạo struct `Student` gồm: `name (string)`, `age (uint)`, `isRegistered (bool)`
- Dùng `mapping(address => Student)` để lưu thông tin từng người theo địa chỉ ví.
- Hàm `register(string name, uint age)` cho phép caller đăng ký bản thân.
- Hàm `getStudent(address user)` trả về thông tin student.
- Hàm `isStudentRegistered(address user)` trả về true/false nếu student đã đăng ký.

## 💻 Cách chạy
- Dán code vào Remix IDE: https://remix.ethereum.org
- Deploy, test lần lượt các hàm.
- Thử gọi `register()`, `getStudent()` và `isStudentRegistered()`.

![alt text](image.png)