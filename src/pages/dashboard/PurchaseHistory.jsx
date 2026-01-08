import React, { useState, useEffect } from 'react';
import DashboardNavbar from '../../components/layout/DashboardNavbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import api from '../../services/api';
import { FaDownload, FaFileInvoice, FaCalendar, FaCreditCard } from 'react-icons/fa';

const PurchaseHistory = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPurchaseHistory();
  }, []);

  const fetchPurchaseHistory = async () => {
    try {
      const response = await api.get('/serverpeuser/loggedinstudent/purchase-history');
      if (response.data.successstatus) {
        setPurchases(response.data.data);
      }
    } catch (error) {
      setError('Failed to load purchase history');
      console.error('Error fetching purchase history:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadProject = (purchase) => {
    // Placeholder for download functionality
    alert(`Download project: ${purchase.project_title}`);
  };

  const handleDownloadInvoice = (purchase) => {
    // In real implementation, download from purchase.invoice_pdf_path
    alert(`Download invoice: ${purchase.invoice_number}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardNavbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader size="lg" text="Loading purchase history..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gradient mb-2">Purchase History</h1>
          <p className="text-gray-600">
            View and download your purchased projects and invoices
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {purchases.length === 0 ? (
          <div className="glass p-12 rounded-2xl text-center">
            <p className="text-gray-600 text-lg mb-6">
              You haven't purchased any projects yet.
            </p>
            <Button onClick={() => window.location.href = '/dashboard/explore-projects'}>
              Explore Projects
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {purchases.map((purchase) => {
              const orderDate = new Date(purchase.order_date).toLocaleDateString();
              const paymentDate = new Date(purchase.payment_date).toLocaleDateString();
              
              return (
                <div key={purchase.order_id} className="glass p-6 rounded-xl hover:shadow-xl transition-all">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Project Info */}
                    <div className="lg:col-span-2">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{purchase.project_title}</h3>
                          <p className="text-gray-600 mb-2">Technology: {purchase.technology}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className="flex items-center">
                              <FaCalendar className="mr-1" />
                              Ordered: {orderDate}
                            </span>
                            <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                              {purchase.payment_status}
                            </span>
                          </div>
                        </div>
                        <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-semibold">
                          {purchase.difficulty}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg mb-4">
                        <div>
                          <p className="text-gray-600 text-sm">Order Number</p>
                          <p className="font-mono font-semibold text-sm">{purchase.order_number}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Invoice Number</p>
                          <p className="font-mono font-semibold text-sm">{purchase.invoice_number}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">License Key</p>
                          <p className="font-mono font-semibold text-sm">{purchase.license_key}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Payment Gateway</p>
                          <p className="font-semibold text-sm">{purchase.gateway}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm">
                        <FaCreditCard className="text-primary-600" />
                        <span className="text-gray-600">Paid on {paymentDate}</span>
                        <span className="text-gray-400">|</span>
                        <span className="font-semibold text-primary-600">₹{parseFloat(purchase.payable_amount).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col space-y-3">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-gray-600 text-sm mb-2">Amount Breakdown</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Base:</span>
                            <span className="font-semibold">₹{parseFloat(purchase.base_amount).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>GST:</span>
                            <span className="font-semibold">₹{parseFloat(purchase.gst_amount).toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-bold text-primary-600 pt-1 border-t">
                            <span>Total:</span>
                            <span>₹{parseFloat(purchase.payable_amount).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="primary"
                        className="w-full"
                        onClick={() => handleDownloadProject(purchase)}
                      >
                        <FaDownload className="mr-2" />
                        Download Project
                      </Button>

                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => handleDownloadInvoice(purchase)}
                      >
                        <FaFileInvoice className="mr-2" />
                        Download Invoice
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default PurchaseHistory;
