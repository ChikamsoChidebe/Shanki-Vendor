import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, Smartphone, Key, AlertTriangle } from 'lucide-react';

const SecuritySettings = () => {
  const [settings, setSettings] = useState({
    twoFactorEnabled: true,
    loginAlerts: true,
    sessionTimeout: 30,
    passwordExpiry: 90
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-800">Security Settings</h1>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Smartphone className="h-6 w-6 text-green-600" />
              <h2 className="text-xl font-semibold text-gray-800">Two-Factor Authentication</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium text-gray-800">Enable 2FA</p>
                <p className="text-sm text-gray-600">Add an extra layer of security to your account</p>
              </div>
              <button className={`px-4 py-2 rounded-lg font-medium ${
                settings.twoFactorEnabled 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {settings.twoFactorEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
            {settings.twoFactorEnabled && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">✓ 2FA is active. Your account is protected.</p>
              </div>
            )}
          </div>
        </div>

        {/* Password Security */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Lock className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-800">Password Security</h2>
            </div>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-10"
                  placeholder="Enter current password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Enter new password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
              <input
                type="password"
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                placeholder="Confirm new password"
              />
            </div>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Update Password
            </button>
          </div>
        </div>

        {/* Login Security */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <Key className="h-6 w-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">Login Security</h2>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-800">Login Alerts</p>
                <p className="text-sm text-gray-600">Get notified of new login attempts</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={settings.loginAlerts} className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
              <select 
                value={settings.sessionTimeout}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security Recommendations */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="h-6 w-6 text-yellow-600" />
            <h3 className="text-lg font-semibold text-yellow-800">Security Recommendations</h3>
          </div>
          <ul className="space-y-2 text-sm text-yellow-700">
            <li>• Use a unique, strong password with at least 12 characters</li>
            <li>• Enable two-factor authentication for maximum security</li>
            <li>• Regularly review your login activity</li>
            <li>• Never share your login credentials with others</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;