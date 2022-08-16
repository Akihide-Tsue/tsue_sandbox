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
    link: 'https://tsue-sandbox.vercel.app/',
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
