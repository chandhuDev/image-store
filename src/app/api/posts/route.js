import { NextResponse } from "next/server";
import { connectDB } from "../../../utils/db";
import Post from "../../../models/postSchema";
import Category from "../../../models/categorySchema";
import User from "../../../models/userSchema";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    // Get query parameters
    const userId = searchParams.get("userId");
    const postId = searchParams.get("postId");
    const categoryId = searchParams.get("categoryId");

    let posts;

    // Fetch by specific post ID
    if (postId) {
      console.log("server details", postId);

      posts = await Post.findById(postId).sort({ createdAt: -1 });

      if (!posts) {
        return NextResponse.json(
          { success: false, message: "Post not found" },
          { status: 404 }
        );
      }
    }
    // Fetch by user ID
    else if (userId) {
      console.log("server details", userId);

      posts = await Post.find({ userId }).sort({ createdAt: -1 });
    }
    // Fetch by category ID
    else if (categoryId) {
      console.log("server details", categoryId);

      const category = await Category.findOne({
        category: categoryId.toLowerCase(),
      });

      if (!category) {
        return NextResponse.json(
          { success: false, message: "Category not found" },
          { status: 404 }
        );
      }

      posts = await Post.find({ categoryId: category._id }).sort({
        createdAt: -1,
      });
    }
    // Fetch all posts if no specific params
    else {
      console.log("server details", userId, postId, categoryId);

      posts = await Post.find().sort({ createdAt: -1 });
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

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { postId } = params;

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
