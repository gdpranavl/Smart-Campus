"use client";
import { calculateOverallAttendance, subjectAttendanceData } from '@/utils/attendanceData';

export default function AttendanceSummary() {
  const overallAttendance = calculateOverallAttendance();
  
  // Determine status color based on percentage
  const getStatusColor = (percentage: number) => {
    if (percentage >= 85) return 'text-green-500';
    if (percentage >= 75) return 'text-yellow-500';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-black">Attendance Summary</h3>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-center mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold mb-2 relative">
              <span className={getStatusColor(overallAttendance.percentage)}>
                {overallAttendance.percentage}%
              </span>
            </div>
            <p className="text-sm text-black">
              Overall Attendance ({overallAttendance.attended} of {overallAttendance.total} classes)
            </p>
            <p className={`text-xs font-semibold ${
                        overallAttendance.percentage >= 90 ? 'text-green-600' : 
                        overallAttendance.percentage >= 75 ? 'text-yellow-500' : 'text-red-600'
                      }`}>
              {overallAttendance.percentage >= 75 
                ? "You're meeting attendance requirements" 
                : "Your attendance is below the required 75%"}
            </p>
          </div>
        </div>
        
        <h4 className="text-md font-medium mb-4 border-b pb-2 text-gray-400">Subject-wise Attendance</h4>
        <div className="space-y-4">
          {subjectAttendanceData.map((subject) => (
            <div key={subject.id} className="flex items-center">
              <div className="w-1/2">
                <p className="text-sm font-medium text-gray-400">{subject.name}</p>
              </div>
              <div className="w-1/2">
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                    <div 
                      className={`h-2.5 rounded-full ${
                        (subject.attended / subject.total) >= 0.9 ? 'bg-green-600' : 
                        (subject.attended / subject.total) >= 0.75 ? 'bg-yellow-500' : 'bg-red-600'
                      }`} 
                      style={{ width: `${(subject.attended / subject.total)*100}%` }}
                    ></div>
                  </div>
                  <span className={`text-xs font-semibold ${
                        (subject.attended / subject.total) >= 0.90 ? 'text-green-600' : 
                        (subject.attended / subject.total) >= 0.75 ? 'text-yellow-500' : 'text-red-600'
                      }`}>
                    {((subject.attended / subject.total)*100).toPrecision(4)}%
                  </span>
                </div>
                <p className="text-xs text-black mt-1">
                  {subject.attended} of {subject.total} classes
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
