import Link from "next/link";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, likePost } from "../../redux/slices/postSlice";

const PinBar = ({ post }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const isLiked = currentUser && post.like.includes(currentUser._id.toString());

  const handleLike = () => {
    if (currentUser) {
      dispatch(
        likePost({
          postId: post._id,
          userId: currentUser._id.toString(),
        })
      );
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(post._id));
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <a
          href={post.imageUrl}
          download
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
        >
          <MdDownloadForOffline />
        </a>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleLike}
          className={`bg-white p-2 rounded-full cursor-pointer outline-none shadow-md ${
            isLiked ? "text-red-500" : ""
          }`}
        >
          {post.like?.length || 0} Likes
        </button>
        {post.userId._id === currentUser?._id && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
          >
            <AiTwotoneDelete />
          </button>
        )}
      </div>
    </div>
  );
};

export default PinBar;
