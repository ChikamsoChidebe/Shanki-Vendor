import React, { useState } from 'react';
import { TrendingDown, TrendingUp, Bell, Target } from 'lucide-react';

const PriceTracker = ({ productId, currentPrice }) => {
  const [targetPrice, setTargetPrice] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [priceHistory] = useState([
    { date: '2024-01-01', price: 299 },
    { date: '2024-01-15', price: 279 },
    { date: '2024-02-01', price: 259 },
    { date: '2024-02-15', price: 249 }
  ]);

  const startTracking = () => {
    if (targetPrice) {
      setIsTracking(true);
    }
  };

  const priceChange = priceHistory.length > 1 
    ? priceHistory[priceHistory.length - 1].price - priceHistory[priceHistory.length - 2].price
    : 0;

  return (
    <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
      <div className="flex items-center gap-2 mb-4">
        <Target className="text-green-600" size={20} />
        <h3 className="font-semibold text-gray-800">Price Tracker</h3>
      </div>

      {/* Current Price & Trend */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl font-bold text-gray-800">${currentPrice}</span>
          <div className={`flex items-center gap-1 ${priceChange < 0 ? 'text-green-600' : 'text-red-600'}`}>
            {priceChange < 0 ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
            <span className="text-sm">${Math.abs(priceChange)}</span>
          </div>
        </div>
        <p className="text-xs text-gray-600">
          {priceChange < 0 ? 'Price dropped!' : 'Price increased'} from last check
        </p>
      </div>

      {/* Price Alert Setup */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Set Price Alert
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder="Target price"
              className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm"
            />
            <button
              onClick={startTracking}
              disabled={!targetPrice || isTracking}
              className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 disabled:opacity-50"
            >
              <Bell size={16} />
            </button>
          </div>
        </div>

        {isTracking && (
          <div className="bg-green-100 border border-green-300 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-700">
              <Bell size={16} />
              <span className="text-sm font-medium">Alert Active</span>
            </div>
            <p className="text-xs text-green-600 mt-1">
              You'll be notified when price drops to ${targetPrice}
            </p>
          </div>
        )}

        {/* Mini Price History */}
        <div className="bg-white rounded-lg p-3">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Price History</h4>
          <div className="space-y-1">
            {priceHistory.slice(-3).map((entry, index) => (
              <div key={index} className="flex justify-between text-xs">
                <span className="text-gray-600">{entry.date}</span>
                <span className="font-medium">${entry.price}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceTracker;