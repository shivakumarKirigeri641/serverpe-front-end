import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import apiService from '../../api/apiService';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { Tab } from '@headlessui/react';
import Logo from '../../images/ServerPe_Logo.svg';

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
  }, []);

  // Login Handlers
  const handleLoginSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
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
  };

  const handleSubSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
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
    try {
      const payload = {
        mobile_number: subForm.mobile_number,
        email: subForm.email,
        mobile_otp: subOtp.mobile_otp,
        email_otp: subOtp.email_otp
      };
      const res = await apiService.subscriptionVerifyOtp(payload);
      if (res.data.successstatus) {
        // After toggle success, we generally require login, but let's see if it returns user
        alert("Subscription successful! Please login.");
        setSelectedIndex(1); // Switch to login tab
        setSubStep(1);
        setSubForm({...subForm, mobile_number: '', email: ''});
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


    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img src={Logo} alt="ServerPe" className="mx-auto h-16 w-auto" />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Welcome to ServerPe
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your gateway to professional project demos
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          
          <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
            <Tab.List className="flex space-x-1 rounded-xl bg-indigo-900/10 p-1 mb-6">
              {['Subscribe', 'Login'].map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    listClass(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-indigo-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow text-indigo-700'
                        : 'text-indigo-600 hover:bg-white/[0.12] hover:text-indigo-800'
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
                  <form className="space-y-6" onSubmit={handleSubSendOtp}>
                    <Input id="user_name" label="Full Name" value={subForm.user_name} onChange={handleSubChange} required />
                    <Input id="mobile_number" label="Mobile Number" value={subForm.mobile_number} onChange={handleSubChange} required />
                    <Input id="email" label="Email Address" type="email" value={subForm.email} onChange={handleSubChange} required />
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
                      <select id="collegeid" value={subForm.collegeid} onChange={handleSubChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">State / Union Territory</label>
                      <select id="stateid" value={subForm.stateid} onChange={handleSubChange} className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                        <option value="">Select State</option>
                        {states.map(s => <option key={s.id} value={s.id}>{s.state_name}</option>)}
                      </select>
                    </div>

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                      {loading ? 'Processing...' : 'Get OTP'}
                    </Button>
                  </form>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubVerifyOtp}>
                    <div className="text-center text-sm text-gray-500 mb-4">
                      Enter the OTPs sent to your mobile and email.
                    </div>
                    <Input 
                      label="Mobile OTP" 
                      value={subOtp.mobile_otp} 
                      onChange={(e) => setSubOtp({...subOtp, mobile_otp: e.target.value})} 
                      required 
                    />
                    <Input 
                      label="Email OTP" 
                      value={subOtp.email_otp} 
                      onChange={(e) => setSubOtp({...subOtp, email_otp: e.target.value})} 
                      required 
                    />
                     {error && <div className="text-red-500 text-sm">{error}</div>}
                    <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                      {loading ? 'Verifying...' : 'Subscribe'}
                    </Button>
                     <button type="button" onClick={() => setSubStep(1)} className="w-full text-center text-sm text-indigo-600 mt-2">Back</button>
                  </form>
                )}
              </Tab.Panel>

              {/* LOGIN PANEL */}
              <Tab.Panel>
                {loginStep === 1 ? (
                  <form className="space-y-6" onSubmit={handleLoginSendOtp}>
                     <Input 
                        id="loginInput" 
                        label="Email or Mobile Number" 
                        value={loginInput} 
                        onChange={(e) => setLoginInput(e.target.value)} 
                        required 
                      />
                      {error && <div className="text-red-500 text-sm">{error}</div>}
                      <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                        {loading ? 'Sending OTP...' : 'Get OTP'}
                      </Button>
                  </form>
                ) : (
                  <form className="space-y-6" onSubmit={handleLoginVerifyOtp}>
                     <div className="text-center text-sm text-gray-500 mb-4">
                      Enter the OTP sent to {loginInput}
                    </div>
                    <Input 
                        label="OTP" 
                        type="password"
                        value={loginOtp} 
                        onChange={(e) => setLoginOtp(e.target.value)} 
                        required 
                    />
                    {error && <div className="text-red-500 text-sm">{error}</div>}
                    <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                       {loading ? 'Verifying...' : 'Verify & Login'}
                    </Button>
                    <button type="button" onClick={() => setLoginStep(1)} className="w-full text-center text-sm text-indigo-600 mt-2">Back</button>
                  </form>
                )}
              </Tab.Panel>

            </Tab.Panels>
          </Tab.Group>

        </div>
      </div>
    </div>
  );
};

export default SubscribeLoginPage;
