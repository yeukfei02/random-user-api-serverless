import { Handler } from 'aws-lambda';

export const getMain: Handler = async (_: any) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'random user api serverless',
    }),
  };
  return response;
};
