import lambdaTester from 'lambda-tester';

import { getMain } from '../src/main/handler';

export const mainTest = (): void => {
  describe('main test', () => {
    test('main', async () => {
      return lambdaTester(getMain)
        .event({})
        .expectResult((result: any) => {
          console.log('result = ', result);
          expect(result).toBeDefined();
          expect(result.statusCode).toBe(200);
          expect(result.body).toBeDefined();
        });
    });
  });
};
