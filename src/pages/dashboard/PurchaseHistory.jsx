import React, { useEffect, useState } from 'react';
import apiService from '../../api/apiService';
import Button from '../../components/common/Button';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';

const PurchaseHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await apiService.fetchPurchaseHistory();
        if (res.data.successstatus) {
          setHistory(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading History...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Purchase History</h1>

      {history.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
           <p className="text-gray-500 mb-4">You haven't purchased any projects yet.</p>
           <Button variant="primary" onClick={() => window.location.href='/dashboard/explore'}>Explore Projects</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {history.map((item) => (
            <div key={item.order_id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
               <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                     <h3 className="text-xl font-bold text-gray-900">{item.project_title}</h3>
                     <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${item.payment_status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {item.payment_status}
                     </span>
                  </div>
                  <div className="text-sm text-gray-500 space-y-1">
                     <p>Order: <span className="font-mono text-gray-700">{item.order_number}</span> &bull; Date: {new Date(item.order_date).toLocaleDateString()}</p>
                     <p>License: <code className="bg-gray-100 px-1 rounded">{item.license_key}</code></p>
                  </div>
               </div>
               <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900 mb-2">₹{item.payable_amount}</p>
                  <Button variant="secondary" className="flex items-center gap-2 text-sm">
                     <ArrowDownTrayIcon className="h-4 w-4" /> Download
                  </Button>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
