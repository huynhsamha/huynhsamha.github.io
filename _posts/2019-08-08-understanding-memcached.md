---
layout: post
title: Understanding Memcached
description: "Understanding Memcached"
headline: 
modified: 2019-08-08
category: memcached
tags: [memcached, backend, database, cache]
imagefeature: cover/pattern/003.png
mathjax:
chart:
comments: true
featured: true
share: true
---

Understanding Memcached - Tìm hiểu về Memcached, các nguyên tắc hoạt động ở memcached client, memcached server, các khái niệm Consistent Hashing, Slab Allocation, cách hiện thực LRU và Hash Table trong memcached server

{% include toc.html %}

## Overview

Memcached là hệ thống caching dữ liệu phân tán, lưu trữ trên memory dạng key - value.

Dữ liệu lưu trữ dạng key-value với key là string, value là một object (serializable)

Usecases: lưu các API calls, database calls, page rendering, ...

### Features

Một số đặc điểm trong memcached

+ Xử lý tốt vấn đề phân mảnh vùng nhớ (memory fragments), quản lý vùng nhớ hiệu quả.
+ Có khả năng phân tán độc lập các memcached server.
+ Giao tiếp từ 2 phía client và server riêng biệt.

### Design Philosophy

Các nguyên tắc trong thiết kế của Memcached:

+ Key-Value dạng đơn giản, với key là string, value có thể đc serialized
+ Half in Client, Half in Server:
  + client chọn server để lưu trữ dựa trên key qua hàm hash và danh sách các servers
  + server chỉ quản lý các giá trị được lưu trữ và quản lý vùng nhớ của nó
+ Servers trong memcached là disconnected: no crosstalk, no syncronization, no broadcasting, no replication
+ Forgetting is a Feature: dùng LRU, expiration time. Không dùng garbage collector đảm bảo độ trễ thấp, sử dụng lazy deletion.

## Detail

### Memcached Client

+ Các clients cần có cùng config về list các servers memcached, kể cả số lượng và thứ tự các servers. Về cơ bản, mỗi client dựa trên giá trị key, sử dụng hàm hash hợp lý, lấy module cho số lượng server để tìm index của server đảm nhận key đó.


#### Consistent Hashing

Memcached client quyết định server nào được chọn cho mỗi giá trị key thông qua hàm hash, dựa trên giá trị mod cho số servers hiện active. Do đó, khi có việc thêm/bớt server memcached dẫn đến các giá trị key bị remapped trội lên, gây cache miss, nên cần sử dụng Consistent Hashing để giảm bớt việc shift các servers khi xảy ra việc thêm/bớt memcached server.

Consistent Hashing là kỹ thuật map mỗi key đến giá trị không phụ thuộc vào số lượng servers biết trước, tránh sử dụng phép module khi kích thước N bị thay đổi.

Kỹ thuật này đưa vùng không gian giá trị khóa key lên 1 vòng tròn, map mỗi giá trị đến điểm gần nó nhất theo hướng ngược chiều kim đồng hồ như hình dưới đây:

<img width="65%" src="/images/memcached/consistent_hashing_1.png" />

<img width="30%" src="/images/memcached/consistent_hashing_2.png" />

Như hình trên, các giá trị hash của các khóa được map lên một điểm trên vòng tròn.

Trong `spymemcached-2.12.0`, khi khởi tạo một memcached client (`mcc`), cho phép ta config `ConnectionFactory`, hoặc sử dụng `DefaultConnectionFactory` của thư viện.

Mặc định `DefaultConnectionFactory` sử dụng `ArrayModNodeLocator`, một implementation của `NodeLocator` sử dụng lookup dựa trên module của hash code trên length của list server.

<img width="60%" src="/images/memcached/mcc_01.png" />

<img width="60%" src="/images/memcached/mcc_02.png" />

Ngoài ra, `spymemcached-2.12.0` cũng hỗ trợ `KetamaConnectionFactory`, hiện thực từ `DefaultConnectionFactory` sử dụng `KetamaNodeLocator` và hàm hash Ketama cho Consistent Hashing.

<img width="60%" src="/images/memcached/mcc_03.png" />

<img width="60%" src="/images/memcached/mcc_04.png" />

#### Failover

Vấn đề failover khi xảy ra crash server, client sẽ loop next trên server list đến khi tìm thấy server nào còn active và map key hiện tại cho server này.

#### Compression

Memcached client hỗ trợ cho phép enable hoặc disable compression dựa trên threshold cho item size.

### Memcached Server

+ Multiple Instances: Memcached là một distributed servers, do đó có thể start nhiều instance trên cùng 1 host hoặc nhiều host.
+ Networking: hỗ trợ TCP và UDP
+ Connection limit và Threading.

