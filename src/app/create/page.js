"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../redux/slices/uploadSlice";
import { createPost } from "../../redux/slices/postSlice";
import Spinner from "../../components/Home/Spinner";
import { toast } from "react-toastify";

const CreatePin = () => {
  const [mounted, setMounted] = useState(false);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("File size should be less than 10MB");
        return;
      }
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
    if (!imageFile || !description || !category) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("category", category);

      const uploadResult = await dispatch(uploadFile(formData)).unwrap();

      if (!uploadResult.url) {
        throw new Error("Upload failed");
      }

      await dispatch(
        createPost({
          description,
          categoryId: category,
          userId: currentUser.id,
          imageUrl: uploadResult.url,
        })
      ).unwrap();
      router.replace("/");
    } catch (error) {
      console.error("Post creation failed:", error);
      toast.error(error.message || "Failed to create post");
      setLoading(false);
    }
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl rounded-lg bg-white shadow-lg">
        <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8">
          {/* Image Upload Section */}
          <div className="w-full rounded-lg bg-gray-50 p-3">
            <div className="relative flex min-h-[300px] w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-2 sm:min-h-[400px]">
              {previewUrl ? (
                <div className="relative h-full w-full">
                  <img
                    src={previewUrl}
                    alt="preview"
                    className="h-full w-full rounded-lg object-contain"
                  />
                  <button
                    onClick={() => {
                      setPreviewUrl(null);
                      setImageFile(null);
                    }}
                    className="absolute right-2 top-2 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
                  <div className="text-center">
                    <p className="mb-2 text-lg font-semibold sm:text-xl md:text-2xl">
                      Click to upload
                    </p>
                    <p className="text-sm text-gray-500">Max file size: 20MB</p>
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

          {/* Form Section */}
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add your description"
                className="w-full border-b-2 border-gray-200 p-2 text-lg font-medium outline-none transition focus:border-gray-400 sm:text-xl md:text-2xl"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-md border-2 border-gray-200 p-2 text-base outline-none transition focus:border-gray-400"
              >
                <option value="">Select Category</option>
                <option value="nature">Nature</option>
                <option value="Animal">Animal</option>
                <option value="Travel">Travel</option>
                <option value="Textures">Textures</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSubmit}
                className="rounded-full bg-red-500 px-6 py-2 text-base font-bold text-white transition hover:bg-red-600 sm:px-8 sm:text-lg"
              >
                Create Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
