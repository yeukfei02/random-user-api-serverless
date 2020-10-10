import { Handler } from 'aws-lambda';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import User from '../../model/user';

import { connectDB } from '../../db/db';

connectDB();

export const signup: Handler = async (event: any) => {
  let response = {};

  const body = JSON.parse(event.body);
  if (body) {
    const email = body.email;
    const password = bcrypt.hashSync(body.password, 10);

    if (email && password) {
      const record = await User.findOne({ email: email });
      if (!record) {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
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
