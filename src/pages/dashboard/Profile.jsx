import React, { useState, useEffect } from 'react';
import DashboardNavbar from '../../components/layout/DashboardNavbar';
import Footer from '../../components/layout/Footer';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Loader from '../../components/common/Loader';
import { useAuth } from '../../contexts/AuthContext';
import authService from '../../services/authService';
import api from '../../services/api';
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaMapMarkerAlt, FaEdit } from 'react-icons/fa';

const Profile = () => {
  const { user, checkAuth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    user_name: '',
    fk_college_id: '',
    fk_state_id: '',
  });

  const [states, setStates] = useState([]);
  const [colleges] = useState([
    { id: 1, name: 'Acharya Institute of Technology' },
    { id: 2, name: 'BMS College of Engineering' },
    { id: 3, name: 'RV College of Engineering' },
    { id: 4, name: 'PES University' },
    { id: 5, name: 'MSRIT' },
  ]);

  useEffect(() => {
    fetchProfile();
    fetchStates();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authService.getUserProfile();
      if (response.successstatus) {
        setProfile(response.data);
        setFormData({
          user_name: response.data.user_name,
          fk_college_id: response.data.college_id,
          fk_state_id: response.data.state_name ? 
            states.find(s => s.state_name === response.data.state_name)?.id || '' : '',
        });
      }
      console.log('profile:', response.data);
    } catch (error) {
      setError('Failed to load profile');
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const cachedStates = sessionStorage.getItem('states');
      if (cachedStates) {
        setStates(JSON.parse(cachedStates));
      } else {
        const response = await api.get('/serverpeuser/mystudents/states');
        if (response.data.success) {
          setStates(response.data.data);
          sessionStorage.setItem('states', JSON.stringify(response.data.data));
        }
      }
    } catch (error) {
      console.error('Error fetching states:', error);
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
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const response = await authService.updateUserProfile({
        userName: formData.user_name,
        collegeId: parseInt(formData.fk_college_id),
        stateId: parseInt(formData.fk_state_id),
      });

      if (response.successstatus) {
        setSuccess('Profile updated successfully!');
        setEditing(false);
        await checkAuth(); // Refresh user data
        await fetchProfile();
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <DashboardNavbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader size="lg" text="Loading profile..." />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gradient mb-2">My Profile</h1>
              <p className="text-gray-600">Manage your account information</p>
            </div>
            {!editing && (
              <Button variant="outline" onClick={() => setEditing(true)}>
                <FaEdit className="mr-2" />
                Edit Profile
              </Button>
            )}
          </div>

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

          {editing ? (
            <form onSubmit={handleSubmit} className="glass p-8 rounded-2xl">
              <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
              
              <Input
                label="Full Name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                required
              />

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  College <span className="text-red-500">*</span>
                </label>
                <select
                  name="fk_college_id"
                  value={formData.fk_college_id}
                  onChange={handleChange}
                  required
                  className="input-field"
                >
                  <option value="">Select College</option>
                  {colleges.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Union Territory <span className="text-red-500">*</span>
                </label>
                <select
                  name="fk_state_id"
                  value={formData.fk_state_id}
                  onChange={handleChange}
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

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={() => {
                    setEditing(false);
                    setError('');
                    setFormData({
                      user_name: profile.user_name,
                      fk_college_id: profile.college_id,
                      fk_state_id: profile.state_name ? 
                        states.find(s => s.state_name === profile.state_name)?.id || '' : '',
                    });
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  className="flex-1"
                  disabled={saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="glass p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-3">
                    <FaUser className="text-2xl text-primary-600 mt-1" />
                    <div>
                      <p className="text-gray-600 text-sm">Full Name</p>
                      <p className="font-semibold text-lg">{profile?.user_name}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <FaEnvelope className="text-2xl text-primary-600 mt-1" />
                    <div>
                      <p className="text-gray-600 text-sm">Email Address</p>
                      <p className="font-semibold text-lg">{profile?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <FaPhone className="text-2xl text-primary-600 mt-1" />
                    <div>
                      <p className="text-gray-600 text-sm">Mobile Number</p>
                      <p className="font-semibold text-lg">{profile?.mobile_number}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <FaGraduationCap className="text-2xl text-primary-600 mt-1" />
                    <div>
                      <p className="text-gray-600 text-sm">Branch</p>
                      <p className="font-semibold text-lg">{profile?.branch || 'Not specified'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* College Information */}
              <div className="glass p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">College Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">College Name</p>
                    <p className="font-semibold text-lg">{profile?.college_name || 'Not specified'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Location</p>
                    <p className="text-gray-700">
                      {profile?.college_place && profile?.college_district ? 
                        `${profile.college_place}, ${profile.college_district}` : 
                        'Not available'
                      }
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <FaMapMarkerAlt className="text-2xl text-primary-600 mt-1" />
                    <div>
                      <p className="text-gray-600 text-sm">State</p>
                      <p className="font-semibold text-lg">
                        {profile?.state_name || 'Not specified'}
                        {profile?.state_code && ` (${profile.state_code})`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Information */}
              <div className="glass p-8 rounded-2xl">
                <h2 className="text-2xl font-bold mb-6">Account Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">User ID</p>
                    <p className="font-mono font-semibold">{profile?.user_id}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Registration Date</p>
                    <p className="font-semibold">
                      {profile?.registered_on ? new Date(profile.registered_on).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Last Profile Update</p>
                    <p className="font-semibold">
                      {profile?.last_profile_update ? new Date(profile.last_profile_update).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Email Verified</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      profile?.is_email_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {profile?.is_email_verified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Mobile Number Verified</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${
                      profile?.is_mobile_verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {profile?.is_mobile_verified ? 'Verified' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
