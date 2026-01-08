import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardNavbar from '../../components/layout/DashboardNavbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';
import { useAuth } from '../../contexts/AuthContext';
import { FaShieldAlt } from 'react-icons/fa';

const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [project] = useState(location.state?.project || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardNavbar />
        <div className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-red-600 text-xl">No project data found!</p>
            <Button onClick={() => navigate('/dashboard/explore-projects')} className="mt-4">
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const basePrice = parseFloat(project.base_price);
  const gstPercent = parseFloat(project.gst_percent);
  const gstAmount = (basePrice * gstPercent) / 100;
  const totalAmount = basePrice + gstAmount;

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      // In a real implementation, you would:
      // 1. Create an order on your backend
      // 2. Get the order ID from Razorpay
      // 3. Initialize Razorpay checkout

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID || 'your_razorpay_key_id',
        amount: totalAmount * 100, // Amount in paise
        currency: 'INR',
        name: 'ServerPe',
        description: project.title,
        image: '/logo192.png',
        order_id: '', // You would get this from your backend
        handler: function (response) {
          // Payment successful
          console.log('Payment successful:', response);
          // Navigate to success page with order details
          navigate('/dashboard/payment-success', {
            state: {
              project,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            },
          });
        },
        prefill: {
          name: user?.user_name,
          email: user?.email,
          contact: user?.mobile_number,
        },
        theme: {
          color: '#0ea5e9',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.on('payment.failed', function (response) {
        setError('Payment failed. Please try again.');
        console.error('Payment error:', response.error);
      });

      razorpay.open();
    } catch (error) {
      setError('Failed to initiate payment. Please try again.');
      console.error('Payment error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gradient mb-8">Order Summary</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Details */}
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 text-sm">Full Name</p>
                  <p className="font-semibold">{user?.user_name}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email Address</p>
                  <p className="font-semibold">{user?.email}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Mobile Number</p>
                  <p className="font-semibold">{user?.mobile_number}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Branch</p>
                  <p className="font-semibold">{user?.branch || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">College</p>
                  <p className="font-semibold">{user?.college_name || 'Not specified'}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">State</p>
                  <p className="font-semibold">{user?.state_name || 'Not specified'}</p>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="glass p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Project Details</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-600 text-sm">Project Code</p>
                  <p className="font-mono text-primary-600 font-semibold">{project.project_code}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Project Title</p>
                  <p className="font-semibold text-lg">{project.title}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Description</p>
                  <p className="text-gray-700">{project.description}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Technology Stack</p>
                  <p className="font-semibold">{project.technology}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Difficulty Level</p>
                  <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {project.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Price Summary */}
          <div>
            <div className="glass p-6 rounded-xl sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Price Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Base Price</span>
                  <span className="font-semibold">₹{basePrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">GST ({gstPercent}%)</span>
                  <span className="font-semibold">₹{gstAmount.toFixed(2)}</span>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total Amount</span>
                    <span className="text-2xl font-bold text-primary-600">₹{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <FaShieldAlt className="text-blue-600 mt-1 mr-2 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-1">Secure Payment</p>
                    <p className="text-sm text-blue-700">
                      Your payment is processed securely through Razorpay with industry-standard encryption.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                className="w-full mb-3"
                onClick={handlePayment}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Pay Now'}
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/dashboard/explore-projects')}
              >
                Cancel
              </Button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By proceeding, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SummaryPage;
