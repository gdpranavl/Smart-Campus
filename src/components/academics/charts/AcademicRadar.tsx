"use client";

import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import { Grade } from '@/utils/academicsData';

interface AcademicRadarProps {
  grades: Grade[];
}

export default function AcademicRadar({ grades }: AcademicRadarProps) {
  // Categorize courses by subject area
  const subjectAreas = [
    { name: 'Computer Science', courses: ['cse101', 'cs202'] },
    { name: 'Mathematics', courses: ['math201'] },
    { name: 'Science', courses: ['phy101'] },
    { name: 'Humanities', courses: ['eng202'] },
    { name: 'Critical Thinking', computed: true },
    { name: 'Problem Solving', computed: true },
  ];

  // Calculate average performance in each subject area
  const data = subjectAreas.map(area => {
    let value;

    if (area.computed) {
      // For computed metrics (not directly tied to specific courses)
      switch (area.name) {
        case 'Critical Thinking':
          // Compute based on specific course performance
          value = (getGradeValue('eng202', grades) * 0.6) + 
                  (getGradeValue('phy101', grades) * 0.4);
          break;
        case 'Problem Solving':
          // Compute based on specific course performance
          value = (getGradeValue('cs202', grades) * 0.5) + 
                  (getGradeValue('math201', grades) * 0.5);
          break;
        default:
          value = 75; // Default value
      }
    } else {
      // Calculate average grade for courses in this subject area
      const areaGrades = grades.filter(g => area.courses.includes(g.courseId));
      value = areaGrades.length > 0
        ? areaGrades.reduce((sum, g) => sum + g.overallGrade, 0) / areaGrades.length
        : 75; // Default value if no courses found
    }

    return {
      subject: area.name,
      value: Math.round(value), // Round to integer
      fullMark: 100,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 100]} />
        <Radar
          name="Performance"
          dataKey="value"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.6}
        />
        <Tooltip formatter={(value) => [`${value}%`, 'Performance']} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

// Helper function to get grade value for a specific course
function getGradeValue(courseId: string, grades: Grade[]): number {
  const grade = grades.find(g => g.courseId === courseId);
  return grade ? grade.overallGrade : 75; // Return default if not found
}
