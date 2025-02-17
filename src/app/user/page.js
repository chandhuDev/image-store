"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserPosts } from "../../redux/slices/postSlice";
import MasonryLayout from "../../components/Home/MasonryLayout";
import Spinner from "../../components/Home/Spinner";
import Link from "next/link";

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
      <div className="flex min-h-screen flex-col items-center justify-center px-4">
        <p className="text-center text-lg font-bold sm:text-xl">
          Please
          <Link href="/login">
            <span className="cursor-pointer p-2 text-lg font-bold text-blue-500 hover:underline sm:text-xl md:text-2xl">
              Login
            </span>{" "}
          </Link>
          in to view your posts
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full pb-2">
      <div className="flex flex-col pb-5">
        <div className="relative mb-7 flex flex-col">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center px-4">
              <h1 className="mt-3 break-words text-center text-xl font-bold sm:text-2xl md:text-3xl">
                {currentUser.name}
              </h1>
            </div>
          </div>
        </div>

        {!userPosts?.data || userPosts.data.length === 0 ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center px-4">
            <p className="text-center text-base font-bold sm:text-lg md:text-xl">
              No posts found but you{" "}
              <span
                className="cursor-pointer p-2 text-lg font-bold text-blue-500 hover:underline sm:text-xl md:text-2xl"
                onClick={() => router.push("/create")}
              >
                create
              </span>
              one
            </p>
          </div>
        ) : (
          <div className="px-2 sm:px-4 md:px-6">
            <MasonryLayout pins={userPosts.data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
