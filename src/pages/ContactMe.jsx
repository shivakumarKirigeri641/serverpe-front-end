import React, { useState, useEffect } from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import Footer from '../components/layout/Footer';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import api from '../services/api';
import { FaEnvelope, FaUser, FaCommentDots } from 'react-icons/fa';

const ContactMe = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    category_name: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/serverpeuser/mystudents/contact-categories');
      if (response.data.successstatus) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/serverpeuser/mystudents/contact-categories', formData);
      if (response.data.successstatus) {
        setSuccess(true);
        setFormData({
          user_name: '',
          email: '',
          category_name: '',
          message: '',
        });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to submit contact form');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <PublicNavbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gradient text-center mb-4">
            Contact Us
          </h1>
          <p className="text-center text-gray-600 mb-12">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>

          <div className="glass p-8 rounded-2xl">
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
                <p className="font-semibold">Thank you for contacting us!</p>
                <p className="text-sm">We'll get back to you soon.</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <Input
                label="Your Name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                icon={FaUser}
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                icon={FaEnvelope}
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category_name"
                  value={formData.category_name}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat, index) => (
                    <option key={index} value={cat.category_name}>
                      {cat.category_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  required
                  rows="5"
                  className="input-field resize-none"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 glass rounded-xl">
              <FaEnvelope className="text-3xl text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600 text-sm">support@serverpe.in</p>
            </div>

            <div className="text-center p-6 glass rounded-xl">
              <FaCommentDots className="text-3xl text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Quick Response</h3>
              <p className="text-gray-600 text-sm">Usually within 24 hours</p>
            </div>

            <div className="text-center p-6 glass rounded-xl">
              <FaUser className="text-3xl text-primary-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Support</h3>
              <p className="text-gray-600 text-sm">Professional & Friendly</p>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ContactMe;
