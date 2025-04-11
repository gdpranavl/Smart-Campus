"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderConfirmedPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount <= 1) {
          clearInterval(timer);
          router.push('/canteen/orders');
          return 0;
        }
        return prevCount - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [router]);
  
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="mx-auto max-w-md">
        <div className="rounded-full h-24 w-24 flex items-center justify-center mx-auto bg-green-100">
          <svg className="h-12 w-12 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Order Confirmed!</h1>
        <p className="mt-2 text-gray-600">
          Your order has been placed successfully. You can track its status in your order history.
        </p>
        
        <div className="mt-8 bg-blue-50 rounded-md p-4">
          <p className="text-sm text-blue-700">
            We'll notify you when your order is ready for pickup. Thank you for your order!
          </p>
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          Redirecting to your orders in {countdown} seconds...
        </p>
        
        <div className="mt-6">
          <button
            onClick={() => router.push('/canteen/orders')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
}
