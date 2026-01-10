import React, { useState, useEffect } from 'react';
import { FaDatabase, FaServer, FaSync, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import AdminNavbar from '../../components/layout/AdminNavbar';
import adminService from '../../services/adminService';

const SystemHealth = () => {
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [lastCheck, setLastCheck] = useState(null);

  useEffect(() => {
    fetchSystemHealth();
  }, []);

  useEffect(() => {
    let interval;
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchSystemHealth();
      }, 30000); // Refresh every 30 seconds
    }
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const fetchSystemHealth = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getSystemHealth();
      
      if (response.successstatus) {
        setHealth(response.data);
        setLastCheck(new Date());
      } else {
        setError(response.message || 'Failed to fetch system health');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch system health');
      console.error('System health fetch error:', err);
      setHealth(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchSystemHealth();
  };

  const getStatusIcon = (status) => {
    if (status === 'connected' || status === 'running') {
      return <FaCheckCircle className="w-8 h-8 text-green-500" />;
    }
    return <FaTimesCircle className="w-8 h-8 text-red-500" />;
  };

  const getStatusColor = (status) => {
    if (status === 'connected' || status === 'running') {
      return 'bg-green-100 border-green-300 text-green-800';
    }
    return 'bg-red-100 border-red-300 text-red-800';
  };

  return (
    <div className="min-h-screen">
      <AdminNavbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 slide-up">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">System Health</h1>
            <p className="text-gray-600">Monitor system status and connectivity</p>
          </div>
          <div className="text-right">
            <button 
              onClick={handleRefresh} 
              disabled={loading}
              className="btn-primary text-sm flex items-center gap-2"
            >
              <FaSync className={loading ? 'animate-spin' : ''} />
              {loading ? 'Checking...' : 'Refresh'}
            </button>
            {lastCheck && (
              <p className="text-xs text-gray-500 mt-2">
                Last checked: {lastCheck.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>

        {/* Auto-refresh Toggle */}
        <div className="glass rounded-xl p-4 mb-6 fade-in">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="w-5 h-5 text-primary-600 rounded focus:ring-2 focus:ring-primary-500"
            />
            <span className="text-sm font-medium text-gray-700">
              Auto-refresh every 30 seconds
            </span>
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div className="glass rounded-xl p-6 mb-6 bg-red-50 border-red-200 fade-in">
            <p className="text-red-600 text-center font-medium">{error}</p>
          </div>
        )}

        {/* Health Status Cards */}
        {health && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Database Status */}
            <div className={`glass rounded-xl p-8 fade-in border-2 ${getStatusColor(health.database)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FaDatabase className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Database</h3>
                </div>
                {getStatusIcon(health.database)}
              </div>
              <p className="text-2xl font-bold capitalize mb-2">{health.database}</p>
              <p className="text-sm opacity-75">
                {health.database === 'connected' 
                  ? 'Database connection is healthy' 
                  : 'Database connection failed'}
              </p>
            </div>

            {/* Server Status */}
            <div className={`glass rounded-xl p-8 fade-in border-2 ${getStatusColor(health.server)}`}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FaServer className="w-6 h-6" />
                  <h3 className="text-xl font-bold">Server</h3>
                </div>
                {getStatusIcon(health.server)}
              </div>
              <p className="text-2xl font-bold capitalize mb-2">{health.server}</p>
              <p className="text-sm opacity-75">
                {health.server === 'running' 
                  ? 'Server is operational' 
                  : 'Server is down'}
              </p>
            </div>
          </div>
        )}

        {/* Overall Status */}
        {health && !error && (
          <div className="glass rounded-xl p-6 fade-in">
            <h3 className="text-lg font-bold mb-4 text-gray-800">System Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-gray-600">Timestamp</span>
                <p className="font-medium">{new Date(health.timestamp).toLocaleString()}</p>
              </div>
              <div>
                <span className="text-sm text-gray-600">Overall Status</span>
                <p className={`font-bold ${
                  health.database === 'connected' && health.server === 'running'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}>
                  {health.database === 'connected' && health.server === 'running'
                    ? '✓ All Systems Operational'
                    : '✗ System Issues Detected'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !health && (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="text-center">
              <div className="spinner w-16 h-16 mx-auto mb-4"></div>
              <p className="text-gray-600">Checking system health...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemHealth;
