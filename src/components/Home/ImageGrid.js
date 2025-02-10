"use client";
import Pin from "./Pin";
const ImageGrid = ({ allPosts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {allPosts.length > 0 ? (
        allPosts.map((post) => <Pin key={post._id} post={post} />)
      ) : (
        <p>There is not post to show</p>
      )}
    </div>
  );
};

export default ImageGrid;
