"use client";
import { useState } from 'react';
import { Event, formatDateShort, isRegistrationClosingSoon } from '@/utils/eventsData';

interface EventRegistrationProps {
  event: Event;
}

export default function EventRegistration({ event }: EventRegistrationProps) {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(event.isRegistered || false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  const handleRegister = () => {
    setIsRegistering(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRegistered(true);
      setIsRegistering(false);
      setShowConfirmation(true);
      
      // Hide confirmation after 3 seconds
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    }, 1000);
  };
  
  const handleUnregister = () => {
    setIsRegistering(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRegistered(false);
      setIsRegistering(false);
    }, 1000);
  };
  
  if (!event.isRegistrationRequired) {
    return (
      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Registration Not Required</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>You can simply attend this event without prior registration.</p>
          </div>
          <div className="mt-5">
            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-blue-700">
                    Add this event to your calendar so you don't miss it.
                  </p>
                  <p className="mt-3 text-sm md:mt-0 md:ml-6">
                    <a href="#" className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                      Add to Calendar <span aria-hidden="true">&rarr;</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Check if registration is closed
  const isRegistrationClosed = () => {
    if (!event.registrationDeadline) return false;
    
    const now = new Date();
    const deadline = new Date(event.registrationDeadline);
    return now > deadline;
  };
  
  // Check if event is full
  const isEventFull = () => {
    if (!event.maxAttendees) return false;
    
    return event.currentAttendees >= event.maxAttendees;
  };
  
  return (
    <div className="bg-white shadow sm:rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Event Registration</h3>
        
        {showConfirmation && (
          <div className="mt-2 p-2 rounded-md bg-green-50 border border-green-100">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-green-800">
                  You're successfully registered for this event!
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          {isRegistered ? (
            <p>You are registered for this event. We look forward to seeing you!</p>
          ) : (
            <p>
              {isEventFull()
                ? "This event is currently full. You can join the waiting list."
                : isRegistrationClosed()
                  ? "Registration for this event has closed."
                  : "Register to secure your spot for this event."}
            </p>
          )}
        </div>
        
        <div className="mt-3 text-sm">
          {event.registrationDeadline && !isRegistrationClosed() && !isRegistered && (
            <p className={`${
              isRegistrationClosingSoon(event.registrationDeadline)
                ? 'text-yellow-600 font-medium'
                : 'text-gray-500'
            }`}>
              Registration closes on: {formatDateShort(event.registrationDeadline)} at {
                new Date(event.registrationDeadline).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })
              }
            </p>
          )}
          
          {event.maxAttendees && (
            <p className="text-gray-500 mt-1">
              {event.currentAttendees} / {event.maxAttendees} spots filled
              {event.currentAttendees >= event.maxAttendees * 0.9 && !isEventFull() && (
                <span className="text-yellow-600 font-medium"> (Almost full!)</span>
              )}
            </p>
          )}
        </div>
        
        <div className="mt-5">
          {isRegistered ? (
            <button
              type="button"
              onClick={handleUnregister}
              disabled={isRegistering}
              className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {isRegistering ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : 'Cancel Registration'}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRegister}
              disabled={isRegistering || isRegistrationClosed() || isEventFull()}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                isRegistrationClosed() || isEventFull()
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              {isRegistering ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : isEventFull()
                ? 'Join Waiting List'
                : isRegistrationClosed()
                  ? 'Registration Closed'
                  : 'Register for Event'}
            </button>
          )}
          
          {isRegistered && (
            <div className="mt-4">
              <a 
                href="#" 
                className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500"
              >
                <svg className="mr-1.5 h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                Add to Calendar
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
