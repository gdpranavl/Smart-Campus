'use client';

import { useState } from 'react';
import StudentManagement from './StudentManagement';
import TeacherManagement from './TeacherManagement';
import CollegeInfo from './CollegeInfo';
import EventManagement from './EventManagement';
import DepartmentManagement from './DepartmentManagement';
import Analytics from './Analytics';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Administrator Dashboard</h1>
          <nav className="mt-4">
            <ul className="flex space-x-4 border-b overflow-x-auto">
              {[
                'overview',
                'students',
                'teachers',
                'departments',
                'events',
                'college-info',
                'analytics',
              ].map((tab) => (
                <li key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium whitespace-nowrap capitalize ${
                      activeTab === tab
                        ? 'border-b-2 border-indigo-500 text-indigo-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.replace('-', ' ')}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="space-y-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Institution Overview</h3>
                <dl className="grid grid-cols-1 gap-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Total Students</dt>
                    <dd className="mt-1 text-3xl font-semibold text-indigo-600">1,234</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Total Faculty</dt>
                    <dd className="mt-1 text-3xl font-semibold text-indigo-600">89</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Departments</dt>
                    <dd className="mt-1 text-3xl font-semibold text-indigo-600">12</dd>
                  </div>
                </dl>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-indigo-500 pl-4">
                    <p className="text-sm text-gray-600">New student registration</p>
                    <p className="text-xs text-gray-400">10 minutes ago</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-4">
                    <p className="text-sm text-gray-600">Faculty update</p>
                    <p className="text-xs text-gray-400">1 hour ago</p>
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-4">
                    <p className="text-sm text-gray-600">New event created</p>
                    <p className="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
              </div>

              {/* System Health */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">System Health</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">Storage Usage</span>
                      <span className="text-sm text-gray-500">75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">Database Load</span>
                      <span className="text-sm text-gray-500">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">API Response Time</span>
                      <span className="text-sm text-gray-500">120ms</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && <StudentManagement />}
          {activeTab === 'teachers' && <TeacherManagement />}
          {activeTab === 'departments' && <DepartmentManagement />}
          {activeTab === 'events' && <EventManagement />}
          {activeTab === 'college-info' && <CollegeInfo />}
          {activeTab === 'analytics' && <Analytics />}
        </div>
      </div>
    </div>
  );
}
