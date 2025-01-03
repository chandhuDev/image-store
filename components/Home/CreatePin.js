'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../../redux/slices/uploadSlice';
import { createPost } from '../../redux/slices/postSlice';
import Spinner from './Spinner';

const CreatePin = () => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState('');
  const [previewUrl, setPreviewUrl] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector(state => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile || !description || !category) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      
      // First upload the image
      const uploadResult = await dispatch(uploadFile(formData)).unwrap();

      // Then create the post
      await dispatch(createPost({
        description,
        categoryId: category,
        userId: currentUser._id,
        imageUrl: uploadResult.url
      })).unwrap();

      router.push('/');
    } catch (error) {
      console.error('Post creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) return router.push('/login');
  if (loading) return <Spinner />;

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
      <div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {previewUrl ? (
              <img src={previewUrl} alt="preview" className="h-full w-full" />
            ) : (
              <label className="cursor-pointer">
                <div className="flex flex-col items-center justify-center h-full">
                  <p className="font-bold text-2xl">Click to upload</p>
                </div>
                <input
                  type="file"
                  onChange={handleImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add your description"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="">Select Category</option>
            {/* Categories would come from a categories reducer if needed */}
            <option value="nature">Nature</option>
            <option value="art">Art</option>
            {/* Add more categories as needed */}
          </select>

          <div className="flex justify-end items-end mt-5">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none"
            >
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;