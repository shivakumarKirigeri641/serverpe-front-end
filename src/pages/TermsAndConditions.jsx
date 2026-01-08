import React from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import Footer from '../components/layout/Footer';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto glass p-8 rounded-2xl">
          <h1 className="text-4xl font-bold text-gradient mb-8">📜 Terms & Conditions</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Acknowledgement of Effort & Intellectual Work</h2>
            <p className="text-gray-700 mb-4">
              All projects provided by ServerPe are developed through significant individual effort, long working hours, and continuous improvement, often alongside regular professional commitments.
            </p>
            <p className="text-gray-700 mb-3">By accessing or purchasing a project, you acknowledge that:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>The work represents original intellectual effort</li>
              <li>Pricing reflects the time, expertise, and support involved</li>
              <li>Unauthorized sharing devalues this effort and is strictly prohibited</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. Educational Nature of Projects</h2>
            <p className="text-gray-700">
              Projects are intended strictly for educational and academic learning purposes.
              They are not sold as mass-produced software or generic templates.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Demo-Based Transparency</h2>
            <p className="text-gray-700 mb-3">ServerPe follows a demo-first approach so students can:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Understand the project flow</li>
              <li>Evaluate suitability</li>
              <li>Make an informed purchase decision</li>
            </ul>
            <p className="text-gray-700 mt-4 font-semibold">
              Once purchased, the student confirms that the demo was reviewed and accepted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. License & Usage Restrictions</h2>
            <p className="text-gray-700 mb-4">
              Each purchase grants a limited, non-transferable, single-user license.
            </p>
            <p className="text-gray-700 mb-3">Any misuse, copying, redistribution, or sharing:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Violates these Terms</li>
              <li>Disrespects the effort invested</li>
              <li>May result in immediate termination of access without refund</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-700 mb-3">ServerPe is not responsible for:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Misuse of the project</li>
              <li>Lack of preparation by the student</li>
              <li>Academic decisions by colleges or evaluators</li>
              <li>Loss caused by violation of guidelines provided during demo</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Ethical Use Expectation</h2>
            <p className="text-gray-700 mb-3">Students are expected to use projects ethically, with the intention to:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Learn</li>
              <li>Understand</li>
              <li>Present honestly</li>
            </ul>
            <p className="text-gray-700 mt-4 italic">
              ServerPe discourages misuse of projects purely for submission without understanding.
            </p>
          </section>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
            <p className="text-yellow-900 font-semibold">
              By using ServerPe services, you agree to these Terms & Conditions and commit to ethical usage of all provided materials.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
