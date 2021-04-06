# random-user-api-serverless

random-user-api-serverless

documentation: <https://documenter.getpostman.com/view/3827865/TVRj485z>

api url: <https://e7k1ke40c1.execute-api.ap-southeast-1.amazonaws.com/prod/api>

## Requirement

- install yarn
- install node (v12+)
- install serverless

## Testing and run

```zsh
// test api in local
$ yarn run dev

// deploy to serverless
$ yarn run deploy

// open serverless dashboard
$ yarn run dashboard

// use eslint and prettier to format code
$ yarn run lint

// run test case
$ yarn run test

// remove serverless services in aws (api gateway, lambda, s3, cloudformation)
$ yarn run remove
```
