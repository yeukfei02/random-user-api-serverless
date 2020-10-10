import lambdaTester from 'lambda-tester';

import { signup } from '../src/signup/handler';

export const signupTest = (): void => {
  describe('signup test', () => {
    test('signup test', async () => {
      const bodyData = {
        email: 'test@email.com',
        password: 'test',
      };

      lambdaTester(signup)
        .event({ body: bodyData })
        .expectResult((result: any) => {
          console.log('result = ', result);
          expect(result).toBeDefined();
          expect(result.statusCode).toBe(201);
          expect(result.body).toBeDefined();
        });
    });
  });
};
