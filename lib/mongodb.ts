// Connexion à la base de données MongoDB

import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log('Already connected to MongoDB');
    return;
  }
  if(connectionState === 2) {
    console.log('Connecting to MongoDB...');
    return;
  }
  
  try {
    mongoose.connect(MONGODB_URI!, {
      dbName: 'elisabethcoachholistique',
      bufferCommands: false, 
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

export default connect;