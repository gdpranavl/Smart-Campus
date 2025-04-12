import CourseList from '@/components/academics/CourseList';
import Announcements from '@/components/academics/Announcements';
import AssignmentList from '@/components/academics/AssignmentList';
import { enrolledCourses, getAnnouncementsByCourse, assignments } from '@/utils/academicsData';

export default function AcademicsPage() {
  // Get upcoming assignments (sorted by due date)
  const upcomingAssignments = [...assignments]
    .filter(assignment => assignment.status === 'pending')
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);
  
  // Get general announcements
  const generalAnnouncements = getAnnouncementsByCourse(null);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Academics</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your courses, assignments, and academic progress.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CourseList courses={enrolledCourses} />
          
          <div className="mt-6">
            <AssignmentList assignments={upcomingAssignments} />
          </div>
        </div>
        
        <div>
          <Announcements announcements={generalAnnouncements} />
          
          <div className="mt-6">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
                <h3 className="text-lg font-medium leading-6 text-gray-900">Quick Links</h3>
              </div>
              <div className="p-4 sm:p-6">
                <nav className="space-y-1" aria-label="Quick links">
                  <a
                    href="/academics/grades"
                    className="group flex items-center px-3 py-2 text-sm font-medium rounded-md bg-indigo-50 text-indigo-700 hover:text-indigo-700 hover:bg-indigo-100"
                  >
                    <svg className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="truncate">Performance Analytics</span>
                  </a>

                  <a
                    href="/academics/assignments"
                    className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-700 hover:bg-indigo-50"
                  >
                    <svg className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="truncate">All Assignments</span>
                  </a>
                  
                  <a
                    href="#"
                    className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-700 hover:bg-indigo-50"
                  >
                    <svg className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="truncate">Academic Calendar</span>
                  </a>
                  
                  <a
                    href="#"
                    className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-700 hover:bg-indigo-50"
                  >
                    <svg className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="truncate">Contact Professors</span>
                  </a>

                  <a
                    href="https://knotescentral.vercel.app"
                    className="group flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:text-indigo-700 hover:bg-indigo-50"
                  >
                    <svg className="mr-3 flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="truncate">Academic Resources</span>
                  </a>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
