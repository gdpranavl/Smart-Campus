'use client';

import { useState, useEffect } from 'react';

interface Student {
  _id: string;
  name: string;
  email: string;
}

interface Subject {
  _id: string;
  name: string;
  code: string;
}

interface AttendanceRecord {
  student: string;
  subject: string;
  date: string;
  status: 'present' | 'absent';
}

interface Props {
  subjects: Subject[];
}

export default function AttendanceManager({ subjects }: Props) {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent'>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selectedSubject) {
      fetchStudents();
      fetchExistingAttendance();
    }
  }, [selectedSubject, selectedDate]);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`/api/teacher/students?subject=${selectedSubject}`);
      const data = await response.json();
      if (response.ok) {
        setStudents(data.students);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const fetchExistingAttendance = async () => {
    try {
      const response = await fetch(
        `/api/teacher/attendance?subject=${selectedSubject}&date=${selectedDate}`
      );
      const data = await response.json();
      if (response.ok) {
        const attendanceMap: Record<string, 'present' | 'absent'> = {};
        data.attendance.forEach((record: AttendanceRecord) => {
          attendanceMap[record.student] = record.status;
        });
        setAttendance(attendanceMap);
      }
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent') => {
    setAttendance((prev: Record<string, 'present' | 'absent'>) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');

    try {
      const attendanceRecords: AttendanceRecord[] = Object.entries(attendance).map(([studentId, status]) => ({
        student: studentId,
        subject: selectedSubject,
        date: selectedDate,
        status,
      }));

      const response = await fetch('/api/teacher/attendance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attendance: attendanceRecords }),
      });

      if (response.ok) {
        setMessage('Attendance saved successfully');
      } else {
        throw new Error('Failed to save attendance');
      }
    } catch (error) {
      setMessage('Error saving attendance');
    } finally {
      setLoading(false);
    }
  };

  if (!subjects.length) {
    return <p>No subjects assigned.</p>;
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="mb-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="">Select a subject</option>
            {subjects.map((subject) => (
              <option key={subject._id} value={subject._id}>
                {subject.name} ({subject.code})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {selectedSubject && students.length > 0 && (
        <>
          <div className="border rounded-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {student.name}
                      </div>
                      <div className="text-sm text-gray-500">{student.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-4">
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name={`attendance-${student._id}`}
                            checked={attendance[student._id] === 'present'}
                            onChange={() =>
                              handleAttendanceChange(student._id, 'present')
                            }
                            className="form-radio h-4 w-4 text-indigo-600"
                          />
                          <span className="ml-2 text-sm text-gray-700">Present</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name={`attendance-${student._id}`}
                            checked={attendance[student._id] === 'absent'}
                            onChange={() =>
                              handleAttendanceChange(student._id, 'absent')
                            }
                            className="form-radio h-4 w-4 text-red-600"
                          />
                          <span className="ml-2 text-sm text-gray-700">Absent</span>
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {message && (
            <div
              className={`mt-4 p-3 rounded-md text-sm ${
                message.includes('success')
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {message}
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {loading ? 'Saving...' : 'Save Attendance'}
            </button>
          </div>
        </>
      )}

      {selectedSubject && students.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          No students found for this subject.
        </p>
      )}
    </div>
  );
}
