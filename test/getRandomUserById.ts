import lambdaTester from 'lambda-tester';
import RandomUser from '../model/randomUser';

import { getRandomUserById } from '../src/getRandomUserById/handler';

export const getRandomUserByIdTest = (): void => {
  describe('getRandomUserById test', () => {
    test('getRandomUserById test', async () => {
      const randomUser = await RandomUser.scan().exec();
      if (randomUser) {
        const lastRandomUser = randomUser[randomUser.length - 1] as any;
        const id = lastRandomUser.id;

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
