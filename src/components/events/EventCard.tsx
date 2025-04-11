"use client";
import Link from 'next/link';
import { Event, formatDateShort, getCategoryInfo, isEventSoon, isRegistrationClosingSoon } from '@/utils/eventsData';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const categoryInfo = getCategoryInfo(event.category);
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden flex flex-col h-full border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="relative h-48">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover"
        />
        {event.isFeatured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryInfo.color}`}>
            {categoryInfo.name}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-3">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-center shadow">
              <div>
                <span className="block text-xs font-semibold text-gray-500">
                  {new Date(event.startDate).toLocaleString('default', { month: 'short' })}
                </span>
                <span className="block text-lg font-bold text-gray-900">
                  {new Date(event.startDate).getDate()}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <span className="block text-sm font-medium text-white">
                {new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
              <span className="block text-xs text-gray-200">
                {event.location}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{event.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-3 mb-4">{event.description}</p>
        
        <div className="mt-auto">
          {event.isRegistrationRequired && (
            <div className="flex justify-between items-center mb-3">
              <div className="text-xs text-gray-500">
                {event.maxAttendees && (
                  <span>{event.currentAttendees} / {event.maxAttendees} registered</span>
                )}
              </div>
              {event.registrationDeadline && (
                <div className="text-xs text-gray-500">
                  Register by: {formatDateShort(event.registrationDeadline)}
                </div>
              )}
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">
              Organized by: <span className="font-medium">{event.organizer}</span>
            </span>
            <Link 
              href={`/events/${event.id}`}
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
      
      {event.isRegistered && (
        <div className="bg-green-50 px-4 py-2 border-t border-green-100">
          <span className="text-xs font-medium text-green-800">
            You're registered for this event
          </span>
        </div>
      )}
      
      {!event.isRegistered && isRegistrationClosingSoon(event.registrationDeadline || '') && (
        <div className="bg-yellow-50 px-4 py-2 border-t border-yellow-100">
          <span className="text-xs font-medium text-yellow-800">
            Registration closing soon!
          </span>
        </div>
      )}
      
      {!event.isRegistered && !isRegistrationClosingSoon(event.registrationDeadline || '') && isEventSoon(event.startDate) && (
        <div className="bg-blue-50 px-4 py-2 border-t border-blue-100">
          <span className="text-xs font-medium text-blue-800">
            Coming up soon!
          </span>
        </div>
      )}
    </div>
  );
}
