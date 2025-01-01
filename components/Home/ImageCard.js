'use client';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart} from '../../redux/slices/cartSlice'
import { toast } from 'react-toastify';

const ImageCard = ({ image }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(image));
    toast.success('Added to cart!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={image.imageUrl}
          alt={image.title}
          fill
          className="object-cover"
        />
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{image.title}</h3>
        <p className="text-gray-600 mb-4">${image.price}</p>
        
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