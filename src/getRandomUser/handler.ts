import { Handler } from 'aws-lambda';
import axios from 'axios';
import _ from 'lodash';
import mongoose from 'mongoose';
import RandomUser from '../../model/randomUser';

import env from 'dotenv';
env.config();

import { connectDB } from '../../db/db';

connectDB();

export const getRandomUser: Handler = async (event: any) => {
  let response = {};

  if (event.queryStringParameters) {
    const page = event.queryStringParameters.page;
    const results = event.queryStringParameters.results;

    const result = await getRandomUserRequest(page, results);

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'getRandomUser',
        result: result,
      }),
    };
  } else {
    const result = await getRandomUserRequest();

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'getRandomUser',
        result: result,
      }),
    };
  }

  return response;
};

async function getRandomUserRequest(page?: string, results?: string): Promise<null> {
  let result = null;

  let response: any = null;
  if (!page && !results) {
    response = await axios.get(`https://randomuser.me/api/`);
  } else {
    response = await axios.get(`https://randomuser.me/api/`, {
      params: {
        page: page,
        results: results,
      },
    });
  }

  if (response) {
    const responseData = response.data;
    if (responseData && responseData.results) {
      responseData.results.forEach(async (item: any, i: number) => {
        const existingRandomUser = await RandomUser.findOne({ name: item.name });
        if (_.isEmpty(existingRandomUser)) {
          await addRandomUserDataToDB(item);
        }
      });
      result = responseData.results;
    }
  }

  return result;
}

async function addRandomUserDataToDB(item: any) {
  const gender = item.gender;
  const name = item.name;
  const location = item.location;
  const email = item.email;
  const dob = item.dob;
  const registered = item.registered;
  const phone = item.phone;
  const picture = item.picture;

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
}
