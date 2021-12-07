import lambdaTester from 'lambda-tester';
import { v4 as uuidv4 } from 'uuid';

import { signup } from '../src/signup/handler';

export const signupTest = (): void => {
  describe('signup test', () => {
    test('signup', async () => {
      const bodyData = {
        email: `test-${uuidv4()}@email.com`,
        password: 'test',
      };

      return lambdaTester(signup)
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
