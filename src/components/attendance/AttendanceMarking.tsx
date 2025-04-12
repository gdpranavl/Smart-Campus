"use client";
import { useState } from 'react';

// Mock data for class
const classData = {
  id: 'cs101',
  name: 'Introduction to Computer Science',
  time: '10:00 AM - 11:00 AM',
  date: new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long',
    day: 'numeric', 
    year: 'numeric' 
  }),
  students: [
    { id: 1, name: 'Rohan Sharma', rollNo: 'CS2023001' },
    { id: 2, name: 'Priyanka Patel', rollNo: 'CS2023002' },
    { id: 3, name: 'Arjun Kapoor', rollNo: 'CS2023003' },
    { id: 4, name: 'Sneha Gupta', rollNo: 'CS2023004' },
    { id: 5, name: 'Rahul Jain', rollNo: 'CS2023005' },
    { id: 6, name: 'Aisha Khan', rollNo: 'CS2023006' },
    { id: 7, name: 'Karan Singh', rollNo: 'CS2023007' },
    { id: 8, name: 'Nalini Rao', rollNo: 'CS2023008' },
    { id: 9, name: 'Vikram Verma', rollNo: 'CS2023009' },
    { id: 10, name: 'Shreya Mishra', rollNo: 'CS2023010' },
  ]
};

export default function AttendanceMarking() {
  const [attendance, setAttendance] = useState<Record<number, string>>(
    Object.fromEntries(classData.students.map(student => [student.id, 'present']))
  );
  const [saved, setSaved] = useState(false);
  
  const handleStatusChange = (studentId: number, status: string) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
    setSaved(false);
  };
  
  const handleSave = () => {
    // In a real app, this would be an API call
    console.log("Saving attendance data:", attendance);
    setSaved(true);
    
    // Reset saved status after 3 seconds
    setTimeout(() => setSaved(false), 3000);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Mark Attendance</h3>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">{classData.name}</h2>
          <p className="text-sm text-gray-500">
            {classData.date} • {classData.time}
          </p>
        </div>
        
        <div className="overflow-hidden border border-gray-200 sm:rounded-lg mb-6">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roll No
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {classData.students.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {student.rollNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {student.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <select
                      value={attendance[student.id]}
                      onChange={(e) => handleStatusChange(student.id, e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="present">Present</option>
                      <option value="absent">Absent</option>
                      <option value="late">Late</option>
                      <option value="excused">Excused</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            {saved && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Attendance saved successfully
              </span>
            )}
          </div>
          <div className="flex space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
