"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function SemesterComparison() {
  // Sample data for semester comparison
  const data = [
    { name: 'Fall 2023', gpa: 3.40, credits: 15 },
    { name: 'Spring 2024', gpa: 3.52, credits: 15 },
    { name: 'Fall 2024', gpa: 3.65, credits: 18 },
    { name: 'Spring 2025', gpa: 3.78, credits: 18 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" domain={[2.5, 4.0]} tickCount={7} />
        <YAxis yAxisId="right" orientation="right" domain={[0, 21]} tickCount={8} />
        <Tooltip 
          formatter={(value, name) => [
            name === 'gpa' ? value.toFixed(2) : value,
            name === 'gpa' ? 'GPA' : 'Credit Hours'
          ]}
        />
        <Legend />
        <Line 
          yAxisId="left"
          type="monotone" 
          dataKey="gpa" 
          name="GPA" 
          stroke="#8884d8" 
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
        <Line 
          yAxisId="right"
          type="monotone" 
          dataKey="credits" 
          name="Credit Hours" 
          stroke="#82ca9d"
          strokeDasharray="5 5"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
