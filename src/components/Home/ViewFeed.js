"use client";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

const CATEGORIES = ["Nature", "Animal", "Travel", "User", "Textures"];

const ViewFeed = ({ posts, onFilteredPosts }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filterPosts = (term) => {
    const searchTermLower = term.toLowerCase().trim();

    const matchingCategories = CATEGORIES.filter((category) =>
      category.toLowerCase().includes(searchTermLower)
    );

    if (matchingCategories.length > 0) {
      const filtered = posts.filter((post) =>
        matchingCategories.some(
          (category) =>
            post.categoryId?.category?.toLowerCase() === category.toLowerCase()
        )
      );
      onFilteredPosts(filtered);
    } else {
      onFilteredPosts(posts);
    }
  };

  const handleInputChange = (e) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    filterPosts(newTerm);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterPosts(searchTerm);
  };

  return (
    <div className="w-full px-4 sm:px-6 md:px-8">
      <form
        onSubmit={handleSearch}
        className="relative flex w-full mx-auto max-w-3xl"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              filterPosts(searchTerm);
            }
          }}
          placeholder="Search posts by category only..."
          className="w-full p-2 sm:p-3 pl-9 sm:pl-10 text-sm sm:text-base rounded-lg border border-gray-300 focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-base"
        />
        <button
          type="submit"
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 
                     text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Search"
        >
          <IoMdSearch className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </form>
    </div>
  );
};

export default ViewFeed;
