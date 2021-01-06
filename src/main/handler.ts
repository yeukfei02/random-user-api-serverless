import { Handler } from 'aws-lambda';
import awsXRay from 'aws-xray-sdk';
import awsSdk from 'aws-sdk';
awsXRay.captureAWS(awsSdk);

export const getMain: Handler = async (event: any, context: any, callback: any) => {
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'random user api serverless',
    }),
  };
  return response;
};
