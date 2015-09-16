# twitter-soft-unfollow
A chrome extension that lets you unfollow in a "soft" manner, without really unfollowing

## Motivation

You want to stop seeing tweets from someone, but you don't want to unfollow him because he might get offended.

## Chromestore

This project is in production in the Google Chromestore: https://chrome.google.com/webstore/detail/twitter-soft-unfollow/fneefkpfajhkoimlabgcbhpbpjppceke

## Features

- Unfollowed users are stored using Chrome Storage API
- It relies on some DOM names (such as `.new-tweets-bar`, `.tweet[data-screen-name='foo']` and `.tweet-text`)
- It works when you infinite scroll (bottom) too, using `chrome.webRequest.onCompleted`
- It works with when new tweets appear (top) too, attaching a click event to `.new-tweets-bar`

## Screenshot

![The extension](https://raw.githubusercontent.com/germanger/twitter-soft-unfollow/master/chromestore/promotional-440x280.jpg)