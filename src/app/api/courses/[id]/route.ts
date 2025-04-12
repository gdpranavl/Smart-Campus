import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Subject from '@/models/Subject';
import Resource from '@/models/Resource';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Types } from 'mongoose';

interface ResourceCount {
  _id: string;
  count: number;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const subject = await Subject.findById(params.id)
      .populate('teacher', 'name email')
      .lean();

    if (!subject) {
      return NextResponse.json(
        { error: 'Course not found' },
        { status: 404 }
      );
    }

    // Get resource counts by type
    const resourceCounts = await Resource.aggregate([
      { $match: { subject: new Types.ObjectId(params.id) } },
      { $group: { _id: '$type', count: { $sum: 1 } } }
    ]) as ResourceCount[];

    // Calculate total resources for progress
    const totalResources = resourceCounts.reduce((acc: number, curr: ResourceCount) => acc + curr.count, 0);
    
    // Format the response
    const course = {
      id: subject._id,
      name: subject.name,
      code: subject.code,
      description: subject.description,
      semester: subject.semester,
      instructor: subject.teacher.name,
      instructorEmail: subject.teacher.email,
      progress: totalResources > 0 ? Math.round((totalResources / 4) * 100) : 0, // Assuming we expect resources in all 4 categories
      resourceStats: Object.fromEntries(
        resourceCounts.map(({ _id, count }: ResourceCount) => [_id, count])
      ),
      createdAt: subject.createdAt,
      updatedAt: subject.updatedAt,
    };

    return NextResponse.json({ course });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
