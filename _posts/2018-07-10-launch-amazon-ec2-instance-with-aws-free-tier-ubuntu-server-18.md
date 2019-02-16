---
layout: post
title: Launch Amazon EC2 Instance with AWS Free Tier - Ubuntu Server 18.04 LTS
description: "Launch Amazon EC2 Instance with AWS Free Tier - Ubuntu Server 18.04 LTS"
headline: 
modified: 2018-07-10
category: aws
tags: [network, os, aws, ec2, ubuntu, linux, ssh]
imagefeature: cover/aws/aws.png
mathjax:
chart:
share: true
comments: true
featured: true
---


Launch Amazon EC2 Instance with AWS Free Tier - Ubuntu Server 18.04 LTS

# Create an account on AWS

## Preparation

A Credit/Debit Card (VISA, Master Card, JCB, ...) for payment. AWS will charge you 1$ for verification and refund.

A phone number for verification.

## Sign up an account

Sign up a new account on AWS at [AWS Amazon Portal](https://portal.aws.amazon.com/billing/signup?nc2=h_ct&src=header_signup&redirect_url=https%3A%2F%2Faws.amazon.com%2Fregistration-confirmation#/start).

Verify your credit card

Verify your phone number

Await about 24h for activating your account.


# Launch an EC2 instance with AWS Free Tier

Go to AWS Console Management, click to **Service** and choose **EC2**

<img src="/images/aws/i1.png" width="70%">

Next, click to button **Launch Instance**

<img src="/images/aws/i2.png" width="70%">

## Step 1. Choose an Amazon Machine Image (AMI)

At list of machine images, choose *Free tier only*

<img src="/images/aws/i3.png" width="70%">

Find **Ubuntu Server 18.04 LTS**, choose architecture *64-bit* and click **Select**

<img src="/images/aws/i4.png" width="70%">


## Step 2. Choose an Instance Type

Choose **t2.micro** and click **Next: Configure Instance Details**

<img src="/images/aws/i5.png" width="70%">

## Step 3. Configure Instance Details

Edit as the following image and click **Next: Add Storage**

<img src="/images/aws/i6.png" width="70%">


## Step 4. Add Storage

Do no anything and click **Next: Add Tags**

<img src="/images/aws/i7.png" width="70%">

## Step 5. Add Tags

Add your key-value and click **Next: Configure Security Group**

<img src="/images/aws/i8.png" width="70%">

## Step 6. Configure Security Group

Add rules you want to allow specific traffic to reach your instance.

+ SSH with port 22 is default with AWS instance
+ HTTP/HTTPS with port 80/443 for web service

You can also add other ports you want with your firewall.

Next, click **Review and Launch**

<img src="/images/aws/i9.png" width="70%">

## Step 7. Review Instance Launch

Review your instance and launch it.

<img src="/images/aws/i10.png" width="70%">


## Step 8. Create a new key-pair

Choose Create a new key-pair, add your filename (only one filename for your instance, so you should consider to choose a name respectably)

Download this file, backup and store it secretly, you won't get this file again.

<img src="/images/aws/i11.png" width="70%">

Now your EC2 instance is launched successfully. Go to dashboard to manage your instance


# SSH to your instance

Go to console and see your instance (Public IP, Private IP)

Click button **Connect** to see how to SSH to your instance

<img src="/images/aws/i12.png" width="70%">

<img src="/images/aws/i13.png" width="70%">



```bash
ssh -i hariskwong.pem ubuntu@13.58.87.28
```
