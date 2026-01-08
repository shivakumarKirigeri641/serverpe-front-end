import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaCheckCircle, FaCode, FaFileAlt, FaShieldAlt, FaStar, FaQuoteLeft } from 'react-icons/fa';
import PublicNavbar from '../components/layout/PublicNavbar';
import Footer from '../components/layout/Footer';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import api from '../services/api';
import Loader from '../components/common/Loader';

const LandingPage = () => {
  const [projects, setProjects] = useState([]);
  const [states, setStates] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, statesRes, testimonialsRes] = await Promise.all([
        api.get('/serverpeuser/mystudents/project-list'),
        api.get('/serverpeuser/mystudents/states'),
        api.get('/serverpeuser/mystudents/what-students-say'),
      ]);

      if (projectsRes.data.successstatus) {
        setProjects(projectsRes.data.data);
      }
      if (statesRes.data.success) {
        setStates(statesRes.data.data);
        // Store states in sessionStorage for later use
        sessionStorage.setItem('states', JSON.stringify(statesRes.data.data));
      }
      if (testimonialsRes.data.successstatus) {
        setTestimonials(testimonialsRes.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: FaRocket,
      title: 'Real-World Experience',
      description: 'Experience realistic, dynamic projects similar to real-world scenarios that help boost your career path.',
    },
    {
      icon: FaCode,
      title: 'Production-Ready Code',
      description: 'All projects are developed according to real-time scenarios with clean, professional code.',
    },
    {
      icon: FaFileAlt,
      title: 'Complete Documentation',
      description: 'Get comprehensive documentation, source codes (front & back), viva references, and release notes.',
    },
    {
      icon: FaShieldAlt,
      title: 'Professional Support',
      description: 'Includes disclaimer, invoices, and professional support for your demo/presentation.',
    },
  ];

  return (
    <div className="min-h-screen">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="hero-pattern py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient mb-6 animate-fade-in">
            India's Last Minute Demo Projects
          </h1>
          <p className="text-2xl font-semibold text-primary-700 mb-4 animate-slide-up">
            For CS & IS Students
          </p>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto animate-slide-up">
            As an individual helping CS & IS students, I understand your concerns about last-minute projects, demos, and viva.
            Get production-ready projects with complete documentation to ace your presentations!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              onClick={() => navigate('/auth')}
              className="animate-scale-in"
            >
              Get Started - Subscribe Now
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/projects')}
              className="animate-scale-in"
            >
              Explore Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gradient mb-12">
            Why Choose ServerPe?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} hover className="text-center">
                  <Icon className="text-5xl text-primary-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-16 px-4 hero-pattern">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gradient mb-12">
            What Each Project Includes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Complete Documentation',
              'Source Code (Frontend & Backend)',
              'Viva References (Based on Experience)',
              'Professional Disclaimer',
              'Detailed Release Notes',
              'Invoice & Receipt',
              'Technical Specifications',
              'Setup Instructions',
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3 glass p-4 rounded-lg">
                <FaCheckCircle className="text-green-500 text-2xl flex-shrink-0" />
                <span className="text-lg font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gradient mb-12">
            Featured Projects
          </h2>
          {loading ? (
            <Loader size="lg" text="Loading projects..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.slice(0, 6).map((project) => (
                <Card key={project.id} hover>
                  <div className="mb-4">
                    <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {project.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="mb-4">
                    <p className="text-sm text-gray-500">Technology:</p>
                    <p className="font-semibold text-gray-700">{project.technology}</p>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      ₹{parseFloat(project.base_price).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      +{project.gst_percent}% GST
                    </span>
                  </div>
                  <Button 
                    variant="primary" 
                    className="w-full"
                    onClick={() => navigate('/auth')}
                  >
                    Subscribe to Buy
                  </Button>
                </Card>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/projects')}
            >
              View All Projects
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 hero-pattern">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center text-gradient mb-4">
            What Students Say
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Hear from students who successfully completed their demos and vivas with our projects
          </p>
          {loading ? (
            <Loader size="lg" text="Loading testimonials..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.slice(0, 6).map((testimonial, index) => (
                <Card key={index} hover className="relative">
                  <FaQuoteLeft className="text-4xl text-primary-200 absolute top-4 left-4 opacity-50" />
                  <div className="pt-8">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${
                            i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                          } text-lg`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">"{testimonial.message}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">{testimonial.user_name}</p>
                      <p className="text-sm text-primary-600">{testimonial.category_name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(testimonial.created_at).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
