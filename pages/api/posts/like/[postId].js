// pages/api/posts/like/[postId].js
import { connectDB } from '../../../../utils/db';
import Post from '../../../../models/postSchema';

export default async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    const { postId } = req.query;
    const { userId } = req.body;  // This should be a string according to schema

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Handle like/unlike based on string array
    const index = post.like.indexOf(userId);
    if (index === -1) {
      // Add like if not already liked
      post.like.push(userId);
    } else {
      // Remove like if already liked
      post.like = post.like.filter(id => id !== userId);
    }

    await post.save();

    const updatedPost = await Post.findById(postId)
      .populate('userId', 'username profileImage')
      .populate('categoryId', 'category')
      .populate('comment');

    res.status(200).json(updatedPost);

  } catch (error) {
    console.error('Like operation error:', error);
    res.status(500).json({ message: 'Error updating likes' });
  }
}