---
title: "git コマンド実行のための Lambda レイヤーの作成"
description: ""
draft: false
publishDate: "2025/01/15"
tags: ["aws", "tech"]
---

# 事前準備

- Lambda の実行環境のコンテナイメージを取得・実行できるようにコンテナ環境を用意する
  - Rancher Desktop、Podman Desktop など

# レイヤー作成手順

- [Amazon ECR Public Gallery - AWS Lambda/python](https://gallery.ecr.aws/lambda/python) を利用する

## コンテナの実行

```bash
docker run -it public.ecr.aws/lambda/python:3.13 bash
```

## コンテナに入る

```bash
docker exec -it コンテナID bash
```

## `git` のインストール

```bash
dnf install -y git
```

## `git` 用バイナリを zip 化

- `bin` ディレクトリを zip 化する必要がある
- レイヤーに指定する zip のディレクトリ構造については [レイヤーコンテンツのパッケージング - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/packaging-layers.html) を参照
	- `/opt/bin` に PATH が通る

```bash
mkdir /tmp/layer/bin
cp /usr/bin/git /tmp/layer/bin/
cp /usr/libexec/git-core/git-remote-https /tmp/layer/bin/
cp /usr/libexec/git-core/git-remote-http /tmp/layer/bin/
cd /tmp/layer
dnf install zip
zip -r layer.zip .
```

## ローカルにコピー

```bash
docker cp コンテナID:/tmp/layer/layer.zip layer.zip
```

コピーできたら、コンソールからアップロードすれば OK。

# 参考

- [レイヤーコンテンツのパッケージング - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/packaging-layers.html)
- [Lambda Layerでバイナリやライブラリを切り出す - sambaiz-net](https://www.sambaiz.net/article/232/)
- [AWS Lambda で git コマンドを使う #Git - Qiita](https://qiita.com/mihyon/items/53a2b97e09e48d004b33)
