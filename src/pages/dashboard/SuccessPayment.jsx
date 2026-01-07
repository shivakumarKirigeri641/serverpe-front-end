import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import apiService from '../../api/apiService';
import Button from '../../components/common/Button';
import { CheckCircleIcon, ArrowDownTrayIcon, DocumentTextIcon } from '@heroicons/react/24/solid';

const SuccessPayment = () => {
  const { state } = useLocation();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Determine order ID from state or URL logic.
    // Ideally we fetch details of the just completed order.
    // For demo using the mock order ID passed from SummaryPage or a fixed one for testing if direct access.
    const orderId = state?.orderId || 'ORD-2026-0001';

    const fetchOrder = async () => {
      try {
        const res = await apiService.fetchPurchasedOrderDetails(orderId);
        if (res.data.successstatus && res.data.data.length > 0) {
          setOrderDetails(res.data.data[0]);
        }
      } catch (err) {
        console.error("Error fetching success details", err);
      } finally {
         setLoading(false);
      }
    };
    
    // Simulate API call delay if needed or just call
    fetchOrder();
  }, [state]);

  if (loading) return <div className="p-10 text-center">Finalizing your order...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
       <div className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8 animate-bounce-slow">
         <CheckCircleIcon className="h-16 w-16 text-green-600" />
       </div>
       <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Payment Successful!</h1>
       <p className="text-lg text-gray-600 mb-12">Thank you for your purchase. Your project is ready for download.</p>

       {orderDetails && (
         <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10 text-left border border-gray-100">
           <div className="p-8">
              <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                 <div>
                    <span className="text-sm text-gray-400 uppercase tracking-widest">Order ID</span>
                    <h3 className="text-xl font-bold text-gray-900">{orderDetails.order_number}</h3>
                 </div>
                 <div className="mt-4 md:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${orderDetails.payment_status === 'SUCCESS' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                       {orderDetails.payment_status}
                    </span>
                 </div>
              </div>
              
              <div className="border-t border-gray-100 py-6">
                 <h4 className="font-bold text-gray-900 text-lg mb-2">{orderDetails.project_title}</h4>
                 <p className="text-gray-500 mb-4">License Key: <code className="bg-gray-100 px-2 py-1 rounded text-gray-800 font-mono text-sm">{orderDetails.license_key}</code></p>
                 <div className="flex gap-4">
                    <Button onClick={() => alert("Simulating download...")} className="flex items-center gap-2">
                      <ArrowDownTrayIcon className="h-4 w-4" /> Download Project
                    </Button>
                    <Button variant="secondary" onClick={() => alert("Simulating invoice download...")} className="flex items-center gap-2">
                       <DocumentTextIcon className="h-4 w-4" /> Invoice
                    </Button>
                 </div>
              </div>
           </div>
           <div className="bg-gray-50 px-8 py-4 flex justify-between items-center text-sm text-gray-500">
              <span>Paid via {orderDetails.gateway}</span>
              <span>{new Date(orderDetails.paid_at).toLocaleDateString()}</span>
           </div>
         </div>
       )}

       <Link to="/dashboard" className="text-indigo-600 font-medium hover:text-indigo-800">Return to Dashboard</Link>
    </div>
  );
};

export default SuccessPayment;
