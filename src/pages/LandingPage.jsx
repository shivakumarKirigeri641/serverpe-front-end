import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Layers, Terminal, ShieldCheck } from 'lucide-react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statesRes, projectsRes] = await Promise.all([
          api.get('/serverpeuser/mystudents/states'),
          api.get('/serverpeuser/mystudents/project-list')
        ]);
        localStorage.setItem('serverpe_states', JSON.stringify(statesRes?.data?.data));
        setProjects(projectsRes?.data?.data || []);
      } catch (error) {
        console.error('Error loading data', error);
        // Mock data for display if API fails (Dev only, remove in prod)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-6">
              Experience the <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Real-World</span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
              Boost your career path with realistic-dynamic projects developed according to real-time scenarios.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <button onClick={() => navigate('/auth')} className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all">
                Get Started
              </button>
              <button 
                onClick={() => navigate('/explore')}
                className="bg-white text-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-indigo-100"
              >
                Explore Projects
              </button>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40">
           <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
           <div className="absolute top-40 -left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
           <div className="absolute -bottom-8 left-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Info */}
      <section className="py-20 bg-white/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 text-center">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100"
            >
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Terminal size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Realtime Scenarios</h3>
              <p className="text-gray-600">All projects are crafted to mirror actual industry requirements and challenges.</p>
            </motion.div>
             <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100"
            >
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Layers size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Complete Package</h3>
              <p className="text-gray-600">Includes documentation, source codes (Front & Back), viva references, and more.</p>
            </motion.div>
             <motion.div 
              whileHover={{ scale: 1.05 }}
              className="p-8 rounded-2xl bg-white shadow-lg border border-gray-100"
            >
              <div className="w-16 h-16 bg-pink-100 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold mb-3">Professional Standards</h3>
               <p className="text-gray-600">Release notes, invoices, and disclaimer handling for a professional experience.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Projects List */}
      <section id="projects" className="py-24 max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16 relative">
          Featured Projects
          <span className="block w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></span>
        </h2>
        
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading projects...</div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects?.map((project, idx) => (
              <motion.div 
                key={project.id || idx}
                variants={itemVariants}
                className="group bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all border border-gray-100 flex flex-col"
              >
                <div className="h-48 bg-gray-200 overflow-hidden relative">
                   {/* Placeholder for project image */}
                   <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent flex items-end p-6">
                      <h3 className="text-2xl font-bold text-white">{project.title || 'Project Title'}</h3>
                   </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-4">
                     {/* Tech stack pills placeholder */}
                     <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">{project?.technology}</span>
                     <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-semibold">Node.js</span>
                  </div>
                  <p className="text-gray-600 mb-6 flex-1 line-clamp-3">
                    {project.description || 'A comprehensive project solution designed for enterprise needs.'}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                     <span className="text-2xl font-bold text-gray-900">₹{project.base_price}*</span>
                     <button 
                       onClick={() => navigate('/auth')}
                       className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-indigo-700 transition-colors"
                     >
                       Buy Now <ArrowRight size={16} />
                     </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
};

export default LandingPage;
