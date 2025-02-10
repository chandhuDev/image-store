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
        placeholder="Search posts by category only..."
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

export default ViewFeed;
