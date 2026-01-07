import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { RocketLaunchIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const QuickAction = ({ title, icon: Icon, onClick, colorClass }) => (
    <div 
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className={`h-12 w-12 rounded-lg flex items-center justify-center mb-4 text-white ${colorClass}`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-sm text-gray-500">Click to access</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="bg-indigo-600 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden mb-12">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Welcome back, {user?.user_name || 'Student'}!
          </h1>
          <p className="text-indigo-100 text-lg max-w-2xl mb-8">
            Ready to take your project presentation to the next level? Explore our latest enterprise-grade projects or check your purchased items.
          </p>
          <Button variant="secondary" onClick={() => navigate('/dashboard/explore')} className="border-none shadow-lg">
            Browse Projects
          </Button>
        </div>
        
        {/* Decor */}
        <div className="absolute top-0 right-0 -mr-10 -mt-20 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-20 w-60 h-60 bg-purple-500 opacity-20 rounded-full blur-2xl"></div>
      </div>

      {/* Stats/Quick Actions */}
      <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
      <div className="grid md:grid-cols-3 gap-6">
        <QuickAction 
          title="Explore Projects" 
          icon={RocketLaunchIcon} 
          onClick={() => navigate('/dashboard/explore')}
          colorClass="bg-gradient-to-r from-blue-500 to-indigo-600"
        />
        <QuickAction 
          title="Purchase History" 
          icon={ShoppingBagIcon} 
          onClick={() => navigate('/dashboard/history')}
           colorClass="bg-gradient-to-r from-emerald-500 to-teal-600"
        />
        <QuickAction 
          title="My Profile" 
          icon={UserIcon} 
          onClick={() => navigate('/dashboard/profile')}
           colorClass="bg-gradient-to-r from-orange-400 to-pink-500"
        />
      </div>
    </div>
  );
};

export default DashboardHome;
