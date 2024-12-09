# Personal Site

Creating a personal site for myself and gives me an excuse to try out Semantic UI and Pulumi.

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
