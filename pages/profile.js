'use client';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Profile() {
  const router = useRouter();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center">
            <div className="relative h-20 w-20">
              <Image
                src={currentUser.avatar || '/default-avatar.png'}
                alt={currentUser.name}
                fill
                className="object-cover rounded-full"
              />
            </div>
            
            <div className="ml-6">
              <h1 className="text-2xl font-bold">{currentUser.name}</h1>
              <p className="text-gray-600">{currentUser.email}</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Purchase History</h2>
            {currentUser.purchases?.length > 0 ? (
              <div className="space-y-4">
                {currentUser.purchases.map((purchase) => (
                  <div key={purchase.id} className="border rounded p-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Order #{purchase.id}</span>
                      <span>{new Date(purchase.date).toLocaleDateString()}</span>
                    </div>
                    <p className="mt-2">Total: ${purchase.amount}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No purchase history</p>
            )}
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">My Uploaded Images</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {currentUser.uploads?.map((image) => (
                <div key={image.id} className="relative aspect-square">
                  <Image
                    src={image.url}
                    alt={image.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}