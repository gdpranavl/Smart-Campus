"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Grade } from '@/utils/academicsData';

interface SubjectComparisonProps {
  grades: Grade[];
}

export default function SubjectComparison({ grades }: SubjectComparisonProps) {
  // Prepare data for the bar chart
  const data = grades.map(grade => ({
    name: grade.courseName.split(' ').slice(0, 2).join(' '), // Shorter name for display
    assignments: grade.assignmentsGrade,
    midterm: grade.midtermGrade,
    final: grade.finalGrade > 0 ? grade.finalGrade : null, // Don't show if not available
    overall: grade.overallGrade,
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip formatter={(value) => [`${value}%`, '']} />
        <Bar dataKey="assignments" name="Assignments" fill="#8884d8" />
        <Bar dataKey="midterm" name="Midterm" fill="#82ca9d" />
        <Bar dataKey="final" name="Final" fill="#ffc658" />
        <Bar dataKey="overall" name="Overall" fill="#ff7300" />
      </BarChart>
    </ResponsiveContainer>
  );
}
