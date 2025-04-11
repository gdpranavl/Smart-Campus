"use client";

const updates = [
  {
    id: 1,
    title: 'Mid-semester Exam Schedule Published',
    date: 'April 10, 2025',
    description: 'Check your exam schedule on the academics portal.',
  },
  {
    id: 2,
    title: 'Research Paper Submission Deadline',
    date: 'April 20, 2025',
    description: 'Final deadline for all research paper submissions.',
  },
  {
    id: 3,
    title: 'New Course Registration Open',
    date: 'April 25, 2025',
    description: 'Register for new elective courses for the upcoming semester.',
  },
];

export default function AcademicUpdates() {
  return (
    <div className="flow-root">
      <ul role="list" className="-mb-8">
        {updates.map((update, updateIdx) => (
          <li key={update.id}>
            <div className="relative pb-8">
              {updateIdx !== updates.length - 1 ? (
                <span className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">{update.date.split(',')[0].split(' ')[1]}</span>
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-900">{update.title}</p>
                    <p className="text-sm text-gray-500">{update.description}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-xs text-gray-500">
                    <time dateTime={update.date}>{update.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 text-center">
        <a href="/academics" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          View all updates
        </a>
      </div>
    </div>
  );
}
