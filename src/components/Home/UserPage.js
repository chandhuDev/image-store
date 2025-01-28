"use client"
import { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "@/redux/slices/postSlice";
import MasonryLayout from "@/components/Home/MasonryLayout";

const UserPage = ({ userId }) => {
  const dispatch = useDispatch();
  const { userPosts, loading } = useSelector((state) => state.posts);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUserPosts(userId));
  }, [dispatch, userId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="relative pb-2 h-full">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full flex flex-col items-center">
              <div className="relative w-32 h-32">
                <Image
                  src={currentUser?.profileImage || "/default-avatar.png"}
                  alt="user-profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h1 className="font-bold text-3xl text-center mt-3">
                {currentUser?.username}
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
