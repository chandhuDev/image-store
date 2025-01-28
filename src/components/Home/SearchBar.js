"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdSearch } from "react-icons/io";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/search?term=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex w-full max-w-3xl">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search posts..."
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
