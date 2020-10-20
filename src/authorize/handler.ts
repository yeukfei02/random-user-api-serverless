import { Handler } from 'aws-lambda';
import jwt from 'jsonwebtoken';

import env from 'dotenv';
env.config();

export const authorize: Handler = async (event: any, context: any, callback: any) => {
  const token = event.authorizationToken.replace('Bearer ', '');
  // const methodArn = event.methodArn;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    const effect = decoded ? 'Allow' : 'Deny';
    const policyDocument = generatePolicyDocument(decoded.id, effect);
    callback(null, policyDocument);
  } catch (e) {
    console.log('error = ', e);
    callback(null, 'Unauthorized');
  }
};

function generatePolicyDocument(principalId: string, effect: string) {
  let policyDocument = {};

  if (principalId && effect) {
    policyDocument = {
      principalId: principalId,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: effect,
            Resource: '*',
          },
        ],
      },
    };
  }

  return policyDocument;
}
