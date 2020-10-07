# random-user-api-serverless

random-user-api-serverless

documentation: https://documenter.getpostman.com/view/3827865/TVRj485z

## Requirement:

- install yarn
- install node (v12+)
- install serverless

## Testing and run:

```
// run function
$ serverless invoke local --function main
$ serverless invoke local --function createRandomUser --path ./data/createRandomUser.json
$ serverless invoke local --function getRandomUser --path ./data/getRandomUser.json
$ serverless invoke local --function getRandomUserById --path ./data/getRandomUserById.json
$ serverless invoke local --function updateRandomUserById --path ./data/updateRandomUserById.json
$ serverless invoke local --function deleteRandomUserById --path ./data/deleteRandomUserById.json

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
```
