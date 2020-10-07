import { Handler } from 'aws-lambda';
import RandomUser from '../../model/randomUser';

import env from 'dotenv';
env.config();

import { connectDB } from '../../db/db';

connectDB();

export const updateRandomUserById: Handler = async (event: any) => {
  let response = {};

  const id = event.pathParameters.id;
  if (id) {
    const body = JSON.parse(event.body);

    const gender = body.gender;
    const name = body.name;
    const location = body.location;
    const email = body.email;
    const dob = body.dob;
    const registered = body.registered;
    const phone = body.phone;
    const picture = body.picture;

    const data = {
      gender: gender,
      name: name,
      location: location,
      email: email,
      dob: dob,
      registered: registered,
      phone: phone,
      picture: picture,
    };
    const result = await RandomUser.findOneAndUpdate({ _id: id }, { $set: data });

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
