"use client";
import { Grade } from '@/utils/academicsData';

interface GradeOverviewProps {
  grades: Grade[];
}

export default function GradeOverview({ grades }: GradeOverviewProps) {
  // Get grade color based on numeric value
  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    if (grade >= 60) return 'text-orange-600';
    return 'text-red-600';
  };
  
  // Calculate overall GPA
  const calculateGPA = () => {
    if (grades.length === 0) return 0;
    
    const gradePoints: Record<string, number> = {
      'A+': 4.0, 'A': 4.0, 'A-': 3.7,
      'B+': 3.3, 'B': 3.0, 'B-': 2.7,
      'C+': 2.3, 'C': 2.0, 'C-': 1.7,
      'D+': 1.3, 'D': 1.0, 'D-': 0.7,
      'F': 0.0,
    };
    
    let totalPoints = 0;
    let totalCredits = 0;
    
    grades.forEach(grade => {
      const points = gradePoints[grade.letterGrade] || 0;
      const credits = 3; // Assuming all courses are 3 credits for simplicity
      totalPoints += points * credits;
      totalCredits += credits;
    });
    
    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '0.00';
  };
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Grade Summary</h3>
      </div>
      
      <div className="p-4 sm:p-6">
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-500">Current Semester GPA</p>
          <p className="text-3xl font-bold text-indigo-600">{calculateGPA()}</p>
        </div>
        
        <div className="overflow-hidden border border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignments
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Midterm
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Final
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Overall
                </th>
                <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Letter
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {grades.map((grade) => (
                <tr key={grade.courseId}>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{grade.courseName}</div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <span className={`text-sm ${getGradeColor(grade.assignmentsGrade)}`}>
                      {grade.assignmentsGrade}%
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <span className={`text-sm ${getGradeColor(grade.midtermGrade)}`}>
                      {grade.midtermGrade}%
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <span className="text-sm text-gray-500">
                      {grade.finalGrade > 0 ? `${grade.finalGrade}%` : 'Pending'}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center font-medium">
                    <span className={`text-sm ${getGradeColor(grade.overallGrade)}`}>
                      {grade.overallGrade}%
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <span className={`text-sm font-semibold ${getGradeColor(grade.overallGrade)}`}>
                      {grade.letterGrade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 text-xs text-gray-500">
          <p>* Grades are calculated based on the current completed assessments.</p>
          <p>* Final grades will be updated after the final examination period.</p>
        </div>
      </div>
    </div>
  );
}
