"use client";

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { assignments } from '@/utils/academicsData';

interface AssignmentScoresProps {
  courseId: string;
}

export default function AssignmentScores({ courseId }: AssignmentScoresProps) {
  // Filter assignments by course if a specific course is selected
  const filteredAssignments = courseId === 'all' 
    ? assignments.filter(a => a.status === 'graded')
    : assignments.filter(a => a.courseId === courseId && a.status === 'graded');
  
  // Sample assignment data with grades if none available
  const sampleAssignments = [
    { id: 's1', title: 'Assignment 1', grade: 92, maxPoints: 100 },
    { id: 's2', title: 'Assignment 2', grade: 85, maxPoints: 100 },
    { id: 's3', title: 'Quiz 1', grade: 88, maxPoints: 100 },
    { id: 's4', title: 'Assignment 3', grade: 90, maxPoints: 100 },
    { id: 's5', title: 'Midterm Exam', grade: 83, maxPoints: 100 },
    { id: 's6', title: 'Assignment 4', grade: 87, maxPoints: 100 },
  ];
  
  // Use real assignments if available, otherwise use sample data
  const assignmentsToDisplay = filteredAssignments.length > 0
    ? filteredAssignments.map(a => ({
        id: a.id,
        title: a.title,
        grade: a.grade || 0,
        maxPoints: a.points
      }))
    : sampleAssignments;
  
  // Format data for chart
  const data = assignmentsToDisplay.map(assignment => ({
    name: assignment.title.length > 15 
      ? `${assignment.title.substring(0, 15)}...` 
      : assignment.title,
    grade: assignment.grade,
    percentage: Math.round((assignment.grade / assignment.maxPoints) * 100),
    fullTitle: assignment.title // Keep full title for tooltip
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="name" 
          angle={-45} 
          textAnchor="end" 
          height={70} 
          interval={0}
        />
        <YAxis domain={[0, 100]} />
        <Tooltip 
          formatter={(value, name, props) => [
            name === 'percentage' ? `${value}%` : value,
            props.payload.fullTitle
          ]}
        />
        <ReferenceLine y={70} stroke="#ff7300" strokeDasharray="3 3" label="Passing" />
        <Bar 
          dataKey="percentage" 
          name="Grade" 
          fill="#8884d8" 
          radius={[5, 5, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
