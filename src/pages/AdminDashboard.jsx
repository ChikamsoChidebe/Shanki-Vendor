import React, { useState, useEffect } from 'react';
import { Users, Package, ShoppingCart, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingVendors: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/admin/dashboard', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setStats(response.data.stats);
      setRecentActivity(response.data.recentActivity || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Mock data for demo
      setStats({
        totalUsers: 1250,
        totalVendors: 89,
        totalProducts: 2340,
        totalOrders: 567,
        totalRevenue: 125430.50,
        pendingVendors: 12
      });
      setRecentActivity([
        { id: 1, type: 'vendor_approval', message: 'New vendor registration: TechStore Pro', time: '2 hours ago' },
        { id: 2, type: 'order', message: 'High-value order placed: $2,499.99', time: '3 hours ago' },
        { id: 3, type: 'user', message: '15 new user registrations today', time: '5 hours ago' }
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Platform overview and management</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Generate Report
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              System Health
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600">+12% this month</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Vendors</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalVendors}</p>
                <p className="text-sm text-yellow-600">{stats.pendingVendors} pending</p>
              </div>
              <Package className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-800">{stats.totalProducts.toLocaleString()}</p>
                <p className="text-sm text-blue-600">+8% this week</p>
              </div>
              <ShoppingCart className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Platform Revenue</p>
                <p className="text-2xl font-bold text-gray-800">${stats.totalRevenue.toLocaleString()}</p>
                <p className="text-sm text-green-600">+15% this month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Revenue Analytics</h2>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Revenue Chart</p>
                <p className="text-sm text-gray-400">Integration with charts library needed</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`p-2 rounded-full ${
                    activity.type === 'vendor_approval' ? 'bg-yellow-100 text-yellow-600' :
                    activity.type === 'order' ? 'bg-green-100 text-green-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'vendor_approval' ? <Clock size={16} /> :
                     activity.type === 'order' ? <ShoppingCart size={16} /> :
                     <Users size={16} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Pending Approvals</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Vendor Applications</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">{stats.pendingVendors}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Product Reviews</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">8</span>
              </div>
              <button className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700">
                Review All
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700">API Services</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-700">Database</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-gray-700">Payment Gateway</span>
              </div>
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                View Details
              </button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm">
                Manage Users
              </button>
              <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 text-sm">
                View Reports
              </button>
              <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700 text-sm">
                System Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;