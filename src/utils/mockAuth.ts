// mockAuth.ts - A temporary solution to simulate authentication without requiring MongoDB

export interface UserData {
  id: string;
  name: string;
  email: string;
  password?: string; // Added password as optional field for mock data
  role: 'student' | 'teacher' | 'admin';
  accountStatus: 'pending' | 'approved' | 'rejected';
  department?: string;
  profileImage?: string;
}

// Default admin user for development
const adminUser: UserData = {
  id: 'admin-id',
  name: 'Dr. Nalini Jain',
  email: 'admin@college.edu',
  password: 'admin123', // Only for demonstration
  role: 'admin',
  accountStatus: 'approved',
  department: 'Administration',
  profileImage: '/images/avatars/admin-avatar.png'
};

// Default teacher user
const teacherUser: UserData = {
  id: 'teacher-id',
  name: 'Prof. Rohan Khanna',
  email: 'teacher@college.edu',
  password: 'teacher123', // Only for demonstration
  role: 'teacher',
  accountStatus: 'approved',
  department: 'Computer Science',
  profileImage: '/images/avatars/teacher-avatar.png'
};

// Default student user
const studentUser: UserData = {
  id: 'student-id',
  name: 'Kabir Singh',
  email: 'student@college.edu',
  password: 'student123', // Only for demonstration
  role: 'student',
  accountStatus: 'approved',
  department: 'Computer Science',
  profileImage: '/images/avatars/student-avatar.png'
};

// Initialize the mock user database
export function initMockUsers() {
  // Only initialize if localStorage is available (client-side)
  if (typeof window !== 'undefined') {
    const existingUsers = localStorage.getItem('mockUsers');
    
    if (!existingUsers) {
      const defaultUsers = [
        adminUser,
        teacherUser,
        studentUser,
      ];
      
      localStorage.setItem('mockUsers', JSON.stringify(defaultUsers));
    }
  }
}

// Get all users from mock database
export function getMockUsers(): UserData[] {
  if (typeof window === 'undefined') return [];
  
  const usersJSON = localStorage.getItem('mockUsers');
  return usersJSON ? JSON.parse(usersJSON) : [];
}

// Find a user by email for login
export function findUserByEmail(email: string): UserData | null {
  const users = getMockUsers();
  return users.find(user => user.email.toLowerCase() === email.toLowerCase()) || null;
}

// Authenticate user based on email and password
export function authenticateUser(email: string, password: string): UserData | null {
  const users = getMockUsers();
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
}

// Add a new user to the mock database
export function addMockUser(userData: UserData): boolean {
  if (typeof window === 'undefined') return false;
  
  const users = getMockUsers();
  
  // Check if email already exists
  if (users.some(user => user.email.toLowerCase() === userData.email.toLowerCase())) {
    return false;
  }
  
  users.push(userData);
  localStorage.setItem('mockUsers', JSON.stringify(users));
  return true;
}

// Update a user's account status
export function updateUserStatus(email: string, status: 'pending' | 'approved' | 'rejected'): boolean {
  if (typeof window === 'undefined') return false;
  
  const users = getMockUsers();
  const userIndex = users.findIndex(user => user.email.toLowerCase() === email.toLowerCase());
  
  if (userIndex === -1) return false;
  
  users[userIndex].accountStatus = status;
  localStorage.setItem('mockUsers', JSON.stringify(users));
  return true;
}
