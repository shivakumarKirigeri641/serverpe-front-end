import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../../api/apiService';
import Button from '../../components/common/Button';
import { CodeBracketIcon, AcademicCapIcon, ServerIcon } from '@heroicons/react/24/outline';

const LandingPage = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes] = await Promise.all([
        apiService.fetchProjects(),
        apiService.fetchStates()
      ]);
      if (projectsRes.data.successstatus) {
        setProjects(projectsRes.data.data);
      }
      // States are loaded but maybe not displayed directly on landing unless requested, 
      // typically used in dropdowns. Just ensuring they call as per req.
    } catch (error) {
      console.error("Error fetching landing data", error);
    } finally {
      setLoading(false);
    }
  };

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4 text-indigo-600">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );

  return (
    <div className="flex flex-col gap-24 pb-24 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:pt-40 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/50">
            <span className="text-sm font-semibold text-indigo-600 tracking-wide uppercase">Premier Project Marketplace</span>
          </div>
          <h1 className="text-5xl tracking-tight font-extrabold text-slate-900 sm:text-6xl md:text-7xl mb-8 leading-tight">
            <span className="block">Transform Your Career with</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 pb-2">Realistic Project Demos</span>
          </h1>
          <p className="mt-4 max-w-md mx-auto text-lg text-slate-600 sm:text-xl md:mt-6 md:text-2xl md:max-w-3xl leading-relaxed">
            Experience realistic, dynamic, and enterprise-grade projects designed to mirror real-world scenarios. 
            Perfect for your final year demos and presentations.
          </p>
          <div className="mt-12 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-6">
            <Button variant="gradient" onClick={() => navigate('/auth')} className="w-full sm:w-auto text-lg py-4 px-10 rounded-xl shadow-indigo-500/25">
              Get Started
            </Button>
            <Button variant="secondary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto text-lg py-4 px-10 rounded-xl bg-white/80 backdrop-blur-sm">
              View Projects
            </Button>
          </div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none opacity-40">
             <div className="absolute top-20 left-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
             <div className="absolute top-40 right-10 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
             <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard 
            icon={ServerIcon}
            title="Real-World Scenarios"
            description="All projects are developed according to realtime enterprise scenarios, giving you the edge in understanding professional workflows."
          />
          <FeatureCard 
            icon={CodeBracketIcon}
            title="Complete Package"
            description="Includes full source code (Front & Back), comprehensive documentation, setup guides, and database scripts."
          />
          <FeatureCard 
            icon={AcademicCapIcon}
            title="Viva Preparation"
            description="Get exclusive reference materials and vivo questions derived from extensive industry experience to ace your presentation."
          />
        </div>
      </section>

      {/* Projects List */}
      <section id="projects" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
            <p className="text-lg text-slate-500">Explore our premium collection of ready-to-deploy projects, hand-crafted for excellence.</p>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-20 flex flex-col items-center">
             <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
             <p className="text-slate-500 font-medium">Loading high-quality projects...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div key={project.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-slate-100 overflow-hidden">
                <div className="p-8 flex-1">
                  <div className="flex justify-between items-start mb-6">
                     <span className={`px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider ${project.difficulty === 'Major' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-green-50 text-green-700 border border-green-100'}`}>
                        {project.difficulty}
                     </span>
                     <span className="text-xs text-slate-400 font-mono tracking-wide">{project.project_code}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{project.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
                  
                  <div className="space-y-3 pt-6 border-t border-slate-50">
                    <div className="text-xs text-slate-500">
                      <span className="font-bold text-slate-700 uppercase tracking-wide mr-2">Tech Stack:</span> 
                      <span className="bg-slate-100 px-2 py-1 rounded text-slate-600">{project.technology}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between group-hover:bg-indigo-50/30 transition-colors">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Base Price</span>
                    <div className="text-2xl font-bold text-slate-900">₹{project.base_price}</div>
                  </div>
                  <Button onClick={() => navigate('/auth')} variant="primary" className="shadow-lg shadow-indigo-200">
                    Subscribe to Buy
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-20 border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center max-w-4xl mx-auto">
              <h2 className="text-base text-indigo-600 font-bold tracking-wide uppercase mb-2">About Us</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-6">
                 Empowering Student Developers
              </p>
              <p className="text-xl text-slate-500 leading-relaxed">
                ServerPe differs from typical project providers by focusing on <b className="text-slate-900">code quality</b>, <b className="text-slate-900">enterprise patterns</b>, and <b className="text-slate-900">genuine learning outcomes</b>. We don't just sell code; we provide a career launchpad.
              </p>
            </div>
         </div>
      </section>
      
      {/* Contact Section Placeholder */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-indigo-900 to-slate-900 rounded-3xl py-16 mx-4 text-white shadow-2xl overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
            <p className="text-indigo-200 mb-8 text-lg max-w-2xl mx-auto">Reach out to our dedicated support team for any queries regarding projects, payments, or the delivery process.</p>
            <Button variant="secondary" className="border-none bg-white text-indigo-900 hover:bg-indigo-50" onClick={() => window.location.href='mailto:support@serverpe.in'}>Contact Support</Button>
          </div>
          {/* Decorative circles */}
          <div className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 rounded-full bg-indigo-500 opacity-10 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 -mr-20 -mb-20 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
      </section>

    </div>
  );
};

export default LandingPage;
