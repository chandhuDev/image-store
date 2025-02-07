"use client";

const CommentPin = ({ comment }) => {
  return (
    <div className="flex items-center gap-2 mt-2 bg-white rounded-lg text-black">
      <div className="flex flex-row gap-x-4">
        <p className="font-bold">{comment?.name}</p>
        <p>{comment?.text}</p>
      </div>
    </div>
  );
};

export default CommentPin;
