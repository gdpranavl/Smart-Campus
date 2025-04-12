import { NextApiRequest, NextApiResponse } from 'next';
import DBService from '../../../lib/dbService';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case 'GET':
        // Get all users
        const users = await DBService.getAllUsers();
        return res.status(200).json(users);

      case 'POST':
        // Create a new user
        const { name, email, password, role } = req.body;
        if (!name || !email || !password) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
        const newUser = await DBService.createUser({ name, email, password, role });
        return res.status(201).json(newUser);

      case 'PUT':
        // Update a user
        const { updateEmail, ...updateData } = req.body;
        if (!updateEmail) {
          return res.status(400).json({ message: 'Email is required for update' });
        }
        await DBService.updateUser(updateEmail, updateData);
        return res.status(200).json({ message: 'User updated successfully' });

      case 'DELETE':
        // Delete a user
        const { deleteEmail } = req.body;
        if (!deleteEmail) {
          return res.status(400).json({ message: 'Email is required for deletion' });
        }
        await DBService.deleteUser(deleteEmail);
        return res.status(200).json({ message: 'User deleted successfully' });

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 