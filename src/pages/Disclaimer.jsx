import React from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import Footer from '../components/layout/Footer';

const Disclaimer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      
      <div className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto glass p-8 rounded-2xl">
          <h1 className="text-4xl font-bold text-gradient mb-8">⚠️ Disclaimer</h1>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <p className="text-yellow-900 font-semibold">
              Please read this disclaimer carefully before using ServerPe's services.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">1. Educational Purpose Only</h2>
            <p className="text-gray-700 mb-4">
              All projects provided by ServerPe are intended strictly for educational and learning purposes. They are designed to help students understand concepts, technologies, and implementation approaches.
            </p>
            <p className="text-gray-700">
              These projects are NOT ready-to-deploy commercial products and should not be used as such without proper understanding and modifications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">2. No Guarantee of Academic Acceptance</h2>
            <p className="text-gray-700 mb-4">
              While our projects are created with quality and educational value in mind, ServerPe does not guarantee that:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Your college or university will accept the project</li>
              <li>The project will meet your specific academic requirements</li>
              <li>The project will receive any particular grade or evaluation</li>
              <li>External evaluators will approve the project</li>
            </ul>
            <p className="text-gray-700 mt-4 font-semibold">
              Academic acceptance depends on your institution's policies, requirements, and evaluation criteria.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">3. Student's Responsibility</h2>
            <p className="text-gray-700 mb-3">The student is responsible for:</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Understanding the project thoroughly before presentation</li>
              <li>Verifying compatibility with their academic requirements</li>
              <li>Making necessary customizations or modifications</li>
              <li>Being able to explain and defend the project</li>
              <li>Ensuring ethical use as per their institution's guidelines</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">4. Demo-Based Purchase Decision</h2>
            <p className="text-gray-700">
              ServerPe provides comprehensive demos before purchase to allow students to make informed decisions. By purchasing, you confirm that you have reviewed the demo and found the project suitable for your needs.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">5. License Limitations</h2>
            <p className="text-gray-700 mb-4">
              Each project comes with a single-user, limited license bound to your system. The license is:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Non-transferable</li>
              <li>For personal educational use only</li>
              <li>Subject to system binding restrictions</li>
              <li>Cannot be shared or redistributed</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">6. Technical Support Scope</h2>
            <p className="text-gray-700 mb-4">
              Support provided is limited to:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Installation and setup guidance</li>
              <li>Clarification of existing features</li>
              <li>Basic troubleshooting</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Support does NOT include custom development, major modifications, or debugging of changes made by the student.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">7. No Warranty</h2>
            <p className="text-gray-700">
              Projects are provided "as is" without any warranties. ServerPe is not responsible for any issues arising from the use or misuse of the projects, including but not limited to academic consequences, technical failures, or incompatibility with your systems.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Acceptance of Risk</h2>
            <p className="text-gray-700">
              By using ServerPe's services, you acknowledge that you understand these limitations and accept full responsibility for your decision to purchase and use our projects for your academic purposes.
            </p>
          </section>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8">
            <p className="text-blue-900 font-semibold">
              💡 <strong>Important:</strong> Always verify with your institution before purchasing any project to ensure it aligns with their policies and requirements.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Disclaimer;
