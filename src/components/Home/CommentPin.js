"use client"
import Image from "next/image";

const CommentPin = ({ comment }) => {
  return (
    <div className="flex items-center gap-2 mt-5 bg-white rounded-lg">
      <div className="relative w-8 h-8">
        <Image
          src={comment.image || "/default-avatar.png"}
          alt={comment.name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <div className="flex flex-col flex-1">
        <p className="font-bold">{comment.name}</p>
        <p>{comment.text}</p>
      </div>
    </div>
  );
};

export default CommentPin;
