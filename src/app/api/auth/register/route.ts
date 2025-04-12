import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: Request) {
  try {
    // Connect to database
    await connectDB();

    // Parse request body
    const body = await request.json();
    const { name, email, password, role, message, department = 'General' } = body;

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 409 }
      );
    }

    // Validate role 
    const validRoles = ['student', 'teacher'];
    if (!validRoles.includes(role)) {
      return NextResponse.json(
        { error: 'Invalid role' },
        { status: 400 }
      );
    }

    // Create new user (status is automatically set to 'pending' by the model)
    const newUser = new User({
      name,
      email,
      password, // Will be hashed by the model pre-save hook
      role,
      department,
      accountStatus: 'pending', // Explicitly set status to pending
      message: message || ''
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: 'Account request submitted successfully. An administrator will review your application.'
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
