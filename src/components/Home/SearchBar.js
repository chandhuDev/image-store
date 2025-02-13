"use client";
import { useState } from "react";
import { IoMdSearch } from "react-icons/io";

const CATEGORIES = ["Nature", "Animal", "Travel", "User", "Textures"];

const SearchBar = ({ posts, onFilteredPosts }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    filterPosts(searchTerm);
  };

  const filterPosts = (term) => {
    if (!term.trim()) {
      onFilteredPosts(posts);
      return;
    }

    const searchTermLower = term.toLowerCase().trim();
    const filtered = posts.filter(
      (post) =>
        post.description.toLowerCase().includes(searchTermLower) ||
        CATEGORIES.some(
          (category) =>
            category.toLowerCase().includes(searchTermLower) &&
            post.description.toLowerCase().includes(category.toLowerCase())
        )
    );

    onFilteredPosts(filtered);
  };

  const handleInputChange = (e) => {
    const newTerm = e.target.value;
    setSearchTerm(newTerm);
    filterPosts(newTerm);
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
          placeholder="Search posts category ..."
          className="w-full p-2 sm:p-3 pl-9 sm:pl-10 text-sm sm:text-base 
                     rounded-lg border border-gray-300
                     focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                     placeholder:text-gray-400 placeholder:text-sm sm:placeholder:text-base
                     transition-all duration-200"
        />
        <button
          type="submit"
          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 
                     text-gray-400 hover:text-gray-600 
                     transition-colors duration-200"
          aria-label="Search posts"
        >
          <IoMdSearch className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
