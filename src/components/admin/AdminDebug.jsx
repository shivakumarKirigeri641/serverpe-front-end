import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

/**
 * AdminDebug - Temporary component to debug admin status
 * Add this to any page to see your current auth state
 */
const AdminDebug = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="fixed bottom-4 right-4 bg-red-100 border-2 border-red-400 rounded-lg p-4 shadow-lg z-50 max-w-sm">
        <h3 className="font-bold text-red-800 mb-2">🔒 Not Authenticated</h3>
        <p className="text-sm text-red-700">You need to login first</p>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 border-2 rounded-lg p-4 shadow-lg z-50 max-w-sm ${
      isAdmin ? 'bg-green-100 border-green-400' : 'bg-yellow-100 border-yellow-400'
    }`}>
      <h3 className={`font-bold mb-2 ${isAdmin ? 'text-green-800' : 'text-yellow-800'}`}>
        {isAdmin ? '✅ Admin User' : '⚠️ Regular User'}
      </h3>
      <div className="text-xs space-y-1">
        <p><strong>Name:</strong> {user?.user_name || 'N/A'}</p>
        <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
        <p><strong>Mobile:</strong> {user?.mobile_number || 'N/A'}</p>
        <p><strong>is_admin:</strong> <code className="bg-gray-200 px-1 rounded">{String(user?.is_admin)}</code></p>
      </div>
      {!isAdmin && (
        <div className="mt-3 p-2 bg-yellow-200 rounded text-xs">
          <strong>⚠️ Backend Issue:</strong> Your account needs <code>is_admin=true</code> in the database
        </div>
      )}
    </div>
  );
};

export default AdminDebug;
