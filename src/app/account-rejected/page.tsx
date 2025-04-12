"use client";

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AccountRejectedPage() {
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
    
    // If user is authenticated but status is not rejected, redirect to appropriate page
    if (!isLoading && isAuthenticated && user?.accountStatus !== 'rejected') {
      if (user?.accountStatus === 'pending') {
        router.push('/account-pending');
      } else if (user?.role === 'admin') {
        router.push('/admin/dashboard');
      } else if (user?.role === 'teacher') {
        router.push('/teacher/dashboard');
      } else {
        router.push('/dashboard');
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-16 w-16 mx-auto text-red-500" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
        
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Account Access Declined</h1>
        
        <p className="mt-2 text-gray-600">
          Unfortunately, your account request has been declined by the administrator.
          This could be due to various reasons including verification issues or policy guidelines.
        </p>
        
        <div className="mt-6 p-4 bg-red-50 rounded-md">
          <p className="text-sm text-red-700">
            <strong>What to do next:</strong> If you believe this is an error or would like to 
            provide additional information, please contact the IT department directly at 
            <a href="mailto:it-support@college.edu" className="underline">it-support@college.edu</a>.
          </p>
        </div>
        
        <button
          onClick={() => logout()}
          className="mt-6 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Return to Login
        </button>
      </div>
    </div>
  );
}
