'use client';

import { useState, useEffect } from 'react';
import SubjectCard from '@/components/teacher/SubjectCard';
import ResourceUpload from '@/components/teacher/ResourceUpload';
import AttendanceManager from '@/components/teacher/AttendanceManager';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('subjects');
  
  // Sample teacher data for demo purposes
  const sampleTeacher = {
    name: 'Professor Smith',
    role: 'teacher'
  };
  
  // Sample subjects data for demo purposes
  const [subjects, setSubjects] = useState([
    {
      _id: '1',
      name: 'Introduction to Computer Science',
      code: 'CS101',
      schedule: 'Mon, Wed 10:00 AM - 11:30 AM',
      students: 45,
      resources: [
        { _id: '1', title: 'Syllabus', type: 'pdf', url: '#' },
        { _id: '2', title: 'Week 1 Slides', type: 'ppt', url: '#' }
      ]
    },
    {
      _id: '2',
      name: 'Data Structures and Algorithms',
      code: 'CS201',
      schedule: 'Tue, Thu 1:00 PM - 2:30 PM',
      students: 38,
      resources: [
        { _id: '3', title: 'Course Overview', type: 'pdf', url: '#' },
        { _id: '4', title: 'Assignment 1', type: 'docx', url: '#' }
      ]
    }
  ]);
  
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back, {sampleTeacher.name}
          </p>
        </div>

        <div className="mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('subjects')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'subjects'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Subjects & Resources
            </button>
            <button
              onClick={() => setActiveTab('attendance')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'attendance'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Attendance
            </button>
          </nav>
        </div>

        {activeTab === 'subjects' && (
          <div className="space-y-6">
            {subjects.map((subject) => (
              <SubjectCard
                key={subject._id}
                subject={subject}
                onUpdate={() => {}}
              />
            ))}
            {subjects.length === 0 && (
              <p className="text-gray-500 text-center py-8">
                No subjects assigned yet.
              </p>
            )}
          </div>
        )}

        {activeTab === 'attendance' && (
          <AttendanceManager subjects={subjects} />
        )}
      </div>
    </div>
  );
}
