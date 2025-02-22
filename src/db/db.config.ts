import mongoose from 'mongoose';

const mongo_url = process.env.MONGO_URL!;

export const connect = async () => {
  try {
    mongoose.connect(mongo_url);

    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log(`MongoDB Connected Successfully!`);
    });
    connection.on('error', (err) => {
      console.log(`MongoDB Error ->`, err);
    });
  } catch (err) {
    console.log(
      err instanceof Error ? err.message : 'Unexpected error occured'
    );
  }
};
