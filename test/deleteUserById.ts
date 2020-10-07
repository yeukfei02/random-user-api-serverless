import lambdaTester from 'lambda-tester';
import RandomUser from '../model/randomUser';

import env from 'dotenv';
env.config();

import { connectDB } from '../db/db';

connectDB();

import { deleteRandomUserById } from '../src/deleteRandomUserById/handler';

export const deleteRandomUserByIdTest = (): void => {
  describe('deleteRandomUserById test', () => {
    test('deleteRandomUserById test', async () => {
      const randomUser = await RandomUser.findOne().sort({ created_by: -1 });
      console.log('randomUser = ', randomUser);

      if (randomUser) {
        const id = randomUser._id;

        lambdaTester(deleteRandomUserById)
          .event({ pathParameters: { id: id } })
          .expectResult((result: any) => {
            console.log('result = ', result);
            expect(result).toBeDefined();
            expect(result.statusCode).toBe(200);
            expect(result.body).toBeDefined();
          });
      }
    });
  });
};
