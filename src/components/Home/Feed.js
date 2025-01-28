"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategoryPosts,
  fetchAllPosts,
} from "@/redux/slices/postSlice";
import MasonryLayout from "@/components/Home/MasonryLayout";
import Spinner from "@/components/Home/Spinner";

const Feed = ({ categoryId }) => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategoryPosts(categoryId));
    } else {
      dispatch(fetchAllPosts());
    }
  }, [dispatch, categoryId]);

  if (loading) return <Spinner />;

  return (
    <div>
      {posts?.length > 0 ? (
        <MasonryLayout posts={posts} />
      ) : (
        <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
          No Posts Found!
        </div>
      )}
    </div>
  );
};

export default Feed;
