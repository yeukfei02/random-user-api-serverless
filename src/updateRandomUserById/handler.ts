import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
if (process.env._X_AMZN_TRACE_ID) {
  awsXRay.captureAWS(awsSdk);
}

import RandomUser from '../../model/randomUser';

export const updateRandomUserById: Handler = async (event: APIGatewayEvent, context: Context) => {
  let response = {};

  const id = event.pathParameters ? event.pathParameters.id : '';
  if (id) {
    const body = event.body ? JSON.parse(event.body) : null;

    const gender = body.gender;
    const name = body.name;
    const location = body.location;
    const email = body.email;
    const dob = body.dob;
    const registered = body.registered;
    const phone = body.phone;
    const picture = body.picture;

    const result = await RandomUser.update({
      id: id,
      gender: gender,
      name: name,
      location: location,
      email: email,
      dob: dob,
      registered: registered,
      phone: phone,
      picture: picture,
    });

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'updateRandomUserById',
        result: result,
      }),
    };
  }

  return response;
};
