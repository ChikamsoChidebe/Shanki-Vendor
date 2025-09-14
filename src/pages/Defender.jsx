import React, { useState, useEffect } from 'react';
import { Shield, AlertTriangle, CheckCircle, Eye, Lock, Activity } from 'lucide-react';

const Defender = () => {
  const [threats, setThreats] = useState([]);
  const [securityScore, setSecurityScore] = useState(85);
  const [activeScans, setActiveScans] = useState(3);

  useEffect(() => {
    setThreats([
      { id: 1, type: 'Suspicious Login', severity: 'medium', time: '2 min ago', blocked: true },
      { id: 2, type: 'Rate Limit Exceeded', severity: 'low', time: '5 min ago', blocked: true },
      { id: 3, type: 'SQL Injection Attempt', severity: 'high', time: '1 hour ago', blocked: true }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Security Defender</h1>
        </div>

        {/* Security Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Security Score</p>
                <p className="text-2xl font-bold text-green-600">{securityScore}%</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Threats Blocked</p>
                <p className="text-2xl font-bold text-red-600">{threats.length}</p>
              </div>
              <Shield className="h-8 w-8 text-red-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Scans</p>
                <p className="text-2xl font-bold text-blue-600">{activeScans}</p>
              </div>
              <Eye className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">System Status</p>
                <p className="text-sm font-medium text-green-600">Secure</p>
              </div>
              <Activity className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Recent Threats */}
        <div className="bg-white rounded-lg shadow mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Security Events</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {threats.map(threat => (
                <div key={threat.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`h-5 w-5 ${
                      threat.severity === 'high' ? 'text-red-500' : 
                      threat.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                    }`} />
                    <div>
                      <p className="font-medium text-gray-800">{threat.type}</p>
                      <p className="text-sm text-gray-600">{threat.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      threat.blocked ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {threat.blocked ? 'Blocked' : 'Active'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Two-Factor Authentication</span>
                <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">Enabled</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Login Monitoring</span>
                <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">Active</button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Rate Limiting</span>
                <button className="bg-green-500 text-white px-3 py-1 rounded text-sm">Enabled</button>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                Run Security Scan
              </button>
              <button className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700">
                View Audit Logs
              </button>
              <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                Emergency Lockdown
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Defender;