'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import SubjectCard from '@/components/teacher/SubjectCard';
import ResourceUpload from '@/components/teacher/ResourceUpload';
import AttendanceManager from '@/components/teacher/AttendanceManager';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('subjects');
  const { user } = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTeacherSubjects();
  }, []);

  const fetchTeacherSubjects = async () => {
    try {
      const response = await fetch('/api/teacher/subjects');
      const data = await response.json();
      if (response.ok) {
        setSubjects(data.subjects);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back, {user?.name}
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
                onUpdate={fetchTeacherSubjects}
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
