// Types for timetable data
export interface TimeSlot {
    id: string;
    startTime: string;
    endTime: string;
    display: string; // e.g., "9:00 AM - 10:00 AM"
  }
  
  export interface Class {
    id: string;
    subject: string;
    code: string;
    professor: string;
    room: string;
    day: number; // 0-6, where 0 is Monday
    timeSlotId: string;
    color: string; // CSS color for the class block
  }
  
  // Time slots for the week
  export const timeSlots: TimeSlot[] = [
    { id: '1', startTime: '09:00', endTime: '10:00', display: '9:00 AM - 10:00 AM' },
    { id: '2', startTime: '10:15', endTime: '11:15', display: '10:15 AM - 11:15 AM' },
    { id: '3', startTime: '11:30', endTime: '12:30', display: '11:30 AM - 12:30 PM' },
    { id: '4', startTime: '13:30', endTime: '14:30', display: '1:30 PM - 2:30 PM' },
    { id: '5', startTime: '14:45', endTime: '15:45', display: '2:45 PM - 3:45 PM' },
    { id: '6', startTime: '16:00', endTime: '17:00', display: '4:00 PM - 5:00 PM' },
  ];
  
  // Colors for different subjects
  const colors = [
    'bg-blue-100 border-blue-300 text-blue-800',
    'bg-green-100 border-green-300 text-green-800',
    'bg-yellow-100 border-yellow-300 text-yellow-800',
    'bg-red-100 border-red-300 text-red-800',
    'bg-purple-100 border-purple-300 text-purple-800',
    'bg-pink-100 border-pink-300 text-pink-800',
    'bg-indigo-100 border-indigo-300 text-indigo-800',
  ];
  
  // Classes for the week
  export const classes: Class[] = [
    {
      id: 'c1',
      subject: 'Introduction to Computer Science',
      code: 'CS101',
      professor: 'Dr. Rajesh Iyer',
      room: 'Room 101',
      day: 0, // Monday
      timeSlotId: '1',
      color: colors[0],
    },
    {
      id: 'c2',
      subject: 'Advanced Mathematics',
      code: 'MATH201',
      professor: 'Prof. Meera Chatterjee',
      room: 'Room 203',
      day: 0, // Monday
      timeSlotId: '3',
      color: colors[1],
    },
    {
      id: 'c3',
      subject: 'Physics I',
      code: 'PHY101',
      professor: 'Dr. Vikram Singh',
      room: 'Lab 2',
      day: 1, // Tuesday
      timeSlotId: '2',
      color: colors[2],
    },
    {
      id: 'c4',
      subject: 'Data Structures and Algorithms',
      code: 'CS202',
      professor: 'Dr. Ananya Banerjee',
      room: 'Computer Lab 1',
      day: 1, // Tuesday
      timeSlotId: '4',
      color: colors[3],
    },
    {
      id: 'c5',
      subject: 'Technical Writing',
      code: 'ENG202',
      professor: 'Prof. Davis',
      room: 'Room 105',
      day: 2, // Wednesday
      timeSlotId: '1',
      color: colors[4],
    },
    {
      id: 'c6',
      subject: 'Introduction to Computer Science',
      code: 'CS101',
      professor: 'Dr. Rajesh Iyer',
      room: 'Room 101',
      day: 2, // Wednesday
      timeSlotId: '5',
      color: colors[0],
    },
    {
      id: 'c7',
      subject: 'Physics I',
      code: 'PHY101',
      professor: 'Dr. Vikram Singh',
      room: 'Lab 2',
      day: 3, // Thursday
      timeSlotId: '3',
      color: colors[2],
    },
    {
      id: 'c8',
      subject: 'Advanced Mathematics',
      code: 'MATH201',
      professor: 'Prof. Meera Chatterjee',
      room: 'Room 203',
      day: 3, // Thursday
      timeSlotId: '5',
      color: colors[1],
    },
    {
      id: 'c9',
      subject: 'Data Structures and Algorithms',
      code: 'CS202',
      professor: 'Dr. Ananya Banerjee',
      room: 'Computer Lab 1',
      day: 4, // Friday
      timeSlotId: '2',
      color: colors[3],
    },
    {
      id: 'c10',
      subject: 'Technical Writing',
      code: 'ENG202',
      professor: 'Prof. Davis',
      room: 'Room 105',
      day: 4, // Friday
      timeSlotId: '4',
      color: colors[4],
    },
  ];
  
  // Helper functions
  export const getDayName = (day: number): string => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return days[day];
  };
  
  export const getClassesForDay = (day: number): Class[] => {
    return classes.filter(c => c.day === day);
  };
  
  export const getTimeSlotById = (id: string): TimeSlot | undefined => {
    return timeSlots.find(slot => slot.id === id);
  };
  