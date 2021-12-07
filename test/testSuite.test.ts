import { mainTest } from './main';
import { signupTest } from './signup';
import { loginTest } from './login';

import { createRandomUserTest } from './createRandomUser';
import { getRandomUserTest } from './getRandomUser';
import { getRandomUserByIdTest } from './getRandomUserById';
import { updateRandomUserByIdTest } from './updateRandomUserById';
import { deleteRandomUserByIdTest } from './deleteUserById';

describe('testSuite test case', () => {
  mainTest();
  signupTest();
  loginTest();

  createRandomUserTest();
  getRandomUserTest();
  getRandomUserByIdTest();
  updateRandomUserByIdTest();
  deleteRandomUserByIdTest();
});
