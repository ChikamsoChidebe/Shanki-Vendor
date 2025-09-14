import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Login from './components/Auth/Login.jsx';
import Register from './components/Auth/Register.jsx';
import AdvancedFeatures from './pages/AdvancedFeatures.jsx';
import Categories from './pages/Categories.jsx';
import VendorPendingApproval from './pages/VendorPendingApproval.jsx';
import Defender from './pages/Defender.jsx';
import Profile from './pages/Profile.jsx';
import NotFound from './pages/NotFound.jsx';
import SecuritySettings from './pages/SecuritySettings.jsx';
import OrderHistory from './pages/OrderHistory.jsx';
import Wishlist from './pages/Wishlist.jsx';
import Wallet from './pages/Wallet.jsx';
import VendorDashboard from './pages/VendorDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import AdminUsers from './pages/AdminUsers.jsx';
import Transactions from './pages/Transactions.jsx';
import VendorProducts from './pages/VendorProducts.jsx';
import VendorOrders from './pages/VendorOrders.jsx';
import AdminVendors from './pages/AdminVendors.jsx';
import Notifications from './pages/Notifications.jsx';
import SupportTickets from './pages/SupportTickets.jsx';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="products/:id" element={<ProductDetail />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="categories" element={<Categories />} />
              <Route path="vendor/register" element={<Register />} />
              <Route path="vendor/pending-approval" element={<VendorPendingApproval />} />
              <Route path="advanced" element={<AdvancedFeatures />} />
              <Route path="defender" element={<Defender />} />
              <Route path="profile" element={<Profile />} />
              <Route path="security-settings" element={<SecuritySettings />} />
              <Route path="order-history" element={<OrderHistory />} />
              <Route path="wishlist" element={<Wishlist />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="vendor/dashboard" element={<VendorDashboard />} />
              <Route path="vendor/products" element={<VendorProducts />} />
              <Route path="vendor/orders" element={<VendorOrders />} />
              <Route path="admin/dashboard" element={<AdminDashboard />} />
              <Route path="admin/users" element={<AdminUsers />} />
              <Route path="admin/vendors" element={<AdminVendors />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="support" element={<SupportTickets />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;