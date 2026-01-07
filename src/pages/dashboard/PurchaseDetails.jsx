import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiService from '../../api/apiService';
import Button from '../../components/common/Button';

const PurchaseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [disclaimers, setDisclaimers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [detailsRes, disclaimerRes] = await Promise.all([
          apiService.fetchPurchaseDetails(id),
          apiService.fetchDisclaimer()
        ]);
        
        if (detailsRes.data.successstatus) {
          setData(detailsRes.data.data);
        }
        if (disclaimerRes.data.successstatus) {
          setDisclaimers(disclaimerRes.data.data);
        }
      } catch (err) {
        console.error("Error fetching purchase details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading Details...</div>;
  if (!data) return <div className="p-10 text-center">Project not found or error.</div>;

  const { user_details, project_details } = data;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Confirm Purchase Details</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">User Information</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <span className="block text-gray-500">Name</span>
            <span className="font-medium text-gray-900">{user_details.user_name}</span>
          </div>
          <div>
            <span className="block text-gray-500">Email</span>
            <span className="font-medium text-gray-900">{user_details.email}</span>
          </div>
          <div>
            <span className="block text-gray-500">Mobile</span>
            <span className="font-medium text-gray-900">{user_details.mobile_number}</span>
          </div>
          <div>
            <span className="block text-gray-500">Branch</span>
            <span className="font-medium text-gray-900">{user_details.branch}</span>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-medium text-gray-900">Project Information</h2>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{project_details.title}</h3>
          <p className="text-gray-600 mb-4">{project_details.description}</p>
          <div className="flex justify-between items-center text-sm">
             <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full">{project_details.technology}</span>
             <span className="font-bold text-lg">₹{project_details.base_price}</span>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-yellow-800 mb-4">Important Disclaimer</h3>
        <div className="space-y-4">
          {disclaimers.map((d) => (
            <div key={d.id} className="flex gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg className="h-5 w-5 text-yellow-600" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-medium text-yellow-900">{d.title}</h4>
                <p className="text-yellow-700 text-sm">{d.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 flex items-center">
          <input
            id="disclaimer-agree"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="disclaimer-agree" className="ml-2 block text-sm text-gray-900 font-medium">
            I agree to the terms & conditions mentioned above and wish to purchase.
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={() => navigate('/dashboard/checkout/summary', { state: { purchaseData: data } })}
          disabled={!agreed}
          variant={agreed ? 'primary' : 'secondary'}
          className={!agreed ? 'opacity-50 cursor-not-allowed' : ''}
        >
          Proceed to Summary
        </Button>
      </div>

    </div>
  );
};

export default PurchaseDetails;
