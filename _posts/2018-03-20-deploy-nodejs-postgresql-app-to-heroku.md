---
layout: post
title: Deploy Node.js with PostgreSQL to Heroku
description: "Heroku allows developers to deploy Node.js app with PostgreSQL database on their platform. This is simple tutorial for deploying a similar application using Node.js and PostgreSQL."
headline:
modified: 2018-03-20
category: backend
tags: [Heroku,Node.js,PostgreSQL,Sequelize,SQL]
imagefeature: cover/pattern/003.png
mathjax:
chart:
share: true
comments: true
featured: true
highlight: true
---

Heroku allows developers to deploy Node.js app with PostgreSQL database on their platform. This is simple tutorial for deploying a similar application using Node.js and PostgreSQL.

This tutorial is used on Linux, my kernel is Ubuntu 16.04.

This is my [repository](https://github.com/huynhsamha/tut-heroku-node-pg) for the tutorial on Github

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

# Working on local machine with Node.js and PostgreSQL
First, we will work with Node.js and PostgreSQL on a local machine environment, before we use the heroku to deploy the app.

## Quickstart Node.js app with express
[Express](https://expressjs.com/) *is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. We can use the package to create node.js app fastly.*

```bash
# Create new directory
mkdir tut-heroku-node-pg
cd tut-heroku-node-pg/

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

## Configure PostgreSQL database
Now, we'll create new PostgreSQL database at local to use. You can use `pgAdmin` (GUI application) to simplify the steps. In tutorial, I used `pgAdmin3`

[pgAdmin](https://www.pgadmin.org/) *is the most popular and feature rich Open Source administration and development platform for PostgreSQL, the most advanced Open Source database in the world.*

* Open `pgAdmin`. If you have existen user, you shouldn't create new user. To create new user, at `Login Roles` choose `New Login Role`. I created new user with username is `tutorial-heroku` and password is `12345`

<img src="/images/heroku-node-pg/create_user.png">

* Create new database by choose `New Database` at `Databases` and create new. I created new database `tutorial-heroku-app` with owner is `tutorial-heroku`

<img src="/images/heroku-node-pg/create_database.png">

* After having new database, we should get some database infomation. You can see host, port at GUI, my host and port is `localhost:5432`
* asdkfakdskjf;ladjflkajds;lk
* Open file `.env` to add the values:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tutorial-heroku-app
DB_USERNAME=tutorial-heroku
DB_PASSWORD=12345
```
* We should also export the values in file `config.js`:
```js
module.exports = {
    secretKey: process.env.SECRET_KEY || 'default secret key',
    db: {
        dialect: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || '5432',
        database: process.env.DB_NAME || 'database',
        username: process.env.DB_USERNAME || 'username',
        password: process.env.DB_PASSWORD || 'password'
    }
}
```


## Connect Node.js to PostgreSQL using sequelize
[Sequelize](http://docs.sequelizejs.com/) *is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.*

```bash
npm install --save pg pg-hstore sequelize
mkdir config
cd config
touch sequelize.js
```

* In file `config/sequelize.js`, we will create new instance of Sequelize and export the instance which is connected to database:

```js
const Sequelize = require('sequelize');
const config = require('../config');

const { database, username, password } = config.db;

const sequelize = new Sequelize(
    database, username, password, config, { timezone: '+07:00' }
);

module.exports = sequelize;
```

## Create database models with sequelize
* Run some commands for initialize models
```bash
mkdir models
touch index.js
touch user.js
touch post.js
```

* In file `user.js`, create new schema with sequelize:

```js
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    password: { type: Sequelize.STRING(1024) }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = User;
```

* In file `post.js`, create new schema with sequelize:

```js
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const Post = sequelize.define('Post', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: { type: Sequelize.STRING },
    content: { type: Sequelize.STRING },
    user_id: { type: Sequelize.INTEGER }
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    timestamps: true,
    underscored: true,
    underscoredAll: true
});

module.exports = Post;
```

* In file `index.js`, import schema models and add relationship between tables:

```js
const Sequelize = require('sequelize');
const sequelize = require('../config/sequelize');

const User = require('./user');
const Post = require('./post');

/** Relationship between Entities */
User.hasMany(Post, { foreignKey: 'user_id', as: 'Posts' });
Post.belongsTo(User, { foreignKey: 'user_id', constraints: false, as: 'user' });

module.exports = {
    sequelize,
    User,
    Post
};
```

* Now we can require sequelize and auto create table and forign key.
* In file `app.js`, add lines

```js
const { sequelize } = require('./models');

/** Connect and config Database */
sequelize.sync()
  .then(() => console.log('PostgresSQL is sync'))
  .catch(err => console.log(err));
```

* Now run `npm start`, we will see

<img src="/images/heroku-node-pg/sequelize_sync.png">

* Open `pgAdmin` and refresh, you can see 2 sequences, 2 tables with foreign key created auto

<img src="/images/heroku-node-pg/sequelize_auto.png">


## Create APIs for models
* Create file `posts.js` in `models`.
* Edit file `routes/users.js` with:

```js
var express = require('express');
var router = express.Router();

const { User } = require('../models');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.findAll({ attributes: { exclude: ['password'] } })
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send(err))
});

module.exports = router;
```

* Edit file `routes/posts.js` with:

```js
var express = require('express');
var router = express.Router();

const { Post, User } = require('../models');

/* GET posts listing. */
router.get('/', function (req, res, next) {
  Post.findAll({
    include: [{ model: User, as: 'user' }]
  })
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
const { sequelize } = require('../models');

sequelize.drop().then(() => {
  console.log('Drop successully'); process.exit(0);
}).catch(err => {
  console.log(err); process.exit(0);
})
```

* In file `fake.js`, edit by

```js
require('dotenv').config();
const async = require('async');
const { sequelize, User, Post } = require('../models');

const users = [];
for (let i = 0; i < 15; i++) {
  users.push({ username: 'username_' + i, password: 'password_' + i });
}

sequelize.sync().then(() => {
  async.eachSeries(users, (user, cb) => {
    User.create(user).then(user => {
      const posts = [];
      const num_posts = Math.floor(Math.random() * 6);
      for (let i = 0; i < num_posts; i++) {
        posts.push({
          title: 'Post ' + i + ' of user ' + user.id,
          content: 'something here',
          user_id: user.id
        });
      }
      async.eachSeries(posts, (post, cb) => {
        Post.create(post).then(post => cb()).catch(err => cb(err));
      }, (err) => cb(err))
    })
      .catch(err => cb(err))
  }, (err) => {
    if (err) {return console.log(err); }
    console.log('Fake successfully');
    process.exit(0);
  });
})
  .catch(err => console.log(err))
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


# Deploy to Heroku with PostgreSQL Cloud
Now we will use heroku to run our node.js, configure the postgresql database on heroku and deploy it.

## Add new Heroku application
* Login or sign up new account on heroku.
* Go to [dashboard heroku](https://dashboard.heroku.com/apps) and create new app

<img src="/images/heroku-node-pg/heroku_create_new_app_click.png">

* Create new app. My app name is `tutorial-node-pg`, therefore, when you can't create new app with similar name, you shold choose another.

<img src="/images/heroku-node-pg/heroku_create_new_app_modal.png">
<img src="/images/heroku-node-pg/heroku_view_1.png">
<img src="/images/heroku-node-pg/heroku_login.png">

* Next, we will use git for local repository and remote to heroku

```bash
heroku login
# at your directory
git init
heroku git:remote -a tutorial-node-pg
# tutorial-node-pg should you app name
```

* Now, we can use git to deploy to heroku by commit and push. Because your local directory is remote to heroku, so in file `.gitignore`, you don't need ignore file `.env` to deploy environment variables to heroku. Therefore, check your file `.gitignore`, if it has line `.env`, you should comment that line before push to heroku. But currently we will not push to heroku because we will configure postgre data on heroku with following instructions


## Add-ons PostgreSQL database on Heroku
* On heroku, choose tab `Resources`, in `Add-ons`, search `Postgre`

<img src="/images/heroku-node-pg/heroku_addons_search.png">

* Click to `Heroku Postgre` option, one pop-up will appear and choose `Plan name` is `Hobby Dev - Free` for free.
* Now heroku has created new database postgreSQL and connect it to you heroku app. You can checkout [https://data.heroku.com/](https://data.heroku.com/) by options on your top-right menu to view your database

<img src="/images/heroku-node-pg/heroku_menu_data.png">

* At your data heroku page, click to your database to view details

<img src="/images/heroku-node-pg/heroku_data_page.png">

* Choose tab `Settings` and click to `View Credentials`

<img src="/images/heroku-node-pg/heroku_credentials.png">

* Now we can copy database credentials and change values in file `.env` in local machine.

<img src="/images/heroku-node-pg/heroku_credentials_2.png">

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

<img src="/images/heroku-node-pg/heroku_page_1.png">

* When click `/users` or `/posts`, you can't see anything, because your database on heroku don't have any. You should add or fake some in your cloud. Now I will do that in following section.


## Add or fake database on PostgreSQL Heroku
You have 2 choices, that is directly on cloud, or run on local and deploy to cloud

### Option 1: Directly on cloud
Simply, you can run `npm run db:fake`, but I don't recommend you do so, because it can not control your data on heroku. The best thing you should do is the 2nd one below I will say.

### Option 2: Remote database PostgreSQL to local
You can see [intructions here](https://devcenter.heroku.com/articles/heroku-postgresql#pg-push-and-pg-pull) or do what I instructed next

#### Pull database postgre from heroku to local
* Open terminal at root project and run
```bash
heroku pg:pull DATABASE_URL heroku_node_pg_local --app tutorial-node-pg
```
with:
  * **DATABASE_URL**: default value for your database
  * **heroku_node_pg_local**: name databse on your local machine
  * **tutorial-node-pg**: name application on heroku


#### Fake data on local machine
Open `pgAdmin` to view your database. Now you can import database by scripts directly on local, or do the other way as:

* Open file `.env` and change your database credentials (comment and add new lines):
```bash
DB_HOST=localhost
DB_PORT=5432
DB_NAME=heroku_node_pg_local
DB_USERNAME=tutorial-heroku
DB_PASSWORD=12345
```

* Now faking data is secure and controllable
```bash
npm run db:fake
```

* Your current cloud data will not have any data, because the current data is local, checked and you still do not see any data
```bash
heroku open
```

#### Push database postgre from local to heroku cloud
* Change file `.env` by uncomment old lines (heroku cloud) and comment new lines (local)
```bash
heroku pg:reset
heroku pg:push heroku_node_pg_local DATABASE_URL --app tutorial-node-pg
```

## Open Heroku App
OK! Now we can view our achievement. Open [https://data.heroku.com](https://data.heroku.com) you will see data available

<img src="/images/heroku-node-pg/heroku_data_all.png">

Open `herokuapp`, you can see data also available
* This `/users`:

<img src="/images/heroku-node-pg/app_users.png">

* This is `/posts`:

<img src="/images/heroku-node-pg/app_posts.png">


# Conclusion

I have shown you how to deploy a node.js app to heroku with the postgresql database, which uses some packages like express, sequelize, dotenv, pgadmin.

Thanks for reading my article! If you have any feedback or criticism, feel free to leave any comment!