import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { ShoppingBag } from 'lucide-react';

const ExploreProjects = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
    // Re-fetch or get from cache. Let's fetch to be fresh.
    const result =await api.get('/serverpeuser/mystudents/project-list', {withCredentials:true});
    setProjects(result?.data?.data)
    }    
    fetchProjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Explore Projects</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects?.map((project, idx) => (
          <motion.div 
            key={project.id || idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all"
          >
             <div className="h-40 bg-gray-200 relative">
                 <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-90"></div>
                 <div className="absolute bottom-4 left-4 text-white">
                     <h3 className="text-xl font-bold">{project.title}</h3>
                 </div>
             </div>
             <div className="p-6">
                 <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                 <div className="flex items-center justify-between mt-4">
                     <span className="text-2xl font-bold text-indigo-600">₹{project.base_price}*</span>
                     <button 
                        onClick={() => navigate(`/dashboard/purchase/${project.id}`, { state: { project } })} 
                        className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-black transition-colors flex items-center gap-2"
                     >
                        Buy Now <ShoppingBag size={18} />
                     </button>
                 </div>
             </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ExploreProjects;
