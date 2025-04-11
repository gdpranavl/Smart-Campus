"use client";
import Link from 'next/link';
import { Assignment } from '@/utils/academicsData';

interface AssignmentListProps {
  assignments: Assignment[];
  courseId?: string;
}

export default function AssignmentList({ assignments, courseId }: AssignmentListProps) {
  // Format due date
  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Check if assignment is due soon (within 3 days)
  const isDueSoon = (dateString: string) => {
    const now = new Date();
    const dueDate = new Date(dateString);
    const diffTime = dueDate.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays <= 3 && diffDays > 0;
  };
  
  // Get status badge styles
  const getStatusBadge = (status: string, dueDate: string) => {
    if (status === 'graded') return 'bg-green-100 text-green-800';
    if (status === 'submitted') return 'bg-blue-100 text-blue-800';
    if (status === 'late') return 'bg-red-100 text-red-800';
    if (isDueSoon(dueDate)) return 'bg-yellow-100 text-yellow-800';
    return 'bg-gray-100 text-gray-800';
  };
  
  // Get status display text
  const getStatusText = (status: string, dueDate: string) => {
    if (status === 'graded') return 'Graded';
    if (status === 'submitted') return 'Submitted';
    if (status === 'late') return 'Late';
    if (isDueSoon(dueDate)) return 'Due Soon';
    return 'Pending';
  };
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Assignments</h3>
      </div>
      
      {assignments.length > 0 ? (
        <ul role="list" className="divide-y divide-gray-200">
          {assignments.map((assignment) => (
            <li key={assignment.id}>
              <Link 
                href={courseId 
                  ? `/academics/courses/${courseId}/assignments/${assignment.id}` 
                  : `/academics/assignments/${assignment.id}`
                }
                className="block hover:bg-gray-50"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <p className="text-sm font-medium text-indigo-600 truncate">{assignment.title}</p>
                      <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(assignment.status, assignment.dueDate)}`}>
                        {getStatusText(assignment.status, assignment.dueDate)}
                      </span>
                    </div>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="text-sm text-gray-500">{assignment.points} points</p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="flex items-center text-sm text-gray-500 truncate">
                        {assignment.description.length > 150 
                          ? `${assignment.description.substring(0, 150)}...` 
                          : assignment.description
                        }
                      </p>
                    </div>
                    <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                      <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <p>
                        Due <time dateTime={assignment.dueDate}>{formatDueDate(assignment.dueDate)}</time>
                      </p>
                    </div>
                  </div>
                  
                  {assignment.status === 'graded' && assignment.grade !== undefined && (
                    <div className="mt-2 text-sm text-gray-700">
                      <span className="font-semibold">Grade: </span>
                      <span className={`${assignment.grade >= 90 ? 'text-green-600' : assignment.grade >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {assignment.grade}/{assignment.points}
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-6">
          <p className="text-sm text-gray-500">No assignments available.</p>
        </div>
      )}
    </div>
  );
}
