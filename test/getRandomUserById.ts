import lambdaTester from 'lambda-tester';
import RandomUser from '../model/randomUser';

import { connectDB } from '../db/db';

connectDB();

import { getRandomUserById } from '../src/getRandomUserById/handler';

export const getRandomUserByIdTest = (): void => {
  describe('getRandomUserById test', () => {
    test('getRandomUserById test', async () => {
      const randomUser = await RandomUser.findOne().sort({ created_by: -1 });
      if (randomUser) {
        const id = randomUser._id;

        lambdaTester(getRandomUserById)
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
