"use client";
import { useState } from 'react';
import DailyTimetable from './DailyTimetable';
import WeeklyTimetable from './WeeklyTimetable';
import { getDayName } from '@/utils/timetableData';

export default function TimetableSwitcher() {
  const [view, setView] = useState<'daily' | 'weekly'>('daily');
  const [selectedDay, setSelectedDay] = useState(0); // Default to Monday

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Class Schedule</h2>
        
        <div className="flex space-x-2">
          {/* Day selector for daily view */}
          {view === 'daily' && (
            <select 
              value={selectedDay}
              onChange={(e) => setSelectedDay(Number(e.target.value))}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            >
              {[0, 1, 2, 3, 4].map(day => (
                <option key={day} value={day}>
                  {getDayName(day)}
                </option>
              ))}
            </select>
          )}
          
          {/* View toggle */}
          <div className="inline-flex rounded-md shadow-sm">
            <button
              onClick={() => setView('daily')}
              className={`px-3 py-1 text-sm font-medium rounded-l-md ${view === 'daily' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Daily
            </button>
            <button
              onClick={() => setView('weekly')}
              className={`px-3 py-1 text-sm font-medium rounded-r-md ${view === 'weekly' ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            >
              Weekly
            </button>
          </div>
        </div>
      </div>
      
      {view === 'daily' ? (
        <DailyTimetable day={selectedDay} />
      ) : (
        <WeeklyTimetable />
      )}
    </div>
  );
}
