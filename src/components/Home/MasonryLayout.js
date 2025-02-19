"use client";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

const MasonryLayout = ({ pins }) => {
  const breakpointObj = {
    default: 2,
    3000: 5,
    2000: 3,
    1000: 2,
    500: 1,
  };
  return (
    <Masonry className="flex animate-slide-fwd" breakpointCols={breakpointObj}>
      {pins?.map((pin) => (
        <Pin key={pin._id} post={pin} className="w-max" />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
