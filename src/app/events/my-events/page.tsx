"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getRegisteredEvents, Event, formatEventDate, getCategoryInfo } from '@/utils/eventsData';

export default function MyEventsPage() {
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const events = getRegisteredEvents();
      setRegisteredEvents(events);
      setIsLoading(false);
    }, 500);
  }, []);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Link href="/events" className="text-indigo-600 hover:text-indigo-800 mr-3">
            &larr; Back to Events
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
        <p className="mt-1 text-sm text-gray-500">
          View and manage your registered events.
        </p>
      </div>
      
      {isLoading ? (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 mb-4">
            <svg className="w-6 h-6 text-indigo-600 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-gray-500">Loading your events...</p>
        </div>
      ) : registeredEvents.length > 0 ? (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {registeredEvents.map((event) => {
              const categoryInfo = getCategoryInfo(event.category);
              const eventDate = new Date(event.startDate);
              const isUpcoming = eventDate > new Date();
              
              return (
                <li key={event.id}>
                  <Link 
                    href={`/events/${event.id}`}
                    className="block hover:bg-gray-50"
                  >
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden">
                            <img 
                              src={event.image} 
                              alt={event.title}
                              className="h-full w-full object-cover" 
                            />
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-indigo-600">{event.title}</p>
                            <div className="flex mt-1">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${categoryInfo.color}`}>
                                {categoryInfo.name}
                              </span>
                              <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                isUpcoming ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                              }`}>
                                {isUpcoming ? 'Upcoming' : 'Past'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-2 flex-shrink-0 flex flex-col items-end">
                          <p className="text-sm text-gray-500">{formatEventDate(event.startDate, event.endDate)}</p>
                          <p className="text-sm text-gray-500 mt-1">{event.location}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No registered events</h3>
          <p className="mt-1 text-sm text-gray-500">
            You haven't registered for any events yet.
          </p>
          <div className="mt-6">
            <Link
              href="/events"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Browse Events
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
