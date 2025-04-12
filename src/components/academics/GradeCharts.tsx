'use client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, PointElement, LineElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { Grade } from '@/utils/academicsData';

ChartJS.register(
  ArcElement, Tooltip, Legend, CategoryScale, 
  LinearScale, BarElement, Title, PointElement, LineElement
);

interface GradeChartsProps {
  grades: Grade[];
}

export default function GradeCharts({ grades }: GradeChartsProps) {
  // Prepare data for pie chart (grade distribution)
  const gradeDistribution = {
    'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0
  };

  grades.forEach(grade => {
    const letter = grade.letterGrade[0]; // Get first letter (A, B, C, etc.)
    if (['A', 'B', 'C', 'D', 'F'].includes(letter)) {
      gradeDistribution[letter as keyof typeof gradeDistribution]++;
    }
  });

  const pieData = {
    labels: Object.keys(gradeDistribution),
    datasets: [{
      data: Object.values(gradeDistribution),
      backgroundColor: [
        '#4CAF50', // A - green
        '#2196F3', // B - blue
        '#FFC107', // C - yellow
        '#FF9800', // D - orange
        '#F44336'  // F - red
      ],
    }]
  };

  // Prepare data for bar chart (performance by subject)
  const subjects = [...new Set(grades.map(grade => grade.courseName))];
  
  const barData = {
    labels: subjects,
    datasets: [{
      label: 'Average Grade %',
      data: subjects.map(subject => {
        const subjectGrades = grades.filter(g => g.courseName === subject);
        return subjectGrades.reduce((sum, g) => sum + g.percentage, 0) / subjectGrades.length;
      }),
      backgroundColor: '#3B82F6',
    }]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Grade Distribution</h3>
        <div className="h-64">
          <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Performance by Subject</h3>
        <div className="h-64">
          <Bar data={barData} options={{ 
            responsive: true, 
            maintainAspectRatio: false,
            scales: { y: { beginAtZero: true, max: 100 } }
          }} />
        </div>
      </div>
    </div>
  );
}
