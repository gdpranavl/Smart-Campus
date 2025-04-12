import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Attendance from '@/models/Attendance';
import Subject from '@/models/Subject';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();
    const url = new URL(req.url);
    const subjectId = url.searchParams.get('subject');
    const date = url.searchParams.get('date');

    if (!subjectId || !date) {
      return NextResponse.json(
        { error: 'Subject ID and date are required' },
        { status: 400 }
      );
    }

    // If teacher, verify they own the subject
    if (session.user.role === 'teacher') {
      const subject = await Subject.findOne({
        _id: subjectId,
        teacher: session.user.id,
      });

      if (!subject) {
        return NextResponse.json(
          { error: 'Subject not found' },
          { status: 404 }
        );
      }
    }

    const attendance = await Attendance.find({
      subject: subjectId,
      date: new Date(date),
    })
      .populate('student', 'name email')
      .lean();

    return NextResponse.json({ attendance });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'teacher') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { attendance } = await req.json();

    if (!Array.isArray(attendance)) {
      return NextResponse.json(
        { error: 'Invalid attendance data' },
        { status: 400 }
      );
    }

    // Verify teacher owns the subject
    const subject = await Subject.findOne({
      _id: attendance[0]?.subject,
      teacher: session.user.id,
    });

    if (!subject) {
      return NextResponse.json(
        { error: 'Subject not found' },
        { status: 404 }
      );
    }

    // Delete existing attendance records for this date and subject
    await Attendance.deleteMany({
      subject: attendance[0]?.subject,
      date: new Date(attendance[0]?.date),
    });

    // Create new attendance records
    const attendanceRecords = attendance.map(record => ({
      ...record,
      markedBy: session.user.id,
    }));

    await Attendance.insertMany(attendanceRecords);

    return NextResponse.json(
      { message: 'Attendance saved successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error saving attendance:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
