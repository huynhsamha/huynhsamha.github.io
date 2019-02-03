---
layout: page
permalink: /about/index.html
title: About me
tags: [huynhsamha, about]
imagefeature: cover/blur/001.jpg
---
<!-- <figure>
  <img src="{{ site.url }}/images/huynhsamha.jpg" alt="Avatar of Sam">
  <figcaption>huynhsamha (Sam)</figcaption>
</figure> -->

<iframe src="https://huynhsamha.github.io/assets/resume.pdf" width="100%" height="700px"></iframe>

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

