"use client";
import { useEffect } from "react";
import { useParams } from "next/navigation";  // ✅ Use useParams() instead of props

import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryPosts } from "../../../redux/slices/postSlice";
import MasonryLayout from "../../../components/Home/MasonryLayout";
import Spinner from "../../../components/Home/Spinner";

const CategoryPage = () => {
  const { categoryName } = useParams();  // ✅ Get categoryName dynamically

  const dispatch = useDispatch();
  const { categoryPosts, loading } = useSelector((state) => state.posts);

  const cachedPosts = categoryPosts || [];

  useEffect(() => {
    if (categoryName) {
      dispatch(fetchCategoryPosts(categoryName));
    }
  }, [categoryName]);

  if (loading && cachedPosts.length === 0) return <Spinner />; // Show spinner only if no cached data

  return (
    <div className="relative pb-2 h-full">
      <div className="px-2">
        <MasonryLayout posts={cachedPosts} />
      </div>
    </div>
  );
};

export default CategoryPage;
