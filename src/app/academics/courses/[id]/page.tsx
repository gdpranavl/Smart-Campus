'use client';

import { useEffect, useState } from 'react';
import SubjectResources from '@/components/academics/SubjectResources';

interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  semester: number;
  instructor: string;
  instructorEmail: string;
  progress: number;
  resourceStats: {
    note?: number;
    presentation?: number;
    video?: number;
    other?: number;
  };
}

interface Props {
  params: {
    id: string;
  };
}

export default function CoursePage({ params }: Props) {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourseData();
  }, [params.id]);

  const fetchCourseData = async () => {
    try {
      const response = await fetch(`/api/courses/${params.id}`);
      const data = await response.json();
      
      if (response.ok) {
        setCourse(data.course);
      } else {
        setError(data.error || 'Failed to load course');
      }
    } catch (error) {
      setError('Error loading course');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">
            {error || 'Course not found'}
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{course.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              {course.code} • Semester {course.semester}
            </p>
          </div>
          <div className="flex flex-col md:items-end">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-gray-500">Course Progress:</span>
              <div className="w-48 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-500">{course.progress}%</span>
            </div>
            <div className="flex gap-4 text-sm text-gray-500">
              <span>{course.resourceStats.note || 0} Notes</span>
              <span>{course.resourceStats.presentation || 0} Presentations</span>
              <span>{course.resourceStats.video || 0} Videos</span>
              <span>{course.resourceStats.other || 0} Other</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Course Resources</h2>
            <SubjectResources subjectId={params.id} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Course Information</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Course Code</dt>
                  <dd className="mt-1 text-sm text-gray-900">{course.code}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Semester</dt>
                  <dd className="mt-1 text-sm text-gray-900">{course.semester}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Instructor</dt>
                  <dd className="mt-1 text-sm text-gray-900">{course.instructor}</dd>
                  <dd className="mt-1 text-sm text-indigo-600">
                    <a href={`mailto:${course.instructorEmail}`}>{course.instructorEmail}</a>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Description</dt>
                  <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                    {course.description}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
              <h3 className="text-lg font-medium leading-6 text-gray-900">AI Course Assistant</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <p className="text-sm text-gray-500 mb-4">
                Have questions about this course? Our AI assistant can help you with:
              </p>
              <ul className="list-disc list-inside text-sm text-gray-500 mb-4">
                <li>Understanding course topics</li>
                <li>Finding relevant resources</li>
                <li>Assignment guidance</li>
                <li>Exam preparation tips</li>
              </ul>
              <button
                onClick={() => window.location.href = `/chat?course=${course.id}`}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Ask AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
