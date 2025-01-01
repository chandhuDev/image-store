'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineLogout } from 'react-icons/ai';
import { fetchUserProfile, logout } from '../redux/slices/userSlice';
import { fetchUserPins } from '../redux/slices/pinSlice';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const UserPage = ({ userId }) => {
  const [activeBtn, setActiveBtn] = useState('created');
  const router = useRouter();
  const dispatch = useDispatch();
  const { userProfile, loading: userLoading } = useSelector(state => state.user);
  const { userPins, loading: pinsLoading } = useSelector(state => state.pins);

  useEffect(() => {
    dispatch(fetchUserProfile(userId));
    dispatch(fetchUserPins(userId));
  }, [dispatch, userId]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  if (userLoading || pinsLoading) return <Spinner message="Loading profile..." />;

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <div className="relative w-full h-370 2xl:h-510">
              <Image
                src={userProfile?.banner || '/defaultBanner.jpg'}
                alt="banner-pic"
                fill
                className="shadow-lg object-cover"
              />
            </div>
            <div className="relative -mt-20 w-40 h-40">
              <Image
                src={userProfile?.image}
                alt="user-pic"
                fill
                className="rounded-full object-cover shadow-xl"
              />
            </div>
            <h1 className="font-bold text-3xl text-center mt-3">
              {userProfile?.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === userProfile?._id && (
                <button
                  type="button"
                  className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                  onClick={handleLogout}
                >
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={() => setActiveBtn('created')}
              className={`${
                activeBtn === 'created' ? 'bg-red-500 text-white' : 'bg-gray-200'
              } px-4 py-2 rounded-full mr-4`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={() => setActiveBtn('saved')}
              className={`${
                activeBtn === 'saved' ? 'bg-red-500 text-white' : 'bg-gray-200'
              } px-4 py-2 rounded-full`}
            >
              Saved
            </button>
          </div>

          {userPins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={activeBtn === 'created' ? userPins : userProfile?.saved} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No Pins Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;