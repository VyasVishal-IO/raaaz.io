import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://VyasVishal2024:s5aTiHfFHjgFE0GP@cluster0.39msa.mongodb.net/Raaazio?retryWrites=true&w=majority&appName=Cluster0';

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
