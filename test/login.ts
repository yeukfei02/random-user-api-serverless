import lambdaTester from 'lambda-tester';

import { login } from '../src/login/handler';

export const loginTest = (): void => {
  describe('login test', () => {
    test('login', async () => {
      const bodyData = {
        email: 'test@email.com',
        password: 'test',
      };

      return lambdaTester(login)
        .event({ body: JSON.stringify(bodyData) })
        .expectResult((result: any) => {
          console.log('result = ', result);
          expect(result).toBeDefined();
          expect(result.statusCode).toBe(201);
          expect(result.body).toBeDefined();
        });
    });
  });
};
