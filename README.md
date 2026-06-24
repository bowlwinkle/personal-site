# Personal Site

## Commands

```shell
yarn start
yarn style
yarn lint
yarn build
yarn analyze
yarn test
```

## Deployment

The site is hosted from Github. A small redirect script is in `index.html` to load index and forward the path and query parameters once the SPA is loaded.
Everything is deployed when merged to main and is deployed via `Github Actions`.

## Google Integration Setup

Setting up the Milestone Dashboard requires configuring a Google Cloud project, enabling the Google Tasks and Calendar APIs, and setting up OAuth credentials. Detailed step-by-step instructions can be found in the [Google Integration Setup Guide](docs/google_setup.md).

