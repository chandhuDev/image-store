// components/Layout.js
"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiHomeFill } from "react-icons/ri";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector } from "react-redux";
import nature from "@/assets/nature.jpg";
import animal from "@/assets/animal.jpg";
import travel from "@/assets/travel.webp";
import user from "@/assets/user.png";
import textures from "@/assets/textures.webp";

const Sidebar = ({ closeToggle }) => {
  const { currentUser } = useSelector((state) => state.user);
  const categories = [
    { name: "Nature", image: nature },
    { name: "Animal", image: animal },
    { name: "Travel", image: travel },
    { name: "User", image: user },
    { name: "Textures", image: textures },
  ];

  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll shadow-2xl min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          href="/"
          className="flex px-5 gap-2 my-6 pt-1 w-190 items-center"
          onClick={handleCloseSidebar}
        >
          <RiHomeFill />
          <span>Home</span>
        </Link>
        <div className="flex flex-col gap-5">
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover categories
          </h3>
          {categories.map((category) => (
            <Link
              href={`/category/${category.name.toLowerCase()}`}
              key={category.name}
              className="flex items-center gap-3 hover:bg-gray-100 transition-all duration-200 ease-in-out capitalize px-5 py-3"
              onClick={handleCloseSidebar}
            >
              <div className="relative w-8 h-8">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="rounded-full"
                />
              </div>
              {category.name}
            </Link>
          ))}
            <Link
            href="/create"
            className="flex items-center gap-3 hover:bg-gray-100 transition-all duration-200 ease-in-out capitalize px-5 py-3"
            >
            Create Post
          </Link>
        </div>
      </div>
      {currentUser && (
        
          <Link
            href={`/post/${currentUser._id}`}
            className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
            onClick={handleCloseSidebar}
          >
            <div className="relative w-10 h-10">
              <Image
                src={currentUser.profileImage || "/default-avatar.png"}
                alt="user-profile"
                fill
                className="rounded-full"
              />
            </div>
            <p>{currentUser.username}</p>
          </Link>
        
        
      )}
    </div>
  );
};

const Layout = ({ children }) => {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen duration-75 ease-out">
      <div className="hidden md:flex h-screen flex-initial">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
          <AiOutlineMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link href="/">
            <span className="font-bold text-xl">ImageShare</span>
          </Link>
        </div>
        {toggleSidebar && (
          <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
            <div className="absolute w-full flex justify-end items-center p-2">
              <button
                type="button"
                className="border rounded-full p-2"
                onClick={() => setToggleSidebar(false)}
              >
                ×
              </button>
            </div>
            <Sidebar closeToggle={setToggleSidebar} />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll">
        <div className="px-2 md:px-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
