"use client";

const CommentPin = ({ comment }) => {
  return (
    <div className="mt-2 flex items-start rounded-lg bg-white p-3 shadow-sm transition-colors hover:bg-gray-50">
      <div className="flex w-full flex-col space-y-1 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <p className="text-sm font-bold text-gray-900 sm:text-base md:min-w-[120px]">
          {comment?.name}
        </p>
        <p className="text-sm text-gray-700 sm:text-base">{comment?.text}</p>
      </div>
    </div>
  );
};

export default CommentPin;
