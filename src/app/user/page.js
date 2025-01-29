"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../../redux/slices/postSlice";
import MasonryLayout from "../../components/Home/MasonryLayout";
import Spinner from "../../components/Home/Spinner";

const UserPage = () => {
  const dispatch = useDispatch();
  const { userPosts, loading } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserPosts(currentUser.id));
  }, [dispatch, currentUser.id]);

  if (loading) return <Spinner />;

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

        <div className="px-2">
          <MasonryLayout posts={userPosts} />
        </div>
      </div>
    </div>
  );
};

export default UserPage;
