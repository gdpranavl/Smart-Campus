"use client";
import { useState, useEffect } from 'react';
import { Event, formatDateShort } from '@/utils/eventsData';
import Link from 'next/link';

interface EventCalendarProps {
  events: Event[];
}

export default function EventCalendar({ events }: EventCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [calendarDays, setCalendarDays] = useState<Date[]>([]);
  const [daysWithEvents, setDaysWithEvents] = useState<Record<string, Event[]>>({});
  
  // Generate calendar days for the current month
  useEffect(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    
    // Get first day of the month
    const firstDay = new Date(year, month, 1);
    // Get last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get day of week for the first day (0 = Sunday, 1 = Monday, etc.)
    let firstDayOfWeek = firstDay.getDay();
    // Adjust for Monday as the first day of the week
    firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    // Calculate days from previous month to display
    const prevMonthDays = [];
    if (firstDayOfWeek > 0) {
      const prevMonth = new Date(year, month, 0);
      const prevMonthLastDay = prevMonth.getDate();
      
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        prevMonthDays.push(new Date(year, month - 1, prevMonthLastDay - i));
      }
    }
    
    // Current month days
    const currentMonthDays = [];
    for (let i = 1; i <= lastDay.getDate(); i++) {
      currentMonthDays.push(new Date(year, month, i));
    }
    
    // Calculate days from next month to display
    const totalDaysDisplayed = prevMonthDays.length + currentMonthDays.length;
    const nextMonthDays = [];
    
    // Complete the calendar grid (6 rows x 7 columns = 42 cells)
    const daysNeeded = 42 - totalDaysDisplayed;
    for (let i = 1; i <= daysNeeded; i++) {
      nextMonthDays.push(new Date(year, month + 1, i));
    }
    
    setCalendarDays([...prevMonthDays, ...currentMonthDays, ...nextMonthDays]);
    
    // Group events by date
    const eventsByDate: Record<string, Event[]> = {};
    events.forEach(event => {
      const eventDate = new Date(event.startDate);
      const dateKey = eventDate.toISOString().split('T')[0];
      
      if (!eventsByDate[dateKey]) {
        eventsByDate[dateKey] = [];
      }
      eventsByDate[dateKey].push(event);
    });
    
    setDaysWithEvents(eventsByDate);
    
    // If no date is selected, select today if it's in the current month
    if (!selectedDate) {
      const today = new Date();
      if (today.getMonth() === month && today.getFullYear() === year) {
        setSelectedDate(today);
      } else {
        // Otherwise select the first day of the month
        setSelectedDate(new Date(year, month, 1));
      }
    }
  }, [currentMonth, events]);
  
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null);
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };
  
  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  };
  
  const isSelectedDate = (date: Date) => {
    if (!selectedDate) return false;
    
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear();
  };
  
  const hasEvents = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    return !!daysWithEvents[dateKey] && daysWithEvents[dateKey].length > 0;
  };
  
  const getEventsForSelectedDate = (): Event[] => {
    if (!selectedDate) return [];
    
    const dateKey = selectedDate.toISOString().split('T')[0];
    return daysWithEvents[dateKey] || [];
  };
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Events Calendar</h3>
          <div className="flex space-x-2">
            <button
              onClick={goToPreviousMonth}
              className="p-1.5 rounded-full text-gray-600 hover:bg-gray-100"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <span className="text-sm font-semibold">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button
              onClick={goToNextMonth}
              className="p-1.5 rounded-full text-gray-600 hover:bg-gray-100"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="bg-gray-50 py-2 text-center text-xs font-semibold text-gray-700">
              {day}
            </div>
          ))}
          
          {calendarDays.map((date, i) => (
            <button
              key={i}
              onClick={() => setSelectedDate(date)}
              className={`h-12 bg-white flex items-center justify-center relative ${
                isSelectedDate(date) 
                  ? 'ring-2 ring-indigo-600 ring-inset' 
                  : ''
              }`}
            >
              <span className={`text-sm font-medium ${
                isToday(date) 
                  ? 'h-7 w-7 rounded-full bg-indigo-600 text-white flex items-center justify-center' 
                  : isCurrentMonth(date) 
                    ? 'text-gray-900' 
                    : 'text-gray-400'
              }`}>
                {date.getDate()}
              </span>
              
              {hasEvents(date) && (
                <span className="absolute bottom-1 inset-x-0 flex justify-center">
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    isSelectedDate(date) ? 'bg-indigo-600' : 'bg-indigo-400'
                  }`}></span>
                </span>
              )}
            </button>
          ))}
        </div>
        
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-2">
            {selectedDate
              ? selectedDate.toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })
              : 'No date selected'}
          </h4>
          
          {getEventsForSelectedDate().length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {getEventsForSelectedDate().map((event) => (
                <li key={event.id} className="py-2">
                  <Link href={`/events/${event.id}`} className="block hover:bg-gray-50 rounded -mx-2 p-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-indigo-600">{event.title}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(event.startDate).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                          {' - '}
                          {new Date(event.endDate).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                          {' • '}
                          {event.location}
                        </p>
                      </div>
                      <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No events scheduled for this day.</p>
          )}
        </div>
      </div>
    </div>
  );
}
