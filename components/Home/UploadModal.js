'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '../../redux/slices/uploadSlice';
import { createPost } from '../../redux/slices/postSlice';

const UploadModal = ({ isOpen, onClose }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.user);
  const { categories } = useSelector(state => state.categories);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !description || !categoryId) return;

    setLoading(true);
    try {
      // First upload the file
      const formData = new FormData();
      formData.append('file', file);
      const uploadResult = await dispatch(uploadFile(formData)).unwrap();

      // Then create the post
      await dispatch(createPost({
        description,
        categoryId,
        userId: currentUser._id,
        imageUrl: uploadResult.url
      })).unwrap();

      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Category</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>
                  {category.category}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;