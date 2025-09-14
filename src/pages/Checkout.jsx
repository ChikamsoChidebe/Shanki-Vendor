import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';
import { CreditCard, Wallet, Truck, MapPin, User } from 'lucide-react';
import LoadingSpinner from '../components/Common/LoadingSpinner.jsx';

const Checkout = () => {
  const { items, totalPrice, calculateShipping, calculateTax, calculateTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState(0);
  const [formData, setFormData] = useState({
    shippingAddress: {
      name: user?.name || '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: user?.phone || ''
    },
    paymentMethod: 'wallet',
    notes: ''
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'customer') {
      navigate('/login');
      return;
    }

    if (items.length === 0) {
      navigate('/cart');
      return;
    }

    fetchWalletBalance();
  }, [isAuthenticated, user, items, navigate]);

  const fetchWalletBalance = async () => {
    try {
      const res = await axios.get('/api/users/wallet');
      setWalletBalance(res.data.balance);
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('shippingAddress.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        shippingAddress: {
          ...formData.shippingAddress,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const validateForm = () => {
    const { shippingAddress } = formData;
    const requiredFields = ['name', 'street', 'city', 'state', 'zipCode', 'country'];
    
    for (const field of requiredFields) {
      if (!shippingAddress[field]?.trim()) {
        toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }

    if (formData.paymentMethod === 'wallet' && walletBalance < calculateTotal()) {
      toast.error('Insufficient wallet balance');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    try {
      const orderData = {
        shippingAddress: formData.shippingAddress,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes
      };

      const res = await axios.post('/api/orders/create', orderData);
      
      toast.success('Order placed successfully!');
      navigate(`/customer/orders/${res.data.order._id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated || user?.role !== 'customer') {
    return null;
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-secondary-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-secondary-200">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-bold text-secondary-900">Shipping Address</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="shippingAddress.name"
                    value={formData.shippingAddress.name}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="shippingAddress.phone"
                    value={formData.shippingAddress.phone}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="shippingAddress.street"
                    value={formData.shippingAddress.street}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="shippingAddress.city"
                    value={formData.shippingAddress.city}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="shippingAddress.state"
                    value={formData.shippingAddress.state}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    ZIP Code *
                  </label>
                  <input
                    type="text"
                    name="shippingAddress.zipCode"
                    value={formData.shippingAddress.zipCode}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-secondary-700 mb-1">
                    Country *
                  </label>
                  <select
                    name="shippingAddress.country"
                    value={formData.shippingAddress.country}
                    onChange={handleInputChange}
                    required
                    className="input-field"
                  >
                    <option value="United States">United States</option>
                    <option value="Canada">Canada</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-secondary-200">
              <div className="flex items-center mb-6">
                <CreditCard className="h-6 w-6 text-primary-600 mr-3" />
                <h2 className="text-xl font-bold text-secondary-900">Payment Method</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="wallet"
                    name="paymentMethod"
                    value="wallet"
                    checked={formData.paymentMethod === 'wallet'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600"
                  />
                  <label htmlFor="wallet" className="flex items-center space-x-2 cursor-pointer">
                    <Wallet className="h-5 w-5 text-primary-600" />
                    <span className="font-medium">Wallet Balance</span>
                    <span className="text-sm text-secondary-600">
                      (Available: ${walletBalance.toFixed(2)})
                    </span>
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="card"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600"
                  />
                  <label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
                    <CreditCard className="h-5 w-5 text-primary-600" />
                    <span className="font-medium">Credit/Debit Card</span>
                    <span className="text-sm text-secondary-600">(Demo - Not processed)</span>
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input
                    type="radio"
                    id="cod"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-primary-600"
                  />
                  <label htmlFor="cod" className="flex items-center space-x-2 cursor-pointer">
                    <Truck className="h-5 w-5 text-primary-600" />
                    <span className="font-medium">Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {formData.paymentMethod === 'wallet' && walletBalance < calculateTotal() && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm text-red-800">
                    Insufficient wallet balance. You need ${(calculateTotal() - walletBalance).toFixed(2)} more.
                  </p>
                </div>
              )}
            </div>

            {/* Order Notes */}
            <div className="bg-white p-6 rounded-lg shadow-md border border-secondary-200">
              <h2 className="text-xl font-bold text-secondary-900 mb-4">Order Notes (Optional)</h2>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                placeholder="Any special instructions for your order..."
                className="input-field"
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md border border-secondary-200 sticky top-8">
              <h2 className="text-xl font-bold text-secondary-900 mb-6">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.product._id} className="flex items-center space-x-3">
                    <img
                      src={item.product.images?.[0] || '/placeholder-product.jpg'}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-secondary-900 truncate">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-secondary-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <div className="space-y-3 border-t border-secondary-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-secondary-600">Subtotal:</span>
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
                
                <div className="border-t border-secondary-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-secondary-900">Total:</span>
                    <span className="text-lg font-bold text-primary-600">
                      ${calculateTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || (formData.paymentMethod === 'wallet' && walletBalance < calculateTotal())}
                className="w-full btn-primary mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <LoadingSpinner size="sm" className="mr-2" />
                    Placing Order...
                  </div>
                ) : (
                  'Place Order'
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;