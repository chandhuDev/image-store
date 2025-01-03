'use client';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Link 
          href="/"
          className="text-blue-600 hover:text-blue-800"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Saved Items</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="relative h-24 w-24">
                <Image
                  src={item.imageUrl}
                  alt={item.description}
                  fill
                  className="object-cover rounded"
                />
              </div>
              
              <div className="ml-6 flex-grow">
                <h3 className="text-lg font-semibold">{item.description}</h3>
              </div>
              
              <button
                onClick={() => handleRemove(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}