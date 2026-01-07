import React, { useEffect, useState } from 'react';
import apiService from '../../api/apiService';
import { UserCircleIcon } from '@heroicons/react/24/solid';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await apiService.fetchUserProfile();
        if (res.data.successstatus) {
          setProfile(res.data.data);
        }
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Profile...</div>;
  if (!profile) return <div className="p-10 text-center">Failed to load profile.</div>;

  const DetailItem = ({ label, value }) => (
    <div className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
       <dt className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1">{label}</dt>
       <dd className="text-base text-gray-900 font-medium">{value || '-'}</dd>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

      <div className="bg-white shadow-xl shadow-slate-200/60 rounded-2xl overflow-hidden border border-gray-100">
         {/* Profile Header */}
         <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-10 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="h-24 w-24 rounded-full bg-white p-1 shadow-lg">
                    <div className="h-full w-full rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500">
                         <UserCircleIcon className="h-20 w-20" />
                    </div>
                </div>
                <div className="text-center sm:text-left">
                    <h2 className="text-3xl font-bold mb-1">{profile.user_name}</h2>
                    <p className="text-indigo-100 text-lg">{profile.college_name}</p>
                </div>
            </div>
         </div>

         <div className="p-8">
             <div className="flex items-center gap-2 mb-6 text-gray-900">
                <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
                <h3 className="text-xl font-bold">Personal & Academic Details</h3>
             </div>
             
             <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                 <div className="space-y-6">
                    <DetailItem label="Full Name" value={profile.user_name} />
                    <DetailItem label="Email Address" value={profile.email} />
                    <DetailItem label="Mobile Number" value={profile.mobile_number} />
                    <DetailItem label="Registered On" value={new Date(profile.registered_on).toLocaleDateString()} />
                 </div>
                 <div className="space-y-6">
                    <DetailItem label="College Name" value={profile.college_name} />
                    <DetailItem label="College ID" value={profile.college_id} />
                    <DetailItem label="Branch" value={profile.branch} />
                    <DetailItem label="Location" value={`${profile.college_place}, ${profile.college_district}, ${profile.college_state}`} />
                 </div>
             </dl>
         </div>
      </div>
    </div>
  );
};

export default Profile;
