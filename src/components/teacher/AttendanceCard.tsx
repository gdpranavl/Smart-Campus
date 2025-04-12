'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
}

interface Subject {
  id: string;
  name: string;
  code: string;
}

interface AttendanceRecord {
  studentId: string;
  status: 'present' | 'absent' | 'late';
}

export default function AttendanceCard() {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<string, AttendanceRecord>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      fetchStudents();
      fetchExistingAttendance();
    }
  }, [selectedSubject, selectedDate]);

  const fetchSubjects = async () => {
    try {
      const response = await fetch('/api/teacher/subjects');
      const data = await response.json();
      if (response.ok) {
        setSubjects(data.subjects);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load subjects' });
    }
  };

  const fetchStudents = async () => {
    try {
      const response = await fetch(`/api/teacher/students?subject=${selectedSubject}`);
      const data = await response.json();
      if (response.ok) {
        setStudents(data.students);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load students' });
    }
  };

  const fetchExistingAttendance = async () => {
    try {
      const response = await fetch(
        `/api/teacher/attendance?subject=${selectedSubject}&date=${selectedDate}`
      );
      const data = await response.json();
      if (response.ok) {
        const attendanceMap: Record<string, AttendanceRecord> = {};
        data.attendance.forEach((record: any) => {
          attendanceMap[record.studentId] = {
            studentId: record.studentId,
            status: record.status,
          };
        });
        setAttendance(attendanceMap);
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to load attendance records' });
    }
  };

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent' | 'late') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: { studentId, status },
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/teacher/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: selectedSubject,
          date: selectedDate,
          attendance: Object.values(attendance),
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Attendance saved successfully' });
      } else {
        throw new Error('Failed to save attendance');
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to save attendance' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Mark Attendance</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">Select Subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {message.text && (
          <div
            className={`p-4 rounded-md mb-4 ${
              message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {selectedSubject && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roll Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students.map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.rollNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={attendance[student.id]?.status || 'absent'}
                          onChange={(e) =>
                            handleAttendanceChange(
                              student.id,
                              e.target.value as 'present' | 'absent' | 'late'
                            )
                          }
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        >
                          <option value="present">Present</option>
                          <option value="absent">Absent</option>
                          <option value="late">Late</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Attendance'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
