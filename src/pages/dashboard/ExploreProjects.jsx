import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardNavbar from '../../components/layout/DashboardNavbar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import api from '../../services/api';

const ExploreProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/serverpeuser/mystudents/project-list', {withCredentials:true});
      if (response.data.successstatus) {
        setProjects(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.difficulty.toLowerCase() === filter.toLowerCase());

  const difficultyColors = {
    'Major': 'bg-red-100 text-red-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Minor': 'bg-green-100 text-green-800',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Explore Projects</h1>
          <p className="text-gray-600">
            Browse our extensive collection of premium academic projects
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setFilter('major')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'major'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Major
          </button>
          <button
            onClick={() => setFilter('medium')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'medium'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Medium
          </button>
          <button
            onClick={() => setFilter('minor')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filter === 'minor'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Minor
          </button>
        </div>

        {loading ? (
          <Loader size="lg" text="Loading projects..." />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                const totalPrice = parseFloat(project.base_price) * (1 + parseFloat(project.gst_percent) / 100);
                
                return (
                  <Card key={project.id} hover>
                    <div className="mb-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                        difficultyColors[project.difficulty] || 'bg-gray-100 text-gray-800'
                      }`}>
                        {project.difficulty}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-2 text-gray-800">{project.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Technology Stack:</p>
                      <p className="font-semibold text-gray-700">{project.technology}</p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Project Code:</p>
                      <p className="font-mono text-sm text-primary-600">{project.project_code}</p>
                    </div>
                    
                    <div className="border-t pt-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Base Price:</span>
                        <span className="font-semibold">₹{parseFloat(project.base_price).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">GST ({project.gst_percent}%):</span>
                        <span className="font-semibold">
                          ₹{(parseFloat(project.base_price) * parseFloat(project.gst_percent) / 100).toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-lg font-bold text-primary-600">
                        <span>Total Price:</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      variant="primary" 
                      className="w-full"
                      onClick={() => navigate(`/dashboard/purchase-details/${project.id}`, { state: { project } })}
                    >
                      Buy Now
                    </Button>
                  </Card>
                );
              })}
            </div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">No projects found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default ExploreProjects;
