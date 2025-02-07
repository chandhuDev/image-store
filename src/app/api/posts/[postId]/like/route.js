import { connectDB } from "../../../../../utils/db";
import Post from "../../../../../models/postSchema";
import User from "../../../../../models/userSchema";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { postId } = await params;
    const { userId } = await request.json();

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const likeIndex = post?.like?.indexOf(userId);
    if (likeIndex === -1) {
      post.like?.push(userId);
      user.likedPosts?.push(postId);
      user.likesCount = (user.likesCount || 0) + 1;
    } else {
      post.like?.splice(likeIndex, 1);
      user.likedPosts = user.likedPosts?.filter((id) => id !== postId);
      user.likesCount = Math.max(0, (user.likesCount || 0) - 1);
    }

    await Promise.all([post.save(), user.save()]);
    return NextResponse.json({ success: true, data: post }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
