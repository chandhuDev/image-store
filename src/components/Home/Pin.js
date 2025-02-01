"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { likePost } from "../../redux/slices/postSlice";

const Pin = ({ post }) => {
  const [postHovered, setPostHovered] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleNavigate = () => {
    router.push(`/post/${post._id}`);
  };

  const handleLike = () => {
    if (currentUser) {
      dispatch(
        likePost({
          postId: post._id,
          userId: currentUser.id,
        })
      );
    }
  };


  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={handleNavigate}
        className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div className="relative w-[300px] h-[240px] ">
          <Image
            src={post.imageUrl} // Updated to match schema
            alt={post.description} // Updated to match schema
            fill
            className="rounded-lg w-full object-cover"
          />
        </div>

        {postHovered ? (
          <div className="absolute top-0 w-full h-full flex flex-col justify-between p-2 z-50">
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                  className={`flex items-center gap-1 ${
                    post.like.includes(currentUser.id)
                      ? "text-red-500"
                      : "text-black"
                  }`}
                >
                  <span>{post.like.length}</span>
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* {post._id ? (
        <Link href={`/post/${post._id}`}>
          <div className="flex gap-2 mt-2 items-center">
           {post.description ?  <p className="font-semibold capitalize">{post.description}</p> : null }
          </div>
        </Link>
      ) : null } */}
    </div>
  );
};

export default Pin;
