import React from 'react';
import { Clock, CheckCircle, AlertCircle } from 'lucide-react';

const VendorPendingApproval = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <Clock className="h-16 w-16 text-yellow-500 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Application Under Review</h1>
        <p className="text-gray-600 mb-6">
          Your vendor application is currently being reviewed by our team. 
          You'll receive an email notification once approved.
        </p>
        <div className="space-y-3 text-left">
          <div className="flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-700">Application submitted</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-gray-700">Under review (24-48 hours)</span>
          </div>
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-500">Approval notification</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorPendingApproval;