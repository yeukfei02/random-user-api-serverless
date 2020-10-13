import env from 'dotenv';
env.config();

import dynamoose from 'dynamoose';
dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-1',
});

const randomUserSchema = new dynamoose.Schema(
  {
    id: String,
    gender: String,
    name: {
      type: Object,
      schema: {
        title: String,
        first: String,
        last: String,
      },
    },
    location: {
      type: Object,
      schema: {
        street: String,
        city: String,
        state: String,
        postcode: String,
        coordinates: {
          type: Object,
          schema: {
            latitude: String,
            longitude: String,
          },
        },
        timezone: {
          type: Object,
          schema: {
            offset: String,
            description: String,
          },
        },
      },
    },
    email: String,
    dob: {
      type: Object,
      schema: {
        date: String,
        age: Number,
      },
    },
    registered: {
      type: Object,
      schema: {
        date: String,
        age: Number,
      },
    },
    phone: String,
    picture: {
      type: Object,
      schema: {
        large: String,
        medium: String,
        thumbnail: String,
      },
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
const randomUserModel = dynamoose.model('RandomUser', randomUserSchema);

export default randomUserModel;
