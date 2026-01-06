import React from "react";
import { Helmet } from "react-helmet";

const AboutMe = () => {
  return (
    <>
      <Helmet>
        <title>About ServerPe | Engineering Projects for CS & IS Students</title>
        <meta
          name="description"
          content="ServerPe provides industry-ready engineering projects for CS and IS students with demo, explanation, and academic guidance."
        />
      </Helmet>

      <div className="min-h-screen font-sans text-gray-900">
        {/* MAIN CONTENT */}
        <main className="flex-1 max-w-4xl mx-auto px-6 py-16">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-2xl">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="text-6xl">🎓</span>
              </div>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent italic">
                Shivakumar V K
              </h1>
              <h2 className="text-2xl font-bold text-gray-800 mt-2">
                Founder – ServerPe
              </h2>
              <p className="text-indigo-600 font-medium mt-2">
                12+ Years in IT | Engineering Project Mentor
              </p>
            </div>
          </div>

          {/* WHAT IS SERVERPE */}
          <section className="bg-white/80 backdrop-blur-sm border border-whiteShadow rounded-2xl p-8 mb-12 shadow-xl border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              What is ServerPe?
            </h2>
            <p className="text-gray-600 leading-relaxed font-medium">
              ServerPe is a student-focused platform that provides
              <strong className="text-indigo-600"> complete, real-world engineering projects </strong>
              for Computer Science (CS) and Information Science (IS) students.
              These projects are designed to help students understand
              architecture, data flow, and real-time system behavior.
            </p>
          </section>

          {/* WHY SERVERPE */}
          <section className="bg-white/80 backdrop-blur-sm border border-whiteShadow rounded-2xl p-8 mb-12 shadow-xl border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why I Started ServerPe
            </h2>
            <p className="text-gray-600 leading-relaxed space-y-4 font-medium">
              Over the years, I noticed many students struggling during
              final-year evaluations due to copied projects, incomplete
              implementations, or lack of clarity while explaining their work.
              <br /><br />
              ServerPe was created to bridge this gap by offering
              <strong className="text-indigo-600"> demo-ready projects </strong>
              with proper explanation and guidance, so students can confidently
              present and defend their work during reviews and vivas.
            </p>
          </section>

          {/* WHO IT IS FOR */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-lg font-bold text-indigo-700 mb-2">
                For CS / IS Students
              </h3>
              <p className="text-gray-600 text-sm">
                Get structured projects with proper database design,
                backend logic, frontend integration, and real-world use cases
                — not random GitHub code.
              </p>
            </div>

            <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
              <h3 className="text-lg font-bold text-indigo-700 mb-2">
                For Academic Success
              </h3>
              <p className="text-gray-600 text-sm">
                Projects are designed to help you clearly explain system
                architecture, workflows, and real-time behavior during
                internal and external evaluations.
              </p>
            </div>
          </section>
        </main>

        {/* FOOTER */}
        <footer className="border-t border-gray-200 bg-white/50 py-8 text-center mt-auto">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} ServerPe.in. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
};

export default AboutMe;
