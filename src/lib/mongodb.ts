import { MongoClient } from 'mongodb';
import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
let isConnecting = false;

// Set up mongoose connection
const connectDB = async () => {
  try {
    // If already connecting, wait for the current connection attempt
    if (isConnecting) {
      console.log('Connection attempt already in progress...');
      return;
    }

    // If already connected, return
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return;
    }

    isConnecting = true;

    await mongoose.connect(uri, {
      dbName: 'hexasteel',
      retryWrites: true,
      w: 'majority',
      maxPoolSize: 10,
      minPoolSize: 5,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
      heartbeatFrequencyMS: 10000,
    });

    console.log('MongoDB connected successfully');
    
    // Get the default connection
    const db = mongoose.connection;
    
    // Event handlers
    db.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      console.error('Error details:', {
        name: err.name,
        message: err.message,
        stack: err.stack,
      });
      
      // Attempt to reconnect if not already connecting
      if (!isConnecting) {
        console.log('Attempting to reconnect...');
        setTimeout(() => {
          connectDB();
        }, 5000);
      }
    });

    db.on('disconnected', () => {
      console.log('MongoDB disconnected');
      // Attempt to reconnect if not already connecting
      if (!isConnecting) {
        console.log('Attempting to reconnect...');
        setTimeout(() => {
          connectDB();
        }, 5000);
      }
    });

    db.on('connected', () => {
      console.log('MongoDB connected');
      isConnecting = false;
    });

    db.on('reconnected', () => {
      console.log('MongoDB reconnected');
      isConnecting = false;
    });

    process.on('SIGINT', async () => {
      await db.close();
      console.log('MongoDB connection closed through app termination');
      process.exit(0);
    });

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    isConnecting = false;
    // Attempt to reconnect after a delay
    setTimeout(() => {
      connectDB();
    }, 5000);
  }
};

// Export the connectDB function
export { connectDB };
