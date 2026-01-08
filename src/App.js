import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import LandingPage from './pages/LandingPage';
import AboutMe from './pages/AboutMe';
import ContactMe from './pages/ContactMe';
import AuthPage from './pages/AuthPage';
import ProjectsPage from './pages/ProjectsPage';

// Dashboard Pages
import DashboardHome from './pages/dashboard/DashboardHome';
import ExploreProjects from './pages/dashboard/ExploreProjects';
import PurchaseDetails from './pages/dashboard/PurchaseDetails';
import SummaryPage from './pages/dashboard/SummaryPage';
import SuccessPayment from './pages/dashboard/SuccessPayment';
import PurchaseHistory from './pages/dashboard/PurchaseHistory';
import Profile from './pages/dashboard/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/contact" element={<ContactMe />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/auth" element={<AuthPage />} />

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

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
