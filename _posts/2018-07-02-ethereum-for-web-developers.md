---
layout: post
title: Ethereum for web developers
description: "Lập trình viên web tiếp cận với nền tảng công nghệ Blockchain Ethereum như thế nào? Đây là bài viết hướng dẫn lộ trình tiếp cận Smart Contract trong Ethereum."
headline:
modified: 2018-07-02
category: blockchain
tags: [blockchain, frontend, decentrialized, dapp, ethereum]
imagefeature: cover/pattern/003.png
mathjax:
chart:
share: true
comments: true
featured: true
highlight: true
---

Bài viết được tham khảo chủ yếu từ [medium](https://medium.com/@mvmurthy/ethereum-for-web-developers-890be23d1d0c) và từ một số kiến thức của người viết.

Nói về nền tảng công nghệ blockchain, ta không thể bỏ qua Ethereum, một nền tảng công nghệ blockchain 2.0 với khái niệm Smart contract được đưa vào, thường được biết là Hợp đồng thông minh. Có rất nhiều nguồn tài liệu về Ethereumm, do đó sẽ khiến nhiều người trở nên choáng, mơ hồ và không nên biết bắt đầu tìm hiểu từ đâu. Trong đó, có nhiều tài liệu đã trở nên lỗi thời, do tốc độ thay đổi chóng mặt của nền tảng này. Nó sẽ khiến ta mất một khoảng thời gian dài để có thể hình dung ra toàn cảnh bức tranh của Ethereum là gì, và cách mà nó hoạt động. Đặc biệt với các lập trình viên web, từ frontend tới backend, đều cần biết và quan tâm đến công nghệ này. Đây là bài viết được giải thích về Ethereum từ lăng kính của một lập trình viên web.

Với kiến thức mà một lập trình viên web có, dù phụ trách ở frontend hay backend, hiện thực từ phía client hay cho đến server, hay phụ trách về database, security, ... ta đều biết về kiến trúc làm việc của một hệ thống client-server như sau:

<img src="/images/ethereum/client_server.png">

Ứng dụng web của bạn được host trên các nhà cung cấp dịch vụ như AWS, Heroku, Azure hay một VPS nào khác. Tất cả client sẽ tương tác với một ứng dụng tập trung, hay một central application. Clients ở đây có thể là một trình duyệt (browser), hay các dòng lệnh từ các ứng dụng khác như lệnh `curl` hay `wget` quen thuộc trên linux hay macos, cũng có thể là các api mà server bạn hỗ trợ được gọi từ đâu đó trên 'quả đất' này. Khi một client thực hiện một request tới server, server sẽ làm mọi thứ, tương tác với database hoặc từ cache, thông qua 4 truy vấn CRUD (create, read, update, delete) quen thuộc mà một RESTful API hỗ trợ. Hay nếu server bạn sử dụng GraphQL, nó sẽ gửi database về cho client select theo cách mà client cần.

Kiến trúc trên làm việc khá tốt trong hầu hết mọi trường hợp. Tuy nhiên, có những úng dụng sẽ thực sự tuyệt vời nếu database là public, và được kết nối một cách bảo mật, an toàn.

Lấy một ví dụ về eBay, nếu bạn là một người bán uy tín, sở hữu hàng trăm đánh giá tốt, nhưng vì một lý do nào đó, eBay xoá tài khoản của bạn. OMG, thật tồi tệ, điều đó có thể ảnh hưởng nghiêm trọng đến doanh nghiệp của bạn. Sẽ thực sự tốt đẹp nếu bạn có thể chuyển tất cả các đánh giá và xếp hạng hiện tại của bạn và di chuyển đến sang một nền tảng khác, chẳng hạn iBay, một đối thủ đang cạnh tranh với eBay, và bạn vẫn giữ được những danh tiếng hiện tại của mình. Hiện tại, eBay là một nhà cung cấp dịch vụ, đóng vai trò là bên thứ ba đáng tin cậy giữa người mua và người bán. Nhưng eBay lấy hoa hồng trong mỗi lần bán hàng. Nếu có một cách để loại bỏ eBay hoàn toàn khỏi cuộc chơi này, tức giao dịch giữa người mua và người bán, thì bạn sẽ tiết kiệm được số hoa hồng đó, giảm được chi phí này. Và càng tuyệt vời hơn khi bạn có quyền truy cập vào tất cả dữ liệu của mình qua lịch sử một cách an toàn, bảo mật, và người khác cũng có thể xem thông tin về độ uy tín của bạn một cách đáng tin, khi mà dữ liệu hoàn toàn không thể xoá sửa bởi bất kì ai trong mạng lưới giao dịch này. Đó chính là điều mà các ứng dụng phi tập trung (decentralized applications) thực hiện. Ethereum làm cho mọi thứ dễ dàng hơn cho bạn để xây dựng Dapps (decentralized applications).

Đây là hình ảnh mô tả kiến trúc của mô hình này:

<img src="/images/ethereum/dapps.png">

Nếu để ý, ta nhận ra mỗi client (ở đây là trình duyệt, browser) chỉ tương tác với ứng dụng trên frontend, tức chỉ giao tiếp thông qua một thể hiện của app, tức code html/css/js được server host trả về cho trình duyệt. Trong quá trình tương tác giữa người dùng và ứng dụng không có sự xuất hiện của server hay cloud nào, không có một máy chủ tập trung cho tất cá client connect tới. Mỗi client giao tiếp với một database trên môi trường máy ảo EVM, một môi trường máy ảo của Ethereum (Ethereum Virtual Machine) bằng cách sử dụng RPC (Remote Procedure Call - lời gọi thủ tục từ xa). Điều này cũng đồng nghĩa với việc mỗi client sẽ cần toàn bộ một bản copy database trên blockchain trên máy của họ (local machine). Nghe thật tồi tệ, tại sao người dùng lại phải tải toàn bộ dữ liệu trên blockchain về máy, lại còn dữ liệu trên blockchain biết bao nhiêu mà máy có thể tải về hết được, lúc người viết (mình) biết về điều này, cũng rất shock và tưởng như mình không thể tiếp cận với công nghệ này, vì máy mình sao mà chịu nổi lượng dữ liệu lớn như vậy chứ. Thật ngớ ngẩn.

Nhưng thật tế, bạn sẽ không cần thật nhiều phần cứng hay RAM để tải toàn bộ dữ liệu trên blockchain về :)). Đọc đến đây là mình thấy mừng rồi, hihi. Có một vài cách giải quyết và tối ưu ứng dụng của bạn vẫn decentrialized nhưng vẫn nhanh chóng và dễ dàng.

