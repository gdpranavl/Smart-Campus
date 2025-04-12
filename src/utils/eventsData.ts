// Types for events data
export interface Event {
    id: string;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    organizer: string;
    category: EventCategory;
    image: string;
    isFeatured: boolean;
    isRegistrationRequired: boolean;
    registrationDeadline?: string;
    maxAttendees?: number;
    currentAttendees: number;
    isRegistered?: boolean;
  }
  
  export type EventCategory = 
    | 'academic' 
    | 'cultural' 
    | 'sports' 
    | 'workshop' 
    | 'seminar' 
    | 'club' 
    | 'career';
  
  export interface CategoryInfo {
    id: EventCategory;
    name: string;
    color: string;
  }
  
  // Category information with display names and colors
  export const categories: CategoryInfo[] = [
    { id: 'academic', name: 'Academic', color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'cultural', name: 'Cultural', color: 'bg-pink-100 text-pink-800 border-pink-200' },
    { id: 'sports', name: 'Sports', color: 'bg-green-100 text-green-800 border-green-200' },
    { id: 'workshop', name: 'Workshop', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { id: 'seminar', name: 'Seminar', color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'club', name: 'Club', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    { id: 'career', name: 'Career', color: 'bg-orange-100 text-orange-800 border-orange-200' },
  ];
  
  // Mock data for events
  export const events: Event[] = [
    {
      id: 'evt001',
      title: 'Annual Tech Symposium',
      description: 'Join us for the annual technology symposium featuring keynote speakers from leading tech companies, panel discussions, and interactive workshops on emerging technologies. This event is perfect for students interested in computer science, engineering, and related fields. Network with industry professionals and learn about the latest trends in technology.',
      startDate: '2025-04-25T09:00:00',
      endDate: '2025-04-25T17:00:00',
      location: 'Main Auditorium',
      organizer: 'Computer Science Department',
      category: 'academic',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      isFeatured: true,
      isRegistrationRequired: true,
      registrationDeadline: '2025-04-20T23:59:59',
      maxAttendees: 200,
      currentAttendees: 143,
      isRegistered: false,
    },
    {
      id: 'evt002',
      title: 'Cultural Festival',
      description: 'Celebrate diversity with our annual cultural festival featuring performances, food stalls, art exhibitions, and cultural workshops representing traditions from around the world. This three-day event showcases the rich cultural diversity of our college community and provides an opportunity for cultural exchange and appreciation.',
      startDate: '2025-04-28T10:00:00',
      endDate: '2025-04-30T22:00:00',
      location: 'College Grounds',
      organizer: 'Cultural Committee',
      category: 'cultural',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      isFeatured: true,
      isRegistrationRequired: false,
      currentAttendees: 0,
      isRegistered: false,
    },
    {
      id: 'evt003',
      title: 'Career Fair 2025',
      description: 'Connect with potential employers at our annual Career Fair. Over 50 companies from various industries will be present to recruit for internships and full-time positions. Bring your resume and dress professionally for on-the-spot interviews. This is a great opportunity for graduating students and those looking for summer internships.',
      startDate: '2025-05-05T10:00:00',
      endDate: '2025-05-05T16:00:00',
      location: 'College Gymnasium',
      organizer: 'Career Services',
      category: 'career',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      isFeatured: true,
      isRegistrationRequired: true,
      registrationDeadline: '2025-05-03T23:59:59',
      maxAttendees: 500,
      currentAttendees: 210,
      isRegistered: true,
    },
    {
      id: 'evt004',
      title: 'Data Science Workshop',
      description: 'Learn practical data science skills in this hands-on workshop. Topics include data cleaning, exploratory data analysis, and building machine learning models. Bring your laptop with Python installed. Basic programming knowledge is required. This workshop will be led by Dr. James Wilson, a leading researcher in data science and machine learning.',
      startDate: '2025-04-22T13:00:00',
      endDate: '2025-04-22T17:00:00',
      location: 'Computer Lab 3',
      organizer: 'Data Science Club',
      category: 'workshop',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
      isFeatured: false,
      isRegistrationRequired: true,
      registrationDeadline: '2025-04-21T12:00:00',
      maxAttendees: 30,
      currentAttendees: 28,
      isRegistered: false,
    },
    {
      id: 'evt005',
      title: 'Entrepreneurship Seminar',
      description: 'Join successful entrepreneurs for an inspiring seminar on starting and growing your own business. Learn about funding opportunities, business planning, and lessons from both successes and failures. This seminar features guest speakers who have built successful startups and businesses across various industries.',
      startDate: '2025-04-18T15:00:00',
      endDate: '2025-04-18T18:00:00',
      location: 'Business School Auditorium',
      organizer: 'Entrepreneurship Cell',
      category: 'seminar',
      image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
      isFeatured: false,
      isRegistrationRequired: true,
      registrationDeadline: '2025-04-17T23:59:59',
      maxAttendees: 100,
      currentAttendees: 65,
      isRegistered: false,
    },
    {
      id: 'evt006',
      title: 'Intercollegiate Basketball Tournament',
      description: 'Cheer for our college basketball team as they compete against other colleges in this exciting tournament. The tournament will feature both men\'s and women\'s teams from eight different colleges competing for the championship trophy. Refreshments will be available for purchase.',
      startDate: '2025-04-20T09:00:00',
      endDate: '2025-04-21T18:00:00',
      location: 'Sports Complex',
      organizer: 'Sports Department',
      category: 'sports',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1605&q=80',
      isFeatured: false,
      isRegistrationRequired: false,
      currentAttendees: 0,
      isRegistered: false,
    },
    {
      id: 'evt007',
      title: 'Photography Club Exhibition',
      description: 'View stunning photographs taken by our photography club members. The exhibition will feature a wide range of genres, from landscape to portrait photography.',
      startDate: '2025-04-15T09:00:00',
      endDate: '2025-04-15T12:00:00',
      location: 'Campus Gallery',
      organizer: 'Photography Club',
      category: 'club',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      isFeatured: false,
      isRegistrationRequired: true,
      registrationDeadline: '2025-04-14T23:59:59',
      maxAttendees: 50,
      currentAttendees: 35,
      isRegistered: true,
    },
    {
      id: 'evt008',
      title: 'AI Workshop',
      description: 'Hands-on workshop on building AI models using popular libraries and frameworks. Learn about the latest advancements in AI and how to apply them in real-world projects.',
      startDate: '2025-04-29T14:00:00',
      endDate: '2025-04-29T16:00:00',
      location: 'Science Building, Room 305',
      organizer: 'AI Research Group',
      category: 'workshop',
      image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      isFeatured: false,
      isRegistrationRequired: true,
      registrationDeadline: '2025-04-28T23:59:59',
      maxAttendees: 80,
      currentAttendees: 42,
      isRegistered: false,
    },
    {
      id: 'evt009',
      title: 'Research Seminar',
      description: 'Latest research findings in applied sciences, including breakthroughs in materials science, biotechnology, and renewable energy.',
      startDate: '2025-04-24T16:00:00',
      endDate: '2025-04-24T18:00:00',
      location: 'Humanities Building, Room 203',
      organizer: 'Research Department',
      category: 'seminar',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      isFeatured: false,
      isRegistrationRequired: true,
      registrationDeadline: '2025-04-23T23:59:59',
      maxAttendees: 25,
      currentAttendees: 15,
      isRegistered: true,
    },
    {
      id: 'evt010',
      title: 'Alumni Networking Night',
      description: 'Connect with successful alumni from various industries at this networking event. This is an excellent opportunity to build professional connections, learn about career paths, and gain insights from experienced professionals who were once in your shoes.',
      startDate: '2025-05-10T18:00:00',
      endDate: '2025-05-10T21:00:00',
      location: 'Student Center Ballroom',
      organizer: 'Alumni Association',
      category: 'career',
      image: 'https://source.unsplash.com/random/300x200/?networking',
      isFeatured: true,
      isRegistrationRequired: true,
      registrationDeadline: '2025-05-08T23:59:59',
      maxAttendees: 150,
      currentAttendees: 98,
      isRegistered: false,
    },
  ];
  
  // Helper functions
  export const getFeaturedEvents = (): Event[] => {
    return events.filter(event => event.isFeatured);
  };
  
  export const getUpcomingEvents = (limit?: number): Event[] => {
    const now = new Date();
    const upcomingEvents = events
      .filter(event => new Date(event.startDate) > now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    
    return limit ? upcomingEvents.slice(0, limit) : upcomingEvents;
  };
  
  export const getEventsByCategory = (category: EventCategory): Event[] => {
    return events.filter(event => event.category === category);
  };
  
  export const getEventById = (id: string): Event | undefined => {
    return events.find(event => event.id === id);
  };
  
  export const getRegisteredEvents = (): Event[] => {
    return events.filter(event => event.isRegistered);
  };
  
  export const getCategoryInfo = (categoryId: EventCategory): CategoryInfo => {
    return categories.find(cat => cat.id === categoryId) || categories[0];
  };
  
  // Format date utilities
  export const formatEventDate = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const isSameDay = start.getDate() === end.getDate() && 
                      start.getMonth() === end.getMonth() && 
                      start.getFullYear() === end.getFullYear();
    
    const startDateStr = start.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    const endDateStr = end.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
    
    const startTimeStr = start.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    const endTimeStr = end.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    
    if (isSameDay) {
      return `${startDateStr}, ${startTimeStr} - ${endTimeStr}`;
    } else {
      return `${startDateStr}, ${startTimeStr} - ${endDateStr}, ${endTimeStr}`;
    }
  };
  
  export const isEventSoon = (startDate: string): boolean => {
    const eventDate = new Date(startDate);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    return diffDays <= 7 && diffDays > 0;
  };
  
  export const isRegistrationClosingSoon = (deadline: string): boolean => {
    if (!deadline) return false;
    
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const diffTime = deadlineDate.getTime() - now.getTime();
    const diffHours = diffTime / (1000 * 3600);
    return diffHours <= 48 && diffHours > 0;
  };
  
  export const formatDateShort = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };
  