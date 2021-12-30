import { APIGatewayEvent, Context, Callback, Handler } from 'aws-lambda';
import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
if (process.env._X_AMZN_TRACE_ID) {
  awsXRay.captureAWS(awsSdk);
}

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import RandomUser from '../../model/randomUser';

export const getRandomUser: Handler = async (event: APIGatewayEvent, context: Context, callback: Callback) => {
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
      for (let index = 0; index < responseData.results.length; index++) {
        const item = responseData.results[index];

        const existingRandomUser = await RandomUser.scan({ name: { eq: item.name } })
          .all()
          .exec();
        console.log('existingRandomUser = ', existingRandomUser);

        if (existingRandomUser && existingRandomUser.length === 0) await addRandomUserDataToDB(item);
      }

      result = responseData.results;
    }
  }

  return result;
}

async function addRandomUserDataToDB(item: any) {
  const gender = item.gender;
  const name = item.name;
  const location = item.location;
  location.street = typeof location.street === 'string' ? location.street : JSON.stringify(location.street);
  location.postcode = typeof location.postcode === 'number' ? location.postcode.toString() : location.postcode;

  const email = item.email;
  const dob = item.dob;
  const registered = item.registered;
  const phone = item.phone;
  const picture = item.picture;

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
}
