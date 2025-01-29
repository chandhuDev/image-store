import { connectDB } from "../../../../utils/db";
import Post from "../../../../models/postSchema";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const postId = searchParams.get('postId');
    const { userId } = await request.json();

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    // Toggle like
    const likeIndex = post.like.indexOf(userId);
    if (likeIndex === -1) {
      post.like.push(userId);
    } else {
      post.like.splice(likeIndex, 1);
    }

    await post.save();

    return NextResponse.json({ success: true, data: post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
