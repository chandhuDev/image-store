"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../../redux/slices/postSlice";
import MasonryLayout from "../../components/Home/MasonryLayout";
import Spinner from "../../components/Home/Spinner";

const UserPage = () => {
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { userPosts, loading } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    setMounted(true);
    if (currentUser?.id) {
      dispatch(fetchUserPosts(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  if (!mounted || loading) return <Spinner />;

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="font-bold text-xl">Please log in to view your posts</p>
      </div>
    );
  }

  return (
    <div className="relative pb-2 h-full">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full flex flex-col items-center">
              <h1 className="font-bold text-3xl text-center mt-3">
                {currentUser.username}
              </h1>
            </div>
          </div>
        </div>

        {!userPosts?.data || userPosts.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <p className="font-bold text-xl">
              No posts found but you{" "}
              <span
                className="text-blue-500 cursor-pointer font-bold text-2xl p-2"
                onClick={() => router.push("/create")}
              >
                create
              </span>
              one
            </p>
          </div>
        ) : (
          <div className="px-2">
            <MasonryLayout pins={userPosts.data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;