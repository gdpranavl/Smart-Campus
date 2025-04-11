"use client";
import { useState } from 'react';
import { timeSlots, classes, getDayName, Class, TimeSlot } from '@/utils/timetableData';

export default function WeeklyTimetable() {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  
  // Days of the week (excluding weekends, but can be added if needed)
  const days = [0, 1, 2, 3, 4]; // Monday to Friday
  
  const handleClassClick = (classItem: Class) => {
    setSelectedClass(classItem);
  };
  
  const closeModal = () => {
    setSelectedClass(null);
  };
  
  // Get class for a specific day and time slot
  const getClassForSlot = (day: number, timeSlotId: string): Class | undefined => {
    return classes.find(c => c.day === day && c.timeSlotId === timeSlotId);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Weekly Schedule</h3>
      </div>
      
      <div className="p-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">
                Time
              </th>
              {days.map(day => (
                <th key={day} className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {getDayName(day)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timeSlots.map(slot => (
              <tr key={slot.id}>
                <td className="px-4 py-3 whitespace-nowrap text-xs text-gray-500">
                  {slot.display}
                </td>
                {days.map(day => {
                  const classItem = getClassForSlot(day, slot.id);
                  return (
                    <td key={`${day}-${slot.id}`} className="px-1 py-2">
                      {classItem ? (
                        <button
                          onClick={() => handleClassClick(classItem)}
                          className={`w-full p-2 rounded border text-left transition-colors duration-150 hover:opacity-80 ${classItem.color}`}
                        >
                          <div className="font-medium text-sm truncate">{classItem.code}</div>
                          <div className="text-xs truncate">{classItem.room}</div>
                        </button>
                      ) : (
                        <div className="h-14 w-full rounded border border-dashed border-gray-200"></div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        
        {/* Class details modal */}
        {selectedClass && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md w-full">
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Class Details</h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Subject</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedClass.subject} ({selectedClass.code})</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Professor</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedClass.professor}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Room</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedClass.room}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Day</dt>
                    <dd className="mt-1 text-sm text-gray-900">{getDayName(selectedClass.day)}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Time</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {timeSlots.find(slot => slot.id === selectedClass.timeSlotId)?.display}
                    </dd>
                  </div>
                </dl>
                
                <div className="mt-6 flex justify-between">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    View Materials
                  </button>
                  <button onClick={closeModal} className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
