import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Resource from '@/models/Resource';
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

    if (!subjectId) {
      return NextResponse.json(
        { error: 'Subject ID is required' },
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

    const resources = await Resource.find({ subject: subjectId })
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ resources });
  } catch (error) {
    console.error('Error fetching resources:', error);
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

    const { title, description, type, fileUrl, subjectId } = await req.json();

    // Verify teacher owns the subject
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

    const resource = await Resource.create({
      title,
      description,
      type,
      fileUrl,
      subject: subjectId,
      uploadedBy: session.user.id,
    });

    return NextResponse.json({ resource }, { status: 201 });
  } catch (error) {
    console.error('Error creating resource:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
