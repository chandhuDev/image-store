'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, addComment } from '../redux/slices/postSlice';
import CommentPin from './CommentPin';

const PinDetails = ({ postId }) => {
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();
  const { currentPost } = useSelector(state => state.posts);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    if (postId) {
      dispatch(fetchPosts(postId));
    }
  }, [dispatch, postId]);

  const handleAddComment = () => {
    if (commentText && currentUser) {
      dispatch(addComment({
        postId,
        comment: {
          text: commentText,
          name: currentUser.username,
          image: currentUser.profileImage
        }
      }));
      setCommentText('');
    }
  };

  if (!currentPost) return <div>Loading...</div>;

  return (
    <div className="flex xl:flex-row flex-col bg-white">
      <div className="relative w-full h-[420px]">
        <Image
          src={currentPost.imageUrl}
          alt={currentPost.description}
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full p-5 flex-1">
        <p className="text-xl">{currentPost.description}</p>
        
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          <div className="max-h-[400px] overflow-y-auto">
            {currentPost.comment?.map((comment) => (
              <CommentPin key={comment._id} comment={comment} />
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
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add Comment
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PinDetails;