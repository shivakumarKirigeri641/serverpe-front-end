import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button';
import { RocketLaunchIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const QuickAction = ({ title, icon: Icon, onClick, colorClass, description }) => (
    <div 
      onClick={onClick}
      className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100/50 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
    >
      <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${colorClass.replace('bg-gradient-to-r', 'text')}`}>
          <Icon className="h-24 w-24 transform rotate-12" />
      </div>
      <div className={`h-14 w-14 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg ${colorClass}`}>
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed font-medium">{description}</p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-700 to-purple-800 rounded-3xl p-8 sm:p-12 text-white shadow-2xl shadow-indigo-200 relative overflow-hidden mb-12">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold uppercase tracking-wider mb-4 backdrop-blur-sm border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            Dashboard
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold mb-6 tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-indigo-100">{user?.user_name || 'Student'}</span>!
          </h1>
          <p className="text-indigo-100 text-lg sm:text-xl max-w-2xl mb-10 leading-relaxed">
            Ready to take your project presentation to the next level? Explore our latest enterprise-grade projects or check your purchased items.
          </p>
          <Button variant="secondary" onClick={() => navigate('/dashboard/explore')} className="border-none shadow-lg py-3 px-6 text-indigo-700 font-bold text-base hover:bg-indigo-50">
            Browse Projects
          </Button>
        </div>
        
        {/* Decor */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-purple-500 opacity-20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Stats/Quick Actions */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
        <span className="text-sm text-gray-500 font-medium">Manage your account & projects</span>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <QuickAction 
          title="Explore Projects" 
          description="Browse our collection of enterprise-grade projects ready for deployment."
          icon={RocketLaunchIcon} 
          onClick={() => navigate('/dashboard/explore')}
          colorClass="bg-gradient-to-r from-blue-500 to-indigo-600"
        />
        <QuickAction 
          title="Purchase History" 
          description="Access your invoices, licenses, and download purchased project files."
          icon={ShoppingBagIcon} 
          onClick={() => navigate('/dashboard/history')}
           colorClass="bg-gradient-to-r from-emerald-500 to-teal-600"
        />
        <QuickAction 
          title="My Profile" 
          description="Update your personal details, college information, and account settings."
          icon={UserIcon} 
          onClick={() => navigate('/dashboard/profile')}
           colorClass="bg-gradient-to-r from-orange-400 to-pink-500"
        />
      </div>
    </div>
  );
};

export default DashboardHome;
