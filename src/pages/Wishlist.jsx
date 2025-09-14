import React, { useState, useEffect } from 'react';
import { Heart, ShoppingCart, Trash2, Share2, Star } from 'lucide-react';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    setWishlistItems([
      {
        id: 1,
        name: 'Wireless Bluetooth Headphones',
        price: 199.99,
        originalPrice: 249.99,
        image: '/api/placeholder/300/300',
        rating: 4.5,
        reviews: 128,
        vendor: 'AudioTech',
        inStock: true,
        discount: 20
      },
      {
        id: 2,
        name: 'Smart Fitness Watch',
        price: 299.99,
        originalPrice: 349.99,
        image: '/api/placeholder/300/300',
        rating: 4.8,
        reviews: 89,
        vendor: 'FitGear Pro',
        inStock: false,
        discount: 14
      },
      {
        id: 3,
        name: 'Portable Laptop Stand',
        price: 49.99,
        originalPrice: 59.99,
        image: '/api/placeholder/300/300',
        rating: 4.3,
        reviews: 45,
        vendor: 'OfficeMax',
        inStock: true,
        discount: 17
      }
    ]);
  }, []);

  const removeFromWishlist = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const addToCart = (item) => {
    console.log('Adding to cart:', item);
    // Add to cart logic
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Heart className="h-8 w-8 text-red-500" />
            <h1 className="text-3xl font-bold text-gray-800">My Wishlist</h1>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              {wishlistItems.length} items
            </span>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Share2 size={16} />
            Share Wishlist
          </button>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  {item.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      -{item.discount}%
                    </div>
                  )}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
                  >
                    <Heart className="h-5 w-5 text-red-500 fill-current" />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2">{item.name}</h3>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                  </div>

                  <p className="text-sm text-gray-600 mb-3">by {item.vendor}</p>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-800">${item.price}</span>
                    {item.originalPrice > item.price && (
                      <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(item)}
                      disabled={!item.inStock}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-medium ${
                        item.inStock
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart size={16} />
                      {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      <Trash2 size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Save items you love to your wishlist</p>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;