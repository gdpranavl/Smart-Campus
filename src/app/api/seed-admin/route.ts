import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

// This is a development-only endpoint that should be disabled in production
export async function GET() {
  // Skip in production
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'This endpoint is disabled in production mode' },
      { status: 403 }
    );
  }

  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@college.edu' });
    
    if (existingAdmin) {
      return NextResponse.json({ message: 'Admin user already exists', admin: {
        email: existingAdmin.email,
        role: existingAdmin.role,
        status: 'exists'
      }});
    }
    
    // Create new admin user
    const newAdmin = new User({
      name: 'Admin User',
      email: 'admin@college.edu',
      password: 'admin123', // Will be hashed by the model pre-save hook
      role: 'admin',
      department: 'Administration',
      accountStatus: 'approved',
      profileImage: '/images/avatars/admin-avatar.png'
    });
    
    await newAdmin.save();
    
    return NextResponse.json({ 
      message: 'Admin user created successfully', 
      admin: {
        email: 'admin@college.edu',
        password: 'admin123', // Only showing for development
        role: 'admin',
        status: 'created'
      }
    });
    
  } catch (error) {
    console.error('Error seeding admin user:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}
