import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://vyasvishaldev:vyasvishal@mydatabse.4gh12.mongodb.net/?retryWrites=true&w=majority&appName=mydatabse';

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
  // If already connected to the database, log a message and return
  if (connection.isConnected) {
    console.log('Already connected to the database');
    return;
  }

  try {
    // Connect to the MongoDB database
    const db = await mongoose.connect(MONGODB_URI);

    // Update connection state
    connection.isConnected = db.connections[0].readyState;

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);

    // Gracefully exit the process if the connection fails
    process.exit(1);
  }
}

export default dbConnect;
