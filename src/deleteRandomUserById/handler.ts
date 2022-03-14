import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
if (process.env._X_AMZN_TRACE_ID) {
  awsXRay.captureAWS(awsSdk);
}

import RandomUser from '../../model/randomUser';

export const deleteRandomUserById: Handler = async (event: APIGatewayEvent, context: Context) => {
  let response = {};

  const id = event.pathParameters ? event.pathParameters.id : '';
  if (id) {
    const randomUser = await RandomUser.get(id);
    if (randomUser) {
      (await randomUser).delete();
    }

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'deleteRandomUserById',
      }),
    };
  }

  return response;
};
