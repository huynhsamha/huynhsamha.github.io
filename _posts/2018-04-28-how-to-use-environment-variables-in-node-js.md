---
layout: post
title: How to use environment variables in Node.js?
description: "Working with environment variables is important in developing, each environment such as development, testing and production uses its own env variables. It also secure the privacy for production on clouds as Heroku, AWS, Azure,..."
headline:
modified: 2018-04-28
category: backend
tags: [Node.js, env, dotenv]
imagefeature: cover/code/003.jpeg
mathjax:
chart:
share: true
comments: true
featured: true
highlight: true
---

Working with environment variables is important in developing, each environment such as development, testing and production uses its own env variables. It also secure the privacy for production on clouds as Heroku, AWS, Azure,...

<!-- /#table-of-contents -->
<section id="table-of-contents" class="toc">
  <header>
    <h3 >Contents</h3>
  </header>
<div id="drawer" markdown="1">
*  Auto generated table of contents
{:toc}
</div>
</section>

# Introduction
As I said, provided that your application need connect to database, you maybe have `username` and `password` for connection. But each environment your team use is different. Everyone in your team uses localhost with own username and password. Or private key, or password for production is privacy, which only someone has and use on cloud or server. So environment variables is neccessary when your team developing application. In this tutorial, I'll introduce you the way to use environment variables in Node.js Application.

# dotenv
> [dotenv](https://github.com/motdotla/dotenv) - Loads environment variables from .env for nodejs projects.

*Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.*

In Node.js Application, we'll use package `dotenv` to connect environment variables.

# Use dotenv in Node.js

## Create simple Node.js project
+ Create directory `node-env`
```bash
mkdir node-env
```
+ Use `npm init` to create simple Node.js with file `package.json`
```bash
npm init
```
+ `package.json` will be such as:
```json
{
    "name": "@sam/node-env",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC"
}
```
+ Create file `index.js`:
```bash
touch index.js
```
+ Edit file `index.js` with:
```js
console.log('Hello Node.js');
```
+ In `package.json`, add start script which run file `index.js`:
```json
{
    "name": "@sam/node-env",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "node index",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC"
}
```
+ Start file `index.js` by:
```bash
npm start
```
+ You will see on terminal
```bash
> node index
Hello Node.js
```

## Install dotenv
```bash
yarn add dotenv

# or use with npm
npm install dotenv --save
```

## Usage
+ In file `index.js`, at the top, require and config `dotenv`:
```js
require('dotenv').config();
```
+ Create file `.env` and add some environment, `dotenv` will load them to `process.env.*`:
```bash
touch .env
```
In file `.env` add some variables:
```bash
USERNAME=huynhsamha
PASSWORD=kjry9bq34vj0394u0349ut02v33v5y
```

+ Edit file `index.js`:

```js
require('dotenv').config();

console.log(process.env.USERNAME);
console.log(process.env.PASSWORD)
```
+ You will see on terminal:
```bash
> node index
huynhsamha
kjry9bq34vj0394u0349ut02v33v5y
```

## Ignore file .env
If you use `git` for your project, file `.env` should not included in repository, in file `.gitignore`, add `.env` to ignore it.
```bash
.env
```
You should use the default file `.gitignore` for Node.js Application at [https://github.com/github/gitignore/blob/master/Node.gitignore](https://github.com/github/gitignore/blob/master/Node.gitignore)



# Conclusion

I have shown you how to use environment variables in Node.js application with `dotenv`.

Thanks for reading my article! If you have any feedback or criticism, feel free to leave any comment!
