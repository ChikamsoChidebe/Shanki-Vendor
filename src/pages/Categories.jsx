import React from 'react';
import { ShoppingBag, Smartphone, Laptop, Watch, Headphones, Camera } from 'lucide-react';

const Categories = () => {
  const categories = [
    { name: 'Electronics', icon: Smartphone, count: 245 },
    { name: 'Computers', icon: Laptop, count: 189 },
    { name: 'Accessories', icon: Watch, count: 156 },
    { name: 'Audio', icon: Headphones, count: 98 },
    { name: 'Photography', icon: Camera, count: 67 },
    { name: 'General', icon: ShoppingBag, count: 234 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Product Categories</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <Icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count} products</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;