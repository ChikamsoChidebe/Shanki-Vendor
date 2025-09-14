import React from 'react';
import AIRecommendations from '../components/Advanced/AIRecommendations.jsx';
import ARViewer from '../components/Advanced/ARViewer.jsx';
import VoiceSearch from '../components/Advanced/VoiceSearch.jsx';
import PriceTracker from '../components/Advanced/PriceTracker.jsx';
import { Sparkles, Zap, Star } from 'lucide-react';

const AdvancedFeatures = () => {
  const handleVoiceSearch = (query) => {
    console.log('Voice search:', query);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="text-purple-600" size={32} />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Advanced Features
            </h1>
            <Zap className="text-blue-600" size={32} />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the future of e-commerce with our cutting-edge AI-powered features
          </p>
        </div>

        {/* Voice Search Demo */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Star className="text-yellow-500" size={24} />
              <h2 className="text-xl font-semibold text-gray-800">Voice Search</h2>
            </div>
            <VoiceSearch onSearch={handleVoiceSearch} />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* AI Recommendations */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <AIRecommendations userId="demo-user" currentProduct="smartphone" />
          </div>

          {/* AR Viewer */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <ARViewer product={{ id: 1, name: 'Smart Watch' }} />
          </div>

          {/* Price Tracker */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <PriceTracker productId="demo-product" currentPrice={249} />
          </div>

          {/* Feature Showcase */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-6 border border-indigo-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Coming Soon</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Blockchain Product Authentication</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Virtual Shopping Assistant</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Predictive Inventory Management</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">95%</div>
            <div className="text-gray-600">AI Accuracy</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">3x</div>
            <div className="text-gray-600">Faster Search</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center border border-gray-200">
            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
            <div className="text-gray-600">Live Support</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFeatures;