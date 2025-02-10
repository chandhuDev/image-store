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
  const unwrappedParams = use(params);
  const postId = unwrappedParams.postId;
  const [commentText, setCommentText] = useState("");
  const dispatch = useDispatch();
  const { currentPost, loading } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.user);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
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

  if (loading) return <Spinner />;

  return (
    <div className="flex py-4 flex-col bg-white overflow-y-auto h-full">
      <div className="relative w-full h-[600px]">
        <Image
          src={currentPost?.imageUrl}
          alt={currentPost?.description}
          fill
          className="object-contain"
        />
      </div>
      <div
        className={`flex justify-center cursor-pointer flex-col px-5 py-2 w-auto gap-2 mt-2 bg-black/25 rounded-lg ${
          isLiking ? "opacity-50" : ""
        }`}
        onClick={!isLiking ? handleLike : undefined}
      >
        <FcLike />
        <p>{currentPost?.like?.length || 0}</p>
      </div>
      <div className="w-full p-5 flex-1">
        <p className="text-xl">Description: {currentPost?.description}</p>

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <div className="max-h-[400px] overflow-y-auto">
            {currentPost?.comment?.map((comment) => (
              <CommentPin key={comment?._id} comment={comment} />
            ))}
          </div>

          {currentUser && (
            <div className="mt-6">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Add a comment..."
                className="w-full p-2 border rounded-lg resize-none"
                rows="3"
              />
              <button
                onClick={handleAddComment}
                disabled={isSubmittingComment}
                className={`mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg ${
                  isSubmittingComment ? "opacity-50" : ""
                }`}
              >
                {isSubmittingComment ? "Adding Comment..." : "Add Comment"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PinDetails;
