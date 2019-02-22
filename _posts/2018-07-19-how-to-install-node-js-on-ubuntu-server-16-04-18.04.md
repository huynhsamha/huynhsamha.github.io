---
layout: post
title: How To Install Node.js on Ubuntu Server 16.04 and 18.04
description: "How To Install Node.js on Ubuntu Server 16.04 and 18.04"
headline: 
modified: 2018-07-19
category: ubuntu-server
tags: [ubuntu, linux, nodejs, community-tutorial]
imagefeature: cover/nodejs.jpg
mathjax:
chart:
share: true
comments: true
featured: true
---


How To Install Node.js on Ubuntu Server 16.04 (or 18.04). This article is quoted from a post at Digital Ocean [here](https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04). I write this post to archive the guide for installing NodeJS on my AWS EC2.

In this guide, we will set up Node.JS on Ubuntu Server 16.04 (or 18.04) with 2 ways:

{% include toc.html %}

## Installing the Distro-Stable Version for Ubuntu

Ubuntu 16.04 contains a version of Node.js in its default repositories that can be used to provide a consistent experience across multiple systems. At the time of writing, the version in the repositories is 8.10.0. This will not be the latest version, but it should be stable and sufficient for quick experimentation with the language.

To get this version, you can use the `apt` package manager. Refresh your local package index by typing:

```bash
sudo apt update
```

Install Node.js from the repositories:

```bash
sudo apt install nodejs
```

If the package in the repositories suits your needs, this is all you need to do to get set up with Node.js. In most cases, you'll also want to also install npm, the Node.js package manager. You can do this by typing:

```bash
sudo apt install npm
```

This will allow you to install modules and packages to use with Node.js.

Because of a conflict with another package, the executable from the Ubuntu repositories is called nodejs instead of node. Keep this in mind as you are running software.

To check which version of Node.js you have installed after these initial steps, type:

```bash
nodejs -v
```

Once you have established which version of Node.js you have installed from the Ubuntu repositories, you can decide whether or not you would like to work with different versions, package archives, or version managers. Next, we'll discuss these elements, along with more flexible and robust methods of installation.


## Installing Using a PPA

To get a more recent version of Node.js you can add the PPA (personal package archive) maintained by NodeSource. This will have more up-to-date versions of Node.js than the official Ubuntu repositories, and will allow you to choose between Node.js v6.x (supported until April of 2019), Node.js v8.x (the current LTS version, supported until December of 2019), Node.js v10.x (the second current LTS version, supported until April of 2021), and Node.js v11.x (the current release, supported until June 2019).

First, install the PPA in order to get access to its contents. From your home directory, use curl to retrieve the installation script for your preferred version, making sure to replace 10.x with your preferred version string (if different):

```bash
cd ~
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh
```


Run the script under `sudo`:

```
sudo bash nodesource_setup.sh
```

The PPA will be added to your configuration and your local package cache will be updated automatically. After running the setup script from Nodesource, you can install the Node.js package in the same way you did above:

```bash
sudo apt install nodejs
```

To check which version of Node.js you have installed after these initial steps, type:

```bash
nodejs -v
```

Output:

```
v10.14.0
```

The nodejs package contains the nodejs binary as well as npm, so you don't need to install npm separately.

npm uses a configuration file in your home directory to keep track of updates. It will be created the first time you run npm. Execute this command to verify that npm is installed and to create the configuration file:

```bash
npm -v
```

Output:

```
6.4.1
```


In order for some npm packages to work (those that require compiling code from source, for example), you will need to install the build-essential package:

```bash
sudo apt install build-essential
```

You now have the necessary tools to work with `npm` packages that require compiling code from source.
