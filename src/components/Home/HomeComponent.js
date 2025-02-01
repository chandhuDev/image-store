// components/Home/HomeComponent.js
"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchAllPosts } from "../../redux/slices/postSlice";
import Layout from "./Layout";
import ImageGrid from "./ImageGrid";
import Spinner from "./Spinner";
import ViewFeed from "./ViewFeed";

export default function HomeComponent() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { allPosts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-center mb-8">
            Share Your Amazing Images
          </h1>

          {!allPosts || allPosts.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-gray-500 text-xl text-center mb-4">
                No posts yet
              </div>
              <p className="text-gray-400">
                Be the first to share your amazing images!
              </p>
              <button
                onClick={() => router.push("/create")}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Create Post
              </button>
            </div>
          ) : null}

          {allPosts.data?.length > 0 ? <ImageGrid /> : null}
        </div>
      </div>
    </Layout>
  );
}
