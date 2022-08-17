---
title: 'PWA対応しました'
date: '2022-08-17'
description: 'Next.jsでPWAに対応するための手順と注意点'
image: images/articles/pwa.webp
categories: Tech
draft: false
tag: [Blog]
---

## PWAについて
人は何故PWAに対応したくなるのか...  
それはそこにブログがあるからだ。  

　

というわけでPWAに対応しました。  
ブラウザから"ホーム画面に追加"をすると、ネイティブアプリのように使用できます。

### PWAとは
> プログレッシブWebアプリ（PWA）とは、あたかもモバイルアプリのような見た目と動作をするWebサイトのことです。PWAは、エンドユーザーがアプリストアから、ソフトウェアをローカルにダウンロードする必要がなく、モバイルデバイスのネイティブ機能を活用できるように構築されています。その代わり、PWAは検索エンジンで検索して、ブラウザからすぐにアクセスすることができます。


https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps

## 実装
実装についてはこちらの記事を参考にしました。  
https://zenn.dev/tns_00/articles/next-pwa-install

　

ただし、最新の"next-pwa": "5.5.5",では生成されるsw.jsがpublicフォルダに入らず困っていたところ、  
issueを見つけまして、5.5.4なら問題ありませんでした。  

`yarn upgrade next-pwa@5.5.4`  
https://github.com/shadowwalker/next-pwa/issues/383
