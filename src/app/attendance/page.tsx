import AttendanceSummary from '@/components/attendance/AttendanceSummary';
import AttendanceCalendar from '@/components/attendance/AttendanceCalendar';

export default function AttendancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white">Attendance</h1>
        <p className="mt-1 text-sm text-gray-400">
          View and track your attendance across all courses.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <AttendanceSummary />
        </div>
        <div>
          <AttendanceCalendar />
        </div>
      </div>
    </div>
  );
}
