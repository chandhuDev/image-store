import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../redux/slices/postSlice"; // Updated import
import ImageGrid from "../components/Home/ImageGrid";
import UploadModal from "../components/Home/UploadModal";
import Spinner from "../components/Home/Spinner";

export default function Home() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  if (loading) return <Spinner message="Rendering the page"/>;

  return (
    <div className="min-h-screen bg-gray-100">
      <ImageGrid posts={posts} />
    </div>
  );
}
