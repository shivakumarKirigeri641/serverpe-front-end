import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-hot-toast';
import { CreditCard, Check, Download, FileText } from 'lucide-react';

export const PurchaseSummary = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const project = location.state?.project;

    if (!user || !project) return <div className="p-10">Invalid session</div>;

    const gst = Math.round(project.price * 0.18);
    const total = parseInt(project.price) + gst;

    const handlePayment = () => {
        const toastId = toast.loading('Contacting Payment Gateway...');
        
        // Mock Razorpay Payment Flow
        setTimeout(() => {
            toast.loading('Processing Payment...', { id: toastId });
            setTimeout(() => {
                toast.success('Payment Successful!', { id: toastId });
                navigate('/dashboard/success', { state: { project, paymentId: `pay_${Math.random().toString(36).substr(2, 9)}`, total } });
            }, 2000);
        }, 1500);
    };

    return (
        <div className="max-w-3xl mx-auto px-4 py-10">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gray-900 text-white p-6">
                    <h2 className="text-2xl font-bold">Order Summary</h2>
                </div>
                <div className="p-8">
                    <div className="flex justify-between items-center mb-6 text-lg">
                        <span className="text-gray-600">Product</span>
                        <span className="font-medium text-gray-900">{project.title}</span>
                    </div>
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-500">Base Price</span>
                        <span>₹{project.price}</span>
                    </div>
                     <div className="flex justify-between items-center mb-6 pb-6 border-b border-gray-100">
                        <span className="text-gray-500">GST (18%)</span>
                        <span>₹{gst}</span>
                    </div>
                     <div className="flex justify-between items-center mb-8 text-xl font-bold">
                        <span>Total Payable</span>
                        <span className="text-indigo-600">₹{total}</span>
                    </div>

                    <button 
                        onClick={handlePayment}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold shadow-lg transition-all flex justify-center items-center gap-2"
                    >
                        <CreditCard size={20} /> Pay Now ₹{total}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const PaymentSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { project, paymentId, total } = location.state || {}; // Safe access

    if (!project) return <div>Invalid Access</div>;

    return (
        <div className="max-w-2xl mx-auto px-4 py-16 text-center">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={40} strokeWidth={3} />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Payment Successful!</h1>
            <p className="text-gray-500 mb-8">Thank you for your purchase. Your order has been confirmed.</p>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left mb-8">
                <p className="flex justify-between mb-2"><span className="text-gray-500">Transaction ID:</span> <span className="font-mono">{paymentId}</span></p>
                <p className="flex justify-between mb-2"><span className="text-gray-500">Amount Paid:</span> <span className="font-bold">₹{total}</span></p>
                <p className="flex justify-between"><span className="text-gray-500">Item:</span> <span>{project.title}</span></p>
            </div>

            <div className="flex gap-4 justify-center">
                <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors flex items-center gap-2">
                    <Download size={20} /> Download Source
                </button>
                 <button className="bg-white text-gray-700 px-6 py-3 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition-colors flex items-center gap-2">
                    <FileText size={20} /> Get Invoice
                </button>
            </div>
            
            <button onClick={() => navigate('/dashboard')} className="mt-8 text-indigo-600 hover:underline">
                Return to Dashboard
            </button>
        </div>
    );
};