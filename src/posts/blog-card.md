---
title: 'ブログカードの作り方(Next.js編)'
date: '2022-08-15'
description: 'ブログカードの生成って意外と大変。ブログカードの作成手順を解説します。'
image: images/articles/blog_card.webp
categories: Tech
draft: false
tag: [Blog]
---

## ブログカードとは

ブログでよく表示されている、カード型のリンクです。  
サンプルで React の Document のリンクを貼ってみます。  
https://beta.reactjs.org/
今回作るまで、意識してきませんでしたがテキストリンクよりおしゃれですよね。  
という訳で実装してみましょう！

## 準備

#### BlogCard コンポーネントを作成

https://github.com/Akihide-Tsue/tsue_sandbox/blob/main/src/components/blog_card/BlogCard.tsx
