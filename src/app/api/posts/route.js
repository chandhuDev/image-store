// app/api/posts/route.js
import { NextResponse } from 'next/server';
import { connectDB } from '../../../utils/db';
import Post from '../../../models/postSchema';

export async function GET() {
  try {
    await connectDB();
    const posts = await Post.find().sort({ createdAt: -1 });
    
    return NextResponse.json(posts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching posts" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    const { description, categoryId, userId, imageUrl } = await request.json();
    
    console.log(userId, imageUrl, categoryId);
    
    const newPost = new Post({
      description,
      categoryId,
      userId,
      imageUrl,
      like: [],
      comment: [],
    });

    await newPost.save();

    const populatedPost = await Post.findById(newPost._id)
      .populate("userId")
      .populate("categoryId")
      .populate("comment");

    return NextResponse.json(populatedPost, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error creating post" },
      { status: 500 }
    );
  }
}