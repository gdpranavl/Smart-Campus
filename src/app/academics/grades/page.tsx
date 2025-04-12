import GradeOverview from '@/components/academics/GradeOverview';
import GradeCharts from '@/components/academics/GradeCharts';
import { grades } from '@/utils/academicsData';

export default function GradesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Academic Grades</h1>
        <p className="mt-1 text-sm text-gray-500">
          View your grades and academic performance for all courses.
        </p>
      </div>
      
      <GradeCharts grades={grades} />
      
      <div className="grid grid-cols-1 gap-6">
        <GradeOverview grades={grades} />
        
        <div className="bg-white shadow rounded-lg overflow-hidden p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Grade Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Grade Scale</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Letter</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GPA</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr><td className="px-3 py-1 text-xs">A+</td><td className="px-3 py-1 text-xs">97-100%</td><td className="px-3 py-1 text-xs">4.0</td></tr>
                  <tr><td className="px-3 py-1 text-xs">A</td><td className="px-3 py-1 text-xs">93-96%</td><td className="px-3 py-1 text-xs">4.0</td></tr>
                  <tr><td className="px-3 py-1 text-xs">A-</td><td className="px-3 py-1 text-xs">90-92%</td><td className="px-3 py-1 text-xs">3.7</td></tr>
                  <tr><td className="px-3 py-1 text-xs">B+</td><td className="px-3 py-1 text-xs">87-89%</td><td className="px-3 py-1 text-xs">3.3</td></tr>
                  <tr><td className="px-3 py-1 text-xs">B</td><td className="px-3 py-1 text-xs">83-86%</td><td className="px-3 py-1 text-xs">3.0</td></tr>
                  <tr><td className="px-3 py-1 text-xs">B-</td><td className="px-3 py-1 text-xs">80-82%</td><td className="px-3 py-1 text-xs">2.7</td></tr>
                  <tr><td className="px-3 py-1 text-xs">C+</td><td className="px-3 py-1 text-xs">77-79%</td><td className="px-3 py-1 text-xs">2.3</td></tr>
                </tbody>
              </table>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-900 mb-2">Grade Calculation</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Component</th>
                    <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Weight</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr><td className="px-3 py-1 text-xs">Assignments</td><td className="px-3 py-1 text-xs">40%</td></tr>
                  <tr><td className="px-3 py-1 text-xs">Midterm Exam</td><td className="px-3 py-1 text-xs">25%</td></tr>
                  <tr><td className="px-3 py-1 text-xs">Final Exam</td><td className="px-3 py-1 text-xs">35%</td></tr>
                </tbody>
              </table>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Academic Standing</h3>
                <p className="text-xs text-gray-600">
                  Good Academic Standing: GPA of 2.0 or higher<br />
                  Academic Probation: GPA below 2.0<br />
                  Dean's List: Semester GPA of 3.5 or higher with no grade below B
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
