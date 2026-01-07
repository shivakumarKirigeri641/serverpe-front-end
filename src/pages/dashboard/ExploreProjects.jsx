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
      <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-xs font-semibold uppercase tracking-wider mb-2 text-indigo-700 border border-indigo-100">
             Directory
           </div>
          <h1 className="text-3xl font-bold text-gray-900">Explore Projects</h1>
          <p className="text-gray-500 mt-2 text-lg">Choose the perfect project for your final year demonstration.</p>
        </div>
        {/* Search/Filter Bar could go here */}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="group bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
             <div className="p-6 flex-1 relative">
                <div className="flex justify-between items-start mb-4">
                   <span className={`px-2.5 py-1 text-xs font-bold rounded-lg uppercase tracking-wide ${project.difficulty === 'Major' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                      {project.difficulty}
                   </span>
                   <span className="text-xs text-slate-400 font-mono tracking-wider">#{project.project_code}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                <p className="text-slate-600 text-sm mb-5 leading-relaxed line-clamp-3">{project.description}</p>
                 <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="font-bold text-slate-700 uppercase tracking-wide block mb-1">Tech Stack</span> 
                      {project.technology}
                </div>
             </div>
             <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-indigo-50/20 transition-colors">
                <div>
                   <p className="text-[0.65rem] uppercase tracking-wider font-bold text-slate-400 mb-0.5">Base Price</p>
                   <p className="text-2xl font-bold text-slate-900">₹{project.base_price}</p>
                </div>
                <Button onClick={() => navigate(`/dashboard/explore/${project.id}`)} variant="primary" className="shadow-lg shadow-indigo-200">
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
