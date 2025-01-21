"use client";
import Image from "next/image";

const ImageCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={post.imageUrl}
          alt={post.description}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{post.description}</h3>
      </div>
    </div>
  );
};

export default ImageCard;
