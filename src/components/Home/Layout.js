"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiHomeFill } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import nature from "../../assets/nature.jpg";
import animal from "../../assets/animal.jpg";
import travel from "../../assets/travel.webp";
import textures from "../../assets/textures.webp";
import { logout } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { FaUserLarge } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const Sidebar = ({ closeToggle }) => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const route = useRouter()
  const categories = [
    { name: "Nature", image: nature },
    { name: "Animal", image: animal },
    { name: "Travel", image: travel },
    { name: "User", isIcon: true },
    { name: "Textures", image: textures },
  ];

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex h-full min-w-[240px] flex-col justify-between bg-white shadow-xl">
      <div className="flex flex-col overflow-y-auto hide-scrollbar">
        <Link
          href="/"
          className="flex items-center gap-3 px-5 py-4 hover:bg-gray-50"
          onClick={handleCloseSidebar}
        >
          <RiHomeFill className="text-xl" />
          <span className="text-base font-medium">Home</span>
        </Link>

        <div className="flex flex-col">
          <h3 className="px-5 py-3 text-base font-semibold text-gray-800 sm:text-lg">
            Discover categories
          </h3>

          <div className="flex flex-col">
            {categories.map((category) => (
              <Link
                href={`${
                  category.name === "User"
                    ? "/user"
                    : `/category/${category.name.toLowerCase()}`
                }`}
                key={category.name}
                className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-50"
                onClick={handleCloseSidebar}
              >
                <div className="relative h-8 w-8 shrink-0 flex items-center justify-center">
                  {category.isIcon ? (
                    <FaUserAlt className="h-5 w-5 text-gray-600" />
                  ) : (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  )}
                </div>
                <span className="capitalize">{category.name}</span>
              </Link>
            ))}

            <Link
              href="/create"
              className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-50"
              onClick={handleCloseSidebar}
            >
              <span className="font-medium">Create Post</span>
            </Link>
          </div>
        </div>
      </div>

      {currentUser && (
        <>
          <div className="mx-3 mb-4 mt-auto flex items-center gap-2 rounded-lg p-2 bg-white shadow-md transition-colors hover:bg-gray-50">
            <FaUserLarge />
            <p className="truncate text-sm font-medium ml-4 capitalize">
              {currentUser.name}
            </p>
          </div>
          <div
            className="mx-3 mb-14 mt-auto flex items-center gap-2 rounded-lg p-2 bg-white shadow-md transition-colors hover:bg-gray-50 cursor-pointer"
            onClick={() => {
              dispatch(logout())
              route.push('/login')
            }}
          >
            <p className="truncate text-sm font-medium">Logout</p>
          </div>
        </>
      )}
    </div>
  );
};

const Layout = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-gray-50 transition-all duration-300 ease-in-out md:flex-row">
      <div className="hidden h-screen flex-shrink-0 md:flex">
        <Sidebar />
      </div>

      <div className="sticky top-0 z-20 flex items-center justify-between bg-white p-4 shadow-sm md:hidden">
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-gray-100"
          onClick={() => setToggleSidebar(true)}
        >
          <AiOutlineMenu className="h-6 w-6" />
        </button>
        <Link href="/" className="text-lg font-bold">
          ImageShare
        </Link>
        <div className="w-8" />
      </div>

      {toggleSidebar && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity"
            onClick={() => setToggleSidebar(false)}
          />
          <div className="fixed left-0 top-0 z-40 h-screen w-[280px] animate-slide-in bg-white shadow-xl">
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100"
              onClick={() => setToggleSidebar(false)}
            >
              <span className="text-xl font-medium">×</span>
            </button>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        </>
      )}

      <main className="flex-1 overflow-y-auto bg-gray-50 pb-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
