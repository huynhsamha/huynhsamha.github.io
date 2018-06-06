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

You can edit files such as my repository on github [here](https://github.com/huynhsamha/google-api-cse). You should edit files. Or you maybe clone my repository and edit file `.env` with your API Key and Engine Key. The following files should be edited.

+ File [`routes/index.js`](https://github.com/huynhsamha/google-api-cse/blob/master/routes/index.js)
+ File [`views/index.ejs`](https://github.com/huynhsamha/google-api-cse/blob/master/views/index.ejs)
+ File [`public/stylesheets/style.css`](https://github.com/huynhsamha/google-api-cse/blob/master/public/stylesheets/style.css)
+ File [`public/stylesheets/loader.css`](https://github.com/huynhsamha/google-api-cse/blob/master/public/stylesheets/loader.css)
+ File [`public/javascripts/main.js`](https://github.com/huynhsamha/google-api-cse/blob/master/public/javascripts/main.js)
+ File [`public/favicon.png`](https://github.com/huynhsamha/google-api-cse/blob/master/public/favicon.png)
+ File [`public/images/*.png`](https://github.com/huynhsamha/google-api-cse/tree/master/public/images)


## Start server and view achievement
Now, you can start node.js server to view our achievement:

```bash
npm start
```

Browse to `http://localhost:3000`, you can view snapshots:

<img src="/images/google-api-cse/view1.png" alt="Snapshot View">

When we search keywords:

<img src="/images/google-api-cse/view2.png" alt="Snapshot View">

We can go to next page:

<img src="/images/google-api-cse/view3.png" alt="Snapshot View">

## Structure request and response from Google API
Now we will see how to use the api with request and response.

### Request from Google CSE
View file `routes/index.js`, you can see function:

```js
var express = require('express');
const { google } = require('googleapis');
const config = require('../config');

var router = express.Router();
const customsearch = google.customsearch('v1');

router.get('/search', (req, res, next) => {
  const { q, start, num } = req.query;
  console.log(q, start, num);

  customsearch.cse.list({
    auth: config.ggApiKey,
    cx: config.ggCx,
    q, start, num
  })
    .then(result => result.data)
    .then((result) => {
      const { queries, items, searchInformation } = result;

      const page = (queries.request || [])[0] || {};
      const previousPage = (queries.previousPage || [])[0] || {};
      const nextPage = (queries.nextPage || [])[0] || {};

      const data = {
        q,
        totalResults: page.totalResults,
        count: page.count,
        startIndex: page.startIndex,
        nextPage: nextPage.startIndex,
        previousPage: previousPage.startIndex,
        time: searchInformation.searchTime,
        items: items.map(o => ({
          link: o.link,
          title: o.title,
          snippet: o.snippet,
          img: (((o.pagemap || {}).cse_image || {})[0] || {}).src
        }))
      }
      // res.status(200).send(result);
      res.status(200).send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
})
```

+  API with method `GET` in route `/search`, with query `q`, `start` and `num`:
    + `q` : keyword to search.
    + `start` : start index of responses returned.
    + `num` : number of responses returned.
+ To use Custom Search Engine, we need require `customsearch` from `googleapis` package as:

```js
const { google } = require('googleapis');
const customsearch = google.customsearch('v1');
```

+ To search keyword from `customsearch`, we use api:

```js
customsearch.cse.list({
  auth: config.ggApiKey,
  cx: config.ggCx,
  q,
  start,
  num
})
```

+ With:
    + `auth`: Google API Key
    + `cx`: Search Engine Key
    + `q`: keyword to search
    + `start`: start index in responses returned from api
    + `num`: number of responses returned, disallowed greater than `10`, because google only support query at least 1 and not greater than 10.

+ *You can view documents for apis from **google-api-nodejs-client** [here](http://google.github.io/google-api-nodejs-client/modules/_apis_customsearch_v1_.html). And the following lines is links for api schema*
    + [Interface Schema$Query](http://google.github.io/google-api-nodejs-client/interfaces/_apis_customsearch_v1_.schema_query.html)
    + [Interface Schema$Result](http://google.github.io/google-api-nodejs-client/interfaces/_apis_customsearch_v1_.schema_result.html)
    + [Interface Schema$Search](http://google.github.io/google-api-nodejs-client/interfaces/_apis_customsearch_v1_.schema_search.html#queries)

### Response from API, use Postman
We can use `Postman` to visualize the response from Google API of CSE.
+ Firstly, we'll edit file `routes/index.js`, we will edit the file to response all data from api, very simple, you only uncomment line `res.status(200).send(result);` and comment line `res.status(200).send(data);`, the file will be as:

```js
// ...
    .then(result => result.data)
    .then((result) => {
      // ...
           res.status(200).send(result);
      // res.status(200).send(data);
    })
    .catch((err) => {
      // ...
```

+ Open `Postman` and start node server by `npm start`:
+ In `Postman` request to api `localhost:3000/search` with method `GET`. Click to button `Params` after url to add queries (key-value):

<img src="/images/google-api-cse/pm1.png" alt="Postman">

+ Use case `Key` is `q` with `value` is `facebook`, click to `Send` button and we can see data response such as:

<img src="/images/google-api-cse/pm2.png" alt="Postman">

<img src="/images/google-api-cse/pm3.png" alt="Postman">

<img src="/images/google-api-cse/pm4.png" alt="Postman">

In response, we need focus on `url.template`, `queries`, `searchInformation` and `items`:

+ With `url.template`, this is template for request API with query params:

```json
"url": {
        "type": "application/json",
        "template": "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json"
    }
```

+ Some query params:
    + `q={searchTerms}`: required
    + `num={count?}`: optional with `1 <= count <= 10`
    + `start={startIndex?}`: optional
    + `cx={cx?}`: I think it required
    + `sort={sort?}&filter={filter?}`: optional, maybe you need.
    + `siteSearch={siteSearch?}`: optional, maybe you need.
+ Next, we should focus on `queries`:

```json
"queries": {
        "request": [
            {
                "title": "Google Custom Search - facebook",
                "totalResults": "2390000000",
                "searchTerms": "facebook",
                "count": 10,
                "startIndex": 1,
                "inputEncoding": "utf8",
                "outputEncoding": "utf8",
                "safe": "off",
                "cx": "00[your cx]646:3y[your cx]i"
            }
        ],
        "nextPage": [
            {
                "title": "Google Custom Search - facebook",
                "totalResults": "2390000000",
                "searchTerms": "facebook",
                "count": 10,
                "startIndex": 11,
                "inputEncoding": "utf8",
                "outputEncoding": "utf8",
                "safe": "off",
                "cx": "00[your cx]646:3y[your cx]i"
            }
        ]
    }
```

We can see that `queries` includes for `request` (our request), `nextPage` (for next page) and `previousPage` (if `startIndex` is not null or has a valid value). In each, we also have `totalResults`, `count` and `startIndex`.

+ Next is `searchInformation`, which includes `totalResults`, `searchTime`, such as:

```json
    "searchInformation": {
        "searchTime": 0.616142,
        "formattedSearchTime": "0.62",
        "totalResults": "2390000000",
        "formattedTotalResults": "2,390,000,000"
    }
```

+ With `items`, we have array of return value, with `title`, `link`, `snippet`, `thumbnail`, `image`, and other meta data, html formated value, ... Very awesome!

```json
 "items": [
        {
            "kind": "customsearch#result",
            "title": "Facebook - Log In or Sign Up",
            "htmlTitle": "<b>Facebook</b> - Log In or Sign Up",
            "link": "https://www.facebook.com/",
            "displayLink": "www.facebook.com",
            "snippet": "Create an account or log into Facebook. Connect with friends, family and other \npeople you know. Share photos and videos, send messages and get updates.",
            "htmlSnippet": "Create an account or log into <b>Facebook</b>. Connect with friends, family and other <br>\npeople you know. Share photos and videos, send messages and get updates.",
            "cacheId": "QanOc4elti0J",
            "formattedUrl": "https://www.facebook.com/",
            "htmlFormattedUrl": "https://www.<b>facebook</b>.com/",
            "pagemap": {
                "cse_thumbnail": [
                    {
                        "width": "225",
                        "height": "225",
                        "src": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgPFv_EKdJfKACmSpG-i1YdGm6CKbW8vt2RXjOD2QonCGeWe6L6H_2zfY"
                    }
                ],
                "metatags": [
                    {
                        "referrer": "default",
                        "og:site_name": "Facebook",
                        "og:url": "https://www.facebook.com/",
                        "og:image": "https://www.facebook.com/images/fb_icon_325x325.png",
                        "og:locale": "en_US",
                        "og:locale:alternate": "www"
                    }
                ],
                "cse_image": [
                    {
                        "src": "https://www.facebook.com/images/fb_icon_325x325.png"
                    }
                ]
            }
        },
        {
          // ...
```

+ Example for `q`: 'google api nodejs', `start`: 25, `num`: 5

<img src="/images/google-api-cse/pm5.png" alt="Postman">

<img src="/images/google-api-cse/pm6.png" alt="Postman">

<img src="/images/google-api-cse/pm7.png" alt="Postman">

# Conclusion

I have shown you how to use Custome Search Engine in Node.js application with Google API using `googleapis` and `dotenv`.

Thanks for reading my article! If you have any feedback or criticism, feel free to leave any comment!
