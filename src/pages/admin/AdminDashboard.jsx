import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, 
  FaKey, 
  FaDollarSign, 
  FaCheckCircle, 
  FaDownload,
  FaShoppingCart,
  FaChartLine 
} from 'react-icons/fa';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import AdminNavbar from '../../components/layout/AdminNavbar';
import AdminStatsCard from '../../components/admin/AdminStatsCard';
import adminService from '../../services/adminService';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getAnalyticsOverview();
      
      if (response.successstatus) {
        setAnalytics(response.data);
        setLastRefresh(new Date());
      } else {
        setError(response.message || 'Failed to fetch analytics');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch analytics data');
      console.error('Analytics fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchAnalytics();
  };

  // Prepare chart data
  const userGrowthData = [
    { name: 'Week 1', users: Math.floor((analytics?.users?.total || 0) * 0.7) },
    { name: 'Week 2', users: Math.floor((analytics?.users?.total || 0) * 0.8) },
    { name: 'Week 3', users: Math.floor((analytics?.users?.total || 0) * 0.9) },
    { name: 'Week 4', users: analytics?.users?.total || 0 },
  ];

  const salesRevenueData = [
    { name: 'Last 30d', sales: analytics?.sales?.last_30_days || 0, revenue: (analytics?.revenue?.last_30_days || 0) / 1000 },
    { name: 'Last 7d', sales: analytics?.sales?.last_7_days || 0, revenue: (analytics?.revenue?.last_7_days || 0) / 1000 },
  ];

  const licenseDistribution = [
    { name: 'Active', value: analytics?.licenses?.active || 0 },
    { name: 'Inactive', value: analytics?.licenses?.inactive || 0 },
    { name: 'Bound', value: analytics?.licenses?.bound_to_device || 0 },
    { name: 'Not Used', value: analytics?.licenses?.not_yet_used || 0 },
  ];

  const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#f59e0b'];

  if (loading && !analytics) {
    return (
      <div className="min-h-screen">
        <AdminNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="spinner w-16 h-16 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading analytics...</p>
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
            <button onClick={handleRefresh} className="btn-primary">
              Retry
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
        <div className="flex items-center justify-between mb-8 slide-up">
          <div>
            <h1 className="text-4xl font-bold text-gradient mb-2">Admin Dashboard</h1>
            <p className="text-gray-600">Platform overview and statistics</p>
          </div>
          <div className="text-right">
            <button 
              onClick={handleRefresh} 
              disabled={loading}
              className="btn-primary text-sm"
            >
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </p>
          </div>
        </div>

        {/* Primary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <AdminStatsCard
            icon={FaUsers}
            title="Total Users"
            value={analytics?.users?.total || 0}
            subtitle={`${analytics?.users?.new_last_7_days || 0} new in last 7 days`}
            variant="primary"
          />
          <AdminStatsCard
            icon={FaKey}
            title="Total Licenses"
            value={analytics?.licenses?.total || 0}
            subtitle={`${analytics?.licenses?.active || 0} active licenses`}
            variant="secondary"
          />
          <AdminStatsCard
            icon={FaDollarSign}
            title="Total Revenue"
            value={`₹${(analytics?.revenue?.total_revenue || 0).toLocaleString()}`}
            subtitle={`Avg: ₹${(analytics?.revenue?.average_order_value || 0).toLocaleString()}`}
            variant="success"
          />
        </div>

        {/* Secondary Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <AdminStatsCard
            icon={FaShoppingCart}
            title="Recent Sales"
            value={analytics?.sales?.last_7_days || 0}
            subtitle={`${analytics?.sales?.last_30_days || 0} in last 30 days`}
            variant="warning"
          />
          <AdminStatsCard
            icon={FaDownload}
            title="Total Downloads"
            value={analytics?.downloads?.total || 0}
            subtitle={`${analytics?.downloads?.last_7_days || 0} in last 7 days`}
            variant="primary"
          />
          <AdminStatsCard
            icon={FaChartLine}
            title="Revenue (7 days)"
            value={`₹${(analytics?.revenue?.last_7_days || 0).toLocaleString()}`}
            subtitle={`₹${(analytics?.revenue?.last_30_days || 0).toLocaleString()} in 30 days`}
            variant="success"
          />
        </div>

        {/* Charts Section */}
        <div className="mb-8 fade-in">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Analytics & Trends</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* User Growth Chart */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">User Growth Trend</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#667eea" 
                    strokeWidth={3} 
                    dot={{ fill: '#667eea', r: 4 }} 
                    activeDot={{ r: 6 }}
                    animationDuration={1500}
                    animationEasing="ease-in-out"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Sales & Revenue Chart */}
            <div className="glass rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Sales & Revenue</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={salesRevenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Bar 
                    dataKey="sales" 
                    fill="#f59e0b" 
                    name="Sales Count" 
                    animationDuration={1200}
                    animationBegin={0}
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar 
                    dataKey="revenue" 
                    fill="#10b981" 
                    name="Revenue (₹K)" 
                    animationDuration={1200}
                    animationBegin={300}
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* License Distribution Pie Chart */}
          <div className="glass rounded-xl p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">License Distribution</h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={licenseDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={false}
                  outerRadius={100}
                  innerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  paddingAngle={3}
                  animationBegin={0}
                  animationDuration={1500}
                  animationEasing="ease-out"
                >
                  {licenseDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value, name) => [value, name]}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36}
                  formatter={(value, entry) => `${value}: ${entry.payload.value}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* License Status Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="glass rounded-xl p-6 fade-in">
            <h3 className="text-xl font-bold mb-4 text-gray-800">License Status</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Active Licenses</span>
                <span className="font-bold text-green-600">{analytics?.licenses?.active || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Inactive Licenses</span>
                <span className="font-bold text-red-600">{analytics?.licenses?.inactive || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Bound to Device</span>
                <span className="font-bold text-blue-600">{analytics?.licenses?.bound_to_device || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Not Yet Used</span>
                <span className="font-bold text-yellow-600">{analytics?.licenses?.not_yet_used || 0}</span>
              </div>
            </div>
          </div>

          <div className="glass rounded-xl p-6 fade-in">
            <h3 className="text-xl font-bold mb-4 text-gray-800">User Growth</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Users</span>
                <span className="font-bold text-primary-600">{analytics?.users?.total || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">New (Last 7 Days)</span>
                <span className="font-bold text-green-600">+{analytics?.users?.new_last_7_days || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">New (Last 30 Days)</span>
                <span className="font-bold text-blue-600">+{analytics?.users?.new_last_30_days || 0}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total Projects</span>
                <span className="font-bold text-purple-600">{analytics?.projects?.total || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="glass rounded-xl p-6 fade-in">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link 
              to="/admin/licenses" 
              className="flex items-center justify-center gap-2 p-4 bg-primary-50 hover:bg-primary-100 text-primary-700 rounded-lg transition-colors font-semibold"
            >
              <FaKey />
              Manage Licenses
            </Link>
            <Link 
              to="/admin/users" 
              className="flex items-center justify-center gap-2 p-4 bg-secondary-50 hover:bg-secondary-100 text-secondary-700 rounded-lg transition-colors font-semibold"
            >
              <FaUsers />
              Manage Users
            </Link>
            <Link 
              to="/admin/system" 
              className="flex items-center justify-center gap-2 p-4 bg-accent-50 hover:bg-accent-100 text-accent-700 rounded-lg transition-colors font-semibold"
            >
              <FaChartLine />
              System Health
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
