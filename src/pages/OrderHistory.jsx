import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle, Clock, Eye, Download } from 'lucide-react';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    setOrders([
      {
        id: 'ORD-001',
        date: '2024-01-15',
        total: 299.99,
        status: 'delivered',
        items: 3,
        vendor: 'TechStore Pro',
        trackingNumber: 'TRK123456789'
      },
      {
        id: 'ORD-002',
        date: '2024-01-10',
        total: 149.50,
        status: 'shipped',
        items: 2,
        vendor: 'Fashion Hub',
        trackingNumber: 'TRK987654321'
      },
      {
        id: 'ORD-003',
        date: '2024-01-05',
        total: 89.99,
        status: 'processing',
        items: 1,
        vendor: 'Electronics Plus',
        trackingNumber: null
      }
    ]);
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'shipped': return <Truck className="h-5 w-5 text-blue-500" />;
      case 'processing': return <Clock className="h-5 w-5 text-yellow-500" />;
      default: return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = filter === 'all' ? orders : orders.filter(order => order.status === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Order History</h1>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="flex border-b border-gray-200">
            {['all', 'processing', 'shipped', 'delivered'].map(status => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-6 py-4 font-medium capitalize ${
                  filter === status
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {status === 'all' ? 'All Orders' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Order {order.id}</h3>
                    <p className="text-sm text-gray-600">Placed on {order.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">${order.total}</p>
                  <p className="text-sm text-gray-600">{order.items} items</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Vendor</p>
                  <p className="text-sm text-gray-600">{order.vendor}</p>
                </div>
                {order.trackingNumber && (
                  <div>
                    <p className="text-sm font-medium text-gray-700">Tracking Number</p>
                    <p className="text-sm text-blue-600 font-mono">{order.trackingNumber}</p>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  <Eye size={16} />
                  View Details
                </button>
                {order.status === 'delivered' && (
                  <button className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                    <Download size={16} />
                    Download Invoice
                  </button>
                )}
                {order.trackingNumber && (
                  <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50">
                    <Truck size={16} />
                    Track Package
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">No orders found</h3>
            <p className="text-gray-600">You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;