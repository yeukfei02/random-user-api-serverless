import lambdaTester from 'lambda-tester';
import RandomUser from '../model/RandomUser';

import { getRandomUserById } from '../src/getRandomUserById/handler';

export const getRandomUserByIdTest = (): void => {
  describe('getRandomUserById test', () => {
    test('getRandomUserById test', async () => {
      const randomUser = await RandomUser.scan().all().exec();
      if (randomUser) {
        const randomUserList = randomUser.toJSON();
        const lastRandomUser = randomUserList[randomUserList.length - 1];
        const id = lastRandomUser.id;

        return lambdaTester(getRandomUserById)
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
