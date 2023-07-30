import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set('strictQuery');
  if (isConnected) {
    console.log('MongoDB already connected');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'sharePrompt',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log('MongoDB connected...');
  } catch (error) {
    console.log(error);
  }
};
