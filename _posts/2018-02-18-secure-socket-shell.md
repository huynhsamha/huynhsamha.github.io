---
layout: post
title: SSH (Secure Socket Shell)
description: "SSH (Secure Shell or Secure Socket Shell) - network protocol that provides administrators with a secure way to access a remote computer."
headline:
modified: 2018-02-18
category: network
tags: [SSH]
imagefeature: cover/macos/006.jpg
mathjax:
chart:
share: true
# comments: true
# featured: true
---

SSH (Secure Shell or Secure Socket Shell) - network protocol that provides administrators with a secure way to access a remote computer.

Translate from [https://medium.com/@Magical_Mudit/understanding-ssh-workflow-66a0e8d4bf65](https://medium.com/@Magical_Mudit/understanding-ssh-workflow-66a0e8d4bf65) and other resources

Language: Vietnamese

## SSH - Secure Socket Shell

SSH, hay còn gọi là Secure Shell hay Secure Socket Shell, là một giao thức mạng cung cấp quyền kiểm soát với phương thức an toàn để kết nối một máy tính từ xa.

SSH tạo một kết nối an toàn bằng mật mã học, giữa 2 phía client và server, xác thực mỗi bên, truyền lệnh và kết quả qua lại.

Ví dụ máy tính A hệ Linux có cài SSH thì ta cú thể đăng nhập máy A từ xa (sử dụng máy khác như B) để quản lý dữ liệu. Các dữ liệu được gửi và nhận thông qua SSH đề được mã hóa để bảo mật thông tin.

## Cách thức hoạt động
SSH sử dụng các kỹ thuật cryptography (mật mã hóa) gồm symmetric encryption (mã hóa đối xừng), asymmetric encryption (mã hóa bất đối xừng) and hashing (hàm băm).

Sử dụng các kỹ thuật mã hóa trên để bảo vệ thông tin truyền tải qua lại giữa 2 phía.

{% include ads.html %}

Kết nối SSH giữ client và server xảy ra 3 giai đoạn:
1. Sự xác minh của server.
2. Sinh ra một session key (khóa của phiên làm việc) để mã hóa tất cả tương tác giữa 2 phía.
3. Sự xác minh của client.

### 1. Verification of server
Xác minh của server: Client tạo kết nối SSH tới server. Server lắng nghe trên cổng mặc định là 22 (có thể thay đổi) cho các kết nối SSH. Khi nghe thấy tín hiệu kết nối, server sẽ kiểm tra tính hợp lệ của kết nối.

### 2. Genergion of session key
Sinh ra khóa cho phiên làm việc: Sau khi server xác thực hoàn tất (lúc này chưa SSH thành công, chỉ kiểm tra tính hợp lệ của kết nối SSH), hai phía thỏa thuận một khóa được sinh từ thuật toán Diffie-Hellman. Đây là khóa đối xứng, được dùng để mã hóa cũng như giải mã các thông tin truyền tải giữa 2 phía trong phiên làm việc.

### 3. Authentication of the client
Xác minh của client: Giai đoạn cuối cùng liên quan đến xác thực của client. Xác thực này sử dụng SSH key pair, gồm 2 khóa public key và private key (public key được dùng để mã hóa dữ liệu và có thể được share, còn private key được dùng để giải mã dữ liệu và không được share với bất cứ ai). Các quá trình xảy ra trong giai đoạn này:
1. Client gửi ID cho cặp khóa (key pair trên) để authenticate với server.
2. Server kiểm tra authorized_keys file của account mà client đang login vào ID trên
3. Nếu public key trùng khớp với ID được tìm thấy trong file, server sinh ra một số ngẫu nhiên, sử dụng public key này để mã hóa và gửi lại cho client.
4. Nếu client có private key đúng sẽ có thể giải mã con số này.
5. Client kết hợp con số trên với session key, tính giá trị hash MD5 của nó.
6. Client gửi giá trị này trở lại cho server.
7. Server sử dụng session key và số sinh ngẫu nhiên ở server để tính giá trị hash MD5, nếu giá trị trùng khớp với giá trị client gửi lên, thì  chứng minh được client sở hữu private key đúng và SSH thành công.

## SSH trong máy chủ Linux
Trên một máy cài Linux, thông tin đăng nhập thông qua giao thức SSH gồm:

+ IP máy chủ
+ Tên người dùng đăng nhập, đa phần là root
+ Mật khẩu của người dùng, nếu tên người dùng của bạn là root thì mật khẩu này được gọi là mật khẩu root.
+ Cổng giao tiếp: 22, mặc định SSH sử dụng cổng 22.

Với các thông tin đó, bạn đã có thể đăng nhập vào máy chủ Linux của bạn rồi.

## Cách SSH từ Linux/macOS tới các máy khác
Trên terminal, gọi 
```bash
ssh root@198.19.13.3
hoặc
ssh root@198.19.13.3 -p 8080
```

Trong đó:
+ root là tên người dùng máy chủ
+ 198.19.13.3 là địa chỉ IP của máy chủ muốn đăng nhập
+ -p 8080 là option port (cổng) muốn đăng nhập, mặc định là 22

## Các nguồn tham khảo

[https://medium.com/@Magical_Mudit/understanding-ssh-workflow-66a0e8d4bf65](https://medium.com/@Magical_Mudit/understanding-ssh-workflow-66a0e8d4bf65)
[https://thachpham.com/linux-webserver/giao-thuc-ssh-la-gi-va-cach-dang-nhap-vao-may-chu-linux-qua-ssh.html](https://thachpham.com/linux-webserver/giao-thuc-ssh-la-gi-va-cach-dang-nhap-vao-may-chu-linux-qua-ssh.html)

[https://thachpham.com/linux-webserver/huong-dan-ssh-key.html](https://thachpham.com/linux-webserver/huong-dan-ssh-key.html)
