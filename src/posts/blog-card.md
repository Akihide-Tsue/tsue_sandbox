---
title: 'ブログカードの作り方(Next.js編)'
date: '2022-08-15'
description: 'ブログカードの生成って意外と大変。ブログカードの作成手順を解説します。'
image: images/articles/blog_card.webp
categories: Tech
draft: false
tag: [FrontEnd]
---

## ブログカードとは

ブログでよく見かける、カード型のリンクです。  
このブログは Markdown で書いているのですが、  
URL を貼ると、自動で変換されます。

　

テキストのリンクよりおしゃれですよね。  
例えば ↓ こんなやつです。
https://reactnative.dev/

WordPress なんかだとプラグインがあるようですが、Next.js だと中々たいへんでした。

## 実装

リンク先の meta を読み込み、title・description・image を表示します。  
ビルド時にブログカード表示用の情報を取得する必要があり、  
getStaticProps で処理を行います。

#### ブログカードの情報を取得

```js:[slug].tsx
import ReactMarkdown from 'react-markdown';
import BlogCard from '@components/blog_card/BlogCard';
import CodeBlock from '@components/codeblock/CodeBlock';
import matter from 'gray-matter';
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

export const getStaticProps: ({ params, }:{ params: { slug: string }; }) => = async ({ params }) => {
  const file = fs.readFileSync(`src/posts/${params.slug}.md`, 'utf-8');
  const { data, content } = matter(file);

  const lines = content.split('\n');
  const links: string[] | never = [];
  // URLの取得
  lines.map((line) => {
    if (line.indexOf('http://') === 0) links.push(line);
    if (line.indexOf('https://') === 0) links.push(line);
  });
  let cardData = [];

  const temps = await Promise.all(
    links.map(async (link) => {
      const metas = await fetch(link)
        .then((res) => res.text())
        .then((text) => {
          const metaData = {
            url: link,
            title: '',
            description: '',
            image: '',
          };
          const doms = new JSDOM(text);
          const metas: any = doms.window.document.getElementsByTagName('meta');

          // title, description, imageを配列にする
          for (let i = 0; i < metas.length; i++) {
            let pro = metas[i].getAttribute('property');
            if (typeof pro == 'string') {
              if (pro.match('title')) metaData.title = metas[i].getAttribute('content');
              if (pro.match('description')) metaData.description = metas[i].getAttribute('content');
              if (pro.match('image')) metaData.image = metas[i].getAttribute('content');
            }
            pro = metas[i].getAttribute('name');
            if (typeof pro == 'string') {
              if (pro.match('title')) metaData.title = metas[i].getAttribute('content');
              if (pro.match('description')) metaData.description = metas[i].getAttribute('content');
              if (pro.match('image')) metaData.image = metas[i].getAttribute('content');
            }
          }
          return metaData;
        })
        .catch((e) => {
          console.error('error', e);
        });
      return metas;
    }),
  );
  cardData = temps.filter((temp) => temp !== undefined);

  return { props: { frontMatter: data, content, cardData } };
};


const Article: FC<Props> = ({ frontMatter, content, cardData }) => {
  return (
  <ReactMarkdown
    components={{ code: CodeBlock, a: BlogCard }}//ここでBlogCardを呼んでいます！
    className={stylesMarkdown.content}
  />
  )
};
```

#### BlogCard コンポーネントを作成

children として Props を渡せないので、Recoil で state を渡しています。  
詳細のコードは下記をご参照下さい。  
https://github.com/Akihide-Tsue/tsue_sandbox/blob/main/src/components/blog_card/BlogCard.tsx

## おまけ
faviconを取得する関数はこちら。
```js:utils/getFaviconUrl.ts
export function getFaviconUrl(pageUrl: string, size: 32 | 64 = 64) {
  return `http://www.google.com/s2/favicons?domain=${encodeURIComponent(pageUrl)}&size=${size}`;
}
```

　

また、BlogCard に表示する meta 情報のスタイルについて、  
2 行以上だと...で text を省略する css は下記の通りなのですが、  
stylelint が自動で `display: -webkit-box; → display: box;`  
と書き換えており、悩みました。  
`/* stylelint-disable-next-line */` にて解決。

```css:BlogCard.module.scss
.meta_title {
  /* stylelint-disable-next-line */
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: $lines;
}
```
