---
title: 'RSS feedを導入した件'
date: '2022-08-16'
description: 'Next.jsで簡単RSS導入'
image: images/articles/rss_feed.webp
categories: Tech
draft: false
tag: [Blog]
---


## RSSについて
ブログと言えばRSS、RSSといえばブログですが、RSSリーダーは何を使ってますか？  
僕は[innoreader](https://jp.inoreader.com/)派です。昔は[feedly](https://feedly.com/)を使っていました。  
技術ブログを読む側としてはRSSに対応していないと萎えるので、早速対応しました。  
フォローよろしくお願いします。

　

![feedlyでの表示例](/images/posts/feedly_sample.webp)

　

それと、markdownをhtmlに変換するライブラリを調べていた所、
[zenn-markdown-html](https://github.com/zenn-dev/zenn-editor#readme)というのがありまして、  
今回はこちらを使用しました。  
次回は、これを使ってブログの目次を表示したいと思います。

## 実装
generatedRssFeedという関数を作ります。

```js:src/lib/feed.ts
import fs from 'fs';

import { Feed } from 'feed';
import matter from 'gray-matter';
import markdownToHtml from 'zenn-markdown-html';

import { metaDescription } from '@constants';

import { FrontMatterType } from 'src/type-def/postsType';

const generatedRssFeed = (): void => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
  const date = new Date();
  // author の情報を書き換える
  const author = {
    name: 'Tsue',
    email: 'akihide.tsue@gmail.com',
    link: process.env.NEXT_PUBLIC_SITE_HOME,
  };

  // デフォルトになる feed の情報
  const feed = new Feed({
    title: "津江's sandbox",
    description: metaDescription,
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    image: `${baseUrl}/favicon.png`, // image には OGP 画像でなくファビコンを指定
    copyright: `All rights reserved ${date.getFullYear()}, ${author.name}`,
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
    },
    author: author,
  });

  const files = fs.readdirSync('src/posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`src/posts/${fileName}`, 'utf-8');
    const { data, content } = matter(fileContent);
    return {
      frontMatter: data as FrontMatterType,
      slug,
      content,
    };
  });

  posts.forEach((post) => {
    // post のプロパティ情報は使用しているオブジェクトの形式に合わせる
    const url = `${baseUrl}/posts/${post.slug}`;
    const content = markdownToHtml(post.content);

    //ドラフトは除く
    if (post.frontMatter.draft === false) {
      feed.addItem({
        title: post.frontMatter.title,
        description: post.frontMatter.description,
        id: url,
        link: url,
        content: content,
        date: new Date(post.frontMatter.date),
      });
    }
  });

  // フィード情報を public/rss 配下にディレクトリを作って保存
  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
};

export default generatedRssFeed;
```
あとは関数をindex.tsxのgetStaticProps内で使うだけでです。

```js:src/pages/index.tsx
import generatedRssFeed from 'src/lib/feed';

export const getStaticProps = () => {
  const files = fs.readdirSync('src/posts');
  const posts = files.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fileContent = fs.readFileSync(`src/posts/${fileName}`, 'utf-8');
    const { data } = matter(fileContent);
    return {
      frontMatter: data,
      slug,
    };
  });

  generatedRssFeed();

  return {
    props: {
      posts
    },
  };
};
```

そうすると、下記の3つのファイルが生成されるので完成です。
<!--TODO MDX対応 URLは環境変数をimport-->
- [/rss/feed.xml](https://tsue-sandbox.vercel.app/rss/feed.xml)
- [/rss/atom.xml](https://tsue-sandbox.vercel.app/rss/atom.xml)
- [/rss/feed.json](https://tsue-sandbox.vercel.app/rss/feed.json)



---
参考記事
- [Next.js に feed を導入して RSS と Atom のフィードを生成しよう](https://fwywd.com/tech/next-feed-rss-atom)