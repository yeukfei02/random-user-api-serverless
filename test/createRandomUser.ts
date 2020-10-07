import lambdaTester from 'lambda-tester';

import { createRandomUser } from '../src/createRandomUser/handler';

export const createRandomUserTest = (): void => {
  describe('createRandomUser test', () => {
    test('createRandomUser test', async () => {
      const bodyData = {
        gender: 'male',
        name: {
          title: 'mr',
          first: 'brad',
          last: 'gibson',
        },
        location: {
          street: '9278 new road',
          city: 'kilcoole',
          state: 'waterford',
          postcode: '93027',
          coordinates: {
            latitude: '20.9267',
            longitude: '-7.9310',
          },
          timezone: {
            offset: '-3:30',
            description: 'Newfoundland',
          },
        },
        email: 'brad.gibson@example.com',
        dob: {
          date: '1993-07-20T09:44:18.674Z',
          age: 26,
        },
        registered: {
          date: '2002-05-21T10:59:49.966Z',
          age: 17,
        },
        phone: '011-962-7516',
        picture: {
          large: 'https://randomuser.me/api/portraits/men/75.jpg',
          medium: 'https://randomuser.me/api/portraits/med/men/75.jpg',
          thumbnail: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
        },
      };

      lambdaTester(createRandomUser)
        .event(bodyData)
        .expectResult((result: any) => {
          console.log('result = ', result);
          expect(result).toBeDefined();
          expect(result.statusCode).toBe(201);
          expect(result.body).toBeDefined();
        });
    });
  });
};
