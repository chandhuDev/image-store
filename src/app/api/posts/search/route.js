import { NextResponse } from "next/server";
import { connectDB } from "../../../../utils/db";
import Post from "../../../../models/postSchema";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const term = searchParams.get("term");

    if (!term) {
      return NextResponse.json(
        { success: false, message: "Search term is required" },
        { status: 400 }
      );
    }

    const posts = await Post.find({
      description: { $regex: term, $options: "i" },
    }).sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        data: posts,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
