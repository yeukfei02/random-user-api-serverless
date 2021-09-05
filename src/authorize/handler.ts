// import env from 'dotenv';
// env.config();

import { Context, Callback, Handler } from 'aws-lambda';
import jwt from 'jsonwebtoken';

export const authorize: Handler = async (event: any, context: Context, callback: Callback) => {
  const token = event.authorizationToken.replace('Bearer ', '');

  let principalId = 'user';
  let effect = 'Deny';
  try {
    const jwtSecret = process.env.JWT_SECRET ? process.env.JWT_SECRET : '';
    const decoded = jwt.verify(token, jwtSecret) as any;
    if (decoded) {
      principalId = decoded.id;
      effect = 'Allow';
    }
  } catch (e) {
    console.log('authorize error = ', e);
  }

  const policyDocument = generatePolicyDocument(principalId, effect);
  console.log('policyDocument = ', policyDocument);

  return policyDocument;
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
