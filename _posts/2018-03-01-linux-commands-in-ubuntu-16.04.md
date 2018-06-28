---
layout: post
title: Linux commands in Ubuntu 16.04
description: 
headline: 
modified: 2018-03-01
category: os
tags: [linux, ubuntu]
imagefeature: cover/linux.jpg
mathjax:
chart:
share: true
# comments: true
# featured: true
highlight: true
---

The linux commands in Ubuntu 16.04 I used in studying and development on linux environment.

### Terminal Shortcut

+ Ctrl + Shift + C: copy text from terminal to clipboard
+ Ctrl + Shift + V: paste text from clipboard to terminal
+ Ctrl + A : go to start on line
+ Crrl + E : go to end on line
+ Crtl + Left/Right: jump cursor over words (quick to go to text)
+ Ctrl + W : delete word
+ Ctrl + U : delete all words from start to cursor
+ Ctrl + K : delete all words from cursor to end

### Sudo - superuser do
```bash
sudo
sudo su # make the session is superuser

sudo apt-add-repository -h ((--remove) ppa:.../...)
sudo apt-get update

```

### Clean the APT Cache (And Do It Regularly)
```bash
sudo apt-get clean
```

### Remove Old Kernels (If No Longer Required)
```bash
sudo apt-get autoremove --purge
```

### Remove default games installed
```bash
sudo apt remove aisleriot gnome-mahjongg gnome-mines gnome-sudoku
sudo apt-get clean
sudo apt-get autoremove
```

### Remove libreoffice
```bash
sudo apt-get remove --purge libreoffice*
sudo apt-get clean
sudo apt-get autoremove
```

### Basic statements
```bash
pwd # working directory

### List
ls
ls --help
ls -l # with infomation, permission, volumn
ls -a # all
ls -R # recursive

### Copy
cp *.txt *.cpp ./dir1
cp -r dir1 ./dir2 # from dir 1 to dir 2

### Move - Remove
mv file1 file2 (move + rename)
rm file
rm -r dir # remove recursive

### Other
mkdir dirname
man mkdir # with help
mkdir dir{1..3}  # make dir1, dir2, dir3
touch file{A..C} # make fileA, fileB, fileC

ls -l | wc -l (word counter -lines: count how many lines in output)
ls -l | grep "^d" | wc -l (grep, string match pattern ^d (start with d: dir), ^- is file)
ls -l | grep '^-' -c (count pattern file)
ls | grep cpp (filter cpp)

ls -l # the permission with 3 groups as format --- (9 bits)
	-r # is read, 
	-w # is write, 
	-x # is execute

### grant permission for file, 
chmod 777 ./main.exe # that is 111-111-111
chmod 123 ./main.exe # that is 001-010-011

ls >> a.txt # redirect flow of output to file a.txt
```



### Download via network 
```bash
wget :url
``` 


### Unzip .tar, .deb
```bash
(sudo) dpkg -i *.deb
(sudo) tar -xvzf *.tar.gz
```


### View IP Address:

```bash
ifconfig

iwconfig
```



### Open folder in GUI (Files System)

```bash
nautilus /...
```


### Fix network wifi lose after sleep, suspend
```bash
sudo service network-manager restart
```


### Mount Disk NTFS

```bash
ntfsfix /dev/sda4
```



### Fix system report problem

```bash
sudo rm /var/crash/*
```



### Read/Write permission for hard disk

```bash
cd /media/:username/:your_external_drive
sudo chmod -R -v 777 *
```


