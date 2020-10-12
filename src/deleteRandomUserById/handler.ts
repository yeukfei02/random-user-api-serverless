import { Handler } from 'aws-lambda';

import RandomUser from '../../model/randomUser';

export const deleteRandomUserById: Handler = async (event: any) => {
  let response = {};

  const id = event.pathParameters.id;
  if (id) {
    const randomUser = await RandomUser.get(id);
    if (randomUser) {
      (await randomUser).delete();
    }

    response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'deleteRandomUserById',
      }),
    };
  }

  return response;
};
