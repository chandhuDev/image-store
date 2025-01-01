import { connectDB } from '../../../utils/db';
import User from '../../../models/User';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { username, email, profileImage } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      profileImage: profileImage || '', // Use default value if no image provided
    });

    // Return success response
    res.status(201).json({
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage
      }
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ 
      message: 'Error registering user', 
      error: error.message 
    });
  }
}