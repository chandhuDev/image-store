'use client';
import { useState } from 'react';
import Link from 'next/link';
import { RiHomeFill } from 'react-icons/ri';
import { IoIosArrowForward } from 'react-icons/io';
import { categories } from '../utils/data';
import Image from 'next/image';

const Sidebar = ({ closeToggle, user }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const handleCloseSidebar = () => {
    if (closeToggle) closeToggle(false);
  };

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
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
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">Discover categories</h3>
          {categories.map((category) => (
            <Link
              href={`/category/${category.name}`}
              key={category.name}
              className={`flex items-center gap-3 hover:bg-gray-100 transition-all duration-200 ease-in-out capitalize px-5 py-3 ${
                selectedCategory === category.name ? 'bg-gray-100 font-bold' : ''
              }`}
              onClick={() => {
                setSelectedCategory(category.name);
                handleCloseSidebar();
              }}
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
        </div>
      </div>
      {user && (
        <Link
          href={`/user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <div className="relative w-10 h-10">
            <Image
              src={user.image}
              alt="user-profile"
              fill
              className="rounded-full"
            />
          </div>
          <p>{user.userName}</p>
          <IoIosArrowForward />
        </Link>
      )}
    </div>
  );
};

export default Sidebar;