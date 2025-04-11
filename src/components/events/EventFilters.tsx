"use client";
import { useState } from 'react';
import { categories } from '@/utils/eventsData';

interface EventFiltersProps {
  onFilterChange: (filters: {
    category: string | null;
    searchQuery: string;
    showRegisteredOnly: boolean;
  }) => void;
}

export default function EventFilters({ onFilterChange }: EventFiltersProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRegisteredOnly, setShowRegisteredOnly] = useState(false);
  
  const handleCategoryChange = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    onFilterChange({
      category: categoryId,
      searchQuery,
      showRegisteredOnly,
    });
  };
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onFilterChange({
      category: selectedCategory,
      searchQuery: event.target.value,
      showRegisteredOnly,
    });
  };
  
  const handleRegisteredToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowRegisteredOnly(event.target.checked);
    onFilterChange({
      category: selectedCategory,
      searchQuery,
      showRegisteredOnly: event.target.checked,
    });
  };
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Filter Events</h3>
      </div>
      <div className="px-4 py-5 sm:p-6">
        <div className="mb-4">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            id="search"
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Search events..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categories
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange(null)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                selectedCategory === null
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : `${category.color} hover:bg-opacity-80`
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <div className="flex items-center">
            <input
              id="registered-only"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              checked={showRegisteredOnly}
              onChange={handleRegisteredToggle}
            />
            <label htmlFor="registered-only" className="ml-2 block text-sm text-gray-700">
              Show only events I'm registered for
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
