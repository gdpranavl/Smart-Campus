import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Test creating a user
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'testpassword123',
      role: 'student'
    });

    // Test reading the user
    const foundUser = await User.findOne({ email: 'test@example.com' });

    // Test updating the user
    await User.updateOne(
      { email: 'test@example.com' },
      { name: 'Updated Test User' }
    );

    // Test deleting the user
    await User.deleteOne({ email: 'test@example.com' });

    res.status(200).json({
      message: 'Database connection successful!',
      testResults: {
        created: testUser ? 'Success' : 'Failed',
        read: foundUser ? 'Success' : 'Failed',
        updated: 'Success',
        deleted: 'Success'
      }
    });
  } catch (error) {
    console.error('Database test error:', error);
    res.status(500).json({
      message: 'Database connection failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 