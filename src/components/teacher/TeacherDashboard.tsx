'use client';

import { useState } from 'react';
import AttendanceCard from './AttendanceCard';
import ResourceUploadCard from './ResourceUploadCard';
import SubjectsCard from './SubjectsCard';
import StudentsCard from './StudentsCard';

export default function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <nav className="mt-4">
            <ul className="flex space-x-4 border-b">
              {['overview', 'attendance', 'resources', 'subjects', 'students'].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium capitalize ${
                      activeTab === tab
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Stats</h3>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Total Students</dt>
                    <dd className="mt-1 text-3xl font-semibold text-indigo-600">150</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Subjects Teaching</dt>
                    <dd className="mt-1 text-3xl font-semibold text-indigo-600">4</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Resources Uploaded</dt>
                    <dd className="mt-1 text-3xl font-semibold text-indigo-600">25</dd>
                  </div>
                </dl>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-indigo-500 pl-4">
                    <p className="text-sm text-gray-600">Uploaded new lecture notes</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="text-sm text-gray-600">Marked attendance for CSE101</p>
                    <p className="text-xs text-gray-400">4 hours ago</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Upcoming Classes</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">CSE101</p>
                      <p className="text-xs text-gray-500">Room 301</p>
                    </div>
                    <p className="text-sm text-gray-500">10:00 AM</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">CSE202</p>
                      <p className="text-xs text-gray-500">Room 405</p>
                    </div>
                    <p className="text-sm text-gray-500">2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'attendance' && <AttendanceCard />}
          {activeTab === 'resources' && <ResourceUploadCard />}
          {activeTab === 'subjects' && <SubjectsCard />}
          {activeTab === 'students' && <StudentsCard />}
        </div>
      </div>
    </div>
  );
}
