// import env from 'dotenv';
// env.config();

import dynamoose from 'dynamoose';
dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-1',
});

const userSchema = new dynamoose.Schema(
  {
    id: String,
    email: {
      type: String,
      rangeKey: true,
    },
    password: String,
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);
const userModel = dynamoose.model('User', userSchema);

export default userModel;
