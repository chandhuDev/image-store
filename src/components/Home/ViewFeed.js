"use client"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchPosts } from "../../redux/slices/postSlice";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const ViewFeed = ({ searchTerm }) => {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    if (searchTerm) {
      // If we need to implement search, we can add a search parameter to fetchPosts
      dispatch(searchPosts({ search: searchTerm }));
    }
  }, [dispatch, searchTerm]);

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

export default ViewFeed;
