import { Handler } from 'aws-lambda';
import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
awsXRay.captureAWS(awsSdk);

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import User from '../../model/user';

import env from 'dotenv';
env.config();

export const login: Handler = async (event: any) => {
  let response = {};

  const body = JSON.parse(event.body);
  if (body) {
    const email = body.email;
    const password = body.password;

    if (email && password) {
      const user: any = await User.scan({ email: { eq: email } }).exec();
      console.log('user = ', user);

      if (user.count === 1) {
        const userPasswordFromDB = user[0].password;
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
