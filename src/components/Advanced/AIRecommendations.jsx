import React, { useState, useEffect } from 'react';
import { Sparkles, TrendingUp } from 'lucide-react';

const AIRecommendations = ({ userId, currentProduct }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setRecommendations([
        { id: 1, name: 'Smart Watch Pro', price: 299, confidence: 95 },
        { id: 2, name: 'Wireless Earbuds', price: 149, confidence: 88 },
        { id: 3, name: 'Phone Case Premium', price: 29, confidence: 82 }
      ]);
      setLoading(false);
    }, 1000);
  }, [userId, currentProduct]);

  if (loading) return <div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>;

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-xl border border-purple-200">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-purple-600" size={20} />
        <h3 className="font-semibold text-gray-800">AI Recommendations</h3>
        <TrendingUp className="text-green-500" size={16} />
      </div>
      <div className="space-y-3">
        {recommendations.map(item => (
          <div key={item.id} className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-600">${item.price}</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-purple-600">{item.confidence}% match</div>
              <button className="text-xs bg-purple-600 text-white px-2 py-1 rounded mt-1">Add</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;