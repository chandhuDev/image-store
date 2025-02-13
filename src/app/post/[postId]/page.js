"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  fetchPostById,
  likePost,
} from "../../../redux/slices/postSlice";
import CommentPin from "../../../components/Home/CommentPin";
import Spinner from "../../../components/Home/Spinner";
import { FcLike } from "react-icons/fc";

const PinDetails = ({ params }) => {
  const [mounted, setMounted] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const dispatch = useDispatch();
  const { currentPost, loading } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.user);

  const unwrappedParams = use(params);
  const postId = unwrappedParams.postId;

  useEffect(() => {
    setMounted(true);
    if (postId) {
      dispatch(fetchPostById(postId));
    }
  }, [dispatch, postId]);

  const handleLike = async () => {
    if (postId && currentUser) {
      try {
        setIsLiking(true);
        await dispatch(
          likePost({
            postId,
            userId: currentUser.id,
          })
        ).unwrap();
      } catch (error) {
        console.error("Error liking post:", error);
      } finally {
        setIsLiking(false);
      }
    }
  };

  const handleAddComment = async () => {
    if (commentText && currentUser) {
      try {
        setIsSubmittingComment(true);
        await dispatch(
          addComment({
            postId,
            comment: {
              text: commentText,
              name: currentUser.username,
            },
            userId: currentUser.id,
          })
        ).unwrap();
        setCommentText("");
      } catch (error) {
        console.error("Error adding comment:", error.message);
      } finally {
        setIsSubmittingComment(false);
      }
    }
  };

  if (!mounted || loading || !currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-white min-h-screen">
      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Image Section */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
          <Image
            src={currentPost?.imageUrl}
            alt={currentPost?.description}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Like Button Section */}
        {currentUser && currentPost.userId !== currentUser.id && (
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 mt-4 bg-gray-100 
                       hover:bg-gray-200 transition-colors duration-200 rounded-lg 
                       cursor-pointer ${isLiking ? "opacity-50" : ""}`}
            onClick={!isLiking ? handleLike : undefined}
          >
            <FcLike className="w-6 h-6" />
            <span className="text-sm font-medium">
              {currentPost?.like?.length || 0}
            </span>
          </div>
        )}

        {/* Description and Comments Section */}
        <div className="mt-6 space-y-6">
          {/* Description */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-2">
              Description
            </h2>
            <p className="text-gray-700">{currentPost?.description}</p>
          </div>

          {/* Comments Section */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">Comments</h2>

            {/* Comments List */}
            <div
              className="max-h-[300px] sm:max-h-[400px] overflow-y-auto 
                          space-y-4 mb-6 scrollbar-thin scrollbar-thumb-gray-300 
                          scrollbar-track-gray-100"
            >
              {currentPost?.comment?.map((comment) => (
                <CommentPin key={comment?._id} comment={comment} />
              ))}
            </div>

            {/* Add Comment Section */}
            {currentUser && (
              <div className="space-y-3">
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           placeholder:text-gray-400 text-sm sm:text-base"
                  rows="3"
                />
                <button
                  onClick={handleAddComment}
                  disabled={isSubmittingComment}
                  className={`w-full sm:w-auto px-6 py-2.5 bg-blue-500 text-white 
                           rounded-lg font-medium hover:bg-blue-600 
                           transition-colors duration-200
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:ring-offset-2 ${
                             isSubmittingComment
                               ? "opacity-50 cursor-not-allowed"
                               : ""
                           }`}
                >
                  {isSubmittingComment ? (
                    <span className="flex items-center justify-center gap-2">
                      <Spinner />
                      <span>Adding Comment...</span>
                    </span>
                  ) : (
                    "Add Comment"
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinDetails;
