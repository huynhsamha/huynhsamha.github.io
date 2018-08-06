---
layout: post
title: Deploy Node.js with MongoDB to Heroku using mLab
description: "Heroku allows developers to deploy Node.js app with MongoDB as a plugin on their platform. This is simple tutorial for deploying a similar application using Node.js and MongoDB."
headline:
modified: 2018-04-04
category: backend
tags: [Heroku, Node.js, MongoDB, mLab, Mongoose, NoSQL, Robo 3T]
imagefeature: cover/pattern/001.jpg
mathjax:
chart:
share: true
comments: true
featured: true
highlight: true
---

Heroku allows developers to deploy Node.js app with MongoDB as a plugin on their platform. This is simple tutorial for deploying a similar application using Node.js and MongoDB.

This tutorial is used on Linux, my kernel is Ubuntu 16.04.

This is my [repository](https://github.com/huynhsamha/tut-heroku-node-mongo) for the tutorial on Github

{% include toc.html %}

# Working on local machine with Node.js and MongoDB
First, we will work with Node.js and MongoDB on a local machine environment, before we use the heroku to deploy the app.

## Quickstart Node.js app with express
[Express](https://expressjs.com/) *is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. We can use the package to create node.js app fastly.*

```bash
# Create new directory
mkdir tut-heroku-node-mongo
cd tut-heroku-node-mongo/

# Initialize node.js by Express with view engine is ejs
express --ejs --git

# Install packages
npm install
```

## Environment Variables in Node.js with dotenv
[Dotenv](https://github.com/motdotla/dotenv) *is a zero-dependency module that loads environment variables from a `.env` file into `process.env`. To use environment variables for node.js app, use package `dotenv` and create file `.env` for app.*

```bash
npm install dotenv --save
touch .env
```

* Open file `.env` and add lines formated `key=value` without spaces, example:
```bash
SECRET_KEY=jwor9334bg5
```

* With `dotenv`, now we can access environment variables in file `.env` by `process.env.*`. To access effectively and accurately, we create file `config.js`.
```bash
touch config.js
```

{% include ads.html %}

* In file `config.js`, we export environment variables to use by following lines:
```js
module.exports = {
    secretKey: process.env.SECRET_KEY || 'default secret key'
}
```

* We also have to configure package `dotenv` by require package in `app.js`.
* At the top of file `app.js`, add the following lines
```js
// load environment variables in file .env to process.env.*
require('dotenv').config();
```

## Configure MongoDB database
Now, we'll create new MongoDB database at local to use. This step is very simple. If you're using `Linux` or `MacOS`, maybe you will start `mongodb` by 
```bash
sudo service mongod start
```
If you're using `Window`, maybe you will start `mongodb` by Service Manager.

* Open file `.env` to add the values:
```bash
URI_MONGO=mongodb://localhost/tut-heroku-node-mongo
```
* We should also export the values in file `config.js`:
```js
module.exports = {
    secretKey: process.env.SECRET_KEY || 'default secret key',
    uriMongo: process.env.URI_MONGO || 'mongodb://localhost/tut-heroku-node-mongo'
}
```
For development, you maybe don't need add file `.env` because we have default value for `URI_MONGO` is `localhost`


## Connect Node.js to MongoDB using mongoose
[Mongoose](http://mongoosejs.com/) *provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box. `Mongoose` is ORM for Node.js with Mongodb*


```bash
npm install --save mongoose
```

Connecting to mongodb will be done after creating models by `mongoose`.

## Create database models with mongoose
* Run some commands for initialize models
```bash
mkdir models
touch index.js
touch user.js
touch post.js
```

* In file `user.js`, create new schema with mongoose:

```js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String
});

mongoose.model('User', UserSchema);
```

* In file `post.js`, create new schema with mongoose:

```js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: String,
  content: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Post', PostSchema);
```

* In file `index.js`, import schema models connect to mongodb.

```js
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const config = require('../config');

fs.readdirSync(path.join(__dirname, './')).forEach((file) => {
  if (file.indexOf('index') == -1) {
    require(path.join(__dirname, file));
  }
});

module.exports = new Promise((resolve, reject) => {
  mongoose.connect(config.uriMongo, (err) => {
    if (err) return reject(err);
    console.log('Mongo is connected');
    return resolve();
  });
});
```

{% include ads.html %}

* In file `app.js`, add lines

```js
...
var bodyParser = require('body-parser');

require('./models');

var index = require('./routes/index');
...
```

## Create APIs for models
* Create file `posts.js` in `routes`.
* Edit file `routes/users.js` with:

```js
var express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({}, '-password')
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
});

module.exports = router;
```

* Edit file `routes/posts.js` with:

```js
var express = require('express');
const mongoose = require('mongoose');
const Post = mongoose.model('Post');

var router = express.Router();

/* GET posts listing. */
router.get('/', function (req, res, next) {
  Post.find().populate('user', '-password').exec()
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
});

module.exports = router;
```

* Edit file `app.js` with:

```js
var index = require('./routes/index');
var users = require('./routes/users');
var posts = require('./routes/posts');

app.use('/', index);
app.use('/users', users);
app.use('/posts', posts);
```


## Create scripts for database (drop and fake data)
* To create or drop database quickly, you maybe add some `scripts`.

```bash
mkdir scripts
cd scripts/
touch drop.js
touch fake.js
```

* In file `package.json`, add scripts

```json
{
    "scripts": {
        "start": "node ./bin/www",
        "db:fake": "node scripts/fake",
        "db:drop": "node scripts/drop"
    }
}
```

* Add package `async` to fake data simpler

```bash
npm install async --save
```

* In file `drop.js`, edit by

```js
require('dotenv').config();
const mongoose = require('mongoose');
const config = require('../config');

mongoose.connect(config.uriMongo)
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => { console.log('Drop database OK'); process.exit(0); })
  .catch(err => { console.log(err); process.exit(0); })
```

* In file `fake.js`, edit by

```js
require('dotenv').config();
require('../models');

const async = require('async');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');

const users = [];
for (let i = 0; i < 15; i++) {
  users.push({ username: 'username_' + i, password: 'password_' + i });
}

async.eachSeries(users, (_user, cb) => {
  const user = new User(_user);
  user.save().then(user => {
    const posts = [];
    const num_posts = Math.floor(Math.random() * 6);
    for (let i = 0; i < num_posts; i++) {
      posts.push({
        title: 'Post ' + i + ' of user ' + user.id,
        content: 'something here',
        user: user._id
      });
    }
    async.eachSeries(posts, (_post, cb) => {
      const post = new Post(_post);
      post.save().then(post => cb()).catch(err => cb(err));
    }, (err) => cb(err))
  })
    .catch(err => cb(err))
}, (err) => {
  if (err) { console.log(err); process.exit(0); }
  console.log('Fake successfully');
  process.exit(0);
});
```

* Now we can `fake` or `drop` data by run
```bash
# for drop data
npm run db:drop
# for fake data
npm run db:fake
```

* Edit file `views/index.ejs` by add following lines

```html
<p>View list of users: <a href="/users" target="_blank">/users</a></p>
<p>View list of posts: <a href="/posts" target="_blank">/posts</a></p>
```

* Start server node.js and click 2 url in view to view your data, that will be:
  * [http://localhost:3000/users](http://localhost:3000/users)
  * [http://localhost:3000/posts](http://localhost:3000/posts)


# Deploy to Heroku with MongoDB
Now we will use heroku to run our node.js, configure the MongoDB database on heroku and deploy it.

## Add new Heroku application
* Login or sign up new account on heroku.
* Go to [dashboard heroku](https://dashboard.heroku.com/apps) and create new app

<img src="/images/heroku-node-mongo/heroku_create_new_app_click.png">

* Create new app. My app name is `tutorial-node-mongo`, therefore, when you can't create new app with similar name, you shold choose another.

<img src="/images/heroku-node-mongo/heroku_create_new_app_modal.png">
<img src="/images/heroku-node-mongo/heroku_view_1.png">
<img src="/images/heroku-node-mongo/heroku_login.png">

* Next, we will use git for local repository and remote to heroku

```bash
heroku login
# at your directory
git init
heroku git:remote -a tutorial-node-mongo
# tutorial-node-mongo should you app name
```

* Now, we can use git to deploy to heroku by commit and push. Because your local directory is remote to heroku, so in file `.gitignore`, you don't need ignore file `.env` to deploy environment variables to heroku. Therefore, check your file `.gitignore`, if it has line `.env`, you should comment that line before push to heroku. But currently we will not push to heroku because we will configure postgre data on heroku with following instructions


## MongoDB database with mLab
[mLab](https://mlab.com/) *is a fully managed cloud database service featuring automated provisioning and scaling of MongoDB databases, backup and recovery, 24/7 monitoring and alerting, web-based management tools, and expert support. mLab's Database-as-a-Service platform powers hundreds of thousands of databases across AWS, Azure, and Google and allows developers to focus their attention on product development instead of operations.*

{% include ads.html %}

* Now we should login or sign up new account on [mLab](https://mlab.com/).
* Next, we'll create new database:
* Click to button `Create New`

<img src="/images/heroku-node-mongo/mlab_create_new.png">

* Choose cloud is AWS and plan is SandBox for free

<img src="/images/heroku-node-mongo/mlab_plan.png">

* Choose AWS Region

<img src="/images/heroku-node-mongo/mlab_aws.png">

* Add Database name, I add `tutorial-node-mongo`

<img src="/images/heroku-node-mongo/mlab_dbname.png">

* After new database created, get `MongoDB URI` and add new user by click to button `Add database user`

<img src="/images/heroku-node-mongo/mlab_uri.png">
<img src="/images/heroku-node-mongo/mlab_add_user.png">

<img src="/images/heroku-node-mongo/mlab_user.png">

* Edit file `.env` with new value
```bash
URI_MONGO=mongodb://<dbuser>:<dbpassword>@ds027345.mlab.com:27345/tutorial-node-mongo
```
Change `<dbuser>` and `<dbpassword>` with your user.

* Test at local whether connect to mLab by `npm start`
* Now we can deploy to heroku app by using git commands

```bash
# view changes
git status

# add all changes
git add -A

git commit -m "deploy new app"
# push to remote heroku, branch master
git push heroku master
```

* After commit and push to heroku, heroku auto build packages and start your server node.js. After build successfully, you can view your web herokuapp on your browser by
```bash
heroku open
```

You can see

<img src="/images/heroku-node-mongo/heroku_page.png">

* When click `/users` or `/posts`, you can't see anything, because your database on heroku don't have any. You should add or fake some in your cloud. Now I will do that in following section.


## Add or fake database on mLab
You can run
```bash
npm run db:fake
```

## Remote mLab to local with Robo 3T (Robomongo)
[Robo 3T ](https://robomongo.org/) *Native and cross-platform MongoDB manager, (formerly Robomongo) is the free lightweight GUI for MongoDB enthusiasts. Distributed as a native application, fast and snappy Robo 3T uses very little of your machine resources.*

{% include ads.html %}

* Open `Robo 3T` and add new connection by click on menu or use `Ctrl + N`
* `Name`: optionals, that will be name of connection on UI
* `Address`: In URI mongodb on mLab, get from `@` to `:`, my address is `ds027345.mlab.com` and port is `27345`

<img src="/images/heroku-node-mongo/robo_new_conn.png">

* `Database`: that is your database name on mLab, in URI Mongo, that is after `/` to end. My database is `tutorial-node-mongo`
* `Username` and `Password` is `<dbuser>` and `<dbpassword>` in your URI.

<img src="/images/heroku-node-mongo/robo_new_auth.png">

* Next, click `Test` button to test connection, you will see:

<img src="/images/heroku-node-mongo/robo_test.png">

* Now we can manage database from `mLab` to `Robo 3T`

## Open Heroku App
Open `herokuapp`, you can see data also available
* This `/users`:

<img src="/images/heroku-node-mongo/app_users.png">

* This is `/posts`:

<img src="/images/heroku-node-mongo/app_posts.png">


# Conclusion

I have shown you how to deploy a node.js app to heroku with the MongoDB database on mLab, which uses some packages like express, mongoose, dotenv.

Thanks for reading my article! If you have any feedback or criticism, feel free to leave any comment!
