import { connectDB } from '../../../../utils/db';
import Post from '../../../../models/Post';
import Comment from '../../../../models/Comment';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    const { postId } = req.query;
    const { text, name, image } = req.body;

    const newComment = new Comment({
      text,
      name,
      image
    });

    await newComment.save();

    const post = await Post.findByIdAndUpdate(
      postId,
      { $push: { comment: newComment._id } },
      { new: true }
    ).populate('comment');

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment' });
  }
}