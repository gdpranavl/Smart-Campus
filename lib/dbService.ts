import connectDB from './mongodb';
import User from '../models/User';

class DBService {
  static async connect() {
    return await connectDB();
  }

  // User operations
  static async createUser(data: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }) {
    await this.connect();
    return await User.create(data);
  }

  static async findUserByEmail(email: string) {
    await this.connect();
    return await User.findOne({ email });
  }

  static async updateUser(email: string, data: Partial<typeof User>) {
    await this.connect();
    return await User.updateOne({ email }, data);
  }

  static async deleteUser(email: string) {
    await this.connect();
    return await User.deleteOne({ email });
  }

  static async getAllUsers() {
    await this.connect();
    return await User.find({}, { password: 0 });
  }
}

export default DBService; 