import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ShoppingBag, Users, Package, Star, ArrowRight, TrendingUp, Shield, Truck, CreditCard, Headphones, Globe, Award } from 'lucide-react';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({ products: 0, vendors: 0, customers: 0 });

  useEffect(() => {
    fetchFeaturedProducts();
    fetchCategories();
    fetchStats();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const res = await axios.get('/api/products?limit=8&sortBy=rating.average');
      setFeaturedProducts(res.data.products || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      setFeaturedProducts([]);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/products/categories');
      setCategories(Array.isArray(res.data) ? res.data.slice(0, 6) : []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
    }
  };

  const fetchStats = async () => {
    try {
      setStats({ products: 1250, vendors: 150, customers: 5000 });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <ShoppingBag className="text-blue-400 animate-bounce" size={32} />
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-fade-in">
                Shanki-Vendor
              </h1>
              <Package className="text-purple-400 animate-pulse" size={32} />
            </div>
            <p className="text-xl md:text-3xl mb-8 text-gray-200 animate-slide-up">
              Premium Multi-Vendor Marketplace Experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up">
              <Link to="/products" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg">
                Shop Now
              </Link>
              <Link to="/vendor/register" className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg">
                Start Selling
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Showcase */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-fade-in">Premium Shopping Experience</h2>
            <p className="text-xl text-gray-600 animate-slide-up">Built for modern commerce</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Secure Payments</h3>
              <p className="text-gray-600 mb-4">Bank-level security with encrypted transactions</p>
              <div className="text-3xl font-bold text-blue-600">256-bit</div>
              <div className="text-sm text-gray-500">SSL Encryption</div>
            </div>
            <div className="group bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
                <Truck className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Fast Delivery</h3>
              <p className="text-gray-600 mb-4">Express shipping with real-time tracking</p>
              <div className="text-3xl font-bold text-green-600">24h</div>
              <div className="text-sm text-gray-500">Express Delivery</div>
            </div>
            <div className="group bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-2xl">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce">
                <Headphones className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">24/7 Support</h3>
              <p className="text-gray-600 mb-4">Round-the-clock customer assistance</p>
              <div className="text-3xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-gray-500">Live Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Quality Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Shanki-Vendor</h2>
            <p className="text-xl text-gray-600">Trusted by thousands of customers worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Quality Assured</h3>
              <p className="text-gray-600">All products verified by our quality team</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Easy Returns</h3>
              <p className="text-gray-600">30-day hassle-free return policy</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Global Reach</h3>
              <p className="text-gray-600">Shipping to 50+ countries worldwide</p>
            </div>
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Top Rated</h3>
              <p className="text-gray-600">4.8/5 average customer rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Package className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold mb-2">{stats.products.toLocaleString()}+</h3>
              <p className="text-gray-200">Premium Products</p>
            </div>
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold mb-2">{stats.vendors.toLocaleString()}+</h3>
              <p className="text-gray-200">Verified Vendors</p>
            </div>
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold mb-2">{stats.customers.toLocaleString()}+</h3>
              <p className="text-gray-200">Happy Customers</p>
            </div>
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <Headphones className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-4xl font-bold mb-2">24/7</h3>
              <p className="text-gray-200">Live Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Shop by Category</h2>
            <p className="text-secondary-600">Discover products across various categories</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array.isArray(categories) && categories.map((category, index) => (
              <Link
                key={index}
                to={`/products?category=${category}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <ShoppingBag className="h-6 w-6 text-primary-600" />
                </div>
                <h3 className="font-semibold text-secondary-900">{category}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-4">Featured Products</h2>
              <p className="text-secondary-600">Top-rated products from our vendors</p>
            </div>
            <Link to="/products" className="flex items-center text-primary-600 hover:text-primary-700 font-medium">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="product-grid">
            {Array.isArray(featuredProducts) && featuredProducts.map((product) => (
              <div key={product._id} className="card-hover">
                <div className="aspect-w-1 aspect-h-1 bg-secondary-200 rounded-t-lg overflow-hidden">
                  <img
                    src={product.images?.[0] || '/placeholder-product.jpg'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-secondary-900 mb-2 truncate">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-secondary-600 ml-1">
                      {product.rating?.average?.toFixed(1) || '0.0'} ({product.rating?.count || 0})
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-primary-600">${product.price}</span>
                    <Link
                      to={`/products/${product._id}`}
                      className="btn-primary text-sm px-4 py-2"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Join Our Marketplace</h2>
          <p className="text-2xl mb-12 text-gray-200">
            Start your journey with thousands of satisfied customers and vendors
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
              <p className="text-gray-300 text-sm">Bank-level security & encryption</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <Truck className="h-12 w-12 text-green-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Fast Shipping</h3>
              <p className="text-gray-300 text-sm">Express delivery worldwide</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Quality Guarantee</h3>
              <p className="text-gray-300 text-sm">Premium products only</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/vendor/register"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-4 rounded-xl font-bold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center"
            >
              Start Selling Today <ArrowRight className="ml-3 h-6 w-6" />
            </Link>
            <Link
              to="/products"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-2xl inline-flex items-center"
            >
              Shop Premium Products <ShoppingBag className="ml-3 h-6 w-6" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;