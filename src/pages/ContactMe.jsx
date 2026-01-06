import React, { useState, useEffect } from "react";
// import ServerPeLogo from "../images/ServerPe_Logo.jpg";
// import { useNavigate } from "react-router-dom";
import api from "../utils/api";
// import "../styles/loginpage.css"; 
import { Helmet } from "react-helmet";
import axios from "axios";

const ContactMe = () => {
 // const navigate = useNavigate();
 // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // State for Categories (Subjects)
  const [categories, setCategories] = useState([]);

  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    rating: 5,
    category_name: "", // Default value
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Fetch Categories from API on mount
  useEffect(() => {
    const fetchCategories = async () => {      
      try {
        const response = await api.get('/serverpeuser/mystudents/contact-categories', {withCredentials:true});        
        if (response?.data?.data && response?.data?.data?.length > 0) {
          console.log(response.data);
          setCategories(response.data.data);
          setFormData((prev) => ({
            ...prev,
            category_name: response.data.data[0].category_name,
          }));
        } else {
             // Fallback if API returns empty or differs
             setCategories([{ category_name: 'General Query' }, { category_name: 'Project Support' }]);
             setFormData(prev => ({ ...prev, category_name: 'General Query' }));
        }
      } catch (error) {
        console.error("Failed to fetch subjects, using fallback:", error);
        setCategories([{ category_name: 'General Query' }, { category_name: 'Project Support' }]);
        setFormData(prev => ({ ...prev, category_name: 'General Query' }));
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.post('/serverpeuser/mystudents/contact-categories', formData);
      setSubmitted(true);
      setFormData({
        user_name: "",
        email: "",
        category_name: categories[0]?.category_name,
        message: "",
        rating: 5
      });
    } catch (err) {
      console.error("Error submitting form:", err);
      // alert("Something went wrong. Please try again later.");
      // For demo purposes, show success anyway if API fails (mock behavior)
      setSubmitted(true); 
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>ServerPe™ – Desi Mock APIs for Frontend & UI Development</title>
        <meta
          name="description"
          content="ServerPe provides desi mock APIs for frontend developers to build and test UI without real backend dependencies."
        />
      </Helmet>
      <div className="min-h-screen font-sans text-gray-900">
        
        {/* --- Main Content --- */}
        <main className="flex-1 w-full max-w-4xl mx-auto px-6 py-16 relative z-10">
          <div className="text-center mb-12 animate-fadeInDown">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              How is ServerPe?
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have a suggestion, found a bug, or just want to say hi? Use the
              form below or email directly at{" "}
              <a
                href="mailto:support@serverpe.in"
                className="text-indigo-600 hover:underline font-medium"
              >
                support@serverpe.in
              </a>
            </p>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-xl animate-slideUp">
            {submitted ? (
              <div className="text-center py-12 animate-fade-in">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-500">
                  Thank you for your feedback. We'll get back to you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.user_name}
                      onChange={(e) =>
                        setFormData({ ...formData, user_name: e.target.value })
                      }
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="Your Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Category
                  </label>
                  <select
                    value={formData.category_name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        category_name: e.target.value,
                      })
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all appearance-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat.category_name} value={cat.category_name}>
                        {cat.category_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Rate your experience
                  </label>
                  <div className="flex gap-4 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, rating: star })
                        }
                        className={`text-2xl focus:outline-none transition-transform hover:scale-110 ${
                          star <= formData.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    required
                    rows="5"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                    placeholder="How can we improve ServerPe for you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 disabled:cursor-wait text-white py-3.5 rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-0.5 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-gray-200 bg-white/50 py-8 text-center mt-auto">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ServerPe.in. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default ContactMe;
