---
title: 'Ngrokが超便利だった件'
date: '2022-08-14'
description: 'Ngrok導入についての解説。フロントエンド開発でローカルを共有する時や、素早くデプロイ無しで実機確認したい時に活躍しそう。'
image: images/articles/ngrok.webp
categories: Tech
draft: false
tag: [Tool]
---

## Ngrok とは

localhost で動いているアプリケーションを、インターネットからアクセスできるように外部公開することができるシステムです。  
[https://ngrok.com](https://ngrok.com/)

下記のようなケースで役立ちそうです。

- スマホ実機でローカル環境を見ながら実装
- 制作中のアプリケーションを共有する
- リモート先のメンバーに確認してもらう

BASIC 認証の設定も可能です。

## Ngrok の導入方法

#### インストール

Homebrew 経由でインストールします。  
`brew install --cask ngrok`

#### サーバーにアクセス

localhost と同じ番号でターミナルに入力しましょう。  
`ngrok http 3000`  
Forwarding 　　　https://xxxxxxxxxxxxx.jp.ngrok.io → http://localhost:3000  
と表示されるのでその URL にアクセス。

#### Ngrok に SignUp

初回時は SignUp が必要なので、登録と実行ファイルのインストールを行う。  
指示に従い token を紐付けすればあとは、**Visit Site** をクリックするとローカル環境が表示されます。  
また、ローカル環境を変更すると即時反映されます！  
すごい！！
