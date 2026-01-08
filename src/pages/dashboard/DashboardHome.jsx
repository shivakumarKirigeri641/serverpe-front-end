import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import DashboardNavbar from '../../components/layout/DashboardNavbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';
import { FaRocket, FaProjectDiagram, FaTrophy, FaChartLine } from 'react-icons/fa';

const DashboardHome = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const quickStats = [
    {
      icon: FaProjectDiagram,
      title: 'Available Projects',
      value: '2',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      icon: FaTrophy,
      title: 'Premium Quality',
      value: '100%',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      icon: FaChartLine,
      title: 'Success Rate',
      value: '99%',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="glass p-8 rounded-2xl mb-12 hero-pattern">
          <div className="text-center">
            <FaRocket className="text-6xl text-primary-600 mx-auto mb-4 animate-bounce" />
            <h1 className="text-5xl font-bold text-gradient mb-4">
              Welcome Back, {user?.user_name}!
            </h1>
            <p className="text-xl text-gray-700 mb-6">
              Ready to explore world-class academic projects?
            </p>
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard/explore-projects')}
              className="shadow-glow"
            >
              Explore Projects Now
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className="glass p-6 rounded-xl hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center space-x-4">
                  <div className={`${stat.bg} p-4 rounded-lg`}>
                    <Icon className={`text-3xl ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Motivational Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Why Choose Our Projects?
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Real-world project scenarios for authentic learning</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Complete source code with detailed documentation</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Viva preparation materials from industry experts</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">✓</span>
                <span>Instant delivery with secure payment processing</span>
              </li>
            </ul>
          </div>

          <div className="glass p-8 rounded-xl">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Your Success Journey
            </h3>
            <p className="text-gray-700 mb-4">
              Every great career starts with solid foundations. Our projects are designed 
              to give you hands-on experience with industry-standard technologies and practices.
            </p>
            <p className="text-gray-700 mb-6">
              Browse our collection, select the perfect project for your needs, and take 
              the next step in your academic and professional journey.
            </p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/dashboard/profile')}
            >
              View My Profile
            </Button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center glass p-12 rounded-2xl hero-pattern">
          <h2 className="text-3xl font-bold text-gradient mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
            Explore our extensive collection of professional-grade academic projects. 
            Each project comes with everything you need for a successful demonstration.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/dashboard/explore-projects')}
            >
              Browse All Projects
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/dashboard/purchase-history')}
            >
              View Purchase History
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default DashboardHome;
