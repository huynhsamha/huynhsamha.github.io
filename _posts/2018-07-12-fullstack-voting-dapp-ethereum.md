---
layout: post
title: Full Stack Hello World Voting Ethereum Dapp Tutorial — Part 1
description: "Full Stack Hello World Voting Ethereum Dapp Tutorial — Part 1. Lập trình viên web tiếp cận với nền tảng công nghệ Blockchain Ethereum như thế nào? Đây là bài viết hướng dẫn lộ trình tiếp cận Smart Contract trong Ethereum. Ethereum, smart contract là gì? Web Developer phải chấp nhận và tiếp cận với công nghệ này như thế nào? Góc nhìn của web developer về công nghệ blockchain Ethereum."
headline:
modified: 2018-07-12
category: blockchain
tags: [blockchain, frontend, decentrialized, dapp, ethereum]
imagefeature: cover/blockchain/007.jpg
mathjax:
chart:
share: true
comments: true
featured: true
highlight: true
---




Bài viết được tham khảo chủ yếu từ [medium](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2) và từ một số kiến thức và quá trình hiện thực của người viết.

## Chém gió trước khi bước vào hướng dẫn
Trong [bài viết trước](https://huynhsamha.github.io/blockchain/ethereum-for-web-developers), mình đã nói về kiến trúc của nền tảng Ethereum, các khái niệm về dApp (decentrialized applications) khi so sánh với một web app dưới lăng kính của một web developer. Là một developer, cách tốt nhất để học về công nghệ mới là xây dựng những ứng dụng trẻ con, quen thuộc. Đây là series xây dưng một Hello World dApp, cụ thể là Decentrialized Voting Application (ứng dụng bầu cử phi tập trung).

Ứng dụng này cực kì đơn giản, ý tưởng là khởi tạo một nhóm người tham gia gọi là các candidates, và ứng dụng cho phép bất kì ai vote (bầu cử, bỏ phiếu) cho các ứng cử viên (candidates) và thể hiện số lượng vote nhận được của mỗi ứng cử viên. Mục tiêu không chỉ là code được một dapp mà còn tìm hiểu quá trình biên dịch (compile), đưa lên blockchain (deploy) và sử dụng nó.

Tác giả của bài viết gốc đã cân nhắc và không sử dụng bất kì một nền tảng (framework) dapp nào để xây dựng ứng dụng demo này, vì anh ta cho rằng việc dùng một framework nào đó sẽ khiến độc giả không hiểu hết được kiến trúc và hệ thống bên trong mà framework đó thực hiện, cũng như khiến ta khá thận trọng và cân nhắc trong việc nâng cấp hoặc chuyển đổi framework.


Xin nhắc lại, đây là bài viết tiếp theo của [bài viết trước](https://huynhsamha.github.io/blockchain/ethereum-for-web-developers). Nếu bạn là lính mới với Ethereum, cảm phiền đọc lại bài trước đó để nắm rõ kiến trúc xây dụng dapp trên Ethereum.

## Làm được quái gì sau khi thực hiện serie này?
1. Thiết lập môi trường phát triển.
2. Tìm hiểu quá trình viết một smart contract, compile, deploy trên môi trường phát triển.
3. Tương tác với smart contract trên blockchain thông qua Node.JS.
4. Tương tác với smart contract trên nền tảng web, hiển thị số vote và thực hiện vote.

Đọc qua chắc mọi người có thể mường tượng tác giả muốn gì. Anh ta sẽ yêu cầu ta thiết lập môi trường phát triển, có thể là môi trường máy ảo Ethereum như bài viết trước (EVM), sau đó viết một smart contract và compile, deploy nó trên môi trường EVM này. Tiếp theo anh ta yêu cầu mình tương tác với smart contract ở bước 3 thông qua Node.JS. Nhưng mục tiêu của ta là xây dụng một dapp đương nhiên không tương tác gì với Node.JS rồi. Vậy dùng node.js ở đây chỉ nhằm mục tiêu test thử thư viện hỗ trợ, như ở bài trước có nói qua có thể là web3.js. Sau đó đến bước 4 mới là xây dụng một web app thực sự, dựng lên frontend cho client dùng.

Đây là hình ảnh trực quan về kiến trúc sẽ xây dựng. Đúng như mình dự đoán :))

<img src="/images/ethereum/voting_dapp.png" />

## Bắt chân làm dapp nào!!!

### Vạn sự khởi đầu nan - Thiết lập môi trường phát triển
Thay vì làm trực tiếp trên blockchain, ta chỉ sử dụng một môi trường blockchain ảo, có thể xem như blockchain simulator (mô phỏng blockchain, tl;dr; nếu bạn từng làm qua Android hay iOS, hay React Native hoặc các framework tương đương, ... chắc hẳn bạn sẽ gặp qua và từng cài và sử dụng Android Emulator hay Genimotion cho các thiết bị máy ảo chạy hệ điều hành Android; hay Xcode Simulator cho các thiết bị iOS. Chém gió tí, đừng đọc - tl;dr;)

