import { APIGatewayEvent, Context, Callback, Handler } from 'aws-lambda';
import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
if (process.env._X_AMZN_TRACE_ID) {
  awsXRay.captureAWS(awsSdk);
}

import { v4 as uuidv4 } from 'uuid';

import RandomUser from '../../model/RandomUser';

export const createRandomUser: Handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
  let response = {};

  const body = event.body ? JSON.parse(event.body) : null;
  if (body) {
    const gender = body.gender;
    const name = body.name;
    const location = body.location;
    const email = body.email;
    const dob = body.dob;
    const registered = body.registered;
    const phone = body.phone;
    const picture = body.picture;

    const randomUser = new RandomUser({
      id: uuidv4(),
      gender: gender,
      name: name,
      location: location,
      email: email,
      dob: dob,
      registered: registered,
      phone: phone,
      picture: picture,
    });
    await randomUser.save();

    response = {
      statusCode: 201,
      body: JSON.stringify({
        message: 'createRandomUser',
      }),
    };
  }

  return response;
};
