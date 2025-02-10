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
    <form onSubmit={handleSearch} className="relative flex w-full max-w-3xl">
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
        className="w-full p-3 pl-10 rounded-lg border focus:outline-none focus:border-gray-500"
      />
      <button
        type="submit"
        className="absolute left-3 top-1/2 -translate-y-1/2"
      >
        <IoMdSearch size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
