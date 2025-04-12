import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Subject from '@/models/Subject';
import Attendance from '@/models/Attendance';
import Assignment from '@/models/Assignment';
import Quiz from '@/models/Quiz';

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

    const user = await User.findOne({ email: session.user?.email });
    if (!user || user.role !== 'student') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get all subjects for the student's semester
    const subjects = await Subject.find({ semester: user.semester });

    // Get performance data for each subject
    const performance = await Promise.all(
      subjects.map(async (subject) => {
        // Get attendance
        const attendanceRecords = await Attendance.find({
          student: user._id,
          subject: subject._id,
        });
        const totalClasses = attendanceRecords.length;
        const presentClasses = attendanceRecords.filter(
          (record) => record.status === 'present'
        ).length;
        const attendancePercentage = totalClasses > 0
          ? (presentClasses / totalClasses) * 100
          : 0;

        // Get assignments
        const assignments = await Assignment.find({
          subject: subject._id,
          student: user._id,
        });
        const totalAssignments = assignments.length;
        const completedAssignments = assignments.filter(
          (assignment) => assignment.status === 'completed'
        ).length;

        // Get quizzes
        const quizzes = await Quiz.find({
          subject: subject._id,
          'submissions.student': user._id,
        });
        const quizScores = quizzes.map((quiz) => {
          const submission = quiz.submissions.find(
            (sub) => sub.student.toString() === user._id.toString()
          );
          return {
            score: submission?.score || 0,
            total: quiz.totalMarks,
          };
        });

        // Calculate overall marks
        const totalMarks = 100; // Assuming max marks is 100
        const marks = Math.round(
          (attendancePercentage * 0.2 +
            (completedAssignments / totalAssignments) * 100 * 0.3 +
            (quizScores.reduce((acc, curr) => acc + (curr.score / curr.total), 0) /
              quizScores.length) *
              100 *
              0.5) || 0
        );

        return {
          subject: subject.name,
          marks,
          maxMarks: totalMarks,
          attendance: attendancePercentage,
          assignments: {
            completed: completedAssignments,
            total: totalAssignments,
          },
          quizzes: quizScores,
        };
      })
    );

    // Calculate performance trends
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const trends = await Promise.all(
      Array.from({ length: 6 }, (_, i) => {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const month = date.toLocaleString('default', { month: 'short' });
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        return Promise.all([
          // Get attendance for the month
          Attendance.find({
            student: user._id,
            date: { $gte: startOfMonth, $lte: endOfMonth },
          }),
          // Get assignments for the month
          Assignment.find({
            student: user._id,
            submissionDate: { $gte: startOfMonth, $lte: endOfMonth },
          }),
          // Get quizzes for the month
          Quiz.find({
            'submissions.student': user._id,
            date: { $gte: startOfMonth, $lte: endOfMonth },
          }),
        ]).then(([attendance, assignments, quizzes]) => {
          const attendancePercentage =
            attendance.length > 0
              ? (attendance.filter((a) => a.status === 'present').length /
                  attendance.length) *
                100
              : 0;

          const assignmentPercentage =
            assignments.length > 0
              ? (assignments.filter((a) => a.status === 'completed').length /
                  assignments.length) *
                100
              : 0;

          const quizAverage =
            quizzes.length > 0
              ? quizzes.reduce((acc, quiz) => {
                  const submission = quiz.submissions.find(
                    (sub) => sub.student.toString() === user._id.toString()
                  );
                  return acc + (submission?.score || 0) / quiz.totalMarks;
                }, 0) / quizzes.length * 100
              : 0;

          return {
            month,
            attendance: attendancePercentage,
            assignments: assignmentPercentage,
            averageScore: quizAverage,
          };
        });
      })
    );

    return NextResponse.json({
      performance,
      trends: trends.reverse(), // Most recent month first
    });
  } catch (error) {
    console.error('Error fetching performance:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
