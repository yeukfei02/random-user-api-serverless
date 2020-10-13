import lambdaTester from 'lambda-tester';

import { getRandomUser } from '../src/getRandomUser/handler';

export const getRandomUserTest = (): void => {
  describe('getRandomUser test', () => {
    test('getRandomUser test', async () => {
      return lambdaTester(getRandomUser)
        .event({})
        .expectResult((result: any) => {
          console.log('result = ', result);
          expect(result).toBeDefined();
          expect(result.statusCode).toBe(200);
          expect(result.body).toBeDefined();
        });
    });

    test('getRandomUser test with page and results', async () => {
      return lambdaTester(getRandomUser)
        .event({ queryStringParameters: { page: '1', results: '10' } })
        .expectResult((result: any) => {
          console.log('result = ', result);
          expect(result).toBeDefined();
          expect(result.statusCode).toBe(200);
          expect(result.body).toBeDefined();
        });
    });
  });
};
