---
layout: post
title: HTTP/HTTPS with SSL Certificate
description: "HTTP (HyperText Transfer Protocol) - HTTPS (http Secure) - SSL (Secure Socket Layer)"
headline: 
modified: 2018-02-08
category: network
tags: [http, https, ssl]
imagefeature: cover/network/001.jpg
mathjax:
chart:
share: true
# comments: true
# featured: true
---

HTTP (HyperText Transfer Protocol) - HTTPS (http Secure) - SSL (Secure Socket Layer)

Language: Vietnamese

## HTTP
### HTTP là gì?
HTTP, viết tắt của HyperText Transfer Protocol, nghĩa là giao thức truyền tải siêu văn bản

HTTP thuộc loại giao thuộc **TCP/IP**, theo mô hình **Client-Server**, trong đó:
+ Browser, trong vài trò client, gửi request.
+ Server gửi lại response cho browser.

### Thảm họa từ HTTP - Man-in-the-middle attack (MITM)

HTTP truyền dữ liệu dưới dạng plain text, nói nôm na là trần trụi, không hề được mã hóa hay bảo mật, các hacker có thể lắng nghe, chôm chỉa và chỉnh sửa dữ liệu. Người ta gọi đây là kiểu tấn công Man-in-the-middle attack, viết tắt MITM.

Chủ yếu, HTTP nguy hiểm với các trường hợp giao dịch tài khoản ngân hàng, login, signup hệ thống. Nếu dùng HTTP, tát cả gói tin truyền đi đều có thể bị hacker lấy được, đọc được, thậm chí chỉnh sửa gói tin sai lệch, gây ra thảm họa kinh khủng. Tên tài khoản, mật khẩu, ... đều có thể bị đánh cắp.

### Cách phòng tránh
Sử dụng HTTPS bằng cách thêm SSL Certificate. Phần sau mình sẽ giới thiệu về 2 cái này.



## HTTPS - SSL Certificate
### HTTPS = HTTP + Secure
HTTPS, viết tắt của HyperText Transfer Protocol Secure, tức giao thức HTTP an toàn, hay giao thức HTTP có chứng chỉ SSL.

Với HTTPS, các gói tin truyền đi đều được mã hóa, các hacker không thể đọc được gói tin.

HTTPS chủ yếu được sử dụng ở các trang yêu cầu bảo mật thông tin, chẳng hạn chuyển khoản, điều form các thông tin tài khoản, mật khẩu, ...

Tuy nhiên, nên làm HTTPS toàn trang, không nên chỉ làm ở những trang cảnh báo, bởi có khả năng các hacker vẫn có thể khai thác thông tin từ các trang không được sử dụng HTTPS.

### SSL - Secure Socket Layer
Giao thức bảo mật - SSL là viết tắt của từ Secure Sockets Layer. Đây là một tiêu chuẩn an ninh công nghệ toàn cầu tạo ra một liên kết được mã hóa giữa máy chủ web và trình duyệt. Liên kết này đảm bảo tất cả các dữ liệu trao đổi giữa máy chủ web và trình duyệt luôn được bảo mật và an toàn.