import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

const Navbar = () => {
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          onChange={(e) => {
            if (e.target.value) {
              router.push(`/search/${e.target.value}`);
            }
          }}
          placeholder="Search"
          className="p-2 w-full bg-white outline-none"
        />
      </div>
      <div className="flex gap-3">
        <Link
          href="/create-pin"
          className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
        >
          <IoMdAdd />
        </Link>
        {currentUser && (
          <Link href={`/post/${currentUser._id}`}>
            <div className="relative w-12 h-12">
              <Image
                src={currentUser.image}
                alt="user"
                fill
                className="rounded-lg"
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
