import React from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import Footer from '../components/layout/Footer';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto glass p-8 rounded-2xl">
          <h1 className="text-4xl font-bold text-gradient mb-8">💸 Refund Policy</h1>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-red-900 mb-2">Strict No Refund Policy</h2>
            <p className="text-red-700">
              ServerPe follows a <strong>strict no refund policy</strong> for all digital project purchases.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Why No Refunds?</h2>
            <p className="text-gray-700 mb-3">This policy exists because:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Projects involve substantial personal effort and intellectual work</li>
              <li>Demos are provided before purchase</li>
              <li>Digital access and licenses cannot be revoked once exposed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Effort & Resource Consideration</h2>
            <p className="text-gray-700 mb-3">Each purchase consumes:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Development effort</li>
              <li>Demo time</li>
              <li>Support resources</li>
              <li>License generation and system binding</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Once these resources are allocated, they cannot be recovered, making refunds impractical and unfair.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Responsibility of Decision</h2>
            <p className="text-gray-700 mb-3">By proceeding with payment, the student confirms that:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>The demo was reviewed</li>
              <li>Requirements were understood</li>
              <li>System compatibility was verified</li>
            </ul>
            <p className="text-gray-700 mt-4 font-semibold">
              Refund requests based on change of mind, misunderstanding, or external academic pressure will not be entertained.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Payment Gateway Exceptions</h2>
            <p className="text-gray-700">
              Only in cases of confirmed duplicate payment or failed transactions (amount debited but order not created), resolution will be handled as per payment gateway rules.
            </p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-3">🛡️ Why This Policy Protects Everyone</h3>
            <ul className="list-none text-blue-800 space-y-2">
              <li>✔ Acknowledges personal effort & dedication</li>
              <li>✔ Sets ethical expectation on students</li>
              <li>✔ Strengthens no-refund justification</li>
              <li>✔ Reduces emotional refund disputes</li>
              <li>✔ Shows transparency & honesty</li>
              <li>✔ Looks reasonable to colleges & auditors</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default RefundPolicy;
