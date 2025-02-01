"use client";
import { useSelector } from "react-redux";
import Pin from "./Pin";
const ImageGrid = () => {
  const { allPosts } = useSelector((state) => state.posts);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {allPosts?.data?.map((post) => (
        <Pin key={post._id} post={post} />
      ))}
    </div>
  );
};

export default ImageGrid;
