"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import MasonryLayout from "../../../components/Home/MasonryLayout";
import Spinner from "../../../components/Home/Spinner";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const router = useRouter();
  const [categoryPosts, setCategoryPosts] = useState(null);
  const { allPosts } = useSelector((state) => state.posts);
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    if (categoryName) {
      setCategoryPosts(
        allPosts?.data?.filter(
          (post) => post.categoryId.category === categoryName
        )
      );
      setIsLoading(false);
    }
  }, [categoryName]);

  if (loading) return <Spinner />;

  return (
    <div className="relative h-full min-h-screen w-full pb-2">
      <div className="flex flex-col pb-5">
        <div className="relative mb-7 flex flex-col">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full flex flex-col items-center px-4">
              <h1 className="text-center font-bold text-xl sm:text-2xl md:text-3xl mt-3">
                Welcome to category of{" "}
                <span className="text-pink-400 font-extrabold break-words">
                  {categoryName}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {categoryPosts?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full px-4">
          <p className="text-center font-bold text-base sm:text-lg md:text-xl">
            No posts found for category{" "}
            <span className="text-pink-400 font-extrabold break-words">
              {categoryName}
            </span>{" "}
            but you can{" "}
            <span
              className="cursor-pointer font-bold text-blue-500 p-2 hover:underline text-lg sm:text-xl md:text-2xl"
              onClick={() => router.push("/create")}
            >
              create
            </span>{" "}
            one
          </p>
        </div>
      ) : null}

      <div className="px-2 sm:px-4 md:px-6">
        <MasonryLayout pins={categoryPosts} />
      </div>
    </div>
  );
};

export default CategoryPage;
