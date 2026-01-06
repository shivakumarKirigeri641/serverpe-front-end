import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import AboutMe from './pages/AboutMe';
import ContactMe from './pages/ContactMe';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardHome from './pages/DashboardHome';
import ExploreProjects from './pages/ExploreProjects';
import PurchaseDetails from './pages/PurchaseDetails';
import { PurchaseSummary, PaymentSuccess } from './pages/PurchasePages';
import PurchaseHistory from './pages/PurchaseHistory';
import Profile from './pages/Profile';

const PrivateRoute = ({ children }) => {
  const { user, loading } = React.useContext(AuthContext);
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return user ? children : <Navigate to="/auth" />;
};

function App() {
  return (
      <Router>
        <AuthProvider>
          <div className="min-h-screen font-sans text-gray-900">
            <Navbar />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/about" element={<AboutMe />} />
              <Route path="/contact" element={<ContactMe />} />
              <Route path="/explore" element={<ExploreProjects />} />

              {/* Protected Routes */}
              <Route path="/dashboard" element={<PrivateRoute><DashboardHome /></PrivateRoute>} />
              <Route path="/dashboard/explore" element={<PrivateRoute><ExploreProjects /></PrivateRoute>} />
              <Route path="/dashboard/purchase/:projectId" element={<PrivateRoute><PurchaseDetails /></PrivateRoute>} />
              <Route path="/dashboard/summary" element={<PrivateRoute><PurchaseSummary /></PrivateRoute>} />
              <Route path="/dashboard/success" element={<PrivateRoute><PaymentSuccess /></PrivateRoute>} />
              
              <Route path="/dashboard/history" element={<PrivateRoute><PurchaseHistory /></PrivateRoute>} />
              <Route path="/dashboard/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              
              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
            <Toaster position="top-right" toastOptions={{
               style: {
                 background: '#1e1b4b',
                 color: '#fff',
               },
            }} />
          </div>
        </AuthProvider>
      </Router>
  );
}

export default App;
