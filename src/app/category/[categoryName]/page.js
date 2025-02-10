"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import MasonryLayout from "../../../components/Home/MasonryLayout";
import Spinner from "../../../components/Home/Spinner";

const CategoryPage = () => {
  const { categoryName } = useParams();
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
    <div className="relative pb-2 h-full">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full flex flex-col items-center">
              <h1 className="font-bold text-3xl text-center mt-3">
                Welcome to category of{" "}
                <span className="text-pink-400 font-extrabold">
                  {categoryName}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      {categoryPosts?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="font-bold text-xl">
            No posts found for category{" "}
            <span className="text-pink-400 font-extrabold">{categoryName}</span>
            but you{" "}
            <span
              className="text-blue-500 cursor-pointer font-bold text-2xl p-2"
              onClick={() => {
                router.push("/create");
              }}
            >
              create
            </span>
            one
          </p>
        </div>
      ) : null}
      <div className="px-2">
        <MasonryLayout pins={categoryPosts} />
      </div>
    </div>
  );
};

export default CategoryPage;
