"use client";

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Grade } from '@/utils/academicsData';

interface PerformanceGradeDistributionProps {
  grades: Grade[];
}

export default function PerformanceGradeDistribution({ grades }: PerformanceGradeDistributionProps) {
  // Count the number of each letter grade
  const gradeCounts: Record<string, number> = {};
  grades.forEach(grade => {
    gradeCounts[grade.letterGrade] = (gradeCounts[grade.letterGrade] || 0) + 1;
  });

  // Format data for the pie chart
  const data = Object.keys(gradeCounts).map(letterGrade => ({
    name: letterGrade,
    value: gradeCounts[letterGrade],
    color: getGradeColor(letterGrade)
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Legend verticalAlign="bottom" height={36} />
        <Tooltip formatter={(value) => [`${value} course(s)`, 'Count']} />
      </PieChart>
    </ResponsiveContainer>
  );
}

// Helper function to get color based on letter grade
function getGradeColor(letterGrade: string): string {
  switch (letterGrade.charAt(0)) {
    case 'A': return '#4CAF50'; // Green
    case 'B': return '#2196F3'; // Blue
    case 'C': return '#FFC107'; // Yellow/Amber
    case 'D': return '#FF9800'; // Orange
    case 'F': return '#F44336'; // Red
    default: return '#9E9E9E'; // Grey
  }
}
