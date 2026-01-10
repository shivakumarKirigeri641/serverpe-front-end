import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';
import Footer from '../components/layout/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import api from '../services/api';
import { FaCode, FaLaptopCode } from 'react-icons/fa';
import SEO from '../components/SEO/SEO';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleProjectClick = () => {
    // Redirect unauthenticated users to auth page
    navigate('/auth');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <PublicNavbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader size="lg" text="Loading projects..." />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Browse Projects"
        description="Explore our complete collection of production-ready demo projects for Computer Science and Information Science students. Various technologies and difficulty levels available."
        keywords="project list, demo projects, student projects, CS projects, IS projects, technology projects, college projects India"
        url="https://serverpe.in/projects"
      />
      <PublicNavbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-4">All Projects</h1>
          <p className="text-gray-600 text-lg">
            Browse our complete collection of premium academic projects. Login to purchase and download.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} hover className="flex flex-col">
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono bg-primary-100 text-primary-800 px-2 py-1 rounded">
                    {project.project_code}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    project.difficulty === 'Major' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {project.difficulty}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
              </div>

              <div className="mt-auto space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <FaCode className="mr-2 text-primary-600" />
                  <span>{project.technology}</span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <span className="text-2xl font-bold text-primary-600">
                      ₹{parseFloat(project.base_price).toFixed(0)}
                    </span>
                    <span className="text-xs text-gray-500 ml-1">+ GST</span>
                  </div>
                </div>

                <Button 
                  variant="primary" 
                  className="w-full"
                  onClick={handleProjectClick}
                >
                  <FaLaptopCode className="mr-2" />
                  Login to Purchase
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {projects.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No projects available at the moment.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default ProjectsPage;
