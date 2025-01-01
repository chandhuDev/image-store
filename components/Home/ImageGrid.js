"use client"
const ImageGrid = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {posts.map((post) => (
        <Pin key={post._id} post={post} />
      ))}
    </div>
  );
};

export default ImageGrid;