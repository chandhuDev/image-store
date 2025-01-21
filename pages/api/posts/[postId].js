import { connectDB } from '../../../utils/db';
import Post from '../../../models/Post';

export default async function handler(req, res) {
  const { postId } = req.query;

  try {
    await connectDB();

    // GET single post
    if (req.method === 'GET') {
      const post = await Post.findById(postId)
        .populate('userId')
        .populate('categoryId')

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json(post);
    }


    // UPDATE post
    if (req.method === 'PUT') {
      const { description, categoryId } = req.body;

      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
          description,
          categoryId
        },
        { 
          new: true, // Return updated document
          runValidators: true // Run model validators
        }
      )
      .populate('userId')
      .populate('categoryId')
      .populate('comment');

      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }

      return res.status(200).json(updatedPost);
    }

    // Method not allowed
    return res.status(405).json({ message: 'Method not allowed' });
    
  } catch (error) {
    console.error('Post operation error:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
}