import { getMainTest } from './main';
import { createRandomUserTest } from './createRandomUser';
import { getRandomUserTest } from './getRandomUser';
import { getRandomUserByIdTest } from './getRandomUserById';
import { updateRandomUserByIdTest } from './updateRandomUserById';
import { deleteRandomUserByIdTest } from './deleteUserById';

describe('testSuite test case', () => {
  getMainTest();
  createRandomUserTest();
  getRandomUserTest();
  getRandomUserByIdTest();
  updateRandomUserByIdTest();
  deleteRandomUserByIdTest();
});
