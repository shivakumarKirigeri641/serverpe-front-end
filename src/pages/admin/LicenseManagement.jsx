import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaSync, FaCheck, FaTimes } from 'react-icons/fa';
import AdminNavbar from '../../components/layout/AdminNavbar';
import AdminTable from '../../components/admin/AdminTable';
import SearchBar from '../../components/admin/SearchBar';
import FilterDropdown from '../../components/admin/FilterDropdown';
import StatusBadge from '../../components/admin/StatusBadge';
import adminService from '../../services/adminService';

const LicenseManagement = () => {
  const navigate = useNavigate();
  const [licenses, setLicenses] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState(null);
  const [boundFilter, setBoundFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchLicenses();
  }, [currentPage, searchTerm, statusFilter, boundFilter]);

  const fetchLicenses = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters = {
        page: currentPage,
        limit: 20,
      };
      if (searchTerm) filters.search = searchTerm;
      if (statusFilter) filters.status = statusFilter;
      if (boundFilter !== null) filters.bound = boundFilter === 'true';

      const response = await adminService.getAllLicenses(filters);
      
      if (response.successstatus) {
        setLicenses(response.data.licenses || []);
        setPagination(response.pagination);
      } else {
        setError(response.message || 'Failed to fetch licenses');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch licenses');
      console.error('License fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleBoundFilter = (bound) => {
    setBoundFilter(bound);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (licenseKey) => {
    navigate(`/admin/licenses/${licenseKey}`);
  };

  const handleResetFingerprint = async (licenseKey) => {
    if (!window.confirm('Are you sure you want to reset the device fingerprint for this license?')) return;

    try {
      setActionLoading(licenseKey);
      const response = await adminService.resetLicenseFingerprint(licenseKey);
      
      if (response.successstatus) {
        alert('Fingerprint reset successfully!');
        fetchLicenses();
      } else {
        alert(response.message || 'Failed to reset fingerprint');
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to reset fingerprint');
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (licenseKey, currentStatus) => {
    const action = currentStatus === true ? 'deactivate' : 'activate';
    if (!window.confirm(`Are you sure you want to ${action} this license?`)) return;

    try {
      setActionLoading(licenseKey);
      const response = currentStatus === true 
        ? await adminService.deactivateLicense(licenseKey)
        : await adminService.activateLicense(licenseKey);
      
      if (response.successstatus) {
        alert(`License ${action}d successfully!`);
        fetchLicenses();
      } else {
        alert(response.message || `Failed to ${action} license`);
      }
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${action} license`);
    } finally {
      setActionLoading(null);
    }
  };

  const columns = [
    {
      key: 'license_key',
      label: 'License Key',
      render: (row) => (
        <span className="font-mono text-xs font-semibold text-primary-600">
          {row.license_key}
        </span>
      ),
    },
    {
      key: 'user',
      label: 'User',
      render: (row) => (
        <div>
          <div className="font-medium">{row.user?.name || 'N/A'}</div>
          <div className="text-xs text-gray-500">{row.user?.email || ''}</div>
        </div>
      ),
    },
    {
      key: 'project',
      label: 'Project',
      render: (row) => (
        <div>
          <div className="font-medium">{row.project?.title || 'N/A'}</div>
          <div className="text-xs text-gray-500">{row.project?.code || ''}</div>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: 'is_bound',
      label: 'Bound',
      render: (row) => (
        <span className={`text-xs font-semibold ${row.is_bound ? 'text-blue-600' : 'text-gray-500'}`}>
          {row.is_bound ? '✓ Yes' : '✗ No'}
        </span>
      ),
    },
    {
      key: 'download_count',
      label: 'Downloads',
      render: (row) => <span className="font-semibold">{row.download_count || 0}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewDetails(row.license_key)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="View Details"
          >
            <FaEye />
          </button>
          <button
            onClick={() => handleResetFingerprint(row.license_key)}
            disabled={!row.is_bound || actionLoading === row.license_key}
            className="p-2 text-yellow-600 hover:bg-yellow-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Reset Fingerprint"
          >
            <FaSync className={actionLoading === row.license_key ? 'animate-spin' : ''} />
          </button>
          <button
            onClick={() => handleToggleStatus(row.license_key, row.status)}
            disabled={actionLoading === row.license_key}
            className={`p-2 rounded transition-colors ${
              row.status === true 
                ? 'text-red-600 hover:bg-red-50' 
                : 'text-green-600 hover:bg-green-50'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={row.status === true ? 'Deactivate' : 'Activate'}
          >
            {row.status === true ? <FaTimes /> : <FaCheck />}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <AdminNavbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 slide-up">
          <h1 className="text-4xl font-bold text-gradient mb-2">License Management</h1>
          <p className="text-gray-600">Manage and monitor all project licenses</p>
        </div>

        {/* Filters */}
        <div className="glass rounded-xl p-6 mb-6 fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Filter & Search</h3>
            {(searchTerm || statusFilter || boundFilter) && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter(null);
                  setBoundFilter(null);
                  setCurrentPage(1);
                }}
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <SearchBar 
                placeholder="Search licenses, users, projects..." 
                onSearch={handleSearch}
              />
            </div>
            <div>
              <FilterDropdown
                label="Filter by Status"
                value={statusFilter}
                onChange={handleStatusFilter}
                options={[
                  { label: 'Active', value: 'ACTIVE' },
                  { label: 'Inactive', value: 'INACTIVE' },
                ]}
              />
            </div>
            <div>
              <FilterDropdown
                label="Filter by Bound Status"
                value={boundFilter}
                onChange={handleBoundFilter}
                options={[
                  { label: 'Bound', value: 'true' },
                  { label: 'Not Bound', value: 'false' },
                ]}
              />
            </div>
          </div>
          
          {/* Active Filters Display */}
          {(searchTerm || statusFilter || boundFilter) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Active filters:</span>
                {searchTerm && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    Search: "{searchTerm}"
                    <button onClick={() => setSearchTerm('')} className="hover:text-primary-900">×</button>
                  </span>
                )}
                {statusFilter && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    Status: {statusFilter}
                    <button onClick={() => setStatusFilter(null)} className="hover:text-blue-900">×</button>
                  </span>
                )}
                {boundFilter && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                    Bound: {boundFilter === 'true' ? 'Yes' : 'No'}
                    <button onClick={() => setBoundFilter(null)} className="hover:text-green-900">×</button>
                  </span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="glass rounded-xl p-4 mb-6 bg-red-50 border-red-200 fade-in">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Table */}
        <AdminTable
          columns={columns}
          data={licenses}
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
          emptyMessage="No licenses found"
        />
      </div>
    </div>
  );
};

export default LicenseManagement;
