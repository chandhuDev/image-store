'use client';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPins } from '../redux/slices/pinSlice';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = ({ categoryId }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { pins } = useSelector(state => state.pins);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchPins(categoryId)).finally(() => {
      setLoading(false);
    });
  }, [dispatch, categoryId]);

  if (loading) return <Spinner message="We are adding new ideas to your feed!" />;

  if (!pins?.length) return <h2>No pins available</h2>;

  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  );
};

export default Feed;