import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/db";
import Post from "../../../../models/postSchema";
import User from "../../../../models/userSchema";
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { postId } = await params;
    const { userId } = await request.json();

    const deletedPost = await Post.findByIdAndDelete(postId);
    const deleteUserPost = await User.findByIdAndDelete(userId);
    if (!deletedPost) {
      return NextResponse.json(
        { success: false, message: "Post not found" },
        { status: 404 }
      );
    }
    if (!deleteUserPost) {
      return NextResponse.json(
        { success: false, message: "User item not found to delete" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
