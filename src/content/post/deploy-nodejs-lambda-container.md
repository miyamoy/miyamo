---
title: "コンテナイメージによる Node.js Lambda のデプロイ"
description: ""
draft: true
publishDate: "2024/11/29"
tags: ["aws", "tech"]
---

# はじめに

Node.js Lambda をコンテナイメージでデプロイする方法を試しました。

# 前提

以下の環境で作成しています。

- Windows 10 Pro
- Node.js v22.11.0
- Rancher Desktop 1.16.0

# ローカルで Lambda コンテナイメージ作成

## Node.js プロジェクトの作成

`npm` で新しい Node.js プロジェクトを作成します。

```shell
npm init
```

`index.mjs` という名前のファイルを作成し、テスト用のハンドラーを書きます。  
ここでは ES Modules 形式で書いています。

```js
export const handler = async (event, context) => {
	const response = { statusCode: 200, body: JSON.stringify('Hello from Lambda!'), };
	return response;
}
```

## コンテナイメージの作成

Node.js の [AWS ベースイメージ](https://gallery.ecr.aws/lambda/nodejs)を利用して `Dockerfile` を作成します。

```Dockerfile
FROM public.ecr.aws/lambda/nodejs:20

COPY index.mjs ${LAMBDA_TASK_ROOT}
  
CMD [ "index.handler" ]
```

Docker イメージを作成します。

```shell
docker build --platform linux/amd64 -t test/nodejs-lambda:test .
```

# コンテナイメージを ECR にデプロイ

ECR のリポジトリは作成済み、AWS CLIもインストール済みとします。

## ECR レジストリ に Docker CLI を認証

Docker CLI が認証トークンを利用できるように設定します。

```shell
aws ecr get-login-password --region ap-northeast-1 | \
docker login --username AWS --password-stdin 111122223333.dkr.ecr.ap-northeast-1.amazonaws.com
```

## ローカルイメージを ECR リポジトリにタグ付け

```shell
docker tag docker-image:test 111122223333.dkr.ecr.ap-northeast-1.amazonaws.com/test/nodejs-lambda:latest
```

## ECR にデプロイ

```shell
docker push 111122223333.dkr.ecr.ap-northeast-1.amazonaws.com/test/nodejs-lambda:latest
```

# Lambda 用 IAM ロールの作成

作成する Lambda 用の IAM ロールを CloudFormation で作成します。

## IAM ロールの CloudFormation テンプレートの作成

```yaml
AWSTemplateFormatVersion: '2010-09-09'
Description: >
  IAM Role for Test Lambda function

Resources:
  LambdaExecutionRole:
    Type: AWS::IAM::Role
    Properties: 
      AssumeRolePolicyDocument: 
        Version: '2012-10-17'
        Statement: 
          - Effect: Allow
            Principal: 
              Service: 
                - lambda.amazonaws.com
            Action: 
              - sts:AssumeRole
      Policies: 
        - PolicyName: LambdaBasicExecution
          PolicyDocument: 
            Version: '2012-10-17'
            Statement: 
              - Effect: Allow
                Action: 
                  - logs:CreateLogGroup
                Resource: "arn:aws:logs:ap-northeast-1:111122223333:*"
              - Effect: Allow
                Action: 
                  - logs:CreateLogStream
                  - logs:PutLogEvents
                Resource: 
                  - "arn:aws:logs:ap-northeast-1:111122223333:log-group:/aws/lambda/test-nodejs-lambda:*"
        - PolicyName: LambdaEC2NetworkInterfaceAccess
          PolicyDocument: 
            Version: '2012-10-17'
            Statement: 
              - Effect: Allow
                Action: 
                  - ec2:CreateNetworkInterface
                  - ec2:DeleteNetworkInterface
                  - ec2:DescribeNetworkInterfaces
                Resource: "*"
      Path: /
      RoleName: LambdaExecutionRole

Outputs:
  LambdaExecutionRoleArn:
    Description: "ARN of the Lambda Execution Role"
    Value: !GetAtt LambdaExecutionRole.Arn
```

## CloudFormation の実行

今回はマネジメントコンソールから実行します。  
なお、CloudFormation 実行用のサービスロールを作成しておく必要があります。

# Lambda の作成

AWS CLI で Lambda を作成します。

```shell
aws lambda create-function \
  --region ap-northeast-1 \
  --function-name test-lambda \
  --package-type Image \
  --code ImageUri=111122223333.dkr.ecr.ap-northeast-1.amazonaws.com/test/nodejs-lambda:latest \
  --role arn:aws:iam::111122223333:role/LambdaExecutionRoleArn
```

## 参考

- [Node.js Lambda 関数をコンテナイメージとともにデプロイする - AWS Lambda](https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/nodejs-image.html)