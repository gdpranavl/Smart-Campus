// Types for academics data
export interface Course {
    id: string;
    code: string;
    name: string;
    description: string;
    instructor: string;
    credits: number;
    semester: string;
    schedule: {
      days: string[];
      time: string;
      location: string;
    };
    progress: number; // Percentage of course completion
    image: string;
  }
  
  export interface Assignment {
    id: string;
    courseId: string;
    title: string;
    description: string;
    dueDate: string;
    points: number;
    status: 'pending' | 'submitted' | 'graded' | 'late';
    grade?: number;
    feedback?: string;
    attachments?: string[];
  }
  
  export interface Material {
    id: string;
    courseId: string;
    title: string;
    type: 'pdf' | 'video' | 'slide' | 'link' | 'document';
    url: string;
    uploadDate: string;
    description?: string;
    size?: string;
  }
  
  export interface Announcement {
    id: string;
    courseId: string | null; // null means general announcement
    title: string;
    content: string;
    date: string;
    author: string;
    important: boolean;
  }
  
  export interface Grade {
    courseId: string;
    courseName: string;
    assignmentsGrade: number;
    midtermGrade: number;
    finalGrade: number;
    overallGrade: number;
    letterGrade: string;
  }
  
  // Mock data for enrolled courses
  export const enrolledCourses: Course[] = [
    {
      id: 'cse101',
      code: 'CSE101',
      name: 'Introduction to Computer Science',
      description: 'An introductory course covering fundamental concepts of computer science, programming basics, and problem-solving techniques.',
      instructor: 'Dr. Johnson',
      credits: 4,
      semester: 'Spring 2025',
      schedule: {
        days: ['Monday', 'Wednesday'],
        time: '10:00 AM - 11:30 AM',
        location: 'Science Building, Room 101',
      },
      progress: 65,
      image: 'https://source.unsplash.com/random/300x200/?computer',
    },
    {
      id: 'math201',
      code: 'MATH201',
      name: 'Advanced Mathematics',
      description: 'A comprehensive study of calculus, linear algebra, and differential equations with applications in science and engineering.',
      instructor: 'Prof. Smith',
      credits: 3,
      semester: 'Spring 2025',
      schedule: {
        days: ['Tuesday', 'Thursday'],
        time: '2:00 PM - 3:30 PM',
        location: 'Mathematics Building, Room 203',
      },
      progress: 72,
      image: 'https://source.unsplash.com/random/300x200/?mathematics',
    },
    {
      id: 'phy101',
      code: 'PHY101',
      name: 'Physics I',
      description: 'Introduction to classical mechanics, including kinematics, Newton\'s laws of motion, work and energy, momentum, and rotational motion.',
      instructor: 'Dr. Williams',
      credits: 4,
      semester: 'Spring 2025',
      schedule: {
        days: ['Monday', 'Wednesday', 'Friday'],
        time: '1:00 PM - 2:00 PM',
        location: 'Science Building, Room 105',
      },
      progress: 58,
      image: 'https://source.unsplash.com/random/300x200/?physics',
    },
    {
      id: 'eng202',
      code: 'ENG202',
      name: 'Technical Writing',
      description: 'Development of technical writing skills, focusing on clarity, conciseness, document design, and research techniques for technical and professional contexts.',
      instructor: 'Prof. Davis',
      credits: 3,
      semester: 'Spring 2025',
      schedule: {
        days: ['Tuesday', 'Thursday'],
        time: '11:00 AM - 12:30 PM',
        location: 'Humanities Building, Room 302',
      },
      progress: 81,
      image: 'https://source.unsplash.com/random/300x200/?writing',
    },
    {
      id: 'cs202',
      code: 'CS202',
      name: 'Data Structures and Algorithms',
      description: 'Study of fundamental data structures, algorithms, and their applications in computer science, including complexity analysis and problem-solving strategies.',
      instructor: 'Dr. Miller',
      credits: 4,
      semester: 'Spring 2025',
      schedule: {
        days: ['Monday', 'Wednesday'],
        time: '3:00 PM - 4:30 PM',
        location: 'Computer Science Building, Room 105',
      },
      progress: 70,
      image: 'https://source.unsplash.com/random/300x200/?algorithm',
    },
  ];
  
  // Mock data for assignments
  export const assignments: Assignment[] = [
    {
      id: 'a1',
      courseId: 'cse101',
      title: 'Programming Basics',
      description: 'Write a program that implements basic control structures including loops and conditional statements.',
      dueDate: '2025-04-20T23:59:59',
      points: 100,
      status: 'submitted',
    },
    {
      id: 'a2',
      courseId: 'cse101',
      title: 'Object-Oriented Design',
      description: 'Create a class hierarchy to model a simple real-world system using inheritance and polymorphism.',
      dueDate: '2025-05-05T23:59:59',
      points: 150,
      status: 'pending',
    },
    {
      id: 'a3',
      courseId: 'math201',
      title: 'Linear Algebra Problems',
      description: 'Solve the given set of problems related to vector spaces, linear transformations, and eigenvalues.',
      dueDate: '2025-04-18T23:59:59',
      points: 100,
      status: 'graded',
      grade: 92,
      feedback: 'Excellent work! Your solutions were well-structured and correct. You demonstrated a good understanding of linear transformations.'
    },
    {
      id: 'a4',
      courseId: 'phy101',
      title: 'Motion Analysis Lab Report',
      description: 'Analyze the motion of a projectile and write a comprehensive lab report on your findings.',
      dueDate: '2025-04-10T23:59:59',
      points: 100,
      status: 'late',
    },
    {
      id: 'a5',
      courseId: 'eng202',
      title: 'Technical Documentation',
      description: 'Create a user manual for a hypothetical software application, following the technical writing principles discussed in class.',
      dueDate: '2025-04-25T23:59:59',
      points: 120,
      status: 'pending',
    },
    {
      id: 'a6',
      courseId: 'cs202',
      title: 'Sorting Algorithm Implementation',
      description: 'Implement three different sorting algorithms and compare their performance with various input sizes.',
      dueDate: '2025-04-15T23:59:59',
      points: 150,
      status: 'graded',
      grade: 88,
      feedback: 'Good implementation of the algorithms. Your analysis could be more detailed, particularly regarding space complexity.'
    },
  ];
  
  // Mock data for course materials
  export const courseMaterials: Material[] = [
    {
      id: 'm1',
      courseId: 'cse101',
      title: 'Introduction to Programming Concepts',
      type: 'pdf',
      url: '/materials/intro-programming.pdf',
      uploadDate: '2025-02-05',
      description: 'Lecture notes covering basic programming concepts and syntax.',
      size: '2.3 MB',
    },
    {
      id: 'm2',
      courseId: 'cse101',
      title: 'Functions and Methods Tutorial',
      type: 'video',
      url: '/materials/functions-tutorial.mp4',
      uploadDate: '2025-02-12',
      description: 'Video tutorial explaining functions, parameters, and return values.',
    },
    {
      id: 'm3',
      courseId: 'math201',
      title: 'Linear Algebra Lecture Slides',
      type: 'slide',
      url: '/materials/linear-algebra-slides.pptx',
      uploadDate: '2025-02-08',
      size: '5.1 MB',
    },
    {
      id: 'm4',
      courseId: 'phy101',
      title: 'Newton\'s Laws of Motion',
      type: 'pdf',
      url: '/materials/newtons-laws.pdf',
      uploadDate: '2025-02-10',
      description: 'Comprehensive notes on Newton\'s three laws of motion with examples.',
      size: '3.5 MB',
    },
    {
      id: 'm5',
      courseId: 'eng202',
      title: 'Technical Writing Guidelines',
      type: 'document',
      url: '/materials/tech-writing-guide.docx',
      uploadDate: '2025-02-15',
      description: 'Guidelines and best practices for technical documentation.',
      size: '1.2 MB',
    },
    {
      id: 'm6',
      courseId: 'cs202',
      title: 'Data Structures Overview',
      type: 'pdf',
      url: '/materials/data-structures.pdf',
      uploadDate: '2025-02-07',
      description: 'Overview of common data structures and their applications.',
      size: '4.0 MB',
    },
  ];
  
  // Mock data for announcements
  export const announcements: Announcement[] = [
    {
      id: 'ann1',
      courseId: null,
      title: 'Final Exam Schedule Published',
      content: 'The final examination schedule for Spring 2025 has been published. Please check the academic calendar for your exam dates and times.',
      date: '2025-04-10',
      author: 'Academic Office',
      important: true,
    },
    {
      id: 'ann2',
      courseId: 'cse101',
      title: 'Class Canceled - April 15',
      content: 'The Introduction to Computer Science class scheduled for April 15 is canceled due to a faculty meeting. We will cover the material in the next class.',
      date: '2025-04-12',
      author: 'Dr. Johnson',
      important: true,
    },
    {
      id: 'ann3',
      courseId: 'math201',
      title: 'Extra Help Session',
      content: 'An additional help session for the upcoming midterm will be held this Friday from 3:00 PM to 5:00 PM in Room 204.',
      date: '2025-04-09',
      author: 'Prof. Smith',
      important: false,
    },
    {
      id: 'ann4',
      courseId: null,
      title: 'Library Extended Hours',
      content: 'The university library will have extended hours during the final exam period, staying open until midnight from April 25 to May 10.',
      date: '2025-04-08',
      author: 'Library Services',
      important: false,
    },
  ];
  
  // Mock data for grades
  export const grades: Grade[] = [
    {
      courseId: 'cse101',
      courseName: 'Introduction to Computer Science',
      assignmentsGrade: 88,
      midtermGrade: 92,
      finalGrade: 0, // Not graded yet
      overallGrade: 90, // Calculated based on completed assessments
      letterGrade: 'A-',
    },
    {
      courseId: 'math201',
      courseName: 'Advanced Mathematics',
      assignmentsGrade: 85,
      midtermGrade: 78,
      finalGrade: 0,
      overallGrade: 82,
      letterGrade: 'B',
    },
    {
      courseId: 'phy101',
      courseName: 'Physics I',
      assignmentsGrade: 75,
      midtermGrade: 80,
      finalGrade: 0,
      overallGrade: 77,
      letterGrade: 'C+',
    },
    {
      courseId: 'eng202',
      courseName: 'Technical Writing',
      assignmentsGrade: 95,
      midtermGrade: 91,
      finalGrade: 0,
      overallGrade: 93,
      letterGrade: 'A',
    },
    {
      courseId: 'cs202',
      courseName: 'Data Structures and Algorithms',
      assignmentsGrade: 87,
      midtermGrade: 85,
      finalGrade: 0,
      overallGrade: 86,
      letterGrade: 'B+',
    },
  ];
  
  // Helper functions
  export const getCourseById = (id: string): Course | undefined => {
    return enrolledCourses.find(course => course.id === id);
  };
  
  export const getAssignmentsByCourse = (courseId: string): Assignment[] => {
    return assignments.filter(assignment => assignment.courseId === courseId);
  };
  
  export const getMaterialsByCourse = (courseId: string): Material[] => {
    return courseMaterials.filter(material => material.courseId === courseId);
  };
  
  export const getAnnouncementsByCourse = (courseId: string | null): Announcement[] => {
    if (courseId === null) {
      return announcements.filter(announcement => announcement.courseId === null);
    }
    return announcements.filter(announcement => announcement.courseId === courseId || announcement.courseId === null);
  };
  
  export const getGradeByCourse = (courseId: string): Grade | undefined => {
    return grades.find(grade => grade.courseId === courseId);
  };
  
  export const getAssignmentById = (id: string): Assignment | undefined => {
    return assignments.find(assignment => assignment.id === id);
  };
  