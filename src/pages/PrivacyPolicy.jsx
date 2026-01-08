import React from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import Footer from '../components/layout/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto glass p-8 rounded-2xl">
          <h1 className="text-4xl font-bold text-gradient mb-8">🔐 Privacy Policy</h1>
          
          <p className="text-gray-600 mb-8">
            ServerPe App Solutions / <a href="https://serverpe.in" className="text-primary-600">serverpe.in</a>
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
            <p className="text-gray-700 mb-4">
              ServerPe App Solutions ("ServerPe", "we", "us", "our") respects your privacy and is committed to protecting the personal information of users accessing our website and services.
            </p>
            <p className="text-gray-700">
              This Privacy Policy explains how we collect, use, store, and protect your data when you use serverpe.in.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold mb-3">a) Personal Information</h3>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Mobile number</li>
              <li>College name</li>
              <li>State</li>
              <li>Login and verification details (OTP-related)</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">b) Technical Information</h3>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>Device and system details (used for license binding)</li>
              <li>IP address</li>
              <li>Browser and OS information</li>
              <li>Date & time of access</li>
            </ul>

            <h3 className="text-xl font-semibold mb-3">c) Payment Information</h3>
            <ul className="list-disc list-inside mb-4 text-gray-700 space-y-2">
              <li>Payment transaction IDs</li>
              <li>Order references</li>
            </ul>
            <p className="text-gray-600 italic">
              (We do NOT store card or UPI details. Payments are handled by secure third-party gateways.)
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Purpose of Data Collection</h2>
            <p className="text-gray-700 mb-3">Your data is collected only for:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>User authentication and verification</li>
              <li>Project licensing and system binding</li>
              <li>Demo coordination</li>
              <li>Invoice and GST compliance</li>
              <li>Customer support</li>
              <li>Legal and audit requirements</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Data Protection & Security</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>We use reasonable technical and organizational safeguards</li>
              <li>License and system identifiers are used only to prevent misuse</li>
              <li>Access to data is restricted to authorized personnel only</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Data Sharing</h2>
            <p className="text-gray-700 mb-3">We do not sell or rent your personal data.</p>
            <p className="text-gray-700 mb-3">Data may be shared only:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>With payment gateways (for transaction processing)</li>
              <li>When required by law or government authorities</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. User Rights</h2>
            <p className="text-gray-700 mb-3">You may:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Request profile updates (subject to verification rules)</li>
              <li>Request account deactivation</li>
              <li>Contact us for data-related queries</li>
            </ul>
            <p className="text-gray-700 mt-4">
              📧 Email: <a href="mailto:support@serverpe.in" className="text-primary-600 hover:underline">support@serverpe.in</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Policy Updates</h2>
            <p className="text-gray-700">
              ServerPe reserves the right to update this policy at any time. Continued use of the website implies acceptance of the updated policy.
            </p>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
