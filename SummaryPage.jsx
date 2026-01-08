import React, { useState, useEffect } from "react";
import apiService from '../../api/apiService';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import loadRazorpay from "../../utils/loadRazorPay";
import PageLayout from "../../components/common/PageLayout";
import { useGlobalUI } from "../../context/GlobalUIContext";
import { Helmet } from "react-helmet";
import {
  parseError,
  isAuthError,
  validateRazorpayResponse,
} from "../../utils/errorHandler";

const SummaryPage = () => {
  const navigate = useNavigate();  
  const location = useLocation();
  const { startLoading, stopLoading, showError } = useGlobalUI();
  
  const [isProcessing, setIsProcessing] = useState(false);
  
  const selectedPlan = location.state?.purchaseData;
  // console.log(selectedPlan);

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    mobile_number: "",
    state_name:"",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {    
    const fetchProfileData = async () => {
    startLoading();
    try {
      const res = await apiService.fetchUserProfile();
      const data = res?.data?.data || {};
      setFormData({
        user_name: data.user_name || "",
        mobile_number: data.mobile_number || "",
        email: data.email || "",
        state_name: data.state_name || "",
      });
    } catch (error) {
      if (error.response?.status === 401) {        
        navigate("/auth");
      } else {
        showError("Failed to load user details.");
      }
    } finally {
      stopLoading();
    }
  }
    fetchProfileData();
  }, [navigate, startLoading, stopLoading, showError]);

  const validateForm = () => {
    let errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.user_name.trim()) errors.user_name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.mobile_number.trim()) {
      errors.mobile_number = "Mobile number is required";
    } else if (!phoneRegex.test(formData.mobile_number)) {
      errors.mobile_number = "Enter a valid 10-digit Indian mobile number";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true); // Keep local spinner for button if desired, or use global
    // Using simple local processing state for button feedback is fine, 
    // but actual network calls should be wrapped? 
    // Actually for payment flow, we might want to block UI.
    // Let's use global loading for the heavy lifting parts if needed, 
    // but Razorpay modal is external.
    
    try {
      // Step 1: Load Razorpay SDK
      const res = await loadRazorpay();
      if (!res) {
        showError("Razorpay payment gateway failed to load. Please check your internet connection.");
        setIsProcessing(false);
        return;
      }

      // Step 2: Create Payment Order
      const orderRes = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/serverpeuser/loggedinuser/razorpay/order`,
        { amount: selectedPlan?.total_payment },
        { withCredentials: true, timeout: 10000 }
      );

      if (!orderRes.data?.id) {
        throw new Error("Failed to create payment order. Invalid response from server.");
      }

      // Step 3: Configure Razorpay Options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: orderRes.data.amount,
        currency: "INR",
        name: "ServerPe",
        description: `Plan: ${selectedPlan?.project_details?.title || 'Project Purchase'}`,
        order_id: orderRes.data.id,
        handler: async function (response) {
          try {
            startLoading(); // Block UI during verification
            const validation = validateRazorpayResponse(response);
            if (!validation.success) {
              showError(validation.message);
              stopLoading();
              return;
            }

            const verifyRes = await axios.post(
              `${process.env.REACT_APP_BACKEND_URL}/serverpeuser/loggedinuser/razorpay/verify`,
              { ...response, ...formData },
              { withCredentials: true, timeout: 10000 }
            );

            if (verifyRes?.data?.statuscode) {
              navigate(
                `/payment/success?payment_id=${response.razorpay_payment_id}`,
                { state: {formData, selectedPlan} }
              );
            } else {
              showError(verifyRes?.data?.message || "Payment verification failed.");
            }
          } catch (err) {
            const parsedError = parseError(err);
             if (isAuthError(parsedError)) {
               navigate("/auth");
             } else {
               showError(parsedError.message || "An error occurred during verification.");
             }
          } finally {
             stopLoading();
          }
        },
        prefill: {
          name: formData.user_name,
          email: formData.email,
          contact: formData.mobile_number,
        },
        theme: { color: "#4f46e5" },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            console.info("Payment modal closed by user");
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      const parsedError = parseError(error);
      if (isAuthError(parsedError)) {
        navigate("/auth");
      } else {
        showError(parsedError.message || "Failed to initiate payment.");
      }
      setIsProcessing(false);
    }
  };

  if (!selectedPlan) {
      // Fallback if no plan data
      return (
        <PageLayout showNavbar={true}>
            <div className="flex flex-col items-center justify-center py-20">
                <h2 className="text-2xl text-white mb-4">No Purchase Selected</h2>
                <button onClick={() => navigate('/dashboard')} className="text-indigo-400 underline">Return to Dashboard</button>
            </div>
        </PageLayout>
      )
  }

  return (
    <PageLayout showNavbar={true}>
      <Helmet>
        <title>ServerPe™ – Payment Summary</title>
      </Helmet>
      
      <div className="max-w-2xl mx-auto w-full px-4 py-10">
          <h1 className="text-2xl font-bold mb-6 text-white leading-tight">Invoice & Payment</h1>
          
          <form
            onSubmit={handlePayment}
            noValidate
            className="bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-xl space-y-6"
          >
            {/* Plan Summary Card */}
            <div className="p-5 bg-indigo-900/20 rounded-xl border border-indigo-500/30 shadow-inner">
              <div className="flex justify-between items-center mb-1">
                <span className="text-indigo-200 text-sm font-medium">Project Code</span>
                <span className="font-mono font-bold text-indigo-400">
                  {selectedPlan?.project_details?.project_code}
                </span>
              </div>
              <div className="mt-4 space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-400">Base price</span>
                    <span className="text-lg font-bold text-white">
                      ₹{selectedPlan?.project_details?.base_price}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-gray-400">GST ({selectedPlan?.project_details?.gst_percent}%)</span>
                    <span className="text-lg font-bold text-white">
                       {/* GST calculation implicit in total - base? Or redundant display?
                           Let's stick to base + gst logic if needed, or just display static if hardcoded/backend calc
                       */}
                       ₹{(selectedPlan?.total_payment - selectedPlan?.project_details?.base_price).toFixed(2)}
                    </span>                
                  </div>
                  <div className="border-t border-indigo-500/20 my-2 pt-2">
                    <div className="flex justify-between items-baseline">
                        <span className="text-lg font-bold text-white">Payable Amount</span>
                        <span className="text-3xl font-extrabold text-green-400">
                        ₹{selectedPlan?.total_payment}
                        </span>
                    </div>
                  </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase text-gray-500 tracking-widest border-b border-gray-700 pb-2">
                Billing Information
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-900/50 border ${
                      formErrors.user_name
                        ? "border-red-500 ring-1 ring-red-500"
                        : "border-gray-600 focus:border-indigo-500"
                    } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all`}
                    placeholder="Enter your full name"
                  />
                  {formErrors.user_name && (
                    <p className="text-red-400 text-xs mt-1 font-medium">
                      {formErrors.user_name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full bg-gray-900/50 border ${
                      formErrors.email ? "border-red-500 ring-1 ring-red-500" : "border-gray-600 focus:border-indigo-500"
                    } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all`}
                    placeholder="email@example.com"
                  />
                  <p className="text-indigo-300/70 text-[11px] mt-1.5 flex items-start gap-1">
                    <span className="text-indigo-400">*</span>
                    This email will be used for payment notifications and sending your official tax invoice.
                  </p>
                  {formErrors.email && (
                    <p className="text-red-400 text-xs mt-1 font-medium">
                      {formErrors.email}
                    </p>
                  )}
                </div>

                <div>
                   <div className="grid grid-cols-2 gap-4">
                        <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wide">
                            Mobile (+91)
                        </label>
                        <input
                            type="tel"
                            name="mobile_number"
                            value={formData.mobile_number}
                            onChange={handleInputChange}
                            className={`w-full bg-gray-900/50 border ${
                            formErrors.mobile_number
                                ? "border-red-500 ring-1 ring-red-500"
                                : "border-gray-600 focus:border-indigo-500"
                            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all`}
                            placeholder="9876543210"
                        />
                        {formErrors.mobile_number && (
                            <p className="text-red-400 text-xs mt-1 font-medium">
                            {formErrors.mobile_number}
                            </p>
                        )}
                        </div>
                        <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wide">
                            State
                        </label>
                        <input
                            type="text"
                            name="state_name"
                            value={formData.state_name}
                            onChange={handleInputChange}
                            className={`w-full bg-gray-900/50 border ${
                            formErrors.state_name
                                ? "border-red-500 ring-1 ring-red-500"
                                : "border-gray-600 focus:border-indigo-500"
                            } rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all`}
                            placeholder="State"
                        />
                        {formErrors.state_name && (
                            <p className="text-red-400 text-xs mt-1 font-medium">
                            {formErrors.state_name}
                            </p>
                        )}
                        </div>
                    </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-700">
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 active:scale-[0.98] py-4 rounded-xl font-bold text-lg text-white transition-all shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:shadow-none"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Proceed to Payment"
                )}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                disabled={isProcessing}
                className="w-full bg-gray-700/50 hover:bg-gray-700 text-gray-300 py-3 rounded-xl font-medium transition-colors border border-gray-600/50"
              >
                Cancel & Go Back
              </button>
            </div>
          </form>
      </div>
    </PageLayout>
  );
};

export default SummaryPage;