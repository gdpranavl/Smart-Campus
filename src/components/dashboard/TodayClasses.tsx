"use client";

const classes = [
  {
    id: 1,
    subject: 'Data Structures',
    time: '10:00 AM - 11:00 AM',
    room: 'Room 101',
    faculty: 'Dr. Rajesh Iyer',
  },
  {
    id: 2,
    subject: 'Web Development',
    time: '11:15 AM - 12:15 PM',
    room: 'Computer Lab 3',
    faculty: 'Prof. Meera Chatterjee',
  },
  {
    id: 3,
    subject: 'Engineering Mathematics',
    time: '2:00 PM - 3:00 PM',
    room: 'Room 204',
    faculty: 'Dr. Garcia',
  },
];

export default function TodayClasses() {
  return (
    <div className="overflow-hidden">
      <ul role="list" className="divide-y divide-gray-100">
        {classes.map((classItem) => (
          <li key={classItem.id} className="py-2 flex justify-between gap-x-6">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{classItem.subject}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{classItem.time}</p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{classItem.room}</p>
              <p className="mt-1 text-xs leading-5 text-gray-500">{classItem.faculty}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 text-center">
        <a href="/timetable" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          View full timetable
        </a>
      </div>
    </div>
  );
}
