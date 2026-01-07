import React, { useEffect, useState } from 'react';
import apiService from '../../api/apiService';
import Button from '../../components/common/Button';
import { ArrowDownTrayIcon, ShoppingBagIcon as ShoppingIcon } from '@heroicons/react/24/outline';

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
        <p className="text-gray-500 mt-2">Access your purchased projects, licenses, and invoices.</p>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-200">
           <div className="mx-auto h-24 w-24 text-gray-200 mb-4">
             <ShoppingIcon className="h-full w-full" />
           </div>
           <h3 className="text-lg font-medium text-gray-900">No purchases found</h3>
           <p className="text-gray-500 mb-6 mt-1">Start your journey by exploring our premium projects.</p>
           <Button variant="primary" onClick={() => window.location.href='/dashboard/explore'}>Explore Projects</Button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {history.map((item) => (
            <div key={item.order_id} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 hover:shadow-md transition-shadow">
               <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-3">
                     <div className="h-12 w-12 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                        <ShoppingIcon className="h-6 w-6" />
                     </div>
                     <div>
                        <h3 className="text-xl font-bold text-gray-900 truncate">{item.project_title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${item.payment_status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {item.payment_status}
                            </span>
                             <span className="text-xs text-gray-400">&bull;</span>
                            <span className="text-xs text-gray-500 font-mono">{item.order_number}</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm ml-16">
                     <div>
                        <span className="text-gray-400">Purchased on:</span>
                        <span className="text-gray-700 font-medium ml-2">{new Date(item.order_date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                     </div>
                      <div>
                        <span className="text-gray-400">License Key:</span>
                        <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-mono text-xs ml-2 select-all">{item.license_key}</code>
                     </div>
                  </div>
               </div>
               
                <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-end gap-4 lg:gap-2 shrink-0 border-t lg:border-t-0 border-gray-100 pt-4 lg:pt-0">
                   <div className="w-full sm:w-auto text-right mb-2 lg:mb-4 flex flex-row lg:flex-col justify-between items-center lg:items-end">
                      <span className="text-xs text-gray-400 uppercase tracking-wider lg:hidden">Amount Paid</span>
                      <p className="text-3xl font-bold text-gray-900">₹{item.payable_amount}</p>
                   </div>
                   <div className="flex gap-3 w-full sm:w-auto">
                     <Button 
                        variant="secondary" 
                        className="flex-1 sm:flex-none justify-center items-center gap-2 text-sm px-4"
                        onClick={() => alert("Downloading Invoice for Order: " + item.order_number)}
                     >
                        <ArrowDownTrayIcon className="h-4 w-4" /> Invoice
                     </Button>
                     <Button 
                        variant="primary" 
                        className="flex-1 sm:flex-none justify-center items-center gap-2 text-sm px-4 shadow-indigo-100"
                        onClick={() => alert("Downloading Project: " + item.project_title)}
                     >
                        <ArrowDownTrayIcon className="h-4 w-4" /> Project
                     </Button>
                   </div>
                </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PurchaseHistory;
