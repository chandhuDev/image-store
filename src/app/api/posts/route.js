import { NextResponse } from "next/server";
import { connectDB } from "../../../utils/db";
import Post from "../../../models/postSchema";
import Category from "../../../models/categorySchema";
import Comment from "../../../models/commentSchema";
import User from "../../../models/userSchema";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const postId = searchParams.get("postId");

    let posts;

    if (postId) {
      posts = await Post.findById(postId)
        .populate("comment")
        .sort({ createdAt: -1 });

      if (!posts) {
        return NextResponse.json(
          { success: false, message: "Post not found" },
          { status: 404 }
        );
      }
    } else if (userId) {
      posts = await Post.find({ userId }).sort({ createdAt: -1 });
    } else {
      posts = await Post.find()
        .populate("categoryId")
        .populate({
          path: "userId",
          model: "User",
          select: "username",
        })
        .sort({ createdAt: -1 });
    }

    return NextResponse.json(
      {
        success: true,
        data: posts,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Fetch posts error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error fetching posts",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { description, categoryId, userId, imageUrl } = body;

    if (!description || !categoryId || !userId || !imageUrl) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    const categoryDoc = await Category.findOne({
      category: categoryId.toLowerCase(),
    });

    if (!categoryDoc) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid category",
        },
        { status: 400 }
      );
    }

    const newPost = new Post({
      description,
      categoryId: categoryDoc._id,
      userId,
      imageUrl,
      like: [],
      comment: [],
    });

    await newPost.save();

    return NextResponse.json(
      {
        success: true,
        data: newPost,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create post error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create post",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
