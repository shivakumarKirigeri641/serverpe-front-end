import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../api/apiService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Tab } from '@headlessui/react';
import Logo from '../../images/ServerPe_Logo.svg';
import Modal from '../../components/common/Modal';
import { REFUND_POLICY, TERMS_CONDITIONS, PRIVACY_POLICY } from '../../constants/policies';
import { isValidEmail, isValidMobile, isValidName, isValidOTP } from '../../utils/validation';

const SubscribeLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Common State
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [states, setStates] = useState([]);

  // Login State
  const [loginInput, setLoginInput] = useState('');
  const [loginOtp, setLoginOtp] = useState('');
  const [loginStep, setLoginStep] = useState(1); // 1: Input, 2: OTP

  // Subscribe State
  const [subForm, setSubForm] = useState({
    user_name: '',
    mobile_number: '',
    email: '',
    collegeid: '1', // Default or select
    stateid: '',
  });
  const [subStep, setSubStep] = useState(1); // 1: Form, 2: OTP
  const [subOtp, setSubOtp] = useState({ mobile_otp: '', email_otp: '' });
  const [agreed, setAgreed] = useState(false);
  
  // Validation Errors State
  const [fieldErrors, setFieldErrors] = useState({});
  
  // Policy Modal State
  const [policyModal, setPolicyModal] = useState({ isOpen: false, title: '', content: '' });

  const openPolicy = (title, content) => {
    setPolicyModal({ isOpen: true, title, content });
  };
  const closePolicy = () => setPolicyModal({ ...policyModal, isOpen: false });

  // Mock Colleges
  const colleges = [
    { id: '1', name: 'Acharya Institute of Technology' },
    { id: '2', name: 'RV College of Engineering' },
    { id: '3', name: 'BMS College of Engineering' },
  ];

  useEffect(() => {
    // Fetch states for subscription
    const getStates = async () => {
      try {
        const res = await apiService.fetchStates();
        if (res.data.success) {
           setStates(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load states", err);
      }
    };
    getStates();
    setError('');
    setFieldErrors({});
  }, [selectedIndex]); // Clear errors on tab switch

  // Login Handlers
  const handleLoginSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    // Validate Input (Mobile or Email)
    const isMobile = isValidMobile(loginInput);
    const isEmail = isValidEmail(loginInput);

    if (!isMobile && !isEmail) {
        setFieldErrors({ loginInput: 'Please enter a valid 10-digit mobile number or email address.' });
        setLoading(false);
        return;
    }

    try {
      const res = await apiService.loginSendOtp(loginInput);
      if (res.data.successstatus) {
        setLoginStep(2);
      } else {
        setError(res.data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Error sending OTP. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    if (!isValidOTP(loginOtp)) {
        setFieldErrors({ loginOtp: 'Please enter a valid OTP (4-6 digits).' });
        setLoading(false);
        return;
    }

    try {
      const res = await apiService.loginVerifyOtp(loginInput, loginOtp);
      if (res.data.successstatus) {
        login(res.data.data);
        navigate('/dashboard');
      } else {
        setError(res.data.message || 'Invalid OTP');
      }
    } catch (err) {
      setError('Verification failed or Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  // Subscribe Handlers
  const handleSubChange = (e) => {
    setSubForm({ ...subForm, [e.target.id]: e.target.value });
    // Clear error for this field
    if (fieldErrors[e.target.id]) {
        setFieldErrors({ ...fieldErrors, [e.target.id]: '' });
    }
  };

  const validateSubscribeForm = () => {
    const errors = {};
    if (!isValidName(subForm.user_name)) errors.user_name = 'Name must be 2-50 characters (letters only).';
    if (!isValidMobile(subForm.mobile_number)) errors.mobile_number = 'Enter a valid 10-digit mobile number.';
    if (!isValidEmail(subForm.email)) errors.email = 'Enter a valid email address.';
    if (!subForm.collegeid) errors.collegeid = 'Please select a college.';
    if (!subForm.stateid) errors.stateid = 'Please select a state.';
    return errors;
  };

  const handleSubSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    
    const errors = validateSubscribeForm();
    if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        return;
    }
    
    setLoading(true);
    try {
      const res = await apiService.subscriptionSendOtp({
        ...subForm,
        collegeid: parseInt(subForm.collegeid),
        stateid: parseInt(subForm.stateid)
      });
      // The API response might just be success or OTP sent
      if (res.data.successstatus || res.status === 200) {
        setSubStep(2);
      } else {
         setError(res.data.message || "Failed to initiate subscription");
      }
    } catch (err) {
      setError('Failed to send OTP. User might already exist.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setFieldErrors({});

    const errors = {};
    if (!isValidOTP(subOtp.mobile_otp)) errors.mobile_otp = 'Invalid Mobile OTP.';
    if (!isValidOTP(subOtp.email_otp)) errors.email_otp = 'Invalid Email OTP.';
    
    if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setLoading(false);
        return;
    }

    try {
      const payload = {
        mobile_number: subForm.mobile_number,
        email: subForm.email,
        mobile_otp: subOtp.mobile_otp,
        email_otp: subOtp.email_otp
      };
      const res = await apiService.subscriptionVerifyOtp(payload);
      if (res.data.successstatus) {
        alert("Subscription successful! Please login.");
        setSelectedIndex(1); // Switch to login tab
        setSubStep(1);
        setSubForm({...subForm, mobile_number: '', email: ''});
        setSubOtp({ mobile_otp: '', email_otp: '' });
      } else {
        setError(res.data.message || 'OTP Verification failed');
      }
    } catch (err) {
      setError('Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  function listClass(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-slate-50/90">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img src={Logo} alt="ServerPe" className="mx-auto h-20 w-auto mb-6 drop-shadow-sm" />
        <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
          Welcome to ServerPe
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600 max-w-xs mx-auto">
          Your gateway to professional enterprise project demos and learning resources
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white/95 backdrop-blur py-8 px-4 shadow-xl sm:rounded-2xl sm:px-10 border border-white/50">
          
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="flex space-x-1 rounded-xl bg-slate-100 p-1.5 mb-8">
              {['Subscribe', 'Login'].map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    listClass(
                      'w-full rounded-lg py-2.5 text-sm font-semibold leading-5 text-indigo-700 transition-all duration-200',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow-sm text-indigo-700'
                        : 'text-slate-500 hover:bg-white/[0.12] hover:text-indigo-600'
                    )
                  }
                >
                  {category}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              
              {/* SUBSCRIBE PANEL */}
              <Tab.Panel>
                {subStep === 1 ? (
                  <form className="space-y-5" onSubmit={handleSubSendOtp} noValidate>
                    <Input 
                        id="user_name" 
                        label="Full Name" 
                        value={subForm.user_name} 
                        onChange={handleSubChange} 
                        required 
                        error={fieldErrors.user_name}
                    />
                    <Input 
                        id="mobile_number" 
                        label="Mobile Number" 
                        value={subForm.mobile_number} 
                        onChange={handleSubChange} 
                        required 
                        maxLength={10}
                        error={fieldErrors.mobile_number}
                    />
                    <Input 
                        id="email" 
                        label="Email Address" 
                        type="email" 
                        value={subForm.email} 
                        onChange={handleSubChange} 
                        required 
                        error={fieldErrors.email}
                    />
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">College</label>
                      <select 
                        id="collegeid" 
                        value={subForm.collegeid} 
                        onChange={handleSubChange} 
                        className={`block w-full px-4 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm bg-white ${fieldErrors.collegeid ? 'border-red-300 focus:border-red-500' : 'border-gray-300'}`}
                      >
                        {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                      {fieldErrors.collegeid && <p className="mt-1 text-sm text-red-600">{fieldErrors.collegeid}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5 ml-0.5">State / Union Territory</label>
                      <select 
                        id="stateid" 
                        value={subForm.stateid} 
                        onChange={handleSubChange} 
                        className={`block w-full px-4 py-2.5 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm bg-white ${fieldErrors.stateid ? 'border-red-300 focus:border-red-500' : 'border-gray-300'}`}
                        required
                      >
                        <option value="">Select State</option>
                        {states.map(s => <option key={s.id} value={s.id}>{s.state_name}</option>)}
                      </select>
                      {fieldErrors.stateid && <p className="mt-1 text-sm text-red-600">{fieldErrors.stateid}</p>}
                    </div>

                    {error && <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium">{error}</div>}

                    <div className="flex items-start bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div className="flex items-center h-5">
                        <input
                          id="terms"
                          name="terms"
                          type="checkbox"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3 text-xs leading-5">
                        <label htmlFor="terms" className="text-slate-600">
                          I agree to the{' '}
                          <button type="button" onClick={() => openPolicy('Terms & Conditions', TERMS_CONDITIONS)} className="text-indigo-600 hover:text-indigo-500 font-semibold hover:underline">Terms</button>,{' '}
                          <button type="button" onClick={() => openPolicy('Privacy Policy', PRIVACY_POLICY)} className="text-indigo-600 hover:text-indigo-500 font-semibold hover:underline">Privacy</button>, and{' '}
                          <button type="button" onClick={() => openPolicy('Refund Policy', REFUND_POLICY)} className="text-indigo-600 hover:text-indigo-500 font-semibold hover:underline">Refund Policy</button>.
                        </label>
                      </div>
                    </div>

                    <Button type="submit" variant="gradient" className="w-full py-3 text-base shadow-indigo-500/25" disabled={loading || !agreed}>
                      {loading ? 'Processing...' : 'Get OTP'}
                    </Button>
                  </form>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubVerifyOtp}>
                    <div className="text-center text-sm text-slate-500 mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <span className="font-semibold block text-blue-800 mb-1">Check your inbox & phone</span>
                      Enter the OTPs sent to your mobile and email to complete verification.
                    </div>
                    <Input 
                      label="Mobile OTP" 
                      value={subOtp.mobile_otp} 
                      onChange={(e) => setSubOtp({...subOtp, mobile_otp: e.target.value})} 
                      required 
                      maxLength={6}
                      placeholder="e.g. 123456"
                      error={fieldErrors.mobile_otp}
                    />
                    <Input 
                      label="Email OTP" 
                      value={subOtp.email_otp} 
                      onChange={(e) => setSubOtp({...subOtp, email_otp: e.target.value})} 
                      required 
                      maxLength={6}
                      placeholder="e.g. 123456"
                      error={fieldErrors.email_otp}
                    />
                     {error && <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium">{error}</div>}
                    <Button type="submit" variant="gradient" className="w-full py-3 text-base shadow-indigo-500/25" disabled={loading}>
                      {loading ? 'Verifying...' : 'Verify & Subscribe'}
                    </Button>
                     <button type="button" onClick={() => setSubStep(1)} className="w-full text-center text-sm text-slate-500 hover:text-indigo-600 mt-4 font-medium transition-colors">← Back to Details</button>
                  </form>
                )}
              </Tab.Panel>

              {/* LOGIN PANEL */}
              <Tab.Panel>
                {loginStep === 1 ? (
                  <form className="space-y-6 mt-4" onSubmit={handleLoginSendOtp} noValidate>
                     <Input 
                        id="loginInput" 
                        label="Email or Mobile Number" 
                        value={loginInput} 
                        onChange={(e) => setLoginInput(e.target.value)} 
                        required 
                        placeholder="Enter your registered contact"
                        error={fieldErrors.loginInput}
                      />
                      {error && <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium">{error}</div>}
                      <Button type="submit" variant="primary" className="w-full py-3" disabled={loading}>
                        {loading ? 'Sending OTP...' : 'Get OTP'}
                      </Button>
                  </form>
                ) : (
                  <form className="space-y-6" onSubmit={handleLoginVerifyOtp}>
                     <div className="text-center text-sm text-slate-500 mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                      OTP sent to <span className="font-semibold text-slate-800">{loginInput}</span>
                    </div>
                    <Input 
                        label="Enter OTP" 
                        type="password"
                        value={loginOtp} 
                        onChange={(e) => setLoginOtp(e.target.value)} 
                        required 
                        maxLength={6}
                        placeholder="••••••"
                        error={fieldErrors.loginOtp}
                    />
                    {error && <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm font-medium">{error}</div>}
                    <Button type="submit" variant="primary" className="w-full py-3" disabled={loading}>
                       {loading ? 'Verifying...' : 'Verify & Login'}
                    </Button>
                    <button type="button" onClick={() => setLoginStep(1)} className="w-full text-center text-sm text-slate-500 hover:text-indigo-600 mt-4 font-medium transition-colors">← Change Mobile/Email</button>
                  </form>
                )}
              </Tab.Panel>

            </Tab.Panels>
          </Tab.Group>

        </div>
      </div>
      <Modal isOpen={policyModal.isOpen} closeModal={closePolicy} title={policyModal.title}>
        {policyModal.content}
      </Modal>
    </div>
  );
};

export default SubscribeLoginPage;
