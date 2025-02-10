import { connectDB } from "../../../../../utils/db";
import Post from "../../../../../models/postSchema";
import Comment from "../../../../../models/commentSchema";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    await connectDB();
    const { postId } = await params;
    const { text, name } = await request.json();

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }
    const newComment = new Comment({
      text,
      name,
    });
    await newComment.save();

    post.comment.push(newComment._id);
    await post.save();
    return NextResponse.json(
      { success: true, data: newComment },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
