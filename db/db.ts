import mongoose from 'mongoose';

import env from 'dotenv';
env.config();

export const connectDB = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'development') {
    // mongo local db
    mongoose.connect('mongodb://localhost:27017/random-user-api-serverless', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } else {
    // mongo atlas
    mongoose.connect(
      `mongodb+srv://yeukfei02:${process.env.MONGO_ATLAS_PASSWORD}@randomuserapiserverless.mwprw.mongodb.net/test?retryWrites=true&w=majority`,
      { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    );
  }
};
