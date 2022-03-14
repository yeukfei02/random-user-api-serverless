import { APIGatewayEvent, Context, Handler } from 'aws-lambda';
import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
if (process.env._X_AMZN_TRACE_ID) {
  awsXRay.captureAWS(awsSdk);
}

import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import User from '../../model/user';

export const signup: Handler = async (event: APIGatewayEvent, context: Context) => {
  let response = {};

  const body = event.body ? JSON.parse(event.body) : null;
  if (body) {
    const email = body.email;
    const password = bcrypt.hashSync(body.password, 10);

    if (email && password) {
      const record = await User.scan({ email: { eq: email } })
        .all()
        .count()
        .exec();
      console.log('record = ', record);

      if (record.count === 0) {
        const user = new User({
          id: uuidv4(),
          email: email,
          password: password,
        });
        await user.save();

        response = {
          statusCode: 201,
          body: JSON.stringify({
            message: 'signup',
          }),
        };
      } else {
        response = {
          statusCode: 400,
          body: JSON.stringify({
            message: 'signup error, user already exists',
          }),
        };
      }
    }
  }

  return response;
};
