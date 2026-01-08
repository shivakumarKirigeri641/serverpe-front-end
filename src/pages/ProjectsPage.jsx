import React from 'react';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';
import Footer from '../components/layout/Footer';
import ExploreProjects from './dashboard/ExploreProjects';

// Reuse the ExploreProjects component but with PublicNavbar
const ProjectsPage = () => {
  return (
    <div className="min-h-screen">
      <PublicNavbar />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gradient mb-8">All Projects</h1>
        <p className="text-gray-600 mb-8">
          Browse our complete collection of premium academic projects. Subscribe to purchase and download.
        </p>
        {/* The content will be similar to ExploreProjects but redirect to /auth instead of purchase directly */}
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