#### Slab Allocation

Memcached server quản lý memory sử dụng `slab allocator` tránh phân mảnh vùng nhớ. Triết lý của kỹ thuật này là phân đoạn các vùng nhớ đã cấp phát thành các chunks với size được định ra trước đó.

Ví dụ khi start memcached instance, với option `-vv`, ta sẽ thấy được các slab class được memcached phân đoạn như sau:

```bash
memcached -p 11112 -vv
slab class   1: chunk size        96 perslab   10922
slab class   2: chunk size       120 perslab    8738
slab class   3: chunk size       152 perslab    6898
slab class   4: chunk size       192 perslab    5461
slab class   5: chunk size       240 perslab    4369
slab class   6: chunk size       304 perslab    3449
slab class   7: chunk size       384 perslab    2730
slab class   8: chunk size       480 perslab    2184
slab class   9: chunk size       600 perslab    1747
slab class  10: chunk size       752 perslab    1394
slab class  11: chunk size       944 perslab    1110
slab class  12: chunk size      1184 perslab     885
slab class  13: chunk size      1480 perslab     708
slab class  14: chunk size      1856 perslab     564
slab class  15: chunk size      2320 perslab     451
slab class  16: chunk size      2904 perslab     361
slab class  17: chunk size      3632 perslab     288
slab class  18: chunk size      4544 perslab     230
slab class  19: chunk size      5680 perslab     184
slab class  20: chunk size      7104 perslab     147
slab class  21: chunk size      8880 perslab     118
slab class  22: chunk size     11104 perslab      94
slab class  23: chunk size     13880 perslab      75
slab class  24: chunk size     17352 perslab      60
slab class  25: chunk size     21696 perslab      48
slab class  26: chunk size     27120 perslab      38
slab class  27: chunk size     33904 perslab      30
slab class  28: chunk size     42384 perslab      24
slab class  29: chunk size     52984 perslab      19
slab class  30: chunk size     66232 perslab      15
slab class  31: chunk size     82792 perslab      12
slab class  32: chunk size    103496 perslab      10
slab class  33: chunk size    129376 perslab       8
slab class  34: chunk size    161720 perslab       6
slab class  35: chunk size    202152 perslab       5
slab class  36: chunk size    252696 perslab       4
slab class  37: chunk size    315872 perslab       3
slab class  38: chunk size    394840 perslab       2
slab class  39: chunk size    524288 perslab       2
```

Khi start memcached, có 39 slab class được tạo, với kích thước chunk size ở mỗi slab class tăng dần, chunk size càng lớn, số slot trong slab class càng giảm. Một Slab class là group của các chunks có cùng chunk size, mỗi chunk được gọi là slot, là đơn vị nhỏ nhất để lưu data.

**Growth Factor** là hệ số nhân cho kích thước các slab class kế tiếp, trong instance memcached được start như trên thì Growth Factor là `1.25`: (`120/96 = 1.25 | 152/120 ~ 1.25 | 192/152 ~ 1.25 | 240/192 = 1.25 | bla bla`)

Đây là những config mặc định của memcached về slab class:

<img width="51%" src="/images/memcached/settings_01.png" />

<img width="51%" src="/images/memcached/settings_02.png" />

Mặc định `growth factor` là **1.25**, 1 slab class có size là `1MB` (`slab_page_size`), từ chunk size sau khi nhân growth factor, dựa trên slab class size, cấp phát số chunks trong slab class đó. Và 1 slab class yêu cầu tối thiểu `2` chunks.

Có thể mô tả các slab class như hình dưới đây:

<img width="40%" src="/images/memcached/slab_arch.png" />

Khi nhận được một record, memcached sẽ chọn ra một slab class fit với size của record này, sau đó tìm trong các slots trống để sử dụng slot đó cho record, nếu data nào bị expired hoặc deleted, slot đó được nhả lại idle slots.

==> memcached quản lý vùng nhớ hiệu quả, linh động, không gây memory fragments.

==> nhược điểm gây dư thừa vùng nhớ không dùng trong mỗi chunk được dùng.

<img width="20%" src="/images/memcached/space_waste.png" />

##### Item in Memcached

Trong memcached, mỗi records key-value được lưu trữ thành 1 `item` như sau:

<img width="50%" src="/images/memcached/item_structure.png" />

Mỗi item được lưu trữ dạng con trỏ, lưu trữ con trỏ tiếp theo trong chuỗi `hash chain` (chain lưu trữ các item có cùng hash value, xử lý collision trong hash table).

Ngoài các thông tin về key, value, còn có thông tin time (expired, access), ...

