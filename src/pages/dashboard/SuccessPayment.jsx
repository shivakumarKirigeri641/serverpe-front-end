import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardNavbar from '../../components/layout/DashboardNavbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';
import { FaCheckCircle, FaDownload, FaFileInvoice } from 'react-icons/fa';
import api from '../../services/api';

const SuccessPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails] = useState(location.state || {});
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyPayment = async () => {
      if (!orderDetails.paymentId) {
        setError('No payment ID found');
        setLoading(false);
        return;
      }

      try {
        const response = await api.post('/serverpeuser/loggedinuser/razorpay/status', {
          razorpay_payment_id: orderDetails.paymentId,
          summaryFormData:orderDetails.formSummaryData
        });
        console.log('response.data:', response.data.data);

        if (response.data.successstatus) {
          setPaymentData(response.data.data);
        } else {
          setError('Payment verification failed');
        }
      } catch (error) {
        console.error('Error verifying payment:', error);
        setError('Failed to verify payment');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [orderDetails.paymentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardNavbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying payment...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !orderDetails.formSummaryData?.project || !paymentData) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardNavbar />
        <div className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-red-600 text-xl mb-4">{error || 'Invalid access!'}</p>
            <Button onClick={() => navigate('/dashboard')} className="mt-4">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const project = orderDetails.formSummaryData.project;
  const basePrice = parseFloat(paymentData.order.total_amount);
  const gstAmount = parseFloat(paymentData.order.gst_amount);
  const totalPaid = parseFloat(paymentData.order.payable_amount);
  const orderNumber = paymentData.order.order_number;
  const licenseKey = paymentData.license.license_key;
  const paymentDate = new Date(paymentData.order.created_at).toLocaleDateString('en-IN');

  const handleDownloadProject = () => {
    // TODO: Implement with actual download API using license key
    alert(`Download project with license key: ${licenseKey}`);
  };

  const handleDownloadInvoice = () => {
    // TODO: Implement with actual invoice download API
    alert(`Download invoice for order: ${orderNumber}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-block bg-green-100 p-6 rounded-full mb-6 animate-scale-in">
              <FaCheckCircle className="text-6xl text-green-600" />
            </div>
            <h1 className="text-4xl font-bold text-gradient mb-4">Payment Successful!</h1>
            <p className="text-xl text-gray-600 mb-2">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <p className="text-gray-500">Order Number: <span className="font-mono font-semibold text-primary-600">{orderNumber}</span></p>
          </div>

          {/* Order Details */}
          <div className="glass p-8 rounded-2xl mb-8">
            <h2 className="text-2xl font-bold mb-6">Order Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">Project Title</p>
                <p className="font-semibold text-lg">{project.title}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Project Code</p>
                <p className="font-mono font-semibold text-primary-600">{project.project_code}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Technology</p>
                <p className="font-semibold">{project.technology}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Difficulty</p>
                <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-semibold">
                  {project.difficulty}
                </span>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-bold mb-4">Payment Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Price</span>
                  <span className="font-semibold">₹{basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">GST ({project.gst_percent}%)</span>
                  <span className="font-semibold">₹{gstAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-primary-600 pt-2 border-t">
                  <span>Total Paid</span>
                  <span>₹{totalPaid.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Payment ID:</span>
                    <p className="font-mono text-xs break-all">{orderDetails.paymentId}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Order Number:</span>
                    <p className="font-mono text-xs break-all">{orderNumber}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">License Key:</span>
                    <p className="font-mono text-xs break-all text-primary-600 font-semibold">{licenseKey}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Payment Status:</span>
                    <p className="font-semibold text-green-600">{paymentData.order.order_status}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Payment Date:</span>
                    <p className="font-semibold">{paymentDate}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Payment Method:</span>
                    <p className="font-semibold">Razorpay</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Download Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="glass p-6 rounded-xl text-center hover:shadow-xl transition-all">
              <FaDownload className="text-5xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Download Project</h3>
              <p className="text-gray-600 mb-4">
                Download your complete project package with all source code and documentation.
              </p>
              <Button variant="primary" className="w-full" onClick={handleDownloadProject}>
                Download Now
              </Button>
            </div>

            <div className="glass p-6 rounded-xl text-center hover:shadow-xl transition-all">
              <FaFileInvoice className="text-5xl text-secondary-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Download Invoice</h3>
              <p className="text-gray-600 mb-4">
                Download your official invoice for tax and record-keeping purposes.
              </p>
              <Button variant="outline" className="w-full" onClick={handleDownloadInvoice}>
                Download Invoice
              </Button>
            </div>
          </div>

          {/* What's Next */}
          <div className="glass p-8 rounded-xl mb-8">
            <h3 className="text-2xl font-bold mb-4">What's Next?</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">1.</span>
                <span>Download your project package and extract all files</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">2.</span>
                <span>Follow the setup instructions in the documentation</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">3.</span>
                <span>Review the viva preparation materials</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 mr-2">4.</span>
                <span>Practice your demo on the same system you purchased from</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              variant="primary" 
              className="flex-1"
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/dashboard/explore-projects')}
            >
              Explore More Projects
            </Button>
            <Button 
              variant="secondary" 
              className="flex-1"
              onClick={() => navigate('/dashboard/purchase-history')}
            >
              View Purchase History
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SuccessPayment;