Như vậy, thực sự blockchain là gì, nó gồm nhứng gì? Có 2 thứ mà ta cần quan tâm:

1. **Database**: Mỗi giao dịch (transaction) xảy ra trên mạng Ethereum được đóng block và mỗi block được link tới block tiếp theo. Chuỗi liên kết các blocks này được gọi là blockchain. Xét lại ví dụ eBay ở trên, mỗi giao dịch giữa người mua và người bán, bất kể xảy ra hoàn trả hay tranh chấp, đề được ghi lại trong blockchain và mọi người đều có thể nhìn thấy các ghi nhận đó. Để đảm bảo mọi node trong mạng có cùng bản sao dữ liệu (đồng bộ dữ liệu) và bảo đảm không có dữ liệu xấu (invalid data) trên blockchain, Ethereum sử dụng thuật toán Proof of Work (PoW).

2. **Code**: Blockchain cơ bản chỉ dùng để lưu trữ dữ liệu, nơi thực sự tính đúng sai của việc mua, bán, hoàn trả, ... tuỳ theo hoàn cảnh mà diễn ra được lưu trữ trong mã nguồn của ứng dụng, được gọi là hợp đồng thông minh (smart contract hay contract). Trong Ethereum, ngôn ngữ thường được sử dụng để hiện thực các contract trên là Solidity. Sau khi viết hợp đồng bằng Solidity, ta dùng solidity compiler để compile nó thành Ethereum Byte Code và deploy byte code lên blockchain. Ngoài Solidity, còn những ngôn ngữ khác giúp hiện thực smart contract, tuy nhiên đây là ngôn ngữ được sử dụng rộng rãi nhất. Ban đầu người viết cũng tự hỏi viết Smart Contract có thể sử dụng JavaScript không, vì tính quen thuộc và thân thiện với ngôn ngữ này. Tuy nhiên sau khi tìm hiểu về Solidity thì vấn đề đó đã không cần câu trả lời. Bởi vì sự đơn giản Solidity cùng với nét tương đồng giữa nó với JavaScript.


Túm lại, blockchain lưu trữ database và code, ngoài ra chạy code đó trên môi trường máy ảo EVM (Ethereum Virtual Machine).


Để xây dưng một dApp dựa trên nền tảng web, với Ethereum, ta có một thư viện JavaScript giúp ta kết nối tới node blockchain. Thư viện đó là [web3.js](https://github.com/ethereum/web3.js/). Nghe thư viện JavaScript là thấy ngon rồi, chỉ cần import vào dùng Webpack, hay dùng React, Angular, Vue, ... hoặc thậm chí dùng thuần với jQuery :))

Một tính năng quan trọng khác là khả năng tài chính của nền tảng này. Bạn là nghĩ gì khi biết rằng ngay sau khi bạn bắt đầu sử dụng một dApp, bạn sẽ có được một tài khoản ngân hàng? Trên thực tế, không phải một tài khoản ngân hàng, nhưng bạn có thể tạo bao nhiêu tài khoản ngân hàng tùy ý trong vài phần của giây? Các tài khoản ngân hàng này được gọi là ví (wallet) mà bạn lưu trữ tiền (Ether - loại tiền tệ được sử dụng trong hệ sinh thái Ethereum) và giao dịch.

Có rất nhiều điều về các hoạt động diễn ra bên trong của blockchain mà tác giả đã cố tình bỏ qua vì tác giả của bài viết đó muốn tập trung vào Dapp với một webapp centalized. Hy vọng bài viết này hoàn thành điều đó và giúp mọi người có một bức tranh toàn cảnh về Ethereum là gì và nó có thể được sử dụng như thế nào để xây dựng các ứng dụng phi tập trung.


Hiện tại, tác giả của bài viết gốc đã xuất bản 3 bài viết tiếp theo về hướng dẫn xây dựng một fullstack dapp. Mình cũng đã đọc và làm qua, và viết lại cho mọi người tại đây:

+ [Full Stack Hello World Voting Ethereum Dapp Tutorial — Part 1](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-1-40d2d0d807c2)
+ [Full Stack Hello World Voting Ethereum Dapp Tutorial — Part 2](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-2-30b3d335aa1f)
+ [Full Stack Hello World Voting Ethereum Dapp Tutorial — Part 3](https://medium.com/@mvmurthy/full-stack-hello-world-voting-ethereum-dapp-tutorial-part-3-331c2712c9df)


Hy vọng bài viết này sẽ giúp ích cho mọi người.