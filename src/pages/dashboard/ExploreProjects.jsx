import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../api/apiService';
import Button from '../../components/common/Button';

const ExploreProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await apiService.fetchProjects();
        if (res.data.successstatus) {
          setProjects(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load projects", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explore Projects</h1>
        <p className="text-gray-500 mt-2">Choose the perfect project for your demo.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
             <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                   <span className={`px-2 py-1 text-xs font-semibold rounded-full ${project.difficulty === 'Major' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'}`}>
                      {project.difficulty}
                   </span>
                   <span className="text-xs text-gray-400 font-mono">#{project.project_code}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                 <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
                      <span className="font-semibold text-gray-700">Tech:</span> {project.technology}
                </div>
             </div>
             <div className="p-6 pt-0 mt-auto flex items-center justify-between">
                <div>
                   <p className="text-xs text-gray-400">Price</p>
                   <p className="text-2xl font-bold text-gray-900">₹{project.base_price}</p>
                </div>
                <Button onClick={() => navigate(`/dashboard/explore/${project.id}`)}>
                  Buy Now
                </Button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreProjects;
