"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getEventById, formatEventDate, getCategoryInfo, Event } from '@/utils/eventsData';
import EventRegistration from '@/components/events/EventRegistration';

interface EventDetailPageProps {
  params: {
    eventId: string;
  };
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const { eventId } = params;
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to fetch event
    setTimeout(() => {
      const fetchedEvent = getEventById(eventId);
      setEvent(fetchedEvent || null);
      setIsLoading(false);
    }, 500);
  }, [eventId]);
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="inline-flex items-center justify-center p-4">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin"></div>
          <span className="ml-3 text-gray-700">Loading event details...</span>
        </div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Event Not Found</h1>
        <p className="text-gray-500 mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Link href="/events" className="text-indigo-600 hover:text-indigo-800">
          &larr; Back to Events
        </Link>
      </div>
    );
  }
  
  const categoryInfo = getCategoryInfo(event.category);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/events" className="text-indigo-600 hover:text-indigo-800">
          &larr; Back to Events
        </Link>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="relative h-72 md:h-96">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${categoryInfo.color}`}>
                  {categoryInfo.name}
                </span>
              </div>
            </div>
            
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
              
              <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  <span>{formatEventDate(event.startDate, event.endDate)}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center">
                  <svg className="mr-2 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                  </svg>
                  <span>Organized by: {event.organizer}</span>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <h2>About this event</h2>
                <p>{event.description}</p>
                
                <h3>What to expect</h3>
                <ul>
                  <li>Networking opportunities with peers and professionals</li>
                  <li>Interactive sessions and hands-on activities</li>
                  <li>Q&A sessions with industry experts</li>
                  <li>Refreshments and materials provided</li>
                </ul>
                
                <h3>Who should attend</h3>
                <p>
                  This event is perfect for students interested in {event.category === 'career' ? 'career development and professional networking' : 
                  event.category === 'academic' ? 'academic advancement and research' : 
                  event.category === 'cultural' ? 'cultural exchange and artistic expression' : 
                  'expanding their knowledge and skills'}.
                </p>
                
                <h3>Location details</h3>
                <p>
                  The event will be held at {event.location}. Directions and additional information will be provided after registration.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <EventRegistration event={event} />
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Event Details</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-6">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Date and Time</dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {formatEventDate(event.startDate, event.endDate)}
                  </dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Location</dt>
                  <dd className="mt-1 text-sm text-gray-900">{event.location}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Organizer</dt>
                  <dd className="mt-1 text-sm text-gray-900">{event.organizer}</dd>
                </div>
                
                <div>
                  <dt className="text-sm font-medium text-gray-500">Category</dt>
                  <dd className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryInfo.color}`}>
                      {categoryInfo.name}
                    </span>
                  </dd>
                </div>
                
                {event.isRegistrationRequired && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Registration</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      Required
                      {event.registrationDeadline && (
                        <span className="block text-xs mt-1">
                          Deadline: {new Date(event.registrationDeadline).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      )}
                    </dd>
                  </div>
                )}
                
                {event.maxAttendees && (
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Capacity</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {event.currentAttendees} / {event.maxAttendees} registered
                    </dd>
                  </div>
                )}
              </dl>
              
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-500">Share Event</h3>
                <div className="mt-2 flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Facebook</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-500">
                    <span className="sr-only">Email</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
