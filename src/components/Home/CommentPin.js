"use client";

const CommentPin = ({ comment }) => {
  return (
    <div className="flex items-center gap-2 mt-2 bg-white rounded-lg">
      <div className="flex flex-row gap-x-4">
        <p className="font-bold">{comment.data.name}</p>
        <p>{comment.data.text}</p>
      </div>
    </div>
  );
};

export default CommentPin;
