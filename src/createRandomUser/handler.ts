import { Handler } from 'aws-lambda';
import mongoose from 'mongoose';

import RandomUser from '../../model/randomUser';

import { connectDB } from '../../db/db';

connectDB();

export const createRandomUser: Handler = async (event: any) => {
  let response = {};

  const body = JSON.parse(event.body);
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
      _id: new mongoose.Types.ObjectId(),
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
