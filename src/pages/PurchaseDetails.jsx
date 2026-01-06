import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';
import { AlertCircle, CheckCircle } from 'lucide-react';

const PurchaseDetails = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  // const { projectId } = useParams();
  const [project] = useState(location.state?.project || null);
  const [disclaimers, setDisclaimers] = useState([]);
  const [agreed, setAgreed] = useState(false);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!project) {
        // Fetch specific project if not in state (optional impl) or redirect
    }

    const fetchDisclaimers = async () => {
        try {
            const res = await api.get('/serverpeuser/mystudents/disclaimer-before-buy-list', {withCredentials:true});
            setDisclaimers(res.data.data || []);
        } catch (error) {
            console.error(error);
            setDisclaimers([
                { title_id: 1, title: 'No Refund Policy', description: 'Digital assets are non-refundable once downloaded.', is_mandatory: true },
                { title_id: 2, title: 'Personal Use License', description: 'You cannot resell this code.', is_mandatory: true }
            ]);
        } finally {
            // setLoading(false);
        }
    };
    fetchDisclaimers();
  }, [navigate, project]);

  if (!user || !project) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
        <div className="p-8 border-b border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Confirm Purchase Details</h1>
            <p className="text-gray-500">Review your information and accept the terms to proceed.</p>
        </div>
        
        <div className="p-8 grid md:grid-cols-2 gap-8">
            <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">User Details</h3>
                <div className="space-y-3">
                    <p className="flex justify-between border-b pb-2"><span className="text-gray-600">Name:</span> <span className="font-semibold">{user.name}</span></p>
                    <p className="flex justify-between border-b pb-2"><span className="text-gray-600">Email:</span> <span className="font-semibold">{user.email}</span></p>
                    <p className="flex justify-between border-b pb-2"><span className="text-gray-600">Mobile:</span> <span className="font-semibold">{user.mobile}</span></p>
                    <p className="flex justify-between border-b pb-2"><span className="text-gray-600">College:</span> <span className="font-semibold">{user.college || 'N/A'}</span></p>
                    <p className="flex justify-between border-b pb-2"><span className="text-gray-600">State:</span> <span className="font-semibold">{user.state || 'N/A'}</span></p>
                </div>
            </div>
             <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Project Details</h3>
                 <div className="bg-gray-50 p-6 rounded-xl">
                    <h4 className="font-bold text-xl mb-2">{project.title}</h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Price</span>
                        <span className="text-2xl font-bold text-indigo-600">₹{project.price}</span>
                    </div>
                 </div>
            </div>
        </div>

        <div className="p-8 bg-gray-50 border-t border-gray-100">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><AlertCircle size={20} className="text-orange-500" /> Important Disclaimers</h3>
            <div className="space-y-4 mb-6">
                {disclaimers?.map((d) => (
                    <div key={d.title_id} className="flex gap-3">
                        <div className="mt-1 min-w-[20px] max-w-[20px]">
                           <span className="w-2 h-2 rounded-full bg-gray-400 block"></span>
                        </div>
                        <div>
                            <h5 className="font-bold text-gray-800">{d.title}</h5>
                            <p className="text-sm text-gray-600">{d.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <label className="flex items-center gap-3 cursor-pointer select-none">
                <input 
                    type="checkbox" 
                    checked={agreed} 
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300 transition-all" 
                />
                <span className="font-medium text-gray-700">I agree to the terms & conditions mentioned above and proceed to purchase.</span>
            </label>
        </div>
        
        <div className="p-8 border-t border-gray-100 flex justify-end">
             <button 
                disabled={!agreed}
                onClick={() => navigate('/dashboard/summary', { state: { project } })}
                className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${agreed ? 'bg-indigo-600 text-white shadow-lg hover:shadow-xl' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
             >
                Proceed to Summary <CheckCircle size={20} />
             </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseDetails;
