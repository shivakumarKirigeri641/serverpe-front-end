import React, { useContext } from 'react';
import api from "../utils/api";
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [myProjects, setMyProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
     const fetchMyProjects = async () => {
         try {
             // Fetching purchased projects
             const response = await api.get('/serverpeuser/loggedinuser/purchase-history', {withCredentials: true });
             console.log('purchase history:', response.data.data);
             
             // Check if response data is an array and filter out entries with no project title (assuming left join nulls)
             const historyParams = response?.data?.data;
             const validProjects = Array.isArray(historyParams) 
                ? historyParams.filter(p => p.project_title) 
                : (historyParams?.project_title ? [historyParams] : []);
                
             setMyProjects(validProjects);             
         } catch (error) {
             console.error("Failed to fetch projects", error);
         } finally {
             setLoading(false);
         }
     };

     fetchMyProjects();
  }, []);

  if (loading) {
      return (
          <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
      );
  }

  // If user has purchased projects, show them here
  if (myProjects.length > 0) {
      return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">My Projects</h1>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {myProjects.map((project, index) => (
                      <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col justify-between">
                          <div>
                              <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold text-gray-900">{project.project_title}</h3>
                                {project.technology && (
                                    <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">
                                        {project.technology}
                                    </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-500 mb-4">Order ID: {project.order_number || project.order_id}</p>
                              {project.order_date && (
                                  <p className="text-xs text-gray-400 mb-4">Purchased on: {new Date(project.order_date).toLocaleDateString()}</p>
                              )}
                          </div>
                          <button 
                            onClick={() => navigate(`/dashboard/purchase/${project.project_code || project.project_title}`, { state: { project } })}
                            className="text-indigo-600 font-semibold hover:text-indigo-700 hover:underline mt-2 self-start"
                          >
                            View Details
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      );
  }

  // Fallback: Show Welcome/Empty State if no projects
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden"
      >
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome back, {user?.user_name || 'Developer'}!</h1>
          <p className="text-indigo-100 text-xl max-w-2xl mb-8">
            Ready to take your skills to the next level? Explore our latest real-world project scenarios and start building today.
          </p>
          <button onClick={() => navigate('/dashboard/explore')} className="bg-white text-indigo-600 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all flex items-center gap-2">
            Explore Projects <ArrowRight size={20} />
          </button>
        </div>
        
        {/* Decor */}
        <Sparkles className="absolute top-10 right-10 text-white/20 w-32 h-32" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
      </motion.div>

      <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Progress</h3>
              <p className="text-gray-600">You haven't purchased any projects yet. Start your journey by exploring our catalog.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Recommended for You</h3>
              <p className="text-gray-600">Check out our trending enterprise solutions.</p>
          </div>
      </div>
    </div>
  );
};

export default DashboardHome;
