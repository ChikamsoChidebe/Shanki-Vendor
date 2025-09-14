import React, { useState } from 'react';
import { Camera, Smartphone, Eye } from 'lucide-react';

const ARViewer = ({ product }) => {
  const [arActive, setArActive] = useState(false);

  const startAR = () => {
    setArActive(true);
    // Simulate AR activation
    setTimeout(() => setArActive(false), 3000);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="text-blue-600" size={20} />
        <h3 className="font-semibold text-gray-800">AR Try-On</h3>
      </div>
      
      {!arActive ? (
        <div className="text-center">
          <Camera className="mx-auto text-blue-400 mb-3" size={48} />
          <p className="text-sm text-gray-600 mb-4">See how this product looks in your space</p>
          <button 
            onClick={startAR}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto hover:bg-blue-700"
          >
            <Smartphone size={16} />
            Start AR View
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-400 to-purple-500 text-white p-8 rounded-lg">
            <div className="animate-pulse">
              <Camera className="mx-auto mb-2" size={32} />
              <p className="text-sm">AR Camera Active</p>
              <p className="text-xs opacity-75">Move your device to place the product</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARViewer;