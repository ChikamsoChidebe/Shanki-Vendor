import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  LogOut, 
  Settings,
  Package,
  BarChart3,
  Users,
  Wallet,
  Sparkles,
  Shield,
  Bell,
  Heart,
  History
} from 'lucide-react';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const getProfileMenuItems = () => {
    const baseItems = [
      { icon: Settings, label: 'Profile Settings', path: '/profile' },
      { icon: Wallet, label: 'Wallet', path: '/wallet' }
    ];

    switch (user?.role) {
      case 'admin':
        return [
          { icon: BarChart3, label: 'Admin Dashboard', path: '/admin/dashboard' },
          { icon: Users, label: 'Manage Users', path: '/admin/users' },
          ...baseItems
        ];
      case 'vendor':
        return [
          { icon: BarChart3, label: 'Vendor Dashboard', path: '/vendor/dashboard' },
          { icon: Package, label: 'My Products', path: '/vendor/products' },
          { icon: Package, label: 'Orders', path: '/vendor/orders' },
          ...baseItems
        ];
      case 'customer':
        return [
          { icon: BarChart3, label: 'My Dashboard', path: '/customer/dashboard' },
          { icon: Package, label: 'My Orders', path: '/customer/orders' },
          ...baseItems
        ];
      default:
        return baseItems;
    }
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <div className="relative">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <Sparkles className="text-white w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden xs:block">
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Shanki-Vendor</span>
                <div className="text-xs text-gray-500 -mt-1 hidden sm:block">AI-Powered Marketplace</div>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-xl xl:max-w-2xl mx-4 xl:mx-8">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search with AI-powered suggestions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 xl:pl-12 pr-16 xl:pr-20 py-2.5 xl:py-3 bg-gray-50/80 border border-gray-200 rounded-xl xl:rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 focus:bg-white transition-all duration-300 placeholder-gray-400 text-sm xl:text-base"
                />
                <Search className="absolute left-3 xl:left-4 top-2.5 xl:top-3.5 h-4 w-4 xl:h-5 xl:w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                <div className="absolute right-2 xl:right-3 top-2 xl:top-2.5 flex items-center gap-1">
                  <kbd className="hidden xl:block px-2 py-1 text-xs bg-gray-200 rounded text-gray-500">⌘K</kbd>
                </div>
              </div>
            </form>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <Link
                to="/products"
                className={`px-3 xl:px-4 py-2 rounded-lg xl:rounded-xl font-medium transition-all duration-300 text-sm xl:text-base ${
                  location.pathname === '/products' 
                    ? 'bg-purple-100 text-purple-700 shadow-sm' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Products
              </Link>
              <Link
                to="/categories"
                className={`px-3 xl:px-4 py-2 rounded-lg xl:rounded-xl font-medium transition-all duration-300 text-sm xl:text-base ${
                  location.pathname === '/categories' 
                    ? 'bg-purple-100 text-purple-700 shadow-sm' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                Categories
              </Link>
              <Link
                to="/advanced"
                className={`px-3 xl:px-4 py-2 rounded-lg xl:rounded-xl font-medium transition-all duration-300 flex items-center gap-1.5 xl:gap-2 text-sm xl:text-base ${
                  location.pathname === '/advanced' 
                    ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 shadow-sm' 
                    : 'text-gray-600 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 xl:w-4 xl:h-4" />
                <span className="hidden xl:inline">AI Features</span>
                <span className="xl:hidden">AI</span>
              </Link>
              {!isAuthenticated && (
                <Link
                  to="/vendor/register"
                  className="px-3 xl:px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg xl:rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm xl:text-base"
                >
                  <span className="hidden xl:inline">Become a Vendor</span>
                  <span className="xl:hidden">Vendor</span>
                </Link>
              )}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              {isAuthenticated && (
                <>
                  <Link
                    to="/wishlist"
                    className="relative p-2 sm:p-2.5 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg sm:rounded-xl transition-all duration-300"
                  >
                    <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                  <Link
                    to="/notifications"
                    className="relative p-2 sm:p-2.5 text-gray-600 hover:text-blue-500 hover:bg-blue-50 rounded-lg sm:rounded-xl transition-all duration-300 hidden sm:block"
                  >
                    <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </Link>
                </>
              )}
              {isAuthenticated && user?.role === 'customer' && (
                <Link
                  to="/cart"
                  className="relative p-2 sm:p-2.5 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg sm:rounded-xl transition-all duration-300"
                >
                  <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-medium animate-pulse">
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </Link>
              )}
            </div>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-all duration-300 group"
                >
                  <div className="relative">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <span className="text-white text-xs sm:text-sm font-bold">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 sm:-bottom-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 border-2 border-white rounded-full"></div>
                  </div>
                  <div className="hidden lg:block text-left">
                    <div className="text-sm font-medium text-gray-700 group-hover:text-gray-900 truncate max-w-24 xl:max-w-none">
                      {user?.name}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {user?.role}
                    </div>
                  </div>
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-72 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 py-3 z-50 animate-in slide-in-from-top-2 duration-200">
                    <div className="px-6 py-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold">
                            {user?.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{user?.name}</p>
                          <p className="text-sm text-gray-500">{user?.email}</p>
                          <span className={`inline-flex items-center gap-1 mt-1 px-2 py-1 text-xs rounded-full font-medium ${
                            user?.role === 'admin' ? 'bg-red-100 text-red-700' :
                            user?.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {user?.role === 'admin' && <Shield className="w-3 h-3" />}
                            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="py-2">
                      {getProfileMenuItems().map((item, index) => (
                        <Link
                          key={index}
                          to={item.path}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center px-6 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 hover:text-purple-700 transition-all duration-200 group"
                        >
                          <item.icon className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    <div className="border-t border-gray-100 mt-2 pt-2">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-all duration-200 group"
                      >
                        <LogOut className="h-4 w-4 mr-3 group-hover:scale-110 transition-transform" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Link
                  to="/login"
                  className="px-3 sm:px-4 py-2 text-gray-600 hover:text-purple-600 font-medium transition-all duration-300 rounded-lg sm:rounded-xl hover:bg-purple-50 text-sm sm:text-base"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg sm:rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm sm:text-base"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-all duration-300 ml-2"
            >
              {isMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200/50 py-4 bg-white/95 backdrop-blur-lg">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-6 px-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search with AI suggestions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-400 focus:bg-white transition-all duration-300"
                />
                <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="space-y-1 px-1">
              <Link
                to="/products"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === '/products'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Package className="w-5 h-5 mr-3" />
                Products
              </Link>
              <Link
                to="/categories"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === '/categories'
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'
                }`}
              >
                <Search className="w-5 h-5 mr-3" />
                Categories
              </Link>
              <Link
                to="/advanced"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === '/advanced'
                    ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700'
                    : 'text-gray-700 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50'
                }`}
              >
                <Sparkles className="w-5 h-5 mr-3" />
                AI Features
              </Link>
              {isAuthenticated && (
                <>
                  <Link
                    to="/notifications"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-300 sm:hidden"
                  >
                    <Bell className="w-5 h-5 mr-3" />
                    Notifications
                    <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
                  </Link>
                  <Link
                    to="/wishlist"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-300"
                  >
                    <Heart className="w-5 h-5 mr-3" />
                    Wishlist
                  </Link>
                  <Link
                    to="/wallet"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center px-4 py-3 rounded-xl font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300"
                  >
                    <Wallet className="w-5 h-5 mr-3" />
                    Wallet
                  </Link>
                </>
              )}
              {!isAuthenticated && (
                <Link
                  to="/vendor/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-300 mt-4"
                >
                  <Users className="w-5 h-5 mr-3" />
                  Become a Vendor
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;