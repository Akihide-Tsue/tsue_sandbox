---
title: 'ESLintの設定まとめ'
date: '2023-06-18'
description: 'チーム開発に必須なESLintについての説明です。eslintrcのサンプルについて内容を解説しています。'
image: images/articles/ESLint.webp
categories: Tech
isDraft: false
tags: [ESLint]
---

## 設定内容
業務委託先で見た`.eslintrc`が良かったので一部このブログにも取り入れました。  
初期に入れないとリファクタリングが辛い。

```json:.eslintrc.json
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json"
  },
  "plugins": ["@typescript-eslint", "unused-imports"],
  "extends": [
    "eslint:recommended",
    "next",
    "next/core-web-vitals",
    "plugin:jsx-a11y/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier"
  ],
  "ignorePatterns": ["*.config.js"],
  "rules": {
    "@next/next/no-img-element": "off",
    "@next/next/no-html-link-for-pages": "off",
    "unused-imports/no-unused-imports-ts": "warn",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/restrict-template-expressions": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    //importの制限
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          {
            "group": ["./*", "!./*.scss"], //groupは2つ必要
            "group": ["./*", "../*", "!./*.scss"],
            "message": "scssファイル以外の相対パスを使用したimportは禁止です！"
          }
        ]
      }
    ],
    // enumの使用をエラーにする(ユニオン型を推奨)
    "no-restricted-syntax": ["error", { "selector": "TSEnumDeclaration", "message": "Don't declare enums" }],
    // 変数宣言と return 周辺を改行必須に
    "padding-line-between-statements": [
      "error",
      { "blankLine": "always", "prev": ["const", "let", "var"], "next": "*" },
      { "blankLine": "any", "prev": ["const", "let", "var"], "next": ["const", "let", "var"] },
      { "blankLine": "always", "prev": "*", "next": "return" }
    ],
    // コールバック関数は必ずarrow-functionにする
    "prefer-arrow-callback": "error",
    // function宣言はエラー
    "func-style": "error",
    // arrow-functionの記法
    "arrow-body-style": "off",
    // prop types を使っていないので off
    "react/prop-types": "off",
    // Next.js では React を import しなくてもよいので off にする
    "react/react-in-jsx-scope": "off",
    // React Hooks のための設定
    "react-hooks/rules-of-hooks": "error",
    // hooksの依存配列に空配列を許容する
    "react-hooks/exhaustive-deps": "warn",
    // 明示的なanyは許容する
    "@typescript-eslint/no-explicit-any": "off",
    // 型は明示的にtype-importする
    "@typescript-eslint/consistent-type-imports": ["warn", { "prefer": "type-imports" }],
    // unused-imports/no-unused-varsと競合するためoff
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    // 未使用の変数がある場合エラーにする（デフォルトは warning）
    "unused-imports/no-unused-vars": ["error", { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }],
    // next/linkのchildのaタグの空hrefを許容する
    "jsx-a11y/anchor-is-valid": "off",
    // 命名に関するルール
    "@typescript-eslint/naming-convention": [
      "error",
      { "selector": ["typeAlias", "typeParameter"], "format": ["PascalCase"] },
      { "selector": ["property", "parameterProperty", "method"], "format": ["camelCase"] },
      {
        "selector": ["variable"],
        "types": ["boolean"],
        "format": ["PascalCase"],
        "prefix": ["is", "has", "should", "can"]
      },
      {
        "selector": ["variable"],
        "types": ["string", "number", "array"],
        "modifiers": ["const"],
        "format": ["camelCase", "UPPER_CASE"]
      },
      {
        "selector": ["typeProperty"],
        "types": ["boolean"],
        "format": ["PascalCase"],
        "prefix": ["is", "has", "should", "can"]
      }
    ],
    // importとexportの順番に関するルール
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", ["parent", "sibling"], "object", "type", "index"],
        "newlines-between": "always",
        "pathGroupsExcludedImportTypes": ["builtin"],
        "alphabetize": { "order": "asc", "caseInsensitive": true },
        "pathGroups": [
          { "pattern": "react", "group": "builtin", "position": "before" },
          { "pattern": "next/**", "group": "builtin", "position": "after" },
          { "pattern": "next", "group": "builtin", "position": "after" },
          { "pattern": "@mui/**", "group": "external", "position": "before" },
          { "pattern": "react-hook-form", "group": "external", "position": "before" },
          { "pattern": "@react-icons/**", "group": "external", "position": "before" },
          { "pattern": "@constants", "group": "internal", "position": "before" },
          { "pattern": "@type-def/**", "group": "internal", "position": "before" },
          { "pattern": "@styles/***", "group": "internal", "position": "after" },
          { "pattern": "**.scss", "group": "internal", "position": "after" }
        ]
      }
    ]
  }
}
```

### 備考
importとexportの順番に関するルールを細かく設定していますが、  
`simple-import-sort`を使えばよしなに設定してくれるため下記でも可です。

```json:.eslintrc.json
{
  "plugins": [
    // 追加
    "simple-import-sort",
  ],
  "rules": {
  // importとexportの順番に関するルール
  "simple-import-sort/imports": "error",
  "simple-import-sort/exports": "error",
  }
}
```

---
参考記事
- [Configure ESLint](https://eslint.org/docs/latest/use/configure/)