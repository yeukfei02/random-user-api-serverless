import dynamoose from 'dynamoose';
dynamoose.aws.sdk.config.update({
  accessKeyId: process.env.MY_AWS_ACCESS_KEY,
  secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY,
  region: 'ap-southeast-1',
});

const userSchema = new dynamoose.Schema(
  {
    id: String,
    email: String,
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
