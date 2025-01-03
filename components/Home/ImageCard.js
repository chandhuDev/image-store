'use client';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/slices/cartSlice';
import { toast } from 'react-toastify';

const ImageCard = ({ post }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: post._id,
      imageUrl: post.imageUrl,
      description: post.description,
      categoryId: post.categoryId,
      userId: post.userId
    }));
    toast.success('Added to cart!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={post.imageUrl}
          alt={post.description}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{post.description}</h3>
        <button
          onClick={handleAddToCart}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ImageCard;