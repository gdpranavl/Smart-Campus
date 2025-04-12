import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function seedAdminUser() {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@college.edu' });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }
    
    // Create new admin user
    const newAdmin = new User({
      name: 'Admin User',
      email: 'admin@college.edu',
      password: 'admin123', // This will be hashed by the pre-save hook
      role: 'admin',
      department: 'Administration',
      accountStatus: 'approved',
      profileImage: '/images/avatars/admin-avatar.png'
    });
    
    await newAdmin.save();
    console.log('Admin user created successfully');
    
  } catch (error) {
    console.error('Error seeding admin user:', error);
  }
}
