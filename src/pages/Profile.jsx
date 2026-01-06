import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="space-y-4">
                     <div className="grid grid-cols-2 gap-4 border-b pb-4">
                        <span className="text-gray-500">Name</span>
                        <span className="font-bold">{user?.name}</span>
                     </div>
                     <div className="grid grid-cols-2 gap-4 border-b pb-4">
                        <span className="text-gray-500">Email</span>
                        <span className="font-bold">{user?.email}</span>
                     </div>
                     <div className="grid grid-cols-2 gap-4 border-b pb-4">
                        <span className="text-gray-500">Mobile</span>
                        <span className="font-bold">{user?.mobile}</span>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;