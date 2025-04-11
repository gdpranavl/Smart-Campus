"use client";

const menuItems = [
  {
    id: 1,
    name: 'Today\'s Special: Pasta Primavera',
    price: '₹120',
    availability: 'Available',
  },
  {
    id: 2,
    name: 'Veg Sandwich',
    price: '₹80',
    availability: 'Available',
  },
  {
    id: 3,
    name: 'Chicken Burger',
    price: '₹150',
    availability: 'Limited',
  },
];

export default function CanteenMenu() {
  return (
    <div className="overflow-hidden">
      <ul role="list" className="divide-y divide-gray-100">
        {menuItems.map((item) => (
          <li key={item.id} className="flex justify-between gap-x-6 py-3">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{item.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.price}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${
                item.availability === 'Available' 
                  ? 'bg-green-50 text-green-700' 
                  : 'bg-yellow-50 text-yellow-700'
              }`}>
                {item.availability}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-5 text-center">
        <a href="/canteen" className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
          View full menu
        </a>
      </div>
    </div>
  );
}
