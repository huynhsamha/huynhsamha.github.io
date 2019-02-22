---
layout: post
title: How to Install MongoDB on Ubuntu Server 16.04 and 18.04
description: "How to Install MongoDB on Ubuntu Server 16.04 and 18.04"
headline: 
modified: 2018-07-27
category: ubuntu-server
tags: [ubuntu, linux, mongo, community-tutorial]
imagefeature: cover/mongo.jpg
mathjax:
chart:
share: true
comments: true
featured: true
---


How To Install MongoDB on Ubuntu Server 16.04 (or 18.04). This article is quoted from a post at Digital Ocean [here](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04). I write this post to archive the guide for installing MongoDB on my AWS EC2.

In this guide, we will install MongoDB on Ubuntu Server 16.04 (or 18.04)

{% include toc.html %}


## Step 1 — Installing MongoDB

Ubuntu's official package repositories include an up-to-date version of MongoDB, which means we can install the necessary packages using apt.

First, update the packages list to have the most recent version of the repository listings:

```bash
sudo apt update
```

Now install the MongoDB package itself:

```bash
sudo apt install -y mongodb
```

This command installs several packages containing the latest stable version of MongoDB, along with helpful management tools for the MongoDB server. The database server is automatically started after installation.

Next, let's verify that the server is running and works correctly.

## Step 2 — Checking the Service and Database

The installation process started MongoDB automatically, but let's verify that the service is started and that the database is working.

First, check the service's status:

```bash
sudo systemctl status mongodb
```

You'll see this output:



```
Output
● mongodb.service - An object/document-oriented database
   Loaded: loaded (/lib/systemd/system/mongodb.service; enabled; vendor preset: enabled)
   Active: active (running) since Sat 2018-05-26 07:48:04 UTC; 2min 17s ago
     Docs: man:mongod(1)
 Main PID: 2312 (mongod)
    Tasks: 23 (limit: 1153)
   CGroup: /system.slice/mongodb.service
           └─2312 /usr/bin/mongod --unixSocketPrefix=/run/mongodb --config /etc/mongodb.conf
```

## Step 3 — Managing the MongoDB Service

MongoDB installs as a systemd service, which means that you can manage it using standard systemd commands alongside all other sytem services in Ubuntu.

To verify the status of the service, type:

```
sudo systemctl status mongodb
```

You can stop the server anytime by typing:

```
sudo systemctl stop mongodb
```

To start the server when it is stopped, type:

```
sudo systemctl start mongodb
```

You can also restart the server with a single command:

```
sudo systemctl restart mongodb
```

By default, MongoDB is configured to start automatically with the server. If you wish to disable the automatic startup, type:

```
sudo systemctl disable mongodb
```

It's just as easy to enable it again. To do this, use:

```
sudo systemctl enable mongodb
```

Next, let's adjust the firewall settings for our MongoDB installation.


## Step 4 — Using Mongo Shell

Next, we can connect to Mongo Shell by this command:

```
mongo
```

Now, we can use mongo command on shell.

```
show dbs

use [db_name]

show collections

db.[collection_name].find().pretty()

...
```
