---
title: "Vite による React の開発環境構築"
description: ""
draft: false
publishDate: "2024/12/07"
tags: ["react", "vite", "tech"]
---

# はじめに

React の開発環境を構築するために Vite を使う方法をまとめます。

# 前提

以下の環境で構築しています。

- Windows 10 Pro
- Node.js v22.11.0

# Vite のプロジェクトを作成

以下のコマンドを実行します。

```shell
npm create vite@latest
```

プロジェクト名を入力します。

```shell
Need to install the following packages:
create-vite@6.0.1
Ok to proceed? (y) y


> npx
> create-vite

√ Project name: ... vite-project
```

`? Select a framework:` で `React` を選びます。

```shell
? Select a framework: » - Use arrow-keys. Return to submit.
    Vanilla
    Vue
>   React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Angular
    Others
```

使う言語を選びます（ここでは JavaScript）。

```shell
? Select a variant: » - Use arrow-keys. Return to submit.
    TypeScript
    TypeScript + SWC
>   JavaScript
    JavaScript + SWC
    React Router v7 ↗
```

プロジェクトが作成されるので、コマンドを実行します。

```shell
Scaffolding project in C:\Users\y5-miyamoto\vite-project...

Done. Now run:

  cd vite-project
  npm install
  npm run dev
  
```

```shell
> npm run dev

> vite-project@0.0.0 dev
> vite


  VITE v6.0.3  ready in 1395 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

`http://localhost:5173/` にアクセスして初期画面が表示されていれば OK です。

なお初期では `index,html` と `/src` 、`/public` が作られています。  
以降はやりたいことに応じてモジュール追加したりして作っていく感じです。

# 参考

- [はじめに #最初の Vite プロジェクトを生成する| Vite](https://ja.vite.dev/guide/#%E6%9C%80%E5%88%9D%E3%81%AE-vite-%E3%83%95%E3%82%9A%E3%83%AD%E3%82%B7%E3%82%99%E3%82%A7%E3%82%AF%E3%83%88%E3%82%92%E7%94%9F%E6%88%90%E3%81%99%E3%82%8B)
