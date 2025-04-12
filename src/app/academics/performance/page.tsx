"use client";

import { useState } from 'react';
import { grades, enrolledCourses } from '@/utils/academicsData';
import GradeOverview from '@/components/academics/GradeOverview';
import PerformanceGradeDistribution from '@/components/academics/charts/PerformanceGradeDistribution';
import SemesterComparison from '@/components/academics/charts/SemesterComparison';
import GradeTimeline from '@/components/academics/charts/GradeTimeline';
import SubjectComparison from '@/components/academics/charts/SubjectComparison';
import AssignmentScores from '@/components/academics/charts/AssignmentScores';
import AcademicRadar from '@/components/academics/charts/AcademicRadar';

export default function PerformanceAnalyticsPage() {
  const [selectedSemester, setSelectedSemester] = useState('Spring 2025');
  const [selectedCourse, setSelectedCourse] = useState(enrolledCourses[0].id);
  
  // Get all available semesters
  const semesters = ['Fall 2024', 'Spring 2025'];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">
          Comprehensive visualization of your academic performance and progress
        </p>
      </div>
      
      {/* Filters */}
      <div className="bg-white shadow rounded-lg p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div>
          <label htmlFor="semester-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Semester
          </label>
          <select
            id="semester-filter"
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            {semesters.map((semester) => (
              <option key={semester} value={semester}>
                {semester}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="course-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Course
          </label>
          <select
            id="course-filter"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="all">All Courses</option>
            {enrolledCourses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.code} - {course.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Current GPA</h3>
          <p className="mt-1 text-3xl font-semibold text-indigo-600">3.78</p>
          <p className="text-xs text-green-600 mt-1">↑ 0.12 from last semester</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Completion Rate</h3>
          <p className="mt-1 text-3xl font-semibold text-indigo-600">92%</p>
          <p className="text-xs text-green-600 mt-1">↑ 3% from last semester</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Academic Standing</h3>
          <p className="mt-1 text-3xl font-semibold text-indigo-600">Dean's List</p>
          <p className="text-xs text-gray-500 mt-1">Maintained for 2 semesters</p>
        </div>
        
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-500">Credit Hours</h3>
          <p className="mt-1 text-3xl font-semibold text-indigo-600">18/120</p>
          <p className="text-xs text-gray-500 mt-1">15% of degree completed</p>
        </div>
      </div>
      
      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Grade Distribution */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Grade Distribution</h3>
          </div>
          <div className="p-4 h-80">
            <PerformanceGradeDistribution grades={grades} />
          </div>
        </div>
        
        {/* Subject Comparison */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Subject Performance</h3>
          </div>
          <div className="p-4 h-80">
            <SubjectComparison grades={grades} />
          </div>
        </div>
        
        {/* Semester Comparison */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Semester GPA Trend</h3>
          </div>
          <div className="p-4 h-80">
            <SemesterComparison />
          </div>
        </div>
        
        {/* Assignment Scores */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Assignment Performance</h3>
          </div>
          <div className="p-4 h-80">
            <AssignmentScores courseId={selectedCourse} />
          </div>
        </div>
      </div>
      
      {/* Additional Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Academic Radar */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Academic Strengths</h3>
          </div>
          <div className="p-4 h-72">
            <AcademicRadar grades={grades} />
          </div>
        </div>
        
        {/* Grade Timeline */}
        <div className="bg-white shadow rounded-lg overflow-hidden lg:col-span-2">
          <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium leading-6 text-gray-900">Grade Timeline</h3>
          </div>
          <div className="p-4 h-72">
            <GradeTimeline courseId={selectedCourse} />
          </div>
        </div>
      </div>
      
      {/* Detailed Grade Table */}
      <div className="mt-6">
        <GradeOverview grades={grades} />
      </div>
      
      {/* Insights Panel */}
      <div className="mt-6 bg-indigo-50 border border-indigo-100 rounded-lg p-4">
        <h3 className="text-lg font-medium text-indigo-900 mb-2">Performance Insights</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="text-sm text-indigo-900">Your strongest performance is in <strong>Data Structures and Algorithms</strong>, with an A grade.</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
            <span className="text-sm text-indigo-900">Consider focusing more on <strong>Physics I</strong>, where your midterm score was below your average.</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-indigo-900">You're on track to maintain your Dean's List status this semester.</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-indigo-900">Your overall academic performance has improved by 6% compared to the previous semester.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
