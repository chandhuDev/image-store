'use client';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/slices/cartSlice';
import Image from 'next/image';
import Link from 'next/link';

export default function Cart() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state) => state.cart);

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
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 gap-6">
          {items.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex items-center">
              <div className="relative h-24 w-24">
                <Image
                  src={item.url}
                  alt={item.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              
              <div className="ml-6 flex-grow">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-gray-600">${item.price}</p>
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
        
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Total</h3>
            <p className="text-2xl font-bold">${total.toFixed(2)}</p>
          </div>
          
          <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}