import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import AboutMe from './pages/AboutMe';
import ContactMe from './pages/ContactMe';
import AuthPage from './pages/AuthPage';
import ProjectsPage from './pages/ProjectsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RefundPolicy from './pages/RefundPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import Disclaimer from './pages/Disclaimer';

// Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome';
import ExploreProjects from './pages/dashboard/ExploreProjects';
import PurchaseDetails from './pages/dashboard/PurchaseDetails';
import SummaryPage from './pages/dashboard/SummaryPage';
import SuccessPayment from './pages/dashboard/SuccessPayment';
import PurchaseHistory from './pages/dashboard/PurchaseHistory';
import Profile from './pages/dashboard/Profile';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import LicenseManagement from './pages/admin/LicenseManagement';
import LicenseDetails from './pages/admin/LicenseDetails';
import UserManagement from './pages/admin/UserManagement';
import UserDetails from './pages/admin/UserDetails';
import SystemHealth from './pages/admin/SystemHealth';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/contact" element={<ContactMe />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/disclaimer" element={<Disclaimer />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/explore-projects"
            element={
              <ProtectedRoute>
                <ExploreProjects />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/purchase-details/:id"
            element={
              <ProtectedRoute>
                <PurchaseDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/summary"
            element={
              <ProtectedRoute>
                <SummaryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/payment-success"
            element={
              <ProtectedRoute>
                <SuccessPayment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/purchase-history"
            element={
              <ProtectedRoute>
                <PurchaseHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Admin Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminDashboard />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/licenses"
            element={
              <AdminProtectedRoute>
                <LicenseManagement />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/licenses/:license_key"
            element={
              <AdminProtectedRoute>
                <LicenseDetails />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminProtectedRoute>
                <UserManagement />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/users/:user_id"
            element={
              <AdminProtectedRoute>
                <UserDetails />
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/system"
            element={
              <AdminProtectedRoute>
                <SystemHealth />
              </AdminProtectedRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

