"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { deletePost, fetchAllPosts } from "../../redux/slices/postSlice";
import { FcLike } from "react-icons/fc";
import { MdDelete } from "react-icons/md";

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
          })
        ).unwrap();
        await dispatch(fetchAllPosts()).unwrap();
      } catch (error) {
        console.error("Failed to delete post:", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="w-full p-2">
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={handleNavigate}
        className="group relative w-full overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-lg"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={post?.imageUrl}
            alt={post?.description}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority
          />
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/50 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex items-center justify-between text-white">
            {/* Like Section */}
            <div className="flex items-center gap-2">
              <button
                className={`flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 backdrop-blur-sm transition-colors`}
              >
                <FcLike className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {post?.like?.length || 0}
                </span>
              </button>

              {postHovered && post?.like?.includes(currentUser.id) && (
                <span className="text-sm">Liked</span>
              )}

              {postHovered && post?.userId?._id === currentUser.id && (
                <span className="text-sm">Your post</span>
              )}
            </div>

            {/* Delete Button */}
            {currentUser.id === post?.userId?._id && (
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-2 rounded-full bg-white/20 px-3 py-1.5 text-sm backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                <MdDelete
                  className={`h-5 w-5 text-red-500 ${
                    isDeleting ? "animate-spin" : ""
                  }`}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pin;
