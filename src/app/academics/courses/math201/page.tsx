import Link from 'next/link';
import AssignmentList from '@/components/academics/AssignmentList';
import Announcements from '@/components/academics/Announcements';
import CourseMaterials from '@/components/academics/CourseMaterials';
import { 
  getCourseById, 
  getAssignmentsByCourse, 
  getAnnouncementsByCourse,
  getMaterialsByCourse,
  getGradeByCourse,
} from '@/utils/academicsData';

interface CoursePageProps {
  params: {
    courseId: string;
  };
}

export default function CoursePage({ params }: CoursePageProps) {
  const courseId = params.courseId;
  const course = getCourseById(courseId);
  
  if (!course) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Not Found</h1>
        <p className="text-gray-500 mb-6">The course you're looking for doesn't exist or you don't have access to it.</p>
        <Link href="/academics" className="text-indigo-600 hover:text-indigo-800">
          &larr; Back to Academics
        </Link>
      </div>
    );
  }
  
  const assignments = getAssignmentsByCourse(courseId);
  const announcements = getAnnouncementsByCourse(courseId);
  const materials = getMaterialsByCourse(courseId);
  const grade = getGradeByCourse(courseId);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <Link href="/academics" className="text-indigo-600 hover:text-indigo-800 mr-3">
            &larr; Back to Academics
          </Link>
          <span className="text-gray-500">/</span>
          <span className="ml-3 text-gray-700">{course.code}</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
        <p className="mt-1 text-sm text-gray-500">
          {course.description}
        </p>
      </div>
      
      <div className="mb-8">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Course Information</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500">Instructor</h4>
                <p className="mt-1 text-sm text-gray-900">{course.instructor}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Schedule</h4>
                <p className="mt-1 text-sm text-gray-900">{course.schedule.days.join(', ')}</p>
                <p className="mt-1 text-sm text-gray-900">{course.schedule.time}</p>
                <p className="mt-1 text-sm text-gray-900">{course.schedule.location}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500">Details</h4>
                <p className="mt-1 text-sm text-gray-900">{course.credits} Credits</p>
                <p className="mt-1 text-sm text-gray-900">{course.semester}</p>
                {grade && (
                  <p className="mt-1 text-sm font-semibold text-indigo-600">
                    Current Grade: {grade.overallGrade}% ({grade.letterGrade})
                  </p>
                )}
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-indigo-600 h-2.5 rounded-full" 
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-right mt-1 text-gray-500">{course.progress}% Complete</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AssignmentList assignments={assignments} courseId={courseId} />
          <CourseMaterials materials={materials} />
        </div>
        
        <div>
          <Announcements announcements={announcements} />
        </div>
      </div>
    </div>
  );
}
