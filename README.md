# Node.js Crawl 

## Overview
Using Node.js to scrape particular wevsite, such as udn news or spotify.
- udn News website : https://udn.com/news/breaknews
- Spotify : https://spotifycharts.com/regional
## Install
```
$ npm install
```

## Getting Start
To use node.js scrape udn News website
```
$ cd crawler
$ node udn_news.js
```
Then, the infromatiom will be stored as json document.

It's included `Title`, `Content`, `URL`, and `Create Time`.

![image](https://github.com/linyiju/nodejs-crawler/blob/master/sample.png)
***Note***
1. `Title`
2. `Content`
3. `Create Time`

## Avaiable Spider
- crawler
    - und_news.js
    - und_crawler_es7.js
    - spotify_crawler_es6.js