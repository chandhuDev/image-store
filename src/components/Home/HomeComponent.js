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
    return <Spinner />;
  }

  const handleFilteredPosts = (filtered) => {
    setFilteredPosts(filtered);
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <div className="text-gray-500 text-xl text-center mb-4">No posts yet</div>
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
  );

  const hasNoPosts = !allPosts || allPosts.data?.length === 0;

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-center mb-8">
            Share Your Amazing Images
          </h1>

          {hasNoPosts ? (
            <EmptyState />
          ) : (
            <>
              <SearchBar
                posts={allPosts.data}
                onFilteredPosts={handleFilteredPosts}
              />
              <ImageGrid
                allPosts={
                  filteredPosts !== null ? filteredPosts : allPosts.data
                }
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
