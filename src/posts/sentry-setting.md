---
title: 'Sentryの便利Tipsまとめ'
date: '2023-06-10'
description: 'sentry/nextjsでエラー検知を効率化するための方法をまとめています'
image: images/articles/sentry.webp
categories: Tech
isDraft: false
tags: [Tool]
---

## 不要な通知をフィルタリングする

```js:sentry.client.config.js

import * as Sentry from '@sentry/nextjs'

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_ENVIRONMENT = process.env.VERCEL_ENV || process.env.NEXT_PUBLIC_VERCEL_ENV || 'development';

Sentry.init({
  dsn: SENTRY_DSN,

  //デモ環境では100%検知し、本番では10%のみ検知する
  tracesSampleRate: process.env.NEXT_PUBLIC_APP_ENV === 'production' ? 0.1 : 1.0,

  //LINE内のブラウザはwebgl非対応なので、非開発由来由来なエラーが来るため除く
  //https://help2.line.me/linesearchbot/web/pc?lang=ja
  beforeSend(event) {
    if (window.navigator.userAgent.indexOf('Linespider') !== -1) return null;

    return event;
  },

  //開発由来でないエラーをフィルタリングする
  ignoreErrors: [
    'Network Error',
    'Failed to fetch',
    'Load failed',
    'No error message',
    'NotSupportedError',
    'Unexpected token',
    'NotAllowedError',
    'googlefc is not defined',
    'safari-web-extension://',
    'Request aborted',
  ],
});

```

## Breadcrumbsに情報を追加する
```js:ログイン成功後
Sentry.addBreadcrumb({
  category: "auth",
  message: `Login successful. redirectUrl:${redirectUrl}`,//加えたい情報を追加する
  level: "info", //"fatal", "error", "warning", "log", "info", "debug".
});
```
詳細は[公式ドキュメント](https://docs.sentry.io/product/issues/issue-details/breadcrumbs/)参照


## Tagsの情報に追加する
```js:fetchのエラーハンドリング
Sentry.captureException(error, {
  tags: {
    path: router.query.path, //現在アクセスしているURL
    hoge: hoge,
  },
})
```

詳細は[公式ドキュメント](https://docs.sentry.io/platforms/unreal/enriching-events/tags/)参照
