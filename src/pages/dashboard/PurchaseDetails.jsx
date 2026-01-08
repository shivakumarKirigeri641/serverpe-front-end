import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import DashboardNavbar from '../../components/layout/DashboardNavbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';
import Loader from '../../components/common/Loader';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { FaExclamationTriangle } from 'react-icons/fa';

const PurchaseDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [projectFromState] = useState(location.state?.project || null);
  const [disclaimers, setDisclaimers] = useState([]);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDisclaimers();
  }, []);

  const fetchDisclaimers = async () => {
    try {
      const response = await api.get('/serverpeuser/mystudents/disclaimer-before-buy-list');
      if (response.data.successstatus) {
        setDisclaimers(response.data.data);
      }
    } catch (error) {
      setError('Failed to load disclaimers');
      console.error('Error fetching disclaimers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = () => {
    if (!agreedToTerms) {
      setError('Please agree to all terms and conditions before proceeding');
      return;
    }
    navigate('/dashboard/summary', { state: { project: projectFromState, projectId: id } });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardNavbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader size="lg" text="Loading purchase details..." />
        </div>
      </div>
    );
  }

  if (!projectFromState) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardNavbar />
        <div className="flex-1 container mx-auto px-4 py-12">
          <div className="text-center">
            <p className="text-red-600 text-xl">Project not found!</p>
            <Button onClick={() => navigate('/dashboard/explore-projects')} className="mt-4">
              Back to Projects
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gradient mb-8">Purchase Details</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* User Information */}
        <div className="glass p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Your Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Name:</p>
              <p className="font-semibold text-lg">{user?.user_name}</p>
            </div>
            <div>
              <p className="text-gray-600">Email:</p>
              <p className="font-semibold text-lg">{user?.email}</p>
            </div>
            <div>
              <p className="text-gray-600">Mobile:</p>
              <p className="font-semibold text-lg">{user?.mobile_number}</p>
            </div>
            <div>
              <p className="text-gray-600">College:</p>
              <p className="font-semibold text-lg">{user?.college_name || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-gray-600">State:</p>
              <p className="font-semibold text-lg">{user?.state_name || 'Not specified'}</p>
            </div>
          </div>
        </div>

        {/* Project Information */}
        <div className="glass p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4">Project Details</h2>
          <div className="space-y-3">
            <div>
              <p className="text-gray-600">Project Title:</p>
              <p className="font-semibold text-lg">{projectFromState.title}</p>
            </div>
            <div>
              <p className="text-gray-600">Description:</p>
              <p className="text-gray-700">{projectFromState.description}</p>
            </div>
            <div>
              <p className="text-gray-600">Technology:</p>
              <p className="font-semibold">{projectFromState.technology}</p>
            </div>
            <div>
              <p className="text-gray-600">Difficulty:</p>
              <span className="inline-block bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-semibold">
                {projectFromState.difficulty}
              </span>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Base Price:</span>
                <span className="font-semibold">₹{parseFloat(projectFromState.base_price).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-600">GST ({projectFromState.gst_percent}%):</span>
                <span className="font-semibold">
                  ₹{(parseFloat(projectFromState.base_price) * parseFloat(projectFromState.gst_percent) / 100).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="glass p-6 rounded-xl mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaExclamationTriangle className="text-yellow-500 mr-2" />
            Important Disclaimers
          </h2>
          <p className="text-gray-600 mb-6">
            Please read and understand the following disclaimers carefully before proceeding with your purchase:
          </p>
          <div className="space-y-4">
            {disclaimers.map((disclaimer) => (
              <div 
                key={disclaimer.id} 
                className={`p-4 rounded-lg ${
                  disclaimer.is_mandatory ? 'bg-red-50 border-2 border-red-200' : 'bg-gray-50 border border-gray-200'
                }`}
              >
                <div className="flex items-start">
                  {disclaimer.is_mandatory && (
                    <FaExclamationTriangle className="text-red-500 mt-1 mr-2 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">
                      {disclaimer.title}
                      {disclaimer.is_mandatory && <span className="text-red-500 ml-2">*</span>}
                    </h3>
                    <p className="text-gray-700">{disclaimer.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agreement Checkbox */}
        <div className="glass p-6 rounded-xl mb-8">
          <label className="flex items-start cursor-pointer">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                setError('');
              }}
              className="mt-1 mr-3 w-5 h-5 text-primary-600"
            />
            <span className="text-gray-700">
              I have read and agree to all the terms, conditions, and disclaimers mentioned above. 
              I understand that this purchase is bound to the system I'm currently using and acknowledge 
              all the limitations and requirements stated.
            </span>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="secondary"
            className="flex-1"
            onClick={() => navigate('/dashboard/explore-projects')}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleProceed}
            disabled={!agreedToTerms}
          >
            I Agree to Terms & Proceed to Purchase
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PurchaseDetails;
