import { Handler } from 'aws-lambda';
import jwt from 'jsonwebtoken';

import env from 'dotenv';
env.config();

export const isUserLoggedIn: Handler = async (event: any, context: any, callback: any) => {
  const token = event.authorizationToken.replace('Bearer ', '');
  const methodArn = event.methodArn;

  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
  if (decoded) {
    return callback(null, generateAuthResponse(decoded.id, 'Allow', methodArn));
  } else {
    return callback(null, generateAuthResponse(decoded.id, 'Deny', methodArn));
  }
};

function generateAuthResponse(principalId: any, effect: string, methodArn: string) {
  const policyDocument = generatePolicyDocument(effect, methodArn);

  const result = {
    principalId,
    policyDocument,
  };
  return result;
}

function generatePolicyDocument(effect: string, methodArn: string) {
  let policyDocument = {};

  if (effect && methodArn) {
    policyDocument = {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: methodArn,
        },
      ],
    };
  }

  return policyDocument;
}
