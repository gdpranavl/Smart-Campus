"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { enrolledCourses } from '@/utils/academicsData';

interface GradeTimelineProps {
  courseId: string;
}

export default function GradeTimeline({ courseId }: GradeTimelineProps) {
  // Sample data for timeline progression
  const allData = {
    // Sample data for all courses combined
    all: [
      { week: 'Week 1', grade: 92 },
      { week: 'Week 2', grade: 88 },
      { week: 'Week 3', grade: 90 },
      { week: 'Week 4', grade: 87 },
      { week: 'Week 5', grade: 85 },
      { week: 'Week 6', grade: 89 },
      { week: 'Week 7', grade: 91 },
      { week: 'Week 8', grade: 93 }, // Midterm
      { week: 'Week 9', grade: 90 },
      { week: 'Week 10', grade: 88 },
      { week: 'Week 11', grade: 91 },
      { week: 'Week 12', grade: 92 },
    ],
    // Data for CSE101
    cse101: [
      { week: 'Week 1', grade: 95 },
      { week: 'Week 2', grade: 92 },
      { week: 'Week 3', grade: 94 },
      { week: 'Week 4', grade: 90 },
      { week: 'Week 5', grade: 88 },
      { week: 'Week 6', grade: 91 },
      { week: 'Week 7', grade: 93 },
      { week: 'Week 8', grade: 94 }, // Midterm
      { week: 'Week 9', grade: 92 },
      { week: 'Week 10', grade: 90 },
      { week: 'Week 11', grade: 93 },
      { week: 'Week 12', grade: 95 },
    ],
    // Data for Math201
    math201: [
      { week: 'Week 1', grade: 90 },
      { week: 'Week 2', grade: 85 },
      { week: 'Week 3', grade: 88 },
      { week: 'Week 4', grade: 82 },
      { week: 'Week 5', grade: 80 },
      { week: 'Week 6', grade: 85 },
      { week: 'Week 7', grade: 87 },
      { week: 'Week 8', grade: 90 }, // Midterm
      { week: 'Week 9', grade: 88 },
      { week: 'Week 10', grade: 86 },
      { week: 'Week 11', grade: 89 },
      { week: 'Week 12', grade: 90 },
    ],
    // Data for PHY101
    phy101: [
      { week: 'Week 1', grade: 88 },
      { week: 'Week 2', grade: 82 },
      { week: 'Week 3', grade: 85 },
      { week: 'Week 4', grade: 80 },
      { week: 'Week 5', grade: 78 },
      { week: 'Week 6', grade: 83 },
      { week: 'Week 7', grade: 85 },
      { week: 'Week 8', grade: 87 }, // Midterm
      { week: 'Week 9', grade: 84 },
      { week: 'Week 10', grade: 83 },
      { week: 'Week 11', grade: 85 },
      { week: 'Week 12', grade: 87 },
    ],
    // Add more course data as needed
  };

  // Use the course ID to select the appropriate data, fallback to 'all' if not found
  const data = allData[courseId as keyof typeof allData] || allData.all;
  
  // Get course name for display
  const courseName = courseId === 'all' ? 'All Courses' : 
    enrolledCourses.find(course => course.id === courseId)?.name || 'Selected Course';

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="week" />
        <YAxis domain={[60, 100]} />
        <Tooltip formatter={(value) => [`${value}%`, 'Grade']} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="grade" 
          name={courseName}
          stroke="#8884d8" 
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
        {/* Add benchmark line if needed */}
        <Line 
          type="monotone" 
          dataKey="benchmark" 
          name="Class Average" 
          stroke="#82ca9d" 
          strokeDasharray="5 5" 
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
