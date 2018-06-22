---
layout: post
title: How to use ES7 import/export, Async/Await in Node.js?
description: ""
headline:
modified: 2018-05-05
category: backend
tags: [Node.js, Babel.js, Async/Await, ES7]
imagefeature: cover/lang/js.jpg
mathjax:
chart:
share: true
comments: true
featured: true
highlight: true
---

Javascript ES7 syntax allow you use keywords such as `import/export`, `async/await`, which improve ES5, ES6 syntax. But in Node.js is not supported for ES7 syntax. In this tutorial, I'll introduce you `babel.js` to use ES7 syntax.

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
In ES5 syntax, we usually use callback, but make callback hell, such as:

```js
function timer(cb) {
    setTimeout(() => {
        console.log(1);
        setTimeout(() => {
            console.log(2);
            setTimeout(() => {
                console.log(3);
                setTimeout(() => {
                    console.log(4);
                    cb();
                }, 100)
            }, 100);
        }, 100);
    }, 100);
}
timer(() => console.log('Finish'));
```

Output will be:
```bash
1
2
3
4
Finish
```

We can use Promise to prevent callback hell such as:

```js
const timeout = (time) => new Promise((resolve) =>
    setTimeout(() => resolve(), time))

function timer(cb) {
    timeout(100)
        .then(() => {
            console.log(1);
            return timeout(100);
        })
        .then(() => {
            console.log(2);
            return timeout(100);
        })
        .then(() => {
            console.log(3);
            return timeout(100);
        })
        .then(() => {
            console.log(4);
            cb();
        })
        .catch(err => console.log(err))
}

timer(() => console.log('Finish'));
```

The output is similar as above example. But Async/Await will be better than Promise in this example.

# Babel
> [Babel](https://babeljs.io/) - a compiler for writing next generation JavaScript

Babel will allow you use Async/Await and import/export in ES7 syntax in Node.js

# How to use Babel in Node.js
Firstly, we'll create simple node.js project
## Create Node.js project
+ Create directory `node-babel` by `mkdir node-babel`
+ Create npm project by `npm init`
+ Create file `index.js` by `touch index.js`
+ Add start script in `package.json` by line `"start": "node index"`

## Install Babel
```bash
# add babel core
yarn add babel-polyfill babel-register
# or use npm
npm install babel-polyfill babel-register --save

# add es5, es7 syntax
yarn add babel-preset-es2015 babel-preset-es2017
# or use npm
npm install babel-preset-es2015 babel-preset-es2017 --save

# create file .babelrc
touch .babelrc

# create file timeout.js server.js
touch timeout.js server.js
```

File `package.json` will be:
```json
{
  "name": "@sam/node-babel",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "babel-polyfill": "^6.26.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-es2017": "^6.24.1",
    "babel-register": "^6.26.0"
  }
}
```

## Usage with Babel

File `.babelrc` add:
```json
{
    "presets": ["es2015", "es2017"]
}
```

File `index.js` add:

```js
/**
 * Babel ES6, ES7 to ES5
 */
require('babel-register');
require('babel-polyfill');

/**
 * Run server with syntax ES6, ES7
 */
require('./server');
```

File `timeout.js` will export function timeout:
```js
export const timeout = (time) => new Promise((resolve) =>
    setTimeout(() => resolve(), time))
```

File `server.js` will import from `timeout.js` and use async/await:

```js
import { timeout } from './timeout';

async function timer(cb) {
    await timeout(100);
    console.log(1);
    await timeout(100);
    console.log(2);
    await timeout(100);
    console.log(3);
    await timeout(100);
    console.log(4);
    cb();
}

timer(() => console.log('Finish'));
```

Run by `yarn start` or `npm start`. Now you can use import/export and async/await in node.js with babel.js

# Conclusion

I have shown you how to use ES7 syntax with async/await and import/export in Node.js application with `babel`.

Thanks for reading my article! If you have any feedback or criticism, feel free to leave any comment!
