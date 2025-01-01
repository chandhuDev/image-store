'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostDetails, addComment } from '../redux/slices/postSlice';

const PinDetails = ({ postId }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const { currentPost } = useSelector(state => state.posts);
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(fetchPostDetails(postId));
  }, [dispatch, postId]);

  const handleAddComment = () => {
    if(comment && currentUser) {
      dispatch(addComment({
        text: comment,
        name: currentUser.username,
        image: currentUser.profileImage,
        postId
      }));
      setComment('');
    }
  };

  if(!currentPost) return <div>Loading...</div>;

  return (
    <div className="flex xl:flex-row flex-col m-auto bg-white">
      <div className="flex justify-center items-center md:items-start flex-initial">
        <div className="relative w-full h-[420px]">
          <Image
            src={currentPost.imageUrl}
            alt={currentPost.description}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      </div>
      <div className="w-full p-5 flex-1 xl:min-w-620">
        <p className="mt-3">{currentPost.description}</p>
        
        <h2 className="mt-5 text-2xl">Comments</h2>
        <div className="max-h-370 overflow-y-auto">
          {currentPost.comment?.map((comment) => (
            <div key={comment._id} className="flex gap-2 mt-5 items-center">
              <div className="relative w-8 h-8">
                <Image
                  src={comment.image || '/default-avatar.png'}
                  alt={comment.name}
                  fill
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="font-bold">{comment.name}</p>
                <p>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap mt-6 gap-3">
          <input
            className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
            type="text"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="button"
            className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
            onClick={handleAddComment}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PinDetails;