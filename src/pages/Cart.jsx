import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { toast } from 'react-toastify';
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import LoadingSpinner from '../components/Common/LoadingSpinner.jsx';

const Cart = () => {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart, loading, calculateShipping, calculateTax, calculateTotal } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || user?.role !== 'customer') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-secondary-900 mb-4">Access Denied</h2>
        <p className="text-secondary-600 mb-6">Please login as a customer to view your cart.</p>
        <Link to="/login" className="btn-primary">Login</Link>
      </div>
    );
  }

  const handleQuantityUpdate = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    const result = await updateQuantity(productId, newQuantity);
    if (!result.success) {
      toast.error(result.message);
    }
  };

  const handleRemoveItem = async (productId) => {
    const result = await removeFromCart(productId);
    if (result.success) {
      toast.success('Item removed from cart');
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      const result = await clearCart();
      if (result.success) {
        toast.success('Cart cleared');
      }
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return <LoadingSpinner size="lg" className="py-20" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <Link to="/products" className="flex items-center text-primary-600 hover:text-primary-700">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Continue Shopping
          </Link>
        </div>
        <h1 className="text-3xl font-bold text-secondary-900">Shopping Cart</h1>
        {items.length > 0 && (
          <button
            onClick={handleClearCart}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag className="h-24 w-24 text-secondary-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-secondary-900 mb-4">Your cart is empty</h2>
          <p className="text-secondary-600 mb-8">Add some products to get started!</p>
          <Link to="/products" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product._id} className="bg-white p-6 rounded-lg shadow-md border border-secondary-200">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.images?.[0] || '/placeholder-product.jpg'}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-secondary-900 mb-1">
                      <Link to={`/products/${item.product._id}`} className="hover:text-primary-600">
                        {item.product.name}
                      </Link>
                    </h3>
                    <p className="text-sm text-secondary-600 mb-2">
                      Sold by {item.product.vendor?.name}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-primary-600">
                        ${item.product.price}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleQuantityUpdate(item.product._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 rounded-full hover:bg-secondary-100 disabled:opacity-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityUpdate(item.product._id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="p-1 rounded-full hover:bg-secondary-100 disabled:opacity-50"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item.product._id)}
                          className="p-1 rounded-full hover:bg-red-100 text-red-600 ml-4"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-secondary-200 flex justify-between items-center">
                  <span className="text-sm text-secondary-600">
                    Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                  {item.product.stock < 10 && (
                    <span className="text-sm text-orange-600 font-medium">
                      Only {item.product.stock} left in stock
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md border border-secondary-200 sticky top-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Items ({totalItems}):</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-secondary-600">Shipping:</span>
                  <span className="font-medium">
                    {calculateShipping() === 0 ? 'FREE' : `$${calculateShipping().toFixed(2)}`}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-secondary-600">Tax:</span>
                  <span className="font-medium">${calculateTax().toFixed(2)}</span>
                </div>
                
                <div className="border-t border-secondary-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-secondary-900">Total:</span>
                    <span className="text-lg font-bold text-primary-600">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {calculateShipping() === 0 && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    🎉 You qualify for FREE shipping!
                  </p>
                </div>
              )}

              {totalPrice < 500 && calculateShipping() > 0 && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    Add ${(500 - totalPrice).toFixed(2)} more for FREE shipping!
                  </p>
                </div>
              )}

              <button
                onClick={handleCheckout}
                className="w-full btn-primary mt-6"
              >
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center">
                <Link
                  to="/products"
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;