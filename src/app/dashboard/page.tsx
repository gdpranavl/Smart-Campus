"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/ui/Card';
import AttendanceChart from '@/components/dashboard/AttendanceChart';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import TodayClasses from '@/components/dashboard/TodayClasses';
import CanteenMenu from '@/components/dashboard/CanteenMenu';
import AcademicUpdates from '@/components/dashboard/AcademicUpdates';
import AITutorWidget from '@/components/dashboard/AITutorWidget';

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
        <p className="mt-1 text-sm text-gray-500">
          Here's an overview of your college activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Attendance Summary */}
        <Card title="Attendance Summary">
          <AttendanceChart />
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">Current Semester: 85% Present</p>
            <a href="/attendance" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
              View detailed attendance
            </a>
          </div>
        </Card>

        {/* Today's Classes */}
        <Card title="Today's Classes">
          <TodayClasses />
        </Card>

        {/* AI Tutor */}
        <Card title="AI Study Assistant">
          <AITutorWidget />
        </Card>

        {/* Upcoming Events */}
        <Card title="Upcoming Events">
          <UpcomingEvents />
        </Card>

        {/* Academic Updates */}
        <Card title="Academic Updates">
          <AcademicUpdates />
        </Card>

        {/* Canteen Menu */}
        <Card title="Today's Canteen Specials">
          <CanteenMenu />
        </Card>
      </div>
    </div>
  );
}
