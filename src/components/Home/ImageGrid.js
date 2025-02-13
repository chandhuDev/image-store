"use client";
import Pin from "./Pin";

const ImageGrid = ({ allPosts }) => {
  return (
    <div className="w-full">
      {allPosts.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 sm:gap-5 sm:p-4 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {allPosts.map((post) => (
            <Pin key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[200px] items-center justify-center px-4 text-center">
          <p className="text-base text-gray-500 sm:text-lg">
            There are no posts to show
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
