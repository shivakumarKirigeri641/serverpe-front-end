import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import LandingPage from './pages/public/LandingPage';
import SubscribeLoginPage from './pages/public/SubscribeLoginPage';
import About from './pages/public/About';
import Contact from './pages/public/Contact';

import DashboardHome from './pages/dashboard/DashboardHome';
import ExploreProjects from './pages/dashboard/ExploreProjects';
import PurchaseDetails from './pages/dashboard/PurchaseDetails';
import SummaryPage from './pages/dashboard/SummaryPage';
import PurchaseHistory from './pages/dashboard/PurchaseHistory';
import Profile from './pages/dashboard/Profile';
import SuccessPayment from './pages/dashboard/SuccessPayment';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App min-h-screen bg-gray-50 text-gray-900 font-sans antialiased flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<SubscribeLoginPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected Routes (Placeholder structure) */}
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/dashboard/explore" element={<ExploreProjects />} />
              <Route path="/dashboard/explore/:id" element={<PurchaseDetails />} />
              <Route path="/dashboard/checkout/summary" element={<SummaryPage />} />
              <Route path="/dashboard/history" element={<PurchaseHistory />} />
              <Route path="/dashboard/profile" element={<Profile />} />
              <Route path="/payment/success" element={<SuccessPayment />} />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
