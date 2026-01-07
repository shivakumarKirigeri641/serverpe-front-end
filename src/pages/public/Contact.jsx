import React, { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import apiService from '../../api/apiService';

const Contact = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    rating: 5,
    category_name: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiService.fetchContactCategories();
        
        if (res.data && res.data.data.length > 0) {
          setCategories(res.data.data);
          setFormData(prev => ({ ...prev, category_name: res.data.data[0].category_name }));
        }
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      await apiService.submitContactForm(formData);
      setSubmitted(true);
      setFormData({
        user_name: "",
        email: "",
        rating: 5,
        category_name: categories[0]?.category_name || "",
        message: "",
      });
    } catch (err) {
      console.error("Submission failed", err);
      setError("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">      
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Decorative Background */ }
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50 -z-10 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-50 -z-10 animate-blob animation-delay-2000"></div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">How is ServerPe?</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
               Have a suggestion, found a bug, or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
             {submitted ? (
               <div className="p-16 text-center">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">Message Sent!</h3>
                  <p className="text-slate-600 text-lg mb-8">Thank you for your feedback. We appreciate your contribution to making ServerPe better.</p>
                  <Button variant="secondary" onClick={() => setSubmitted(false)}>
                    Send Another Message
                  </Button>
               </div>
             ) : (
               <div className="grid md:grid-cols-5 h-full">
                  {/* Contact Info Side */}
                  <div className="bg-slate-900 text-white p-10 md:col-span-2 flex flex-col justify-between relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 z-0"></div>
                     <div className="z-10">
                        <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                        <div className="space-y-6">
                           <div className="flex items-start gap-4">
                              <span className="p-2 bg-white/10 rounded-lg"><svg className="w-5 h-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></span>
                              <div>
                                 <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Email</p>
                                 <a href="mailto:support@serverpe.in" className="text-indigo-200 hover:text-white transition-colors">support@serverpe.in</a>
                              </div>
                           </div>
                           <div className="flex items-start gap-4">
                              <span className="p-2 bg-white/10 rounded-lg"><svg className="w-5 h-5 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></span>
                              <div>
                                 <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Located at</p>
                                 <p className="text-slate-300">Sirsi, India</p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="z-10 mt-12">
                        <p className="text-slate-400 text-sm">
                           "Feedback is the breakfast of champions."
                        </p>
                     </div>
                  </div>

                  {/* Form Side */}
                  <div className="p-10 md:col-span-3 bg-white">
                     {error && (
                       <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 text-sm flex items-center gap-2">
                         <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                         {error}
                       </div>
                     )}
                     
                     <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <Input 
                             label="Name" 
                             name="user_name"
                             value={formData.user_name}
                             onChange={handleChange}
                             required
                             placeholder="Your Name"
                           />
                           <Input 
                             label="Email" 
                             name="email"
                             type="email"
                             value={formData.email}
                             onChange={handleChange}
                             required
                             placeholder="you@example.com"
                           />
                        </div>

                        <div>
                           <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-0.5">Category</label>
                           <select 
                             name="category_name"
                             value={formData.category_name}
                             onChange={handleChange}
                             className="block w-full px-4 py-2.5 bg-white border border-slate-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                           >
                             {categories.map(cat => (
                               <option key={cat.category_name} value={cat.category_name}>{cat.category_name}</option>
                             ))}
                           </select>
                        </div>
                        
                        <div>
                           <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-0.5">Rate Experience</label>
                           <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map(star => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => handleRatingChange(star)}
                                  className={`text-2xl focus:outline-none transition-transform hover:scale-110 ${star <= formData.rating ? 'text-yellow-400' : 'text-slate-200'}`}
                                >
                                  ★
                                </button>
                              ))}
                           </div>
                        </div>

                        <div>
                           <label className="block text-sm font-semibold text-slate-700 mb-1.5 ml-0.5">Message</label>
                           <textarea
                             name="message"
                             rows="4"
                             value={formData.message}
                             onChange={handleChange}
                             required
                             placeholder="Tell us what you think..."
                             className="block w-full px-4 py-3 bg-white border border-slate-300 rounded-lg shadow-sm text-sm focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none resize-none"
                           ></textarea>
                        </div>

                        <Button type="submit" disabled={isSubmitting} className="w-full">
                           {isSubmitting ? 'Sending...' : 'Send Message'}
                        </Button>
                     </form>
                  </div>
               </div>
             )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
