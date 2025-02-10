"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { likePost, deletePost } from "../../redux/slices/postSlice";
import { FcLike } from "react-icons/fc";
import { MdDelete } from "react-icons/md"; // Add this import

const Pin = ({ post }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const handleNavigate = () => {
    router.push(`/post/${post._id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this post?")) {
      setIsDeleting(true);
      try {
        await dispatch(
          deletePost({
            postId: post._id,
            userId: currentUser.id,
          })
        ).unwrap();
      } catch (error) {
        console.error("Failed to delete post:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  console.log("currentUser", currentUser);
  console.log("currentPost", post);

  return (
    <div className="m-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={handleNavigate}
        className="relative cursor-pointer w-full hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
      >
        <div className="relative w-[300px] h-[240px]">
          <Image
            src={post?.imageUrl}
            alt={post?.description}
            fill
            className="rounded-lg w-full object-cover"
          />
        </div>

        <div className="w-full h-full flex flex-col justify-between p-2">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <button
                className={`flex items-center gap-1 ${
                  post?.like?.includes(currentUser.id)
                    ? "text-red-500"
                    : "text-black"
                }`}
              >
                <div className="flex flex-row gap-x-2">
                  <FcLike />
                  <span>{post?.like?.length}</span>
                  {postHovered && (
                    <>
                      {post?.like?.includes(currentUser.id) && (
                        <p>You liked this post</p>
                      )}
                    </>
                  )}
                </div>
              </button>
            </div>
            {currentUser.id === post?.userId && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-2"
              >
                <div className="flex flex-row gap-x-2">
                  <MdDelete
                    className={`text-red-500 text-xl ${
                      isDeleting ? "animate-spin" : ""
                    }`}
                  />
                  <span>delete</span>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pin;
