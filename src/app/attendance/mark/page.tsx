import AttendanceMarking from '@/components/attendance/AttendanceMarking';

export default function MarkAttendancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black">Mark Attendance</h1>
        <p className="mt-1 text-sm text-gray-500">
          Record student attendance for your classes.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <AttendanceMarking />
      </div>
    </div>
  );
}