Mỗi item khi được lưu vào trong chunk của slab class, được record thành `item_chunk` và size của item được gọi là `header` và được tính trước khi tìm ra slab class tương ứng:

<img width="51%" src="/images/memcached/item_chunk_structure.png" />

<img width="51%" src="/images/memcached/header_item_size.png" />

##### Slab Class Structure

Đây là slab class structure trong memcached

<img width="51%" src="/images/memcached/slab_001.png" />

Mỗi slabclass gồm chunk size, số slab, list các slots, ...

#### LRU Cache vs Hash Table

##### Implementation

Mỗi slab class có một doubly linked list riêng để hiện thực LRU. Ngoài `head`, `tail`, còn các giá trị `stats` về `sizes`, storage size (`sizes_bytes`)

<img width="30%" src="/images/memcached/slab_class_lru.png" />

Memcached sử dụng một main hash table để lưu trữ các item. Khi lượng item vượt quá 3/2 số bucket trong main hash table, memcached sẽ expand hash table.

<img width="40%" src="/images/memcached/hash_table.png" />

<img width="32%" src="/images/memcached/expanding.png" />

Khi thực hiện expand, một maintaner thread start để chia lại các entry trong hash table. Memcached đồng thời lưu trữ 2 bảng băm cho các quá trình update hash table.

Trong quá trình tìm kiếm, dựa trên giá trị key và giá trị hash của item header, tìm đến con trỏ đầu tiên trên bảng băm và thực hiện duyệt linked list để tìm ra item:

<img width="48%" src="/images/memcached/search_item_in_hashtable.png" />

Do mỗi item trong memcached được lưu trữ dạng pointer trên cả hash table lẫn linked list, do đó các thao tác update lại linkedlist khi thêm phần tử mới, xóa 1 phần tử và update lại LRU state đều chỉ tốn time `O(1)` - Dựa trên hash table, để tìm ra chuỗi hash collision của item đó, tìm item trên chain này được 1 pointer nên dễ dàng update lại linkedlist trong O(1).

Do đó độ phức tạp thực chất xảy ra khi có collision trên hash table. Tuy nhiên Memcached cải thiện điều này bằng việc expand bảng băm khi lượng items vượt quá 3/2 số bucket trên hash table nhằm giảm việc đụng độ các giá trị hash.

<img width="51%" src="/images/memcached/hash_lru.png" />

Ngoài việc sử dụng expanding hash table, memcached còn thêm 1 trick nhỏ trong quá trình update lại LRU khi 1 lượng items thường xuyên được accessed liên tục, tránh update lại top các items đầu trong linkedlist. Mỗi item đều được lưu trữ time accessed gần nhất, tuy nhiên giá trị này chỉ được update sau 1 interval time mà memcached định ra (`60s`), do đó chỉ sau 1 khoảng thời gian đủ lâu thì item này mới thực sự update lại trạng thái accessed:

<img width="51%" src="/images/memcached/item_update_interval.png" />

<img width="51%" src="/images/memcached/do_item_update.png" />

##### Compare with LRU in Kyoto Cabinet

So sánh với Kyoto Cabinet khi hiện thực LRU, Kyoto Cabinet lưu trữ hash table lẫn doubly linked list đều dùng các thư viện của C++ (`vector`, `unorderd_map`), đồng thời không sử dụng pointer để lưu các record, nên có thời gian kém hơn so với memcached, tốn `O(N)` cho các tác vụ update lại LRU (do cần duyệt trên linkedlist để tìm ra record tương ứng, trong khi memcached là pointer).

##### Segmented LRU (sub-LRU)

Memcached chia LRU thành 4 tầng (gọi là sub-LRU) { HOT, WARM, COLD, TEMP }, thực hiện delay việc update lại item khi item được read. Mỗi sub có mutex lock riêng.

Mỗi item trong memcached có 2 bit thể hiện mức độ active của nó:

+ FETCHED: nếu item được request 1 lần
+ ACTIVE: nếu item được accessed lần thứ 2.

Các trạng thái của item:

<img width="25%" src="/images/memcached/sub_lru-states.png" />

<img width="30%" src="/images/memcached/settings_03.png" />

**Descriptions**:

| **Field**               | **Comments**                                |
| ----------------------- | ------------------------------------------- |
| **lru_crawler_sleep**   | Microsecond sleep between items             |
| **lru_crawler_tocrawl** | Number of items to crawl per run            |
| **crawls_persleep**     | Number of LRU crawls to run before sleeping |
| **hot_lru_pct**         | percentage of slab space for HOT_LRU        |
| **warm_lru_pct**        | percentage of slab space for WARM_LRU       |
| **hot_max_factor**      | HOT tail age relative to COLD tail          |
| **warm_max_factor**     | WARM tail age relative to COLD tail         |
| **temp_lru**            | TTL < temporary_ttl uses TEMP_LRU           |
| **temporary_ttl**       | temporary LRU threshold                     |


**HOT**: nếu item tới threshold của HOT, sẽ bị moved sang WARM (`3`) hoặc COLD (`5`) tùy theo đang *ACTIVE* hay không.

**WARM**: chỉ những items được accessed tối thiểu 2 lần mới có cơ hội nằm trong WARM. nếu item tới threshold của WARM sẽ được moved lên head của WARM (`4`) nếu đang *ACTIVE*, ngược lại bị đẩy xuống COLD (`7`)

**COLD**: chứa các inative items, theo đường `5` với `7` từ HOT và WARM. Khi 1 item được active, nó sẽ được moved lên WARM (`6`)

**TEMP**: chứa các item có TTL cực ngắn.

Trong khi alloc cho item, việc lựa chọn 1 sub-LRU dựa trên thời gian TTL của item đó có đủ lâu để đưa vào HOT không:

<img width="48%" src="/images/memcached/alloc_sub_lru.png" />

##### LRU Threads in segmented LRU

Memcached sử dụng 2 threads để duy trì trạng thái LRU của các items, 1 là `lru maintainer` và 1 thread `lru cralwer`

`lru maintainer` thực hiện sắp xếp các items giữa các sub-lru (hot|warn|cold|temp)

`lru cralwer` thực hiện đào thải các item expired hoặc invalid. Default thread này được start in background.

###### LRU Maintainer Thread

Jobs:
+ duyệt các sub-LRU, check các tail items
+ đảm bảo các sub-LRU work, thực hiện moved các items
+ reclaim các expired *tail* items

###### LRU Crawler Thread

Giải quyết các items bị expired nhưng ko được accessed để evict. Chạy async để reclaim *tất cả* expired items.

<img width="16%" src="/images/memcached/lru_crawler.png" />











#### External Storage

External Storage (`extstore`) là một mở rộng cho memcached, hash table và các keys được lưu trên memory, trong khi values được lưu trong bộ nhớ bên ngoài.

**When to use this?**

> If you only have one or two memcached instances, you probably don't need this.

Khi values được lưu trữ có kích thước lớn và TTL đủ lớn, nên sử dụng extstore để tiết kiệm RAM trên cloud.


##### Implementation

So với khi không sử dụng external storage, extstore sử dụng 2 thread `storage` và `compactation`. Về chức năng:

+ `storage thread` tương tự `lru maintainer`, thực hiện check các tail items trên các slab class.
+ `compactation thread` ...


Cách 1 tail item được đưa vào extstore:

+ alloc new small item
+ lưu trữ các meta của item khi đc đưa ra extstore, gồm `page_version`, `offset` và `page_id`
+ Thay thế value của item thành thông tin item trên hardware (`item_hdr`)

<img width="48%" src="/images/memcached/extstore_meta.png" />




Một số thông số quyết định item có được đưa ra external storage hay không: item đủ lớn, item exist lâu, item sống lâu:



```
unsigned int ext_item_size;  /* minimum size of items to store externally */
unsigned int ext_item_age;   /* max age of tail item before storing ext. */
unsigned int ext_low_ttl;    /* remaining TTL below this uses own pages */
```


Các giá trị default mặc định:


```
settings.ext_item_size  = 512;
settings.ext_item_age   = UINT_MAX; // Maximum value an `unsigned int' can hold
settings.ext_low_ttl    = 0;
```

Để đưa item ra external storage, cần item tối thiểu 512 bytes, đồng thời cần set `ext_item_age` đủ nhỏ (chờ cho age của item đủ lớn sẽ được flush ra ngoài storage).

Có thể start memcached instance như sau:


```bash
memcached -p 11111 -o ext_item_age=1,ext_path=/home/abc/datafile:1G -vv
```

## References

+ [Memcached Wiki](https://github.com/memcached/memcached/wiki)
+ [Understanding The Memcached Source Code](https://holmeshe.me/categories/Memcached-Source-Code/)
+ [Consistent Hashing in Distributed Caches](https://www.toptal.com/big-data/consistent-hashing)
+ [Redis vs Memcached](https://medium.com/@Alibaba_Cloud/redis-vs-memcached-in-memory-data-storage-systems-3395279b0941)
+ [Memcached vs MySQL](https://mahmudahsan.files.wordpress.com/2009/02/mysql_wp_memcached.pdf)
+ [Modern LRU in Memcached](https://memcached.org/blog/modern-lru/)
+ [External Storage in Memcached](https://github.com/memcached/memcached/wiki/Extstore)
