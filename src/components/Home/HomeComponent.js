"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchAllPosts } from "../../redux/slices/postSlice";
import Layout from "./Layout";
import ImageGrid from "./ImageGrid";
import Spinner from "./Spinner";
import SearchBar from "./ViewFeed";

export default function HomeComponent() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { allPosts, loading } = useSelector((state) => state.posts);
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    dispatch(fetchAllPosts());
  }, [dispatch]);

  if (!isClient || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const handleFilteredPosts = (filtered) => {
    setFilteredPosts(filtered);
  };

  const EmptyState = () => (
    <div className="flex min-h-[300px] sm:min-h-[400px] flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 text-base sm:text-lg md:text-xl text-gray-500">
        No posts yet
      </div>
      <p className="text-sm sm:text-base text-gray-400 max-w-md">
        Be the first to share your amazing images!
      </p>
      <button
        onClick={() => router.push("/create")}
        className="mt-6 transform rounded-lg bg-blue-500 px-6 py-2.5 text-sm sm:text-base font-medium text-white transition-all duration-200 hover:bg-blue-600 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Create Post
      </button>
    </div>
  );

  const hasNoPosts = !allPosts || allPosts.data?.length === 0;

  return (
    <Layout>
      <div className="flex min-h-screen w-full flex-col px-4 sm:px-6 md:px-8">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-6 sm:mb-8 text-center text-xl sm:text-2xl md:text-3xl font-bold">
            Share Your Amazing Images
          </h1>

          {hasNoPosts ? (
            <EmptyState />
          ) : (
            <div className="w-full max-w-7xl">
              <div className="mb-6 sm:mb-8">
                <SearchBar
                  posts={allPosts.data}
                  onFilteredPosts={handleFilteredPosts}
                />
              </div>
              <div className="w-full">
                <ImageGrid
                  allPosts={
                    filteredPosts !== null ? filteredPosts : allPosts.data
                  }
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
