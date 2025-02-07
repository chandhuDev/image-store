import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/db";
export async function DELETE(request, { params }) {
    try {
      await connectDB();
      const { postId } = await params;
  
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        return NextResponse.json(
          { success: false, message: "Post not found" },
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

