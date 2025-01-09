// pages/index.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts } from '../redux/slices/postSlice';
import Layout from '../components/Home/Layout';
import ImageGrid from '../components/Home/ImageGrid';
import Spinner from '../components/Home/Spinner';

export default function Home() {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchAllPosts());
  }, [dispatch]);

  return (
    <Layout>
      <div className="flex flex-col">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-center mb-8">
            Share Your Amazing Images
          </h1>
          
          {loading && <Spinner />}
          
          {error && (
            <div className="text-red-500 text-center mb-8">
              {error}
            </div>
          )}
          
          {!loading && !error && posts?.length === 0 && (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <div className="text-gray-500 text-xl text-center mb-4">
                No posts yet
              </div>
              <p className="text-gray-400">
                Be the first to share your amazing images!
              </p>
              <button 
                onClick={() => {/* Open upload modal */}}
                className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
              >
                Create Post
              </button>
            </div>
          )}
          
          {!loading && !error && posts?.length > 0 && (
            <ImageGrid posts={posts} />
          )}
        </div>
      </div>
    </Layout>
  );
}