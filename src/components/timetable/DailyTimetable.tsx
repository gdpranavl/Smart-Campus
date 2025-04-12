"use client";
import { useState } from 'react';
import { timeSlots, classes, getDayName, Class, TimeSlot } from '@/utils/timetableData';

export default function DailyTimetable({ day = 0 }: { day?: number }) {
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  
  const handleClassClick = (classItem: Class) => {
    setSelectedClass(classItem);
  };
  
  const closeModal = () => {
    setSelectedClass(null);
  };
  
  // Get classes for the selected day
  const todaysClasses = classes.filter(c => c.day === day);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          {getDayName(day)} Schedule
        </h3>
      </div>
      
      <div className="p-4">
        <div className="space-y-2">
          {timeSlots.map(slot => {
            const classItem = todaysClasses.find(c => c.timeSlotId === slot.id);
            
            return (
              <div key={slot.id} className="border rounded-md overflow-hidden">
                <div className="flex">
                  <div className="w-24 p-3 bg-gray-50 border-r">
                    <p className="text-sm font-medium">{slot.display}</p>
                  </div>
                  
                  {classItem ? (
                    <div 
                      className={`flex-1 p-3 cursor-pointer ${classItem.color} border-l-4 ${classItem.color.replace('bg-', 'border-')}`}
                      onClick={() => handleClassClick(classItem)}
                    >
                      <h4 className="font-medium">{classItem.subject}</h4>
                      <p className="text-sm">{classItem.professor} • {classItem.room}</p>
                    </div>
                  ) : (
                    <div className="flex-1 p-3 bg-gray-50">
                      <p className="text-sm text-gray-500">No class</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Class details modal */}
      {selectedClass && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-medium">{selectedClass.subject}</h3>
                <p className="text-sm text-gray-500">{selectedClass.code}</p>
              </div>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Professor</p>
                <p>{selectedClass.professor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Room</p>
                <p>{selectedClass.room}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p>{timeSlots.find(s => s.id === selectedClass.timeSlotId)?.display}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Day</p>
                <p>{getDayName(selectedClass.day)}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
