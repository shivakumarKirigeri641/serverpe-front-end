import React, { useState, useContext } from 'react';
import api from "../utils/api";
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Lock, Mail, Phone, User, Building, MapPin, ArrowRight } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
// import api from '../utils/api';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('subscribe');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  
  // States loaded from landing page
  const states = JSON.parse(localStorage.getItem('serverpe_states') || '[]');

  // Form States
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    college: '',
    state: ''
  });
  const [loginInput, setLoginInput] = useState('shivakumar641@gmail.com');
  const [otp, setOtp] = useState('1234');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubscribeRequestOtp = async (e) => {
    e.preventDefault();
    /*setLoading(true);
    // Mock API call
    const response = await api.post('/serverpeuser/mystudents/subscribe/send-otp', {
      email: formData.email,
      mobile: formData.mobile,
    }, {withCredentials:true});
    console.log(response.data);
    setLoading(false);
    setOtpSent(true);
    toast.success('OTP sent to your email & mobile!');*/
  };

  const handleSubscribeVerify = async (e) => {
    e.preventDefault();
    /*setLoading(true);
    // Mock Verify
    setTimeout(() => {
        setLoading(false);
        toast.success('Subscription Successful! Please Login.');
        setOtpSent(false);
        setOtp('');
        setActiveTab('login');
    }, 1500);*/
  };

  const handleLoginRequestOtp = async (e) => {
    e.preventDefault();
    setOtpSent(false);
    setLoading(true);
    try {
      const response = await api.post('/serverpeuser/mystudents/login/send-otp', {
        input_field: loginInput
      }, {withCredentials:true});
      console.log('login:', response.data);
      toast.success('OTP sent successfully!');
      setOtpSent(true);
    } catch (error) {
      console.error("Login OTP Error:", error);
      toast.error(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoginVerify = async (e) => {
      e.preventDefault();
      setLoading(true);
      try{
        const response = await api.post('/serverpeuser/mystudents/login/verify-otp', {
          input_field: loginInput,
          otp: otp
        }, {withCredentials:true});
        console.log('login:', response.data);
        login(response?.data?.data);
        toast.success('Login Successful!');
        navigate('/dashboard');
      }
       catch (error) {
      console.error("Verify OTP Error:", error);
      toast.error(error.response?.data?.message || 'Failed to verify OTP. Please try again.');
    } finally {
      setLoading(false);
    }
      // Mock Login Verify
      /*setTimeout(() => {
          setLoading(false);
          // Create dummy user object
          const userData = {
               name: 'Test User',
               email: loginInput.includes('@') ? loginInput : 'test@example.com',
               mobile: !loginInput.includes('@') ? loginInput : '9999999999',
          };*/
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row min-h-[600px]"
      >
        {/* Left Side: Graphic / Info */}
         <div className="bg-indigo-600 text-white p-12 md:w-5/12 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/30 z-10"></div>
            <div className="relative z-20">
                <h2 className="text-4xl font-extrabold mb-6">{activeTab === 'subscribe' ? 'Join Us Today' : 'Welcome Back'}</h2>
                <p className="text-indigo-100 text-lg mb-8">
                    {activeTab === 'subscribe' 
                        ? 'Unlock access to professional real-world project scenarios and boost your development career.' 
                        : 'Access your dashboard, purchase history, and profile settings.'}
                </p>
                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="bg-white/20 p-2 rounded-lg"><User className="text-white" /></div>
                        <div>
                            <p className="text-sm opacity-80">Students Joined</p>
                            <p className="text-xl font-bold">10,000+</p>
                        </div>
                    </div>
                </div>
            </div>
             {/* Decorative Circles */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-indigo-400/30 rounded-full blur-3xl"></div>
         </div>

         {/* Right Side: Form */}
         <div className="p-8 md:p-12 md:w-7/12 bg-white relative">
            {/* Tabs */}
            <div className="flex bg-gray-100 p-1 rounded-xl mb-8 w-fit mx-auto md:mx-0">
                <button 
                    onClick={() => { setActiveTab('subscribe'); setOtpSent(false); }}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'subscribe' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Subscribe
                </button>
                <button 
                    onClick={() => { setActiveTab('login'); setOtpSent(false); }}
                    className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'login' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Login
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === 'subscribe' ? (
                    <motion.form 
                        key="subscribe"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={otpSent ? handleSubscribeVerify : handleSubscribeRequestOtp}
                        className="space-y-5"
                    >
                         {!otpSent ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase">Full Name</label>
                                        <div className="relative">
                                            <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="John Doe" />
                                            <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase">Mobile</label>
                                        <div className="relative">
                                            <input type="tel" name="mobile" required value={formData.mobile} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="9876543210" />
                                            <Phone size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Email Address</label>
                                    <div className="relative">
                                        <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="you@example.com" />
                                        <Mail size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase">College</label>
                                        <div className="relative">
                                            <select name="college" required value={formData.college} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all appearance-none bg-white">
                                                <option value="">Select College</option>
                                                <option value="IIT Bombay">IIT Bombay</option>
                                                <option value="IIT Delhi">IIT Delhi</option>
                                                <option value="Other">Other</option>
                                            </select>
                                            <Building size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-semibold text-gray-500 uppercase">State/Union</label>
                                        <div className="relative">
                                             <select name="state" required value={formData.state} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all appearance-none bg-white">
                                                <option value="">Select State</option>
                                                {states.map((s) => (
                                                    <option key={s.id} value={s.id}>{s.state_name}</option>
                                                ))}
                                            </select>
                                            <MapPin size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </>
                         ) : (
                             <div className="space-y-4">
                                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
                                    <p className="text-sm text-indigo-800">OTP sent to <span className="font-bold">{formData.email}</span> & <span className="font-bold">{formData.mobile}</span></p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Enter OTP</label>
                                    <div className="relative">
                                        <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-center tracking-widest font-bold text-lg" placeholder="• • • • • •" />
                                        <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                    </div>
                                </div>
                             </div>
                         )}

                        <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2">
                            {loading ? 'Processing...' : (otpSent ? 'Verify & Subscribe' : 'Get OTP')}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </motion.form>
                ) : (
                    <motion.form 
                        key="login"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        onSubmit={otpSent ? handleLoginVerify : handleLoginRequestOtp}
                        className="space-y-6 pt-8"
                    >
                         {!otpSent ? (
                            <div className="space-y-2">
                                <label className="text-xs font-semibold text-gray-500 uppercase">Email or Mobile Number</label>
                                <div className="relative">
                                    <input type="text" required value={loginInput} onChange={(e) => setLoginInput(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all" placeholder="Enter your registered email or mobile" />
                                    <User size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                </div>
                            </div>
                         ) : (
                            <div className="space-y-4">
                                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
                                    <p className="text-sm text-indigo-800">OTP sent to <span className="font-bold">{loginInput}</span></p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold text-gray-500 uppercase">Enter OTP</label>
                                    <div className="relative">
                                        <input type="text" required value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all text-center tracking-widest font-bold text-lg" placeholder="• • • • • •" />
                                        <Lock size={18} className="absolute left-3 top-3.5 text-gray-400" />
                                    </div>
                                </div>
                             </div>
                         )}

                        <button disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2">
                            {loading ? 'Processing...' : (otpSent ? 'Login' : 'Get OTP')}
                            {!loading && <ArrowRight size={20} />}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
         </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;
