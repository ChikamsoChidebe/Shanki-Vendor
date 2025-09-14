import React, { useState, useEffect } from 'react';
import { Wallet as WalletIcon, Plus, Minus, CreditCard, ArrowUpRight, ArrowDownLeft, Eye, EyeOff } from 'lucide-react';

const Wallet = () => {
  const [balance, setBalance] = useState(1250.75);
  const [showBalance, setShowBalance] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [showAddFunds, setShowAddFunds] = useState(false);

  useEffect(() => {
    setTransactions([
      {
        id: 1,
        type: 'credit',
        amount: 500.00,
        description: 'Funds Added',
        date: '2024-01-15',
        status: 'completed'
      },
      {
        id: 2,
        type: 'debit',
        amount: 149.99,
        description: 'Purchase - Wireless Headphones',
        date: '2024-01-14',
        status: 'completed'
      },
      {
        id: 3,
        type: 'credit',
        amount: 25.00,
        description: 'Cashback Reward',
        date: '2024-01-12',
        status: 'completed'
      },
      {
        id: 4,
        type: 'debit',
        amount: 89.50,
        description: 'Purchase - Smart Watch',
        date: '2024-01-10',
        status: 'completed'
      }
    ]);
  }, []);

  const addFunds = (amount) => {
    setBalance(prev => prev + amount);
    setShowAddFunds(false);
    // Add transaction logic
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <WalletIcon className="h-8 w-8 text-green-600" />
          <h1 className="text-3xl font-bold text-gray-800">My Wallet</h1>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl shadow-lg p-8 text-white mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-green-100 mb-2">Available Balance</p>
              <div className="flex items-center gap-3">
                <h2 className="text-4xl font-bold">
                  {showBalance ? `$${balance.toFixed(2)}` : '••••••'}
                </h2>
                <button
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-white hover:text-green-100"
                >
                  {showBalance ? <EyeOff size={24} /> : <Eye size={24} />}
                </button>
              </div>
            </div>
            <WalletIcon className="h-16 w-16 text-white opacity-20" />
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={() => setShowAddFunds(true)}
              className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all"
            >
              <Plus size={20} />
              Add Funds
            </button>
            <button className="flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-lg hover:bg-opacity-30 transition-all">
              <Minus size={20} />
              Withdraw
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-3 rounded-full">
                <ArrowDownLeft className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-xl font-bold text-gray-800">+$525.00</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 p-3 rounded-full">
                <ArrowUpRight className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Spent</p>
                <p className="text-xl font-bold text-gray-800">-$239.49</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-3 rounded-full">
                <CreditCard className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Transactions</p>
                <p className="text-xl font-bold text-gray-800">{transactions.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Transactions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {transactions.map(transaction => (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${
                      transaction.type === 'credit' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {transaction.type === 'credit' 
                        ? <ArrowDownLeft size={20} />
                        : <ArrowUpRight size={20} />
                      }
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500 capitalize">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Add Funds Modal */}
        {showAddFunds && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Add Funds to Wallet</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {[25, 50, 100].map(amount => (
                    <button
                      key={amount}
                      onClick={() => addFunds(amount)}
                      className="bg-blue-50 text-blue-600 py-3 rounded-lg hover:bg-blue-100 font-medium"
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Custom Amount</label>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowAddFunds(false)}
                    className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                    Add Funds
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wallet;