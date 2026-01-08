import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import PublicNavbar from '../components/layout/PublicNavbar';
import Footer from '../components/layout/Footer';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Autocomplete from '../components/common/Autocomplete';
import authService from '../services/authService';
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('subscribe');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Subscribe state
  const [subscribeData, setSubscribeData] = useState({
    name: '',
    mobile: '',
    email: '',
    collegeId: '',
    stateId: '',
  });
  const [showOtpFields, setShowOtpFields] = useState(false);
  const [otpData, setOtpData] = useState({
    mobileOtp: '',
    emailOtp: '',
  });

  // Login state
  const [loginInput, setLoginInput] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [showLoginOtp, setShowLoginOtp] = useState(false);

  // Common state
  const [states, setStates] = useState([]);
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    // Get states from sessionStorage or fetch
    const cachedStates = sessionStorage.getItem('states');
    if (cachedStates) {
      setStates(JSON.parse(cachedStates));
    } else {
      fetchStates();
    }
  }, []);

  const fetchStates = async () => {
    try {
      const response = await api.get('/serverpeuser/mystudents/states');
      if (response.data.success) {
        setStates(response.data.data);
        sessionStorage.setItem('states', JSON.stringify(response.data.data));
      }
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchColleges = async (stateId) => {
    if (!stateId) {
      setColleges([]);
      return;
    }
    
    try {
      setLoading(true);
      const response = await api.get(`/serverpeuser/mystudents/colleges/${stateId}`);
      if (response.data.success) {
        setColleges(response.data.data.colleges);
      }
    } catch (error) {
      console.error('Error fetching colleges:', error);
      setError('Failed to load colleges. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = (e) => {
    const selectedStateId = e.target.value;
    setSubscribeData({
      ...subscribeData,
      stateId: selectedStateId,
      collegeId: '', // Reset college selection when state changes
    });
    setError('');
    
    // Fetch colleges for the selected state
    if (selectedStateId) {
      fetchColleges(selectedStateId);
    } else {
      setColleges([]);
    }
  };

  // Subscribe handlers
  const handleSubscribeChange = (e) => {
    setSubscribeData({
      ...subscribeData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSendSubscribeOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.sendSubscriptionOtp(subscribeData);
      setShowOtpFields(true);
      setSuccess('OTP sent to your email and mobile!');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e) => {
    setOtpData({
      ...otpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleVerifySubscribe = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.verifySubscriptionOtp({
        mobile: subscribeData.mobile,
        email: subscribeData.email,
        ...otpData,
      });
      
      setSuccess(response.message || 'Subscription successful! Please login to continue.');
      setTimeout(() => {
        setActiveTab('login');
        setSuccess('');
      }, 2000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  // Login handlers
  const handleSendLoginOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await authService.sendLoginOtp(loginInput);
      setShowLoginOtp(true);
      setSuccess('OTP sent successfully!');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authService.verifyLoginOtp(loginInput, loginOtp);
      
      if (response.successstatus) {
        await login(response.data);
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <PublicNavbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gradient text-center mb-8">
            Welcome to ServerPe
          </h1>

          {/* Tabs */}
          <div className="flex mb-8 glass rounded-lg p-1">
            <button
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'subscribe'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
              onClick={() => {
                setActiveTab('subscribe');
                setError('');
                setSuccess('');
              }}
            >
              Subscribe
            </button>
            <button
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'login'
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-primary-600'
              }`}
              onClick={() => {
                setActiveTab('login');
                setError('');
                setSuccess('');
              }}
            >
              Login
            </button>
          </div>

          <div className="glass p-8 rounded-2xl">
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                {success}
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            {activeTab === 'subscribe' ? (
              <div>
                <h2 className="text-2xl font-bold mb-6">Create an Account</h2>
                <form onSubmit={showOtpFields ? handleVerifySubscribe : handleSendSubscribeOtp}>
                  {!showOtpFields ? (
                    <>
                      <Input
                        label="Full Name"
                        name="name"
                        value={subscribeData.name}
                        onChange={handleSubscribeChange}
                        placeholder="Enter your full name"
                        required
                      />

                      <Input
                        label="Mobile Number"
                        name="mobile"
                        type="tel"
                        value={subscribeData.mobile}
                        onChange={handleSubscribeChange}
                        placeholder="10-digit mobile number"
                        required
                        maxLength="10"
                      />

                      <Input
                        label="Email Address"
                        name="email"
                        type="email"
                        value={subscribeData.email}
                        onChange={handleSubscribeChange}
                        placeholder="Enter your email"
                        required
                      />

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          State/Union Territory <span className="text-red-500">*</span>
                        </label>
                        <select
                          name="stateId"
                          value={subscribeData.stateId}
                          onChange={handleStateChange}
                          required
                          className="input-field"
                        >
                          <option value="">Select State</option>
                          {states.map((state) => (
                            <option key={state.id} value={state.id}>
                              {state.state_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <Autocomplete
                        label="College"
                        name="collegeId"
                        value={subscribeData.collegeId}
                        onChange={handleSubscribeChange}
                        options={colleges}
                        placeholder={
                          !subscribeData.stateId 
                            ? 'Please select state first' 
                            : colleges.length === 0 
                            ? 'Loading colleges...' 
                            : 'Start typing college name...'
                        }
                        displayKey="college_name"
                        valueKey="id"
                        required
                        disabled={!subscribeData.stateId || colleges.length === 0}
                      />

                      <div className="border-t pt-4 mt-2 mb-4">
                        <label className="flex items-start cursor-pointer group">
                          <input
                            type="checkbox"
                            required
                            className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          />
                          <span className="ml-2 text-sm text-gray-600">
                            I have understood, accept & agree to the{' '}
                            <a 
                              href="/terms-and-conditions"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open('/terms-and-conditions', '_blank', 'noopener,noreferrer');
                              }}
                              className="text-primary-600 hover:underline font-medium"
                            >
                              Terms & Conditions
                            </a>
                            ,{' '}
                            <a 
                              href="/privacy-policy"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open('/privacy-policy', '_blank', 'noopener,noreferrer');
                              }}
                              className="text-primary-600 hover:underline font-medium"
                            >
                              Privacy Policy
                            </a>
                            ,{' '}
                            <a 
                              href="/refund-policy"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open('/refund-policy', '_blank', 'noopener,noreferrer');
                              }}
                              className="text-primary-600 hover:underline font-medium"
                            >
                              Refund Policy
                            </a>
                            {' '}and{' '}
                            <a 
                              href="/disclaimer"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                window.open('/disclaimer', '_blank', 'noopener,noreferrer');
                              }}
                              className="text-primary-600 hover:underline font-medium"
                            >
                              Disclaimer
                            </a>
                          </span>
                        </label>
                      </div>

                      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                        {loading ? 'Sending OTP...' : 'Get OTP'}
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 mb-6">
                        OTP has been sent to your email and mobile number. Please enter them below.
                      </p>

                      <Input
                        label="Email OTP"
                        name="emailOtp"
                        value={otpData.emailOtp}
                        onChange={handleOtpChange}
                        placeholder="Enter email OTP"
                        required
                        maxLength="6"
                      />

                      <Input
                        label="Mobile OTP"
                        name="mobileOtp"
                        value={otpData.mobileOtp}
                        onChange={handleOtpChange}
                        placeholder="Enter mobile OTP"
                        required
                        maxLength="6"
                      />

                      <div className="flex space-x-4">
                        <Button
                          type="button"
                          variant="secondary"
                          className="flex-1"
                          onClick={() => {
                            setShowOtpFields(false);
                            setOtpData({ mobileOtp: '', emailOtp: '' });
                          }}
                        >
                          Back
                        </Button>
                        <Button type="submit" variant="primary" className="flex-1" disabled={loading}>
                          {loading ? 'Verifying...' : 'Subscribe'}
                        </Button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-6">Login to Your Account</h2>
                <form onSubmit={showLoginOtp ? handleVerifyLogin : handleSendLoginOtp}>
                  <Input
                    label="Email or Mobile Number"
                    name="loginInput"
                    value={loginInput}
                    onChange={(e) => {
                      setLoginInput(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter your email or mobile number"
                    required
                    disabled={showLoginOtp}
                  />

                  {showLoginOtp && (
                    <Input
                      label="Enter OTP"
                      name="loginOtp"
                      value={loginOtp}
                      onChange={(e) => setLoginOtp(e.target.value)}
                      placeholder="Enter OTP"
                      required
                      maxLength="6"
                    />
                  )}

                  {!showLoginOtp && (
                    <div className="border-t pt-4 mt-2 mb-4">
                      <label className="flex items-start cursor-pointer group">
                        <input
                          type="checkbox"
                          required
                          className="mt-1 h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">
                          I have understood, accept & agree to the{' '}
                          <a 
                            href="/terms-and-conditions"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open('/terms-and-conditions', '_blank', 'noopener,noreferrer');
                            }}
                            className="text-primary-600 hover:underline font-medium"
                          >
                            Terms & Conditions
                          </a>
                          ,{' '}
                          <a 
                            href="/privacy-policy"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open('/privacy-policy', '_blank', 'noopener,noreferrer');
                            }}
                            className="text-primary-600 hover:underline font-medium"
                          >
                            Privacy Policy
                          </a>
                          ,{' '}
                          <a 
                            href="/refund-policy"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open('/refund-policy', '_blank', 'noopener,noreferrer');
                            }}
                            className="text-primary-600 hover:underline font-medium"
                          >
                            Refund Policy
                          </a>
                          {' '}and{' '}
                          <a 
                            href="/disclaimer"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              window.open('/disclaimer', '_blank', 'noopener,noreferrer');
                            }}
                            className="text-primary-600 hover:underline font-medium"
                          >
                            Disclaimer
                          </a>
                        </span>
                      </label>
                    </div>
                  )}

                  <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                    {loading ? (showLoginOtp ? 'Verifying...' : 'Sending OTP...') : (showLoginOtp ? 'Login' : 'Get OTP')}
                  </Button>

                  {showLoginOtp && (
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full mt-3"
                      onClick={() => {
                        setShowLoginOtp(false);
                        setLoginOtp('');
                      }}
                    >
                      Use Different Account
                    </Button>
                  )}
                </form>
              </div>
            )}
          </div>

          <p className="text-center text-gray-600 mt-6">
            {activeTab === 'subscribe' ? (
              <>
                Already have an account?{' '}
                <button
                  onClick={() => setActiveTab('login')}
                  className="text-primary-600 font-semibold hover:underline"
                >
                  Login here
                </button>
              </>
            ) : (
              <>
                Don't have an account?{' '}
                <button
                  onClick={() => setActiveTab('subscribe')}
                  className="text-primary-600 font-semibold hover:underline"
                >
                  Subscribe here
                </button>
              </>
            )}
          </p>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AuthPage;
