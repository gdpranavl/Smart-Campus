"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Course } from '@/utils/academicsData';

interface CourseListProps {
  courses: Course[];
}

export default function CourseList({ courses }: CourseListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter courses based on search query
  const filteredCourses = courses.filter(course => 
    course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.code.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <div className="flex flex-wrap items-center justify-between">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Your Courses</h3>
          <div className="mt-2 sm:mt-0">
            <div className="relative rounded-md shadow-sm">
              <input
                type="text"
                placeholder="Search courses..."
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-indigo-500 sm:text-sm text-black"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <Link 
                href={`/academics/courses/${course.id}`} 
                key={course.id}
                className="block group"
              >
                <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {course.code}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">{course.name}</h4>
                    <p className="text-sm text-gray-500 mb-3">{course.instructor}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-right mt-1 text-gray-500">{course.progress}% Complete</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full py-10 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
              <p className="mt-1 text-sm text-gray-500">Try another search term or check your course enrollments.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
