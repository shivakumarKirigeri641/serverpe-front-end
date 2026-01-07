import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';

const SummaryPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  if (!state || !state.purchaseData) {
    return <div className="p-10">Invalid session. Please return to projects.</div>;
  }

  const { project_details } = state.purchaseData;
  const basePrice = parseFloat(project_details.base_price);
  const gstPercent = parseFloat(project_details.gst_percent);
  const gstAmount = (basePrice * gstPercent) / 100;
  const totalAmount = basePrice + gstAmount;

  const handlePayment = () => {
    setProcessing(true);
    // Simulate Razorpay
    setTimeout(() => {
      // Mock Success
      navigate('/payment/success', { 
         state: { 
            orderId: 'ORD-2026-0001', // Mock order ID
            projectTitle: project_details.title
         } 
      });
    }, 2000);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
       <h1 className="text-3xl font-bold text-gray-900 mb-8">Order Summary</h1>

       <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
          <div className="p-8 space-y-6">
             <div className="flex justify-between items-center pb-6 border-b border-gray-100">
               <div>
                 <h2 className="text-xl font-bold text-gray-900">{project_details.title}</h2>
                 <p className="text-gray-500 text-sm">{project_details.description}</p>
               </div>
             </div>

             <div className="space-y-4">
                <div className="flex justify-between text-gray-600">
                   <span>Project Base Price</span>
                   <span>₹{basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                   <span>GST ({gstPercent}%)</span>
                   <span>₹{gstAmount.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                   <span className="text-xl font-bold text-gray-900">Total Payable</span>
                   <span className="text-3xl font-extrabold text-indigo-600">₹{totalAmount.toFixed(2)}</span>
                </div>
             </div>
          </div>
          <div className="bg-gray-50 p-6 flex justify-between items-center">
             <Button variant="text" onClick={() => navigate(-1)}>Cancel</Button>
             <Button onClick={handlePayment} disabled={processing} className="w-48 text-lg">
                {processing ? 'Processing...' : 'Pay Now'}
             </Button>
          </div>
       </div>
    </div>
  );
};

export default SummaryPage;
