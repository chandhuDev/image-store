'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPins } from '../redux/slices/pinSlice';
import Pin from './Pin';
import Spinner from './Spinner';

const ViewFeed = ({ searchTerm }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { pins } = useSelector(state => state.pins);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPins(searchTerm)).finally(() => {
      setLoading(false);
    });
  }, [dispatch, searchTerm]);

  if (loading) return <Spinner message="Searching for pins..." />;

  if (!pins?.length) return <h2>No pins found</h2>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {pins.map((pin) => (
        <Pin key={pin._id} pin={pin} />
      ))}
    </div>
  );
};

export default ViewFeed;