import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaSync, FaCheck, FaTimes } from 'react-icons/fa';
import AdminNavbar from '../../components/layout/AdminNavbar';
import StatusBadge from '../../components/admin/StatusBadge';
import adminService from '../../services/adminService';

const LicenseDetails = () => {
  const { license_key } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchLicenseDetails();
  }, [license_key]);

  const fetchLicenseDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getLicenseDetails(license_key);
      
      if (response.successstatus) {
        setDetails(response.data);
      } else {
        setError(response.message || 'Failed to fetch license details');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch license details');
      console.error('License details fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetFingerprint = async () => {
    if (!window.confirm('Are you sure you want to reset the device fingerprint?')) return;

    try {
      setActionLoading(true);
      const response = await adminService.resetLicenseFingerprint(license_key);
      
      if (response.successstatus) {
        alert('Fingerprint reset successfully!');
        fetchLicenseDetails();
      } else {
        alert(response.message || 'Failed to reset fingerprint');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reset fingerprint');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleStatus = async () => {
    const action = details.license.status === true ? 'deactivate' : 'activate';
    if (!window.confirm(`Are you sure you want to ${action} this license?`)) return;

    try {
      setActionLoading(true);
      const response = details.license.status === true
        ? await adminService.deactivateLicense(license_key)
        : await adminService.activateLicense(license_key);
      
      if (response.successstatus) {
        alert(`License ${action}d successfully!`);
        fetchLicenseDetails();
      } else {
        alert(response.message || `Failed to ${action} license`);
      }
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${action} license`);
    } finally {
      setActionLoading(false);
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
              <p className="text-gray-600">Loading license details...</p>
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
            <button onClick={() => navigate('/admin/licenses')} className="btn-primary">
              Back to Licenses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <AdminNavbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 slide-up">
          <button 
            onClick={() => navigate('/admin/licenses')}
            className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4 transition-colors"
          >
            <FaArrowLeft />
            Back to Licenses
          </button>
          <h1 className="text-4xl font-bold text-gradient mb-2">License Details</h1>
          <p className="text-gray-600 font-mono">{license_key}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-6 fade-in">
          <button 
            onClick={handleResetFingerprint}
            disabled={!details?.license?.fingerprint?.is_bound || actionLoading}
            className="btn flex items-center gap-2 bg-yellow-600 text-white hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaSync className={actionLoading ? 'animate-spin' : ''} />
            Reset Fingerprint
          </button>
          <button 
            onClick={handleToggleStatus}
            disabled={actionLoading}
            className={`btn flex items-center gap-2 text-white ${
              details?.license?.status === true
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {details?.license?.status === true ? <FaTimes /> : <FaCheck />}
            {details?.license?.status === true ? 'Deactivate' : 'Activate'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* License Info */}
          <div className="glass rounded-xl p-6 fade-in">
            <h3 className="text-xl font-bold mb-4 text-gray-800">License Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">License Key</span>
                <p className="font-mono text-sm font-semibold text-primary-600">{details?.license?.license_key}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Status</span>
                <div className="mt-1">
                  <StatusBadge status={details?.license?.status} />
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Created At</span>
                <p className="font-medium">{new Date(details?.license?.created_at).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Device Binding</span>
                <p className="font-medium">
                  {details?.license?.fingerprint?.is_bound ? (
                    <span className="text-green-600">✓ Bound</span>
                  ) : (
                    <span className="text-gray-500">✗ Not Bound</span>
                  )}
                </p>
              </div>
              {details?.license?.fingerprint?.is_bound && (
                <div>
                  <span className="text-sm text-gray-600">Bound At</span>
                  <p className="font-medium">{new Date(details?.license?.fingerprint?.bound_at).toLocaleString()}</p>
                </div>
              )}
            </div>
          </div>

          {/* User Info */}
          <div className="glass rounded-xl p-6 fade-in">
            <h3 className="text-xl font-bold mb-4 text-gray-800">User Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Name</span>
                <p className="font-medium">{details?.user?.name}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Email</span>
                <p className="font-medium">{details?.user?.email}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Mobile</span>
                <p className="font-medium">{details?.user?.mobile}</p>
              </div>
            </div>
          </div>

          {/* Project Info */}
          <div className="glass rounded-xl p-6 fade-in">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Project Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Title</span>
                <p className="font-medium">{details?.project?.title}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Code</span>
                <p className="font-mono text-sm font-semibold">{details?.project?.code}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Description</span>
                <p className="text-sm text-gray-700">{details?.project?.description}</p>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="glass rounded-xl p-6 fade-in">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Order Information</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-600">Order Number</span>
                <p className="font-mono text-sm font-semibold">{details?.order?.order_number}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Total Amount</span>
                <p className="font-medium">₹{details?.order?.total_amount?.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">GST Amount</span>
                <p className="font-medium">₹{details?.order?.gst_amount?.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Payable Amount</span>
                <p className="font-bold text-lg text-green-600">₹{details?.order?.payable_amount?.toFixed(2)}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Order Date</span>
                <p className="font-medium">{new Date(details?.order?.order_date).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Payment Status</span>
                <div className="mt-1">
                  <StatusBadge status={details?.order?.payment?.status} />
                </div>
              </div>
            </div>
          </div>

          {/* Download History */}
          <div className="glass rounded-xl p-6 fade-in lg:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-gray-800">Download History</h3>
            <div className="mb-4">
              <span className="text-sm text-gray-600">Total Downloads: </span>
              <span className="font-bold text-lg text-primary-600">{details?.download_history?.total_downloads || 0}</span>
            </div>
            {details?.download_history?.recent_downloads?.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">IP Address</th>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700">Downloaded At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {details.download_history.recent_downloads.map((download, idx) => (
                      <tr key={idx}>
                        <td className="px-4 py-2 font-mono text-xs">{download.ip}</td>
                        <td className="px-4 py-2">{new Date(download.downloaded_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No download history available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LicenseDetails;
