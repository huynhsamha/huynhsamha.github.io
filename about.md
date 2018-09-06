---
layout: page
permalink: /about/index.html
title: About me
tags: [huynhsamha, about]
imagefeature: cover/blur/001.jpg
# chart:
---
<!-- <figure>
  <img src="{{ site.url }}/images/huynhsamha.jpg" alt="Avatar of Sam">
  <figcaption>huynhsamha (Sam)</figcaption>
</figure> -->

Coming Soon...

## My Profiles
### My Github
https://github.com/huynhsamha

### My Gitlab
https://gitlab.com/huynhsamha

## My Projects
### Dontpad - Using Node.JS, SocketIO and ReactJS
https://github.com/huynhsamha/dontpad

### js-convert-case - NPM Package
https://github.com/huynhsamha/js-convert-case

### Crypto Webpage with ReactJS
https://github.com/huynhsamha/crypto

### React Configure
https://github.com/huynhsamha/react-configure

### Transport Passenger using Node.JS and PostgreSQL
https://github.com/huynhsamha/transport-passenger

### Google API Custom Search Engine with Node.JS
https://github.com/huynhsamha/google-api-cse

{% assign total_words = 0 %}
{% assign total_readtime = 0 %}
{% assign featuredcount = 0 %}
{% assign statuscount = 0 %}

{% for post in site.posts %}
    {% assign post_words = post.content | strip_html | number_of_words %}
    {% assign readtime = post_words | append: '.0' | divided_by:200 %}
    {% assign total_words = total_words | plus: post_words %}
    {% assign total_readtime = total_readtime | plus: readtime %}
    {% if post.featured %}
    {% assign featuredcount = featuredcount | plus: 1 %}
    {% endif %}
{% endfor %}

