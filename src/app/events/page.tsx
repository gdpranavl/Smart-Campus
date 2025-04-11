"use client";
import { useState, useEffect } from 'react';
import EventCard from '@/components/events/EventCard';
import EventFilters from '@/components/events/EventFilters';
import FeaturedEvents from '@/components/events/FeaturedEvents';
import EventCalendar from '@/components/events/EventCalendar';
import { events, getFeaturedEvents, Event, EventCategory } from '@/utils/eventsData';

export default function EventsPage() {
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [isLoading, setIsLoading] = useState(true);
  const featuredEvents = getFeaturedEvents();
  
  useEffect(() => {
    // Simulate loading data from an API
    const timer = setTimeout(() => {
      setFilteredEvents(events);
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleFilterChange = ({
    category,
    searchQuery,
    showRegisteredOnly,
  }: {
    category: string | null;
    searchQuery: string;
    showRegisteredOnly: boolean;
  }) => {
    let filtered = [...events];
    
    // Filter by category
    if (category) {
      filtered = filtered.filter(event => event.category === category);
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        event => 
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.toLowerCase().includes(query) ||
          event.organizer.toLowerCase().includes(query)
      );
    }
    
    // Filter by registration status
    if (showRegisteredOnly) {
      filtered = filtered.filter(event => event.isRegistered);
    }
    
    setFilteredEvents(filtered);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Campus Events</h1>
        <p className="mt-1 text-sm text-gray-500">
          Discover and register for upcoming events, workshops, seminars, and activities on campus.
        </p>
      </div>
      
      <div className="mb-8">
        <FeaturedEvents events={featuredEvents} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <EventFilters onFilterChange={handleFilterChange} />
          <EventCalendar events={events} />
        </div>
        
        <div className="lg:col-span-3">
          {isLoading ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 mb-4">
                <svg className="w-6 h-6 text-indigo-600 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <p className="text-gray-500">Loading events...</p>
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
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
              <h3 className="mt-2 text-sm font-medium text-gray-900">No events found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your filters or search term to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
