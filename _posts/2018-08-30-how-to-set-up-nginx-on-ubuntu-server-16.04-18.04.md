---
layout: post
title: How To Set Up Nginx on Ubuntu Server 16.04 and 18.04
description: "How To Set Up Nginx on Ubuntu Server 16.04 and 18.04"
headline: 
modified: 2018-08-30
category: ubuntu-server
tags: [ubuntu, linux, nginx, community-tutorial]
imagefeature: cover/nginx.png
mathjax:
chart:
share: true
comments: true
featured: true
---


How To Set Up Nginx on Ubuntu Server 16.04 (or 18.04). This article is quoted from a post at Digital Ocean [here](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-18-04). I write this post to archive the guide for installing and set-up Nginx on my AWS EC2.

Before this tutorial, please install Nginx on your Ubuntu Server with my tutorial [here - How to Install Nginx on Ubuntu Server 16.04 and 18.04](/ubuntu-server/how-to-install-nginx-on-ubuntu-server-16.04-18.04)

In this guide, we will set up Nginx on Ubuntu Server 16.04 (or 18.04)

{% include toc.html %}

## Step 1 - Install Nginx on your Ubuntu server
Please follow my tutorial [here - How to Install Nginx on Ubuntu Server 16.04 and 18.04](/ubuntu-server/how-to-install-nginx-on-ubuntu-server-16.04-18.04) to install Nginx on your Ubuntu Server.

## Step 2 – Setting Up Server Blocks

When using the Nginx web server, server blocks (similar to virtual hosts in Apache) can be used to encapsulate configuration details and host more than one domain from a single server. We will set up a domain called example.com, but you should replace this with your own domain name.

Nginx on Ubuntu 18.04 has one server block enabled by default that is configured to serve documents out of a directory at `/var/www/html`. While this works well for a single site, it can become unwieldy if you are hosting multiple sites. Instead of modifying `/var/www/html`, let's create a directory structure within `/var/www` for our `example.com` site, leaving `/var/www/html` in place as the default directory to be served if a client request doesn't match any other sites.

Create the directory for `example.com` as follows, using the -p flag to create any necessary parent directories:

```
sudo mkdir -p /var/www/example.com/html
```

Next, assign ownership of the directory with the `$USER` environment variable:

```
sudo chown -R $USER:$USER /var/www/example.com/html
```

The permissions of your web roots should be correct if you haven't modified your umask value, but you can make sure by typing:

```
sudo chmod -R 755 /var/www/example.com
```

Next, create a sample index.html page using nano or your favorite editor:

```
nano /var/www/example.com/html/index.html
```


Inside, add the following sample HTML:

```html
<!-- File: /var/www/example.com/html/index.html -->
<html>
    <head>
        <title>Welcome to Example.com!</title>
    </head>
    <body>
        <h1>Success!  The example.com server block is working!</h1>
    </body>
</html>
```

Save and close the file when you are finished.

In order for Nginx to serve this content, it's necessary to create a server block with the correct directives. Instead of modifying the default configuration file directly, let’s make a new one at `/etc/nginx/sites-available/example.com`:

```
sudo nano /etc/nginx/sites-available/example.com
```

Paste in the following configuration block, which is similar to the default, but updated for our new directory and domain name:

```bash
# File /etc/nginx/sites-available/example.com
server {
        listen 80;
        listen [::]:80;

        root /var/www/example.com/html;
        index index.html index.htm index.nginx-debian.html;

        server_name example.com www.example.com;

        location / {
                try_files $uri $uri/ =404;
        }
}
```

Notice that we’ve updated the root configuration to our new directory, and the server_name to our domain name.

Next, let's enable the file by creating a link from it to the **sites-enabled** directory, which Nginx reads from during startup:

```bash
sudo ln -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/
```


Two server blocks are now enabled and configured to respond to requests based on their listen and `server_name` directives:

+ **example.com**: Will respond to requests for example.com and www.example.com.
+ **default**: Will respond to any requests on port 80 that do not match the other two blocks.


To avoid a possible hash bucket memory problem that can arise from adding additional server names, it is necessary to adjust a single value in the `/etc/nginx/nginx.conf` file. Open the file:

```
sudo nano /etc/nginx/nginx.conf
```


Find the **server_names_hash_bucket_size** directive and remove the **#** symbol to **uncomment** the line:


```bash
# /etc/nginx/nginx.conf
...
http {
    ...
    server_names_hash_bucket_size 64;
    ...
}
...
```

Next, test to make sure that there are no syntax errors in any of your Nginx files:

```
sudo nginx -t
```


Save and close the file when you are finished.

If there aren't any problems, restart Nginx to enable your changes:

```
sudo systemctl restart nginx
```


Nginx should now be serving your domain name. You can test this by navigating to http://example.com, where you should see something like this:


## Step 3 – Getting Familiar with Important Nginx Files and Directories

Now that you know how to manage the Nginx service itself, you should take a few minutes to familiarize yourself with a few important directories and files.

### Content

+ **/var/www/html**: The actual web content, which by default only consists of the default Nginx page you saw earlier, is served out of the `/var/www/html` directory. This can be changed by altering Nginx configuration files.


### Server Configuration

+ **/etc/nginx**: The Nginx configuration directory. All of the Nginx configuration files reside here.
`/etc/nginx/nginx.conf`: The main Nginx configuration file. This can be modified to make changes to the Nginx global configuration.
+ **/etc/nginx/sites-available/**: The directory where per-site server blocks can be stored. Nginx will not use the configuration files found in this directory unless they are linked to the **sites-enabled** directory. Typically, all server block configuration is done in this directory, and then enabled by linking to the other directory.
+ **/etc/nginx/sites-enabled/**: The directory where enabled per-site server blocks are stored. Typically, these are created by linking to configuration files found in the sites-available directory.
+ **/etc/nginx/snippets**: This directory contains configuration fragments that can be included elsewhere in the Nginx configuration. Potentially repeatable configuration segments are good candidates for refactoring into snippets.

### Server Logs
+ **/var/log/nginx/access.log**: Every request to your web server is recorded in this log file unless Nginx is configured to do otherwise.
+ **/var/log/nginx/error.log**: Any Nginx errors will be recorded in this log.
