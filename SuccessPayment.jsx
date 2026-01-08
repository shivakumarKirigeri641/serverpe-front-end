import React, { useEffect, useState, useCallback } from "react";
import ConfettiSparkles from '../../components/ConfettiSparkles';
import { Helmet } from "react-helmet";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import apiService from "../../api/apiService";
import PageLayout from "../../components/common/PageLayout";
import { useGlobalUI } from "../../context/GlobalUIContext";

const SuccessPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();  
  const [searchParams] = useSearchParams();
  const { startLoading, stopLoading, showError } = useGlobalUI();

  const [orderDetails, setOrderDetails] = useState(null);
  const [userState, setUserState] = useState("");
  const [resultFullOrders, setresultFullOrders] = useState(null);

  const paymentId = searchParams.get("payment_id");
  const summaryFormData = location?.state;

  const fetchPaymentDetails = useCallback(async () => {
    startLoading();

    try {
      // 1. Fetch User Profile for State Info
      const profileResponse = await apiService.fetchUserProfile();
      if (profileResponse?.data?.successstatus) {
        const profileData = profileResponse.data.data;
        setUserState(profileData.state_name);
      }

      // 2. Fetch Payment Details
      if (paymentId) {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/serverpeuser/loggedinuser/razorpay/status`,
          {
            razorpay_payment_id: paymentId,
            summaryFormData: summaryFormData,
          },
          { withCredentials: true }
        );
        
        if (response?.data?.data?.successstatus) {
          const data = response?.data.data;
          setresultFullOrders(data);
          setOrderDetails({
            transaction_id: data.result_transaction.razorpay_order_id,
            amount: (data.result_transaction.amount / 100).toFixed(2),
            plan_name: data.result_transaction.description || "API Subscription",
            credits_added: "Applied to Account",
            date: new Date(data.result_transaction.created_at * 1000).toLocaleString(),
            status: data.result_transaction.status === "captured" ? "Success" : data.result_transaction.status,
            email: !data.result_user_details.myemail ? "Not provided" : data.result_user_details.myemail,
          });
        } else {
          throw new Error("Payment details could not be retrieved.");
        }
      } else {
        throw new Error("No payment information found.");
      }
    } catch (error) {
       console.error("Failed to fetch details", error);
       if (error?.response && error?.response?.status === 401) {
         navigate("/auth");
       } else {
         showError(error.message || "Failed to load payment summary.");
         navigate("/dashboard"); // Redirect back to dashboard on failure? Or stay here?
         // Staying fits better to show error, but we are using global modal.
         // If global modal closes, user sees this page empty?
         // Maybe just show error and let user navigate.
       }
    } finally {
      stopLoading();
    }
  }, [paymentId, navigate, summaryFormData, startLoading, stopLoading, showError]);

  useEffect(() => {
    fetchPaymentDetails();
  }, [fetchPaymentDetails]);

  // Tax Calculation Logic
  const calculateTax = () => {
    if (!orderDetails) return null;
    const totalAmount = parseFloat(orderDetails.amount);
    const baseAmount = totalAmount / 1.18;
    const totalTax = totalAmount - baseAmount;

    const isKarnataka = userState?.toLowerCase() === "karnataka";

    return {
      baseAmount: baseAmount.toFixed(2),
      totalTax: totalTax.toFixed(2),
      isKarnataka,
      cgst: (totalTax / 2).toFixed(2),
      sgst: (totalTax / 2).toFixed(2),
      igst: totalTax.toFixed(2),
    };
  };

  const taxDetails = calculateTax();

  const handleDownloadInvoice = async () => {
    try {
      startLoading();
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/serverpeuser/loggedinuser/invoices/download/${resultFullOrders?.result_credit?.id}`,
        { responseType: "blob", withCredentials: true }
      );

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ServerPe_Invoice_${resultFullOrders?.result_credit?.id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      showError("Failed to download invoice. Please try again later.");
    } finally {
        stopLoading();
    }
  };
  
  if (!orderDetails) return null; // Or some skeleton/loading state handled by global UI

  return (
    <PageLayout showNavbar={true}>
      <Helmet>
        <title>ServerPe™ – Payment Successful</title>
      </Helmet>
      
      <ConfettiSparkles />

      <div className="max-w-2xl mx-auto px-6 py-10 flex flex-col items-center justify-center relative z-10">
        <div className="bg-gray-800/80 backdrop-blur-md border border-gray-700 rounded-2xl p-8 shadow-2xl w-full text-center animate-fade-in-up">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-green-500/30">
            <svg
              className="w-10 h-10 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-400 mb-8">Thank you for your purchase.</p>

          {/* Order Details */}
          {orderDetails && taxDetails && (
            <div className="bg-gray-900/50 rounded-xl p-6 mb-8 text-left space-y-3 border border-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Transaction ID</span>
                <span className="text-white font-mono text-sm">
                  {orderDetails.transaction_id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Plan Purchased</span>
                <span className="text-indigo-400 font-medium">
                  {orderDetails.plan_name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Date & time</span>
                <span className="text-gray-300 text-sm">
                  {orderDetails.date}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Email</span>
                <span className="text-gray-300 text-sm">
                  {orderDetails.email}
                </span>
              </div>

              <div className="border-t border-gray-700 my-2"></div>

              {/* Tax Breakup */}
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Base Amount</span>
                <span className="text-gray-300 text-sm">
                  ₹{taxDetails.baseAmount}
                </span>
              </div>

              {taxDetails.isKarnataka ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">CGST (9%)</span>
                    <span className="text-gray-300 text-sm">
                      ₹{taxDetails.cgst}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">SGST (9%)</span>
                    <span className="text-gray-300 text-sm">
                      ₹{taxDetails.sgst}
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between">
                  <span className="text-gray-400 text-sm">IGST (18%)</span>
                  <span className="text-gray-300 text-sm">
                    ₹{taxDetails.igst}
                  </span>
                </div>
              )}

              <div className="border-t border-gray-700 pt-3 flex justify-between">
                <span className="text-gray-300 font-semibold">
                  Total Paid
                </span>
                <span className="text-white font-bold text-lg">
                  ₹{orderDetails.amount}
                </span>
              </div>
            </div>
          )}

          {/* Buttons Row */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <button
              onClick={handleDownloadInvoice}
              className="bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Invoice
            </button>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="text-indigo-400 hover:text-indigo-300 text-sm hover:underline"
          >
            Go to Dashboard Now
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default SuccessPayment;
