import { NextResponse } from 'next/server';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { authenticateUser } from '@/utils/mockAuth';

const JWT_SECRET = process.env.JWT_SECRET || 'temporary-jwt-secret-for-development';
const JWT_EXPIRY = '7d'; // Fixed expiry time for consistency

if (!JWT_SECRET && process.env.NODE_ENV !== 'development') {
  throw new Error('JWT_SECRET is not defined in environment variables');
}

export async function POST(request: Request) {
  try {
    // Validate request body
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Authenticate user with mock auth system
    const user = authenticateUser(email, password);
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token with proper type assertions
    const signOptions: SignOptions = {
      expiresIn: JWT_EXPIRY,
      algorithm: 'HS256'
    };

    const token = jwt.sign(
      { 
        userId: user.id,
        email: user.email,
        role: user.role,
        accountStatus: user.accountStatus
      },
      JWT_SECRET as Secret,
      signOptions
    );

    // Set HTTP-only cookie with the token
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        accountStatus: user.accountStatus,
        department: user.department,
        profileImage: user.profileImage || ''
      }
    });

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}