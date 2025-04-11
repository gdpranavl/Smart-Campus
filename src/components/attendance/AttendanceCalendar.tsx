"use client";
import { useState, useEffect } from 'react';
import { generateDailyAttendance, DailyAttendance } from '@/utils/attendanceData';

export default function AttendanceCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [attendanceData, setAttendanceData] = useState<DailyAttendance[]>([]);
  const [selectedDayData, setSelectedDayData] = useState<DailyAttendance | null>(null);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const data = generateDailyAttendance();
    setAttendanceData(data);
    
    // Select today or the most recent day with attendance data
    if (data.length > 0) {
      setSelectedDate(data[data.length - 1].date);
    }
  }, []);
  
  useEffect(() => {
    if (selectedDate) {
      const dayData = attendanceData.find(day => day.date === selectedDate) || null;
      setSelectedDayData(dayData);
    }
  }, [selectedDate, attendanceData]);
  
  // Helper to format date as "Apr 15, 2025"
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Helper to get status badge style
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'present':
        return 'bg-green-100 text-green-700';
      case 'absent':
        return 'bg-red-100 text-red-700';
      case 'late':
        return 'bg-yellow-100 text-yellow-700';
      case 'excused':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-black">Attendance Calendar</h3>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <div key={index} className="text-center text-black font-medium text-sm py-1">
              {day}
            </div>
          ))}
          
          {/* Empty cells before the first day */}
          {attendanceData.length > 0 && Array.from(
            { length: new Date(attendanceData[0].date).getDay() || 7 }, 
            (_, i) => (
              <div key={`empty-${i}`} className="h-10 rounded-md"></div>
            )
          )}
          
          {/* Calendar days */}
          {attendanceData.map((day) => {
            const date = new Date(day.date);
            const dayOfMonth = date.getDate();
            
            // Count attendance statuses
            const presentCount = day.classes.filter(c => c.status === 'present').length;
            const totalCount = day.classes.length;
            
            // Determine day color based on attendance
            let dayColor = 'bg-gray-100';
            if (totalCount > 0) {
              const percentage = (presentCount / totalCount) * 100;
              if (percentage === 100) dayColor = 'bg-green-600';
              else if (percentage >= 50) dayColor = 'bg-yellow-400';
              else dayColor = 'bg-red-600';
            }
            
            return (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className={`h-10 rounded-md flex items-center justify-center text-sm text font-bold ${
                  selectedDate === day.date 
                    ? 'ring-2 ring-black bg-blue-200 font-bold text-black' 
                    : dayColor 
                }`}
              >
                {dayOfMonth}
              </button>
            );
          })}
        </div>
        
        {selectedDayData && (
          <div className="mt-6">
            <h4 className="font-medium text-lg mb-2 text-black">
              {selectedDayData.dayName}, {formatDate(selectedDayData.date)}
            </h4>
            
            <div className="space-y-3 mt-4">
              {selectedDayData.classes.map((classInfo) => (
                <div 
                  key={classInfo.id} 
                  className="flex justify-between items-center p-3 border rounded-md"
                >
                  <div>
                    <p className="font-medium text-black">{classInfo.subject}</p>
                    <p className="text-sm text-gray-600">{classInfo.time} • {classInfo.professor}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(classInfo.status)}`}>
                    {classInfo.status.charAt(0).toUpperCase() + classInfo.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
