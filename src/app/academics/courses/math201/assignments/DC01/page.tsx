import Link from 'next/link';
import AssignmentSubmission from '@/components/academics/AssignmentSubmission';
import { getCourseById, getAssignmentById } from '@/utils/academicsData';

interface AssignmentPageProps {
  params: {
    courseId: string;
    assignmentId: string;
  };
}

export default function AssignmentPage({ params }: AssignmentPageProps) {
  const { courseId, assignmentId } = params;
  const course = getCourseById(courseId);
  const assignment = getAssignmentById(assignmentId);
  
  if (!course || !assignment) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Assignment Not Found</h1>
        <p className="text-gray-500 mb-6">The assignment you're looking for doesn't exist or you don't have access to it.</p>
        <Link href={`/academics/courses/${courseId}`} className="text-indigo-600 hover:text-indigo-800">
          &larr; Back to Course
        </Link>
      </div>
    );
  }
  
  // Format date
  const formatDueDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Link href={`/academics/courses/${courseId}`} className="text-indigo-600 hover:text-indigo-800 mr-3">
            &larr; Back to {course.code}
          </Link>
          <span className="text-gray-500">/</span>
          <span className="ml-3 text-gray-700">Assignment</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{assignment.title}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {course.name} | Due: {formatDueDate(assignment.dueDate)}
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Assignment Details</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="prose max-w-none">
                <p>{assignment.description}</p>
                
                <h4>Requirements:</h4>
                <ul>
                  <li>Complete all tasks described in the assignment description</li>
                  <li>Submit your work before the deadline</li>
                  <li>Follow the formatting guidelines provided in class</li>
                  <li>Cite all sources using the required citation format</li>
                </ul>
                
                <h4>Grading Criteria:</h4>
                <ul>
                  <li>Content quality and depth (40%)</li>
                  <li>Structure and organization (25%)</li>
                  <li>Clarity and writing style (20%)</li>
                  <li>Proper citations and references (15%)</li>
                </ul>
                
                <div className="mt-4 p-4 border border-indigo-100 bg-indigo-50 rounded-md">
                  <h4 className="text-indigo-800">Submission Guidelines:</h4>
                  <ul className="text-indigo-700">
                    <li>Submit a single PDF or DOCX file</li>
                    <li>Filename format: YourName_AssignmentTitle.pdf</li>
                    <li>Include a cover page with your name, course code, and assignment title</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <AssignmentSubmission assignment={assignment} />
          
          <div className="mt-6 bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Resources</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <ul className="divide-y divide-gray-200">
                <li className="py-3 flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                  </svg>
                  <a href="#" className="ml-3 text-sm text-indigo-600 hover:text-indigo-500">
                    Assignment Instructions.pdf
                  </a>
                </li>
                <li className="py-3 flex items-center">
                  <svg className="flex-shrink-0 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clipRule="evenodd" />
                  </svg>
                  <a href="#" className="ml-3 text-sm text-indigo-600 hover:text-indigo-500">
                    Sample Project.docx
                  </a>
                </li>
              </ul>
              
              <div className="mt-4 pt-3 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900">Need Help?</h4>
                <p className="mt-2 text-sm text-gray-500">
                  Contact your instructor or visit office hours for assistance with this assignment.
                </p>
                <div className="mt-3">
                  <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    Contact Instructor
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
