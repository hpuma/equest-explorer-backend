## Description
Equest Explorer backend
Allows search of stock news from the following integrations
- News API
- Alpha Vantage
- Marketaux
- more to come...

## Prerequisites
`.env file` in root directory
- API keys procured from their respective websites
- MongoDB URI for news record keeping

```
NODE_ENV="local"
INTEGRATIONS_ENABLED=true

NEWS_API_KEY=
ALPHAV_API_KEY=
MARKETAUX_API_KEY=
MONGODB_URI=
```

## Documentation
- Available via Swagger (OpenAPI) => run locally and proceed to `http://localhost:3001/api`

![Swagger Documentation](https://github.com/hpuma/equest-explorer-backend-v2/blob/main/swagger.gif)


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Technologies
- ...
