import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import AdminNavbar from '../../components/layout/AdminNavbar';
import StatusBadge from '../../components/admin/StatusBadge';
import adminService from '../../services/adminService';

const UserDetails = () => {
  const { user_id } = useParams();
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserPurchases();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id]);

  const fetchUserPurchases = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getUserPurchases(user_id);
      
      if (response.successstatus) {
        setPurchases(response.data.purchases || []);
      } else {
        setError(response.message || 'Failed to fetch user purchases');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch user purchases');
      console.error('User purchases fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="spinner w-16 h-16 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading user details...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="glass rounded-xl p-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button onClick={() => navigate('/admin/users')} className="btn-primary">
              Back to Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats
  const totalLicenses = purchases.length;
  const activeLicenses = purchases.filter(p => p.status === 'ACTIVE').length;
  const totalSpent = purchases.reduce((sum, p) => sum + (p.payable_amount || 0), 0);

  return (
    <div className="min-h-screen">
      <AdminNavbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 slide-up">
          <button 
            onClick={() => navigate('/admin/users')}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4 transition-colors"
          >
            <FaArrowLeft />
            Back to Users
          </button>
          <h1 className="text-4xl font-bold text-gradient mb-2">User Details</h1>
          <p className="text-gray-600">User ID: {user_id}</p>
        </div>

        {/* User Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass rounded-xl p-6 fade-in">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Licenses</h3>
            <p className="text-3xl font-bold text-primary-600">{totalLicenses}</p>
          </div>
          <div className="glass rounded-xl p-6 fade-in">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Active Licenses</h3>
            <p className="text-3xl font-bold text-green-600">{activeLicenses}</p>
          </div>
          <div className="glass rounded-xl p-6 fade-in">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Total Spent</h3>
            <p className="text-3xl font-bold text-purple-600">₹{totalSpent.toLocaleString()}</p>
          </div>
        </div>

        {/* Purchase History */}
        <div className="glass rounded-xl overflow-hidden fade-in">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Purchase History</h3>
          </div>
          
          {purchases.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">License Key</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Project</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Order Number</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Bound</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase">Downloads</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {purchases.map((purchase, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs font-semibold text-primary-600">
                          {purchase.license_key}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-medium text-sm">{purchase.project_title}</div>
                          <div className="text-xs text-gray-500">{purchase.project_code}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono text-xs">{purchase.order_number}</span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(purchase.purchased_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-green-600">
                          ₹{typeof purchase.payable_amount === 'number' 
                            ? purchase.payable_amount.toFixed(2)
                            : parseFloat(purchase.payable_amount || 0).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={purchase.status} />
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-xs font-semibold ${purchase.is_bound ? 'text-blue-600' : 'text-gray-500'}`}>
                          {purchase.is_bound ? '✓ Yes' : '✗ No'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-semibold">{purchase.download_count || 0}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-gray-500 text-lg">No purchase history available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
