---
layout: post
title: How to solve Realtek RTL8723BE weak wifi signal problem in Ubuntu?
description: "How to solve Realtek RTL8723BE weak wifi signal problem in Ubuntu?"
headline:
modified: 2018-06-04
category: os
tags: [ubuntu, linux, RTL8723BE, wifi]
imagefeature: cover/code/006.jpg
mathjax:
chart:
comment: true
share: true
featured: true
highlight: true
---

I'm using Ubuntu 16.04, and I get error with wifi network with weak signal problem from wifi. I had to be depressed with the problem. And I search Google and find a solution for the problem. My laptop is HP, and I run Windows 10, Ubuntu 16.04 and Ubuntu 18.04 in current laptop.

## How to solve Realtek RTL8723BE weak wifi signal problem in Ubuntu?

### Get Information
Please note down wlp number, example, my wlp is wlp13s0
```bash
iwconfig
```

### Download rtlwifi
Download rtlwifi at github https://github.com/lwfinger/rtlwifi_new from master branch by run:
```bash
cd ~/Downloads/

wget https://github.com/lwfinger/rtlwifi_new/archive/master.zip
```

Now, `master.zip` is in `~/Downloads/`

### Installation
```bash
unzip master.zip

cd rtlwifi_new-master/

sudo make install
```

### Configure
```bash
sudo modprobe -rv rtl8723be

sudo modprobe -v rtl8723be ant_sel=2

sudo ip link set wlp13s0 up # change wlp13s0 with your wlp number

sudo iw dev wlp13s0 scan # change wlp13s0 with your wlp number

echo "options rtl8723be ant_sel=2" | sudo tee /etc/modprobe.d/50-rtl8723be.conf
```


## Conclusion

I have shown you how to solve Realtek RTL8723BE weak wifi signal problem in Ubuntu.

Thanks for reading my article! If you have any feedback or criticism, feel free to leave any comment!
