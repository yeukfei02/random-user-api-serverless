import lambdaTester from 'lambda-tester';
import RandomUser from '../model/randomUser';

import { updateRandomUserById } from '../src/updateRandomUserById/handler';

export const updateRandomUserByIdTest = (): void => {
  describe('updateRandomUserById test', () => {
    test('updateRandomUserById test', async () => {
      const randomUser = await RandomUser.scan().exec();
      if (randomUser) {
        const lastRandomUser = randomUser[randomUser.length - 1] as any;
        const id = lastRandomUser.id;

        const bodyData = {
          gender: 'male',
          name: {
            title: 'mrs',
            first: 'aaa',
            last: 'bbb',
          },
          location: {
            street: '1111 new road',
            city: 'hong kong',
            state: 'hong kong',
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
            age: 30,
          },
          registered: {
            date: '2002-05-21T10:59:49.966Z',
            age: 25,
          },
          phone: '011-962-7516',
          picture: {
            large: 'https://randomuser.me/api/portraits/men/75.jpg',
            medium: 'https://randomuser.me/api/portraits/med/men/75.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
          },
        };

        lambdaTester(updateRandomUserById)
          .event({ pathParameters: { id: id } })
          .event(bodyData)
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
