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
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4 sm:pt-32 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-6">
            <span className="block">Transform Your Career with</span>
            <span className="block text-indigo-600">Realistic Project Demos</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Experience realistic, dynamic, and enterprise-grade projects designed to mirror real-world scenarios. 
            Perfect for your final year demos and presentations.
          </p>
          <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center gap-4">
            <Button onClick={() => navigate('/auth')} className="w-full sm:w-auto text-lg py-3 px-8">
              Get Started
            </Button>
            <Button variant="secondary" onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="w-full sm:w-auto text-lg py-3 px-8">
              View Projects
            </Button>
          </div>
        </div>
        
        {/* Background blobs */}
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0 pointer-events-none">
             <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
             <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>
      </section>

      {/* Value Props */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
           <h2 className="text-3xl font-extrabold text-gray-900">Why Choose ServerPe?</h2>
        </div>
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
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">Featured Projects</h2>
            <p className="text-gray-500 mt-2">Explore our premium collection of ready-to-deploy projects.</p>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-20">Loading projects...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden flex flex-col border border-gray-100">
                <div className="p-6 flex-1">
                  <div className="flex justify-between items-start mb-4">
                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${project.difficulty === 'Major' ? 'bg-indigo-100 text-indigo-800' : 'bg-green-100 text-green-800'}`}>
                        {project.difficulty} Project
                     </span>
                     <span className="text-sm text-gray-500 font-mono">{project.project_code}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="text-xs text-gray-500">
                      <span className="font-semibold text-gray-700">Tech Stack:</span> {project.technology}
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-wide">Base Price</span>
                    <div className="text-2xl font-bold text-gray-900">₹{project.base_price}</div>
                  </div>
                  <Button onClick={() => navigate('/auth')} variant="primary" className="text-sm">
                    Subscribe to Buy
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* About Section */}
      <section id="about" className="bg-white py-16">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-10">
              <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">About Us</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                 Empowering Student Developers
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                ServerPe differs from typical project providers by focusing on code quality, enterprise patterns, and genuine learning outcomes. We don't just sell code; we provide a career launchpad.
              </p>
            </div>
         </div>
      </section>
      
      {/* Contact Section Placeholder */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Have Questions?</h2>
          <p className="text-gray-600 mb-6">Reach out to us for any queries regarding projects or process.</p>
          <Button variant="outline" onClick={() => window.location.href='mailto:support@serverpe.in'}>Contact Support</Button>
      </section>

    </div>
  );
};

export default LandingPage;
