import { Handler } from 'aws-lambda';
import RandomUser from '../../model/randomUser';

import env from 'dotenv';
env.config();

import { connectDB } from '../../db/db';

connectDB();

export const getRandomUserById: Handler = async (event: any) => {
  let response = {};

  const id = event.pathParameters.id;
  if (id) {
    const randomUser = await RandomUser.findById({ _id: id });

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'getRandomUser',
        result: randomUser,
      }),
    };
  }

  return response;
};
