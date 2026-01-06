import React, { useContext, useEffect, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
import { Download } from 'lucide-react';
// import api from '../utils/api';

const PurchaseHistory = () => {
    // const { user } = useContext(AuthContext);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock fetch history
        setTimeout(() => {
            setLoading(false);
            setHistory([]); 
        }, 1000);
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">Purchase History</h1>
             {loading ? (
                 <div>Loading...</div>
             ) : history.length > 0 ? (
                 <div className="space-y-4">
                     {history.map(item => (
                         <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center">
                             <div>
                                 <h3 className="font-bold text-lg">{item.project_title}</h3>
                                 <p className="text-gray-500 text-sm">Purchased on {item.date}</p>
                             </div>
                             <button className="flex items-center gap-2 text-indigo-600 font-medium hover:underline">
                                 <Download size={18} /> Download
                             </button>
                         </div>
                     ))}
                 </div>
             ) : (
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center py-20">
                    <p className="text-gray-500 text-lg">You haven't purchased any projects yet.</p>
                </div>
             )}
        </div>
    );
};

export default PurchaseHistory;
