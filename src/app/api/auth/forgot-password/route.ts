import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { sendPasswordResetEmail } from '@/utils/email';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: 'No user found with that email' },
        { status: 404 }
      );
    }

    // Generate reset token
    const resetToken = user.createPasswordResetToken();
    await user.save();

    try {
      await sendPasswordResetEmail(email, resetToken);

      return NextResponse.json(
        { message: 'Password reset email sent' },
        { status: 200 }
      );
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      return NextResponse.json(
        { error: 'Error sending email' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Password reset error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
