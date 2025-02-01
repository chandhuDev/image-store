"use client";

const CommentPin = ({ comment }) => {
  return (
    <div className="flex items-center gap-2 mt-5 bg-white rounded-lg">
      <div className="flex flex-col flex-1">
        <p className="font-bold">{comment.name}</p>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentPin;
