"use client";
import Link from 'next/link';
import { Event, formatEventDate, getCategoryInfo } from '@/utils/eventsData';

interface FeaturedEventsProps {
  events: Event[];
}

export default function FeaturedEvents({ events }: FeaturedEventsProps) {
  if (events.length === 0) return null;
  
  const mainEvent = events[0];
  const otherEvents = events.slice(1, 3);
  const categoryInfo = getCategoryInfo(mainEvent.category);
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Featured Events</h3>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Main featured event */}
          <div className="lg:col-span-3 relative rounded-lg overflow-hidden group">
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-200"></div>
            <img
              src={mainEvent.image}
              alt={mainEvent.title}
              className="w-full h-full object-cover object-center max-h-96"
            />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="flex items-center space-x-2 mb-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 bg-opacity-90">
                  Featured
                </span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryInfo.color} bg-opacity-90`}>
                  {categoryInfo.name}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{mainEvent.title}</h3>
              <p className="text-sm text-gray-200 mb-3 line-clamp-2">{mainEvent.description}</p>
              <div className="flex items-center text-white text-sm mb-4">
                <svg className="mr-1 h-5 w-5 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <span>{formatEventDate(mainEvent.startDate, mainEvent.endDate)}</span>
              </div>
              <div className="flex items-center text-white text-sm mb-4">
                <svg className="mr-1 h-5 w-5 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{mainEvent.location}</span>
              </div>
              <Link 
                href={`/events/${mainEvent.id}`}
                className="w-full sm:w-auto inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                View Details
              </Link>
            </div>
          </div>
          
          {/* Other featured events */}
          <div className="lg:col-span-2 grid grid-cols-1 gap-4">
            {otherEvents.map((event) => {
              const eventCategoryInfo = getCategoryInfo(event.category);
              return (
                <div key={event.id} className="relative rounded-lg overflow-hidden group h-44">
                  <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-200"></div>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 p-4 flex flex-col justify-end">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${eventCategoryInfo.color} bg-opacity-90`}>
                        {eventCategoryInfo.name}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
                    <div className="flex items-center text-white text-xs mb-2">
                      <svg className="mr-1 h-4 w-4 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>{formatEventDate(event.startDate, event.endDate)}</span>
                    </div>
                    <Link 
                      href={`/events/${event.id}`}
                      className="text-xs font-medium text-white hover:text-indigo-100"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
