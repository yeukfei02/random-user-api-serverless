import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
if (process.env._X_AMZN_TRACE_ID) {
  awsXRay.captureAWS(awsSdk);
}

import RandomUser from '../../model/randomUser';

export const getRandomUserById: Handler = async (event: APIGatewayEvent, context: Context) => {
  let response = {};

  const id = event.pathParameters ? event.pathParameters.id : '';
  if (id) {
    const randomUser = await RandomUser.get(id);
    if (randomUser) {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'getRandomUser',
          result: randomUser,
        }),
      };
    } else {
      response = {
        statusCode: 200,
        body: JSON.stringify({
          message: 'getRandomUser',
          result: {},
        }),
      };
    }
  }

  return response;
};
