'use client';
import { useState } from 'react';
import Link from 'next/link';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { deletePin, savePin } from '../redux/slices/pinSlice';

const PinBar = ({ pin }) => {
  const [savingPost, setSavingPost] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);

  const alreadySaved = pin?.save?.filter((item) => item?.postedBy?._id === currentUser?._id)?.length;

  const handleSave = () => {
    if (!alreadySaved) {
      setSavingPost(true);
      dispatch(savePin({
        pinId: pin._id,
        userId: currentUser._id
      })).finally(() => {
        setSavingPost(false);
      });
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this pin?')) {
      dispatch(deletePin(pin._id));
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-2">
        <a>
          href={`${pin.image}?dl=`}
          download
          onClick={(e) => e.stopPropagation()}
          className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
        
          <MdDownloadForOffline />
        </a>
      </div>
      <div className="flex gap-2">
        {pin?.destination && (
          <a
            href={pin.destination}
            target="_blank"
            rel="noreferrer"
            className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
          >
            <BsFillArrowUpRightCircleFill />
            {pin.destination.length > 15 ? `${pin.destination.slice(0, 15)}...` : pin.destination}
          </a>
        )}
        {pin?.postedBy?._id === currentUser?._id && (
          <button
            type="button"
            onClick={handleDelete}
            className="bg-white p-2 rounded-full w-9 h-9 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none"
          >
            <AiTwotoneDelete />
          </button>
        )}
      </div>
      <div className="flex gap-2">
        {alreadySaved ? (
          <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
            {pin?.save?.length} Saved
          </button>
        ) : (
          <button
            onClick={handleSave}
            type="button"
            className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
          >
            {savingPost ? 'Saving...' : 'Save'}
          </button>
        )}
      </div>
    </div>
  );
};

export default PinBar;