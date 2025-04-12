'use client';

import { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';

interface Performance {
  subject: string;
  marks: number;
  maxMarks: number;
  attendance: number;
  assignments: {
    completed: number;
    total: number;
  };
  quizzes: {
    score: number;
    total: number;
  }[];
}

interface PerformanceTrend {
  month: string;
  attendance: number;
  assignments: number;
  averageScore: number;
}

export default function PerformanceAnalytics() {
  const [performance, setPerformance] = useState<Performance[]>([]);
  const [trends, setTrends] = useState<PerformanceTrend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPerformanceData();
  }, []);

  const fetchPerformanceData = async () => {
    try {
      const response = await fetch('/api/student/performance');
      const data = await response.json();
      if (response.ok) {
        setPerformance(data.performance);
        setTrends(data.trends);
      }
    } catch (error) {
      console.error('Failed to fetch performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Calculate overall statistics
  const overallStats = performance.reduce(
    (acc, curr) => {
      acc.totalMarks += curr.marks;
      acc.maxMarks += curr.maxMarks;
      acc.totalAttendance += curr.attendance;
      acc.subjectCount += 1;
      return acc;
    },
    { totalMarks: 0, maxMarks: 0, totalAttendance: 0, subjectCount: 0 }
  );

  const overallPercentage = (overallStats.totalMarks / overallStats.maxMarks) * 100;
  const averageAttendance = (overallStats.totalAttendance / overallStats.subjectCount);

  // Prepare data for radar chart
  const radarData = performance.map(subject => ({
    subject: subject.subject,
    marks: (subject.marks / subject.maxMarks) * 100,
    attendance: subject.attendance,
    assignments: (subject.assignments.completed / subject.assignments.total) * 100,
  }));

  return (
    <div className="space-y-6">
      {/* Overall Performance Card */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Overall Performance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 rounded-lg p-4">
            <p className="text-sm font-medium text-indigo-600">Overall Grade</p>
            <p className="mt-2 text-3xl font-bold text-indigo-900">
              {overallPercentage.toFixed(1)}%
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm font-medium text-green-600">Attendance</p>
            <p className="mt-2 text-3xl font-bold text-green-900">
              {averageAttendance.toFixed(1)}%
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm font-medium text-purple-600">Rank</p>
            <p className="mt-2 text-3xl font-bold text-purple-900">5/120</p>
          </div>
        </div>
      </div>

      {/* Performance Trends */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="averageScore"
                stroke="#4f46e5"
                name="Average Score"
              />
              <Line
                type="monotone"
                dataKey="attendance"
                stroke="#22c55e"
                name="Attendance"
              />
              <Line
                type="monotone"
                dataKey="assignments"
                stroke="#7c3aed"
                name="Assignments"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Subject-wise Performance */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Subject-wise Performance</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performance}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="marks"
                fill="#4f46e5"
                name="Marks"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Skills Radar */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Performance Metrics</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="subject" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar
                name="Marks"
                dataKey="marks"
                stroke="#4f46e5"
                fill="#4f46e5"
                fillOpacity={0.6}
              />
              <Radar
                name="Attendance"
                dataKey="attendance"
                stroke="#22c55e"
                fill="#22c55e"
                fillOpacity={0.6}
              />
              <Radar
                name="Assignments"
                dataKey="assignments"
                stroke="#7c3aed"
                fill="#7c3aed"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
