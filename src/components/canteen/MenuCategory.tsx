"use client";
import { useState } from 'react';
import { Category, MenuItem, formatPrice } from '@/utils/canteenData';
import { useCart } from '@/context/CartContext';

interface MenuCategoryProps {
  category: Category;
  items: MenuItem[];
}

export default function MenuCategory({ category, items }: MenuCategoryProps) {
  const [expanded, setExpanded] = useState(true);
  const { addToCart } = useCart();
  
  return (
    <div className="mb-8">
      <div 
        className="flex justify-between items-center cursor-pointer mb-4"
        onClick={() => setExpanded(!expanded)}
      >
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{category.name}</h2>
          <p className="text-sm text-gray-500">{category.description}</p>
        </div>
        <button className="text-gray-500">
          {expanded ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
      
      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>
                  </div>
                  {item.isVegetarian && (
                    <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      Veg
                    </span>
                  )}
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-900">{formatPrice(item.price)}</p>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add to Cart
                  </button>
                </div>
                <p className="mt-1 text-xs text-gray-500">Prep time: {item.preparationTime} mins</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
