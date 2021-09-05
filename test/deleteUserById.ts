import lambdaTester from 'lambda-tester';
import RandomUser from '../model/RandomUser';

import { deleteRandomUserById } from '../src/deleteRandomUserById/handler';

export const deleteRandomUserByIdTest = (): void => {
  describe('deleteRandomUserById test', () => {
    test('deleteRandomUserById test', async () => {
      const randomUser = await RandomUser.scan().all().exec();
      if (randomUser) {
        const randomUserList = randomUser.toJSON();
        const lastRandomUser = randomUserList[randomUserList.length - 1];
        const id = lastRandomUser.id;

        return lambdaTester(deleteRandomUserById)
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
