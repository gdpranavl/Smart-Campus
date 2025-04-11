"use client";

const events = [
  {
    id: 1,
    title: 'Annual Tech Symposium',
    date: 'April 15, 2025',
    time: '10:00 AM',
    location: 'Main Auditorium',
  },
  {
    id: 2,
    title: 'Alumni Meet',
    date: 'April 20, 2025',
    time: '5:30 PM',
    location: 'College Grounds',
  },
  {
    id: 3,
    title: 'Cultural Fest',
    date: 'April 27, 2025',
    time: 'All Day',
    location: 'Multiple Venues',
  },
];

export default function UpcomingEvents() {
  return (
    <div className="flow-root">
      <ul role="list">
        {events.map((event, idx) => (
          <li key={event.id} className={idx !== 0 ? "pt-3 mt-3 border-t border-gray-200" : ""}>
            <div className="relative flex gap-x-4">
              <div className="flex-none py-1">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  {event.date.split(',')[0].split(' ')[1]}
                </span>
              </div>
              <div className="flex-auto">
                <h4 className="text-sm font-semibold leading-6 text-gray-900">{event.title}</h4>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  {event.date} • {event.time} • {event.location}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 text-center">
        <a href="/events" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          View all events
        </a>
      </div>
    </div>
  );
}
