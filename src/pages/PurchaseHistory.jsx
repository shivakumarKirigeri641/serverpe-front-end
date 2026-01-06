import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
import { Download, ExternalLink } from 'lucide-react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const PurchaseHistory = () => {
    // const { user } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await api.get('/serverpeuser/loggedinuser/purchase-history', {withCredentials: true });                
                
                const historyParams = response?.data?.data;
                const validHistory = Array.isArray(historyParams) 
                   ? historyParams.filter(p => p.project_title) 
                   : (historyParams?.project_title ? [historyParams] : []);
                   
                setHistory(historyParams);
            } catch (error) {
                console.error("Failed to fetch history", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Purchase History</h1>
             {loading ? (
                 <div className="flex justify-center p-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
                 </div>
             ) : history.length > 0 ? (
                 <div className="space-y-4">
                     {history.map((item, index) => (
                         <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                             <div>
                                 <h3 className="font-bold text-lg text-gray-900">{item.project_title}</h3>
                                 <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 mt-1">
                                     <span>Order: #{item.order_number || item.order_id}</span>
                                     <span>•</span>
                                     <span>{item.order_date ? new Date(item.order_date).toLocaleDateString() : 'Date N/A'}</span>
                                     {item.technology && (
                                         <>
                                            <span>•</span>
                                            <span className="text-indigo-600 font-medium">{item.technology}</span>
                                         </>
                                     )}
                                 </div>
                             </div>
                             <div className="flex gap-3">
                                <button 
                                    onClick={() => navigate(`/dashboard/purchase/${item.project_code || item.project_title}`, { state: { project: item } })}
                                    className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 font-medium transition-colors"
                                >
                                     <ExternalLink size={18} /> View Details
                                </button>
                                {/* 
                                <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                                     <Download size={18} /> Download
                                </button> 
                                */}
                             </div>
                         </div>
                     ))}
                 </div>
             ) : (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center py-20">
                    <p className="text-gray-500 text-lg">You haven't purchased any projects yet.</p>
                    <button 
                        onClick={() => navigate('/dashboard/explore')}
                        className="mt-4 text-indigo-600 font-semibold hover:underline"
                    >
                        Explore Projects
                    </button>
                </div>
             )}
        </div>
    );
};

export default PurchaseHistory;
