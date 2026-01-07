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
    <div className="py-4 border-b border-gray-100 last:border-0 grid grid-cols-1 sm:grid-cols-3 gap-4">
       <dt className="text-sm font-medium text-gray-500">{label}</dt>
       <dd className="text-sm text-gray-900 sm:col-span-2 font-medium">{value || '-'}</dd>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center gap-6 mb-8">
         <div className="h-20 w-20 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-500">
           <UserCircleIcon className="h-20 w-20" />
         </div>
         <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile.user_name}</h1>
            <p className="text-gray-500">{profile.email}</p>
         </div>
      </div>

      <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-100">
         <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <h2 className="text-lg font-medium text-gray-900">Personal & Academic Details</h2>
         </div>
         <div className="px-6">
            <dl>
               <DetailItem label="Full Name" value={profile.user_name} />
               <DetailItem label="Email Address" value={profile.email} />
               <DetailItem label="Mobile Number" value={profile.mobile_number} />
               <DetailItem label="Branch" value={profile.branch} />
               <DetailItem label="College Name" value={profile.college_name} />
               <DetailItem label="College ID" value={profile.college_id} />
               <DetailItem label="Place" value={profile.college_place} />
               <DetailItem label="District" value={profile.college_district} />
               <DetailItem label="State" value={profile.college_state} />
               <DetailItem label="Registered On" value={new Date(profile.registered_on).toLocaleDateString()} />
            </dl>
         </div>
      </div>
    </div>
  );
};

export default Profile;
