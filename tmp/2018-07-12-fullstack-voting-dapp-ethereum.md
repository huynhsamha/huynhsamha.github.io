---
layout: post
title: Full Stack Hello World Voting Ethereum Dapp Tutorial
description: "Full Stack Hello World Voting Ethereum Dapp Tutorial. Lập trình viên web tiếp cận với nền tảng công nghệ Blockchain Ethereum như thế nào? Đây là bài viết hướng dẫn lộ trình tiếp cận Smart Contract trong Ethereum. Ethereum, smart contract là gì? Web Developer phải chấp nhận và tiếp cận với công nghệ này như thế nào? Góc nhìn của web developer về công nghệ blockchain Ethereum."
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




Bài viết này chủ yếu do mình tìm hiểu từ nhiều nguồn trên mạng, đồng thời thử hiện thực một demo đơn giản về nội dung của bài viết này. Nếu có gì sai sót, hy vọng mọi người comment phía dưới.

Lưu ý: Hiện tại bài viết chưa hoàn tất. Mong mọi người thông cảm do mình còn đang khá bận cho những việc khác.

## Chém gió trước khi bước vào hướng dẫn
Trong [bài viết trước](https://huynhsamha.github.io/blockchain/ethereum-for-web-developers), mình đã nói về kiến trúc của nền tảng Ethereum, các khái niệm về dApp (decentrialized applications) khi so sánh với một web app dưới lăng kính của một web developer. Là một developer, cách tốt nhất để học về công nghệ mới là xây dựng những ứng dụng trẻ con, quen thuộc. Đây là series xây dưng một Hello World dApp, cụ thể là Decentrialized Voting Application (ứng dụng bầu cử phi tập trung).

Ứng dụng này cực kì đơn giản, ý tưởng là khởi tạo một nhóm người tham gia gọi là các candidates, và ứng dụng cho phép bất kì ai vote (bầu cử, bỏ phiếu) cho các ứng cử viên (candidates) và thể hiện số lượng vote nhận được của mỗi ứng cử viên. Mục tiêu không chỉ là code được một dapp mà còn tìm hiểu quá trình biên dịch (compile), đưa lên blockchain (deploy) và sử dụng nó.


## Làm được quái gì sau khi thực hiện serie này?
1. Thiết lập môi trường phát triển.
2. Tìm hiểu quá trình viết một smart contract, compile, deploy trên môi trường phát triển.
3. Tương tác với smart contract trên blockchain thông qua Node.JS.
4. Tương tác với smart contract trên nền tảng web, hiển thị số vote và thực hiện vote.

{% include ads.html %}


## Bắt chân làm dapp nào!!!

### Vạn sự khởi đầu nan - Thiết lập môi trường phát triển
Thay vì làm trực tiếp trên blockchain, ta chỉ sử dụng một môi trường blockchain ảo, có thể xem như blockchain simulator (mô phỏng blockchain, tl;dr; nếu bạn từng làm qua Android hay iOS, hay React Native hoặc các framework tương đương, ... chắc hẳn bạn sẽ gặp qua và từng cài và sử dụng Android Emulator hay Genimotion cho các thiết bị máy ảo chạy hệ điều hành Android; hay Xcode Simulator cho các thiết bị iOS. Chém gió tí, đừng đọc - tl;dr;)


Đầu tiên, chúng ta cần cài đặt các [truffle](https://truffleframework.com/docs/truffle/getting-started/installation) và [Ganache](https://truffleframework.com/docs/ganache/quickstart) thông qua npm ở global:
```bash
npm install -g truffle
npm install -g ganache-cli
```

Sau khi cài, chúng ta có thể sử dụng truffle và ganache ở global. Với gọi truffle, nó cho phép ta compile một smart contract viết bằng Solidity thành bytecode trên Ethereum, các tác vụ như migration, interact với contract, hay với MetaMask, cũng như unbox một project có sẵn đã cấu hình các công cụ cần thiết như React, Webpack hay những framework khác. Ngoài ra truffle còn cung cấp các tính năng khác như mình chưa tìm hiểu đống đó nên không dám nói gì thêm. Các bạn có thể tham khảo trong đường dẫn lúc nãy hay ở đây https://truffleframework.com/docs/truffle/getting-started/installation.

Ganache đơn giản chỉ tạo ra một môi trường Ethereum ảo, sinh cho bạn các account từ các private key được sinh ra, ví cũng như quản lý các transaction như một blockchain Ethereum thật. Với môi trường này, bạn có thể chạy test ở local trước khi sử dụng testnet cho việc chạy thật. Dĩ nhiên bạn sẽ không tốn ETH cho các tác vụ vì mọi thứ chỉ là mô phỏng, do đó ETH ở các account đủ dư cho bạn dùng thoải mải.

### Cài MetaMask trên Chrome extensions

### Sử dụng Truffle compile Smart Contract

### Sử dụng web3 tương tác với Smart Contract 

### Sử dụng Test Net với INFURA

[INFURA](https://infura.io/) là một kiến trúc cho phép ta tương tác với mạng Ethereum dễ dàng hơn, ta không cần trở thành một full node trong mạng Ethereum, mà ta sẽ sử dụng API được cung cấp từ INFURA để kết nối với Ethereum. Hiện tại INFURA hỗ trợ trên hầu hết các mạng Ethereum từ Main net tới các Test net (Ropsten, Kovan, Rinkeby).

Bạn vào trang chủ của nó, đăng ký tài khoản, sau đó dẫn vào Dashboard của nó, tạo một project. Với project này, nó cung cấp cho bạn API Key, API Secret, và Endpoint là các mạng bạn cần dùng (main net hay test net). Mỗi option cho bạn một đường dẫn API sử dụng API Key của bạn. Hiện tại API Secret sẽ chưa cần dùng tới, theo như INFURA nói vậy, trường này sẽ được sử dụng trong tương lai. Còn API Key được sử dụng để hình thành URL cho bạn khi tương tác với Ethereum.

<img src="/images/ethereum/infura.png" alt="Infura Snapshot">


### Viết trên Node.JS
#### Quản lý biến môi trường như thế nào?

#### Toàn bộ quy trình cho việc hiện thực

### Viết trên Client

### Conclusion
