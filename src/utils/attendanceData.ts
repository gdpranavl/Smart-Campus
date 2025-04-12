// Attendance status types
export type AttendanceStatus = 'present' | 'absent' | 'late' | 'excused';

// Subject attendance data
export interface SubjectAttendance {
  id: string;
  name: string;
  attended: number;
  total: number;
  percentage: number;
}

// Daily attendance data
export interface DailyAttendance {
  date: string; // ISO date string
  dayName: string; // Monday, Tuesday, etc.
  classes: {
    id: string;
    subject: string;
    time: string;
    status: AttendanceStatus;
    professor: string;
  }[];
}

// Mock data for subject-wise attendance
export const subjectAttendanceData: SubjectAttendance[] = [
  {
    id: 'cs101',
    name: 'Introduction to Computer Science',
    attended: 15,
    total: 16,
    percentage: 87.5,
  },
  {
    id: 'math201',
    name: 'Advanced Mathematics',
    attended: 15,
    total: 15,
    percentage: 80,
  },
  {
    id: 'phy101',
    name: 'Physics I',
    attended: 13,
    total: 14,
    percentage: 71.4,
  },
  {
    id: 'eng202',
    name: 'Technical Writing',
    attended: 7,
    total: 8,
    percentage: 100,
  },
  {
    id: 'cs202',
    name: 'Data Structures and Algorithms',
    attended: 13,
    total: 15,
    percentage: 86.7,
  },
];

// Helper function to generate past 30 days of attendance
export const generateDailyAttendance = (): DailyAttendance[] => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const subjects = [
    { id: 'cs101', name: 'Introduction to Computer Science', professor: 'Dr. Rajesh Iyer' },
    { id: 'math201', name: 'Advanced Mathematics', professor: 'Prof. Meera Chatterjee' },
    { id: 'phy101', name: 'Physics I', professor: 'Dr. Vikram Singh' },
    { id: 'eng202', name: 'Technical Writing', professor: 'Prof. Ramesh Rao' },
    { id: 'cs202', name: 'Data Structures and Algorithms', professor: 'Dr. Ananya Banerjee' },
  ];
  
  // Generate random status with bias towards 'present'
  const generateStatus = (): AttendanceStatus => {
    const rand = Math.random();
    if (rand < 0.85) return 'present';
    if (rand < 0.9) return 'late';
    if (rand < 0.95) return 'excused';
    return 'absent';
  };
  
  const result: DailyAttendance[] = [];
  
  // Generate data for past 30 days
  for (let i = 0; i < 30; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Skip weekends
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) continue;
    
    // 2-3 classes per day
    const classCount = 2 + Math.floor(Math.random() * 2);
    const todayClasses = [];
    
    // Set up class hours
    const startHours = [9, 11, 14, 16];
    
    for (let j = 0; j < classCount; j++) {
      const subjectIndex = Math.floor(Math.random() * subjects.length);
      const startHour = startHours[j];
      
      todayClasses.push({
        id: `class-${date.toISOString().split('T')[0]}-${j}`,
        subject: subjects[subjectIndex].name,
        time: `${startHour}:00 - ${startHour + 1}:00`,
        status: generateStatus(),
        professor: subjects[subjectIndex].professor,
      });
    }
    
    result.push({
      date: date.toISOString().split('T')[0],
      dayName: days[dayOfWeek],
      classes: todayClasses,
    });
  }
  
  return result.sort((a, b) => a.date.localeCompare(b.date));
};

// Calculate overall attendance percentage
export const calculateOverallAttendance = (): { 
  percentage: number; 
  attended: number; 
  total: number;
} => {
  const total = subjectAttendanceData.reduce((sum, subject) => sum + subject.total, 0);
  const attended = subjectAttendanceData.reduce((sum, subject) => sum + subject.attended, 0);
  const percentage = (attended / total) * 100;
  
  return {
    percentage: Math.round(percentage * 10) / 10,
    attended,
    total,
  };
};
