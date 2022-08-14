---
title: '動的OGPを導入した話'
date: '2022-08-13'
description: '動的OGPを導入しましたので、その過程です。'
image: images/seo_image.webp
categories: Tech
tag: [SEO]
---

## 準備

M1 Mac には canvas がそのままではインストールできない。
下記のインストールが必要  
`brew install pkg-config cairo pango libpng jpeg giflib librsvg`  
https://github.com/Automattic/node-canvas/issues/1733

Roboto の font はコチラからダウンロード
https://fonts.google.com/specimen/Roboto

Mac で wget コマンドを使えるようにする
`brew install wget`
`sudo port install wget`
https://stackoverflow.com/questions/33886917/how-to-install-wget-in-macos

その後、canvas_lib64 フォルダを生成
`wget https://github.com/jwerre/node-canvas-lambda/raw/master/node12_canvas_lib64_layer.zip`
`unzip -j -d canvas_lib64 node12_canvas_lib64_layer.zip`

参考
https://crieit.net/posts/Vercel-Zeit-Now-Next-js-API-Routes-node-canvas
https://zenn.dev/tiwu_dev/articles/68d58d4ab710af
https://teratail.com/questions/bh4qqnjksxelyd

Vercel のビルドで gyp のエラーが出る
Settings => General => Node.js Version
