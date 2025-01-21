"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { uploadFile } from "../../redux/slices/uploadSlice";
import { createPost } from "../../redux/slices/postSlice";
import Spinner from "../../components/Home/Spinner";
import { toast } from "react-toastify";

const CreatePin = () => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);

  console.log(currentUser)

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
      console.log('Image file:', imageFile);
    
      // Make sure to use the same field name as backend expects
      formData.append('postImage', imageFile);  // Must be 'file' to match backend
      formData.append('category', category);
  
      
      // Upload image first
      const uploadResult = await dispatch(uploadFile(formData)).unwrap();

      if (!uploadResult.url) {
        throw new Error("Upload failed");
      }

      // Create post with image URL
      await dispatch(
        createPost({
          description,
          categoryId: category,
          userId: currentUser._id,
          imageUrl: uploadResult.url,
        })
      ).unwrap();

      toast.success("Post created successfully!");
      router.push("/");
    } catch (error) {
      console.error("Post creation failed:", error);
      toast.error(error.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

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

            <option value="nature">Nature</option>
            <option value="Animal">Animal</option>
            <option value="Travel">Travel</option>
            <option value="Art">Art</option>
            <option value="Textures">Textures</option>
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
