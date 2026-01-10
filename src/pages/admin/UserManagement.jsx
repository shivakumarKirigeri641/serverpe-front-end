import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaUserShield, FaUserTimes } from 'react-icons/fa';
import AdminNavbar from '../../components/layout/AdminNavbar';
import AdminTable from '../../components/admin/AdminTable';
import SearchBar from '../../components/admin/SearchBar';
import AdminDebug from '../../components/admin/AdminDebug';
import adminService from '../../services/adminService';

const UserManagement = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchTerm]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const filters = {
        page: currentPage,
        limit: 20,
      };
      if (searchTerm) filters.search = searchTerm;

      const response = await adminService.getAllUsers(filters);
      
      if (response.successstatus) {
        setUsers(response.data.users || []);
        setPagination(response.pagination);
      } else {
        setError(response.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
      console.error('Users fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (userId) => {
    navigate(`/admin/users/${userId}`);
  };

  const handleToggleAdmin = async (userId, isCurrentlyAdmin, userName) => {
    const action = isCurrentlyAdmin ? 'revoke admin privileges from' : 'grant admin privileges to';
    if (!window.confirm(`Are you sure you want to ${action} ${userName}?`)) return;

    try {
      setActionLoading(userId);
      const response = isCurrentlyAdmin
        ? await adminService.revokeAdminPrivileges(userId)
        : await adminService.grantAdminPrivileges(userId);
      
      if (response.successstatus) {
        alert(`Admin privileges ${isCurrentlyAdmin ? 'revoked' : 'granted'} successfully!`);
        fetchUsers();
      } else {
        alert(response.message || `Failed to ${action}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || `Failed to ${action}`);
    } finally {
      setActionLoading(null);
    }
  };

  const columns = [
    {
      key: 'name',
      label: 'Name',
      render: (row) => (
        <div>
          <div className="font-medium">{row.name}</div>
          {row.is_admin && (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-red-600">
              <FaUserShield className="w-3 h-3" />
              Admin
            </span>
          )}
        </div>
      ),
    },
    {
      key: 'email',
      label: 'Email',
      render: (row) => <span className="text-sm">{row.email}</span>,
    },
    {
      key: 'mobile',
      label: 'Mobile',
      render: (row) => <span className="text-sm">{row.mobile}</span>,
    },
    {
      key: 'joined_date',
      label: 'Joined',
      render: (row) => (
        <span className="text-sm">{new Date(row.joined_date).toLocaleDateString()}</span>
      ),
    },
    {
      key: 'stats',
      label: 'Licenses',
      render: (row) => (
        <div className="text-sm">
          <div className="font-semibold">{row.stats?.total_licenses || 0} total</div>
          <div className="text-xs text-green-600">{row.stats?.active_licenses || 0} active</div>
        </div>
      ),
    },
    {
      key: 'total_spent',
      label: 'Total Spent',
      render: (row) => (
        <span className="font-semibold text-green-600">
          ₹{(row.stats?.total_spent || 0).toLocaleString()}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewDetails(row.id)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
            title="View Details"
          >
            <FaEye />
          </button>
          <button
            onClick={() => handleToggleAdmin(row.id, row.is_admin, row.name)}
            disabled={actionLoading === row.id}
            className={`p-2 rounded transition-colors ${
              row.is_admin
                ? 'text-red-600 hover:bg-red-50'
                : 'text-green-600 hover:bg-green-50'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
            title={row.is_admin ? 'Revoke Admin' : 'Grant Admin'}
          >
            {row.is_admin ? <FaUserTimes /> : <FaUserShield />}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <AdminNavbar />
      
      {/* Temporary Debug Component - Remove after fixing backend */}
      <AdminDebug />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 slide-up">
          <h1 className="text-4xl font-bold text-gradient mb-2">User Management</h1>
          <p className="text-gray-600">Manage users and admin privileges</p>
        </div>

        {/* Search & Filters */}
        <div className="glass rounded-xl p-6 mb-6 fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Search Users</h3>
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setCurrentPage(1);
                }}
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Clear Search
              </button>
            )}
          </div>
          <SearchBar 
            placeholder="Search by name, email, or mobile number..." 
            onSearch={handleSearch}
          />
          
          {/* Active Search Display */}
          {searchTerm && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-600">Searching for:</span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                  "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="hover:text-primary-900 ml-1">×</button>
                </span>
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
          data={users}
          pagination={pagination}
          onPageChange={handlePageChange}
          loading={loading}
          emptyMessage="No users found"
        />
      </div>
    </div>
  );
};

export default UserManagement;
