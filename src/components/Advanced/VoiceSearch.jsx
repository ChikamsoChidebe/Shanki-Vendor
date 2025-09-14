import React, { useState } from 'react';
import { Mic, MicOff, Search } from 'lucide-react';

const VoiceSearch = ({ onSearch }) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const startListening = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      const mockResults = ['wireless headphones', 'smart watch', 'laptop bag'];
      const result = mockResults[Math.floor(Math.random() * mockResults.length)];
      setTranscript(result);
      setIsListening(false);
      onSearch?.(result);
    }, 2000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2">
        <Search className="text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search products or try voice search..."
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          className="flex-1 outline-none"
        />
        <button
          onClick={isListening ? stopListening : startListening}
          className={`p-2 rounded-full transition-colors ${
            isListening 
              ? 'bg-red-500 text-white animate-pulse' 
              : 'bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          {isListening ? <MicOff size={16} /> : <Mic size={16} />}
        </button>
      </div>
      
      {isListening && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-center gap-2 text-blue-600">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm">Listening... Speak now</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceSearch;