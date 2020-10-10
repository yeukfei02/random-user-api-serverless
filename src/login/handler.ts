import { Handler } from 'aws-lambda';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import User from '../../model/user';

import env from 'dotenv';
env.config();

import { connectDB } from '../../db/db';

connectDB();

export const login: Handler = async (event: any) => {
  let response = {};

  const body = JSON.parse(event.body);
  if (body) {
    const email = body.email;
    const password = body.password;

    if (email && password) {
      const user = await User.findOne({ email: email });
      if (user) {
        const userPasswordFromDB = user.get('password');
        if (bcrypt.compareSync(password, userPasswordFromDB)) {
          const token = jwt.sign(
            {
              id: uuidv4(),
            },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' },
          );

          response = {
            statusCode: 201,
            body: JSON.stringify({
              message: 'login',
              token: token,
            }),
          };
        } else {
          response = {
            statusCode: 400,
            body: JSON.stringify({
              message: 'login error, password is not correct',
            }),
          };
        }
      } else {
        response = {
          statusCode: 400,
          body: JSON.stringify({
            message: 'login error, no this user',
          }),
        };
      }
    }
  }

  return response;
};
