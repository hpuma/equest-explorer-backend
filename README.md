# Description

Equest Explorer backend provides news articles related to stocks via News REST API integrations such as
- News API
- Alpha Vantage
- Marketaux
- Bing (2/7/2024)
- NewsData (2/8/2024)
- GNews (2/8/2024)

Work in progress 🔧
- The News API

# Prerequisites

`.env file` in root directory

- API keys procured from their respective websites
- MongoDB URI for news record keeping

```
NODE_ENV="local"
INTEGRATIONS_ENABLED=true
BING_API_KEY=
NEWS_API_KEY=
ALPHAV_API_KEY=
MARKETAUX_API_KEY=
BING_API_KEY=
NEWSDATA_API_KEY=
GNEWS_API_KEY=
MONGODB_URI=
```

# Documentation

## Endpoints

![Endpoints](https://github.com/hpuma/equest-explorer-backend-v2/blob/main/resources/endpoints.png)

## Swagger (OpenAPI)

- run locally and proceed to `http://localhost:3001/api`

![Swagger Documentation](https://github.com/hpuma/equest-explorer-backend-v2/blob/main/resources/swagger.gif)

## Installation

```bash
$ npm install
```

# Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

# Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

# Technologies

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![CircleCI](https://img.shields.io/badge/circle%20ci-%23161616.svg?style=for-the-badge&logo=circleci&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
