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

<script>
  function resizeIframe(obj) {
    obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
  }
</script>

<iframe src="https://www.visualcv.com/huynhsamha/" width="100%" frameborder="0" onload="resizeIframe(this)"></iframe>

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

