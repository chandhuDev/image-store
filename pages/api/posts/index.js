import { connectDB } from '../../../utils/db';
import Post from '../../../models/postSchema';

export default async function handler(req, res) {
  await connectDB();

  if (req.method === 'GET') {
    try {
      const posts = await Post.find()
        .populate('userId', 'username profileImage')
        .populate('categoryId', 'category')
        .populate('comment')
        .sort({ createdAt: -1 });
      
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching posts' });
    }
  } 
  else if (req.method === 'POST') {
    try {
      const { description, categoryId, userId, imageUrl } = req.body;

      const newPost = new Post({
        description,
        categoryId,
        userId,
        imageUrl,
        like: [],
        comment: []
      });

      await newPost.save();

      const populatedPost = await Post.findById(newPost._id)
        .populate('userId', 'username profileImage')
        .populate('categoryId', 'category')
        .populate('comment');

      res.status(201).json(populatedPost);
    } catch (error) {
      res.status(500).json({ message: 'Error creating post' });
    }
  } 
  else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}