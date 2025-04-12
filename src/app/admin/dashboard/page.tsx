"use client";

import { useState } from 'react';

interface AccountUser {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  accountStatus: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('pending-accounts');
  
  // Sample admin data for demo purposes
  const sampleAdmin = {
    name: 'Rohan Sharma',
    role: 'admin'
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Welcome, {sampleAdmin.name} | Admin Control Panel
          </p>
        </div>

        <div className="mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('pending-accounts')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'pending-accounts'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Pending Accounts
            </button>
            <button
              onClick={() => setActiveTab('manage-users')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'manage-users'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Manage Users
            </button>
            <button
              onClick={() => setActiveTab('system-settings')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                activeTab === 'system-settings'
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              System Settings
            </button>
          </nav>
        </div>

        {activeTab === 'pending-accounts' && <PendingAccountsTab />}
        {activeTab === 'manage-users' && <ManageUsersTab />}
        {activeTab === 'system-settings' && <SystemSettingsTab />}
      </div>
    </div>
  );
}

function PendingAccountsTab() {
  // Sample pending accounts for demo purposes
  const pendingAccounts: AccountUser[] = [
    {
      _id: '1',
      name: 'Priyanka Patel',
      email: 'priyanka.patel@example.com',
      role: 'student',
      accountStatus: 'pending',
      createdAt: '2025-04-10T15:30:00.000Z'
    },
    {
      _id: '2',
      name: 'Arjun Kapoor',
      email: 'arjun.kapoor@example.com',
      role: 'teacher',
      accountStatus: 'pending',
      createdAt: '2025-04-11T10:15:00.000Z'
    }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Pending Account Requests</h2>
        <p className="mt-1 text-sm text-gray-500">
          Review and approve new account requests
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Requested
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {pendingAccounts.map((account) => (
              <tr key={account._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {account.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {account.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {account.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(account.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => alert('This would approve the account in a real implementation')}
                    className="text-green-600 hover:text-green-900 mr-4"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => alert('This would reject the account in a real implementation')}
                    className="text-red-600 hover:text-red-900"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ManageUsersTab() {
  // Sample users for demo purposes
  const users: AccountUser[] = [
    {
      _id: '3',
      name: 'Neha Reddy',
      email: 'neha.reddy@example.com',
      role: 'student',
      accountStatus: 'approved',
      createdAt: '2025-03-15T09:20:00.000Z'
    },
    {
      _id: '4',
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      role: 'teacher',
      accountStatus: 'approved',
      createdAt: '2025-03-10T14:45:00.000Z'
    },
    {
      _id: '5',
      name: 'Priyanka Patel',
      email: 'priyanka.patel@example.com',
      role: 'admin',
      accountStatus: 'approved',
      createdAt: '2025-02-20T11:30:00.000Z'
    }
  ];
  
  const [filter, setFilter] = useState('all');

  const filteredUsers = filter === 'all' 
    ? users 
    : users.filter(user => user.role === filter);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Manage Users</h2>
        <p className="mt-1 text-sm text-gray-500">
          View and manage all user accounts
        </p>
      </div>

      <div className="mb-4 flex space-x-2">
        <button 
          onClick={() => setFilter('all')}
          className={`px-3 py-1 text-sm rounded-md ${filter === 'all' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('student')}
          className={`px-3 py-1 text-sm rounded-md ${filter === 'student' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}
        >
          Students
        </button>
        <button 
          onClick={() => setFilter('teacher')}
          className={`px-3 py-1 text-sm rounded-md ${filter === 'teacher' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}
        >
          Teachers
        </button>
        <button 
          onClick={() => setFilter('admin')}
          className={`px-3 py-1 text-sm rounded-md ${filter === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}
        >
          Admins
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={user.role}
                    onChange={() => alert('This would change the user role in a real implementation')}
                    className="block w-full pl-3 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(
                      user.accountStatus
                    )}`}
                  >
                    {user.accountStatus}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => alert('This would change the account status in a real implementation')}
                    className={`${user.accountStatus === 'approved' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'} mr-4`}
                  >
                    {user.accountStatus === 'approved' ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getStatusBadgeColor(status: 'pending' | 'approved' | 'rejected' | string) {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}

function SystemSettingsTab() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">System Settings</h2>
        <p className="mt-1 text-sm text-gray-500">
          Configure system-wide settings and preferences
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-500 text-center">
          System settings functionality will be implemented in a future update.
        </p>
      </div>
    </div>
  );
}
