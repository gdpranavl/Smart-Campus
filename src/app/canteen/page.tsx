import { categories, getMenuItemsByCategory } from '@/utils/canteenData';
import MenuCategory from '@/components/canteen/MenuCategory';   
import Cart from '@/components/canteen/Cart';   

export default function CanteenPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">College Canteen</h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse our menu and place your order online. Freshly prepared items for pickup.
        </p>
      </div>
      
      <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900">Today's Special: Pasta Primavera</h2>
            <p className="text-sm text-gray-500">Fresh vegetables tossed with pasta in a light creamy sauce. Available during lunch hours.</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-8">
        {categories.map((category) => (
          <MenuCategory 
            key={category.id} 
            category={category} 
            items={getMenuItemsByCategory(category.id)} 
          />
        ))}
      </div>
    </div>
  );
}
