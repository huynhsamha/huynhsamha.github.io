---
layout: post
title: How to use Custom Search Engine (CSE) in Node.js with Google API?
description: ""
headline:
modified: 2018-04-16
category: backend
tags: [Custom Search Engine, Node.js, Google APIs]
imagefeature: google-api-cse/cover.png
mathjax:
chart:
share: true
comments: true
featured: true
highlight: true
---

Google Custom Search enables you to create a search engine for your website, your blog, or a collection of websites. You can configure your engine to search both web pages and images. You can fine-tune the ranking, add your own promotions and customize the look and feel of the search results. You can monetize the search by connecting your engine to your Google AdSense account.

This is my [repository](https://github.com/huynhsamha/google-api-cse) for the tutorial on Github

This is my [demo on heroku](http://google-api-cse.herokuapp.com/) for the tutorial.

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

# What is Google Custom Search?
[Google Custom Search](https://developers.google.com/custom-search/) *enables you to create a search engine for your website, your blog, or a collection of websites. You can configure your engine to search both web pages and images. You can fine-tune the ranking, add your own promotions and customize the look and feel of the search results. You can monetize the search by connecting your engine to your Google AdSense account.*

# Step by step to build application using Custom Search

Now I will walk you through the steps to build a Node.js application using the Google Custom Search Engine by the Google API.

## Google APIs Node.js Client
> Google's officially supported Node.js client library for accessing Google APIs. Support for authorization and authentication with OAuth 2.0, API Keys and JWT (Service Tokens) is included. Repository on Github [here](https://github.com/google/google-api-nodejs-client).

Now, with [google-api-nodejs-client](https://github.com/google/google-api-nodejs-client), we can use Google API in Node.js simply.

### Custom Search API
You can see simple example [here](https://github.com/google/google-api-nodejs-client/blob/master/samples/customsearch/customsearch.js)

### How to use?
Now we will use `google-api-nodejs-client` in Node.js application.

#### Quickstart Node.js with express
You can use `express`to create new Node.js application by:

```bash
# Create new Node.js server with engine ejs
express --ejs --git

# Install packages
npm install

# Optional, only for development, linting code by eslint
npm install eslint eslint-config-airbnb --save-dev
```

#### Pakages dotenv and googleapis
Now we also add some package as `dotenv` and `googleapis`. Using `dotenv` to access environment variables by `process.env.*` in Node.js. Using `googleapis` to use Google API.

```bash
npm install dotenv googleapis --save
```

## Google Cloud Console
To use Google API, you should have google api key. Go to [Google Cloud Console](https://console.cloud.google.com/) with your signed in account.

### Create new project

+ Firstly, on Google Cloud Platform, you should create new project. I created project name is `tutorial` and project ID is `tutorial-huynhsamha`.

<img src="/images/google-api-cse/gg_new_project.png" alt="Snapshot Google Cloud new Project">

### Create new Google API Key

+ Next, we also should create new API Key by creating new Credentials on our project. Search in box with keywords `credentials`.

<img src="/images/google-api-cse/gg_search_cred.png" alt="Snapshot Google Cloud search Credentials">

+ Next, in the credentials page that opens, create a Key API

<img src="/images/google-api-cse/gg_create_api.png" alt="Snapshot Google Cloud create Credentials">

+ Then, copy the generated key value to the clipboard

<img src="/images/google-api-cse/gg_api_key_copy.png" alt="Snapshot Google Cloud copy API Key">

+ In the project, create the .env file at the root of the project, creating a new key-value

```bash
GG_API_KEY=nsidfh349jnv9f0923h9rh29
```

+ Create new file `config.js` at the root of the project to export environment variables.

```js
module.exports = {
  ggApiKey: process.env.GG_API_KEY || 'your google api key'
}
```

+ In file `app.js`, at the top, you also require package `dotenv` to bind environment variables to `process.env.*`

```js
// At the top of the file
require('dotenv').config();
// ...
```

### Enable Custom Search API

+ Search on the box with `custom search`, and click to `Custom Search API` to `Enable`

<img src="/images/google-api-cse/gg_search_cse.png" alt="Snapshot Google Cloud search CSE">

<img src="/images/google-api-cse/gg_cse_enable.png" alt="Snapshot Google Cloud enable">


## Create a new Custom Search Engine
Google API only provide our the API Key, you should have a search engine to use with an engine key. Go to [Custom Search](https://cse.google.com/cse/all) to create new and configure something.


<img src="/images/google-api-cse/cse_gg.png" alt="Snapshot CSE">

+ Create new search engine, `Sites to search` you can add some sites (not important). I add site `empty.com`.

<img src="/images/google-api-cse/cse_new.png" alt="Snapshot CSE">

+ After created new search engine, edit the engine. At `Sites to search`, toggle option `Search the entire web but emphasize included sites` and remove `empty.com`. You can add your sites which is priority to emphasize included sites.

<img src="/images/google-api-cse/cse_search_all.png" alt="Snapshot CSE">

+ Image search is optional, if you want response with image urls.

<img src="/images/google-api-cse/cse_img_search.png" alt="Snapshot CSE">

+ View `Details` and click `Search Engine ID` to view your engine id (engine key - `cx`)

<img src="/images/google-api-cse/cse_get_cx.png" alt="Snapshot CSE">


+ Copy this value to file `.env` and export from file `config.js`

In file `.env`:
```bash
GG_API_KEY=nsidfh349jnv9f0923h9rh29
GG_CX=007342834758934646:29kajhsdf8
```

In file `config.js`:
```js
module.exports = {
  ggApiKey: process.env.GG_API_KEY || 'Your google API key',
  ggCx: process.env.GG_CX || 'Your search engine ID'
}
```


## Use Custom Search Google API with Node.js

You can edit files such as my repository on github [here](https://github.com/huynhsamha/google-api-cse). You should edit files

+ File [`routes/index.js`](https://github.com/huynhsamha/google-api-cse/blob/master/routes/index.js)
+ File [`views/index.ejs`](https://github.com/huynhsamha/google-api-cse/blob/master/views/index.ejs)
+ File [`public/stylesheets/style.css`](https://github.com/huynhsamha/google-api-cse/blob/master/public/stylesheets/style.css)
+ File [`public/stylesheets/loader.css`](https://github.com/huynhsamha/google-api-cse/blob/master/public/stylesheets/loader.css)
+ File [`public/javascripts/main.js`](https://github.com/huynhsamha/google-api-cse/blob/master/public/javascripts/main.js)
+ File [`public/favicon.png`](https://github.com/huynhsamha/google-api-cse/blob/master/public/favicon.png)
+ File [`public/images/*.png`](https://github.com/huynhsamha/google-api-cse/tree/master/public/images)


## Start server and view achievement
```bash
npm start
```

<img src="/images/google-api-cse/view1.png" alt="Snapshot View">

<img src="/images/google-api-cse/view2.png" alt="Snapshot View">

<img src="/images/google-api-cse/view3.png" alt="Snapshot View">

## View structure response from API
That is struture response from API

<img src="/images/google-api-cse/search.png" alt="Snapshot res">

<img src="/images/google-api-cse/search_2.png" alt="Snapshot res">

<img src="/images/google-api-cse/res_query.png" alt="Snapshot res">



# Conclusion

I have shown you how to use Custome Search Engine in Node.js application with Google API using `googleapis` and `dotenv`.

Thanks for reading my article! If you have any feedback or criticism, feel free to leave any comment!
