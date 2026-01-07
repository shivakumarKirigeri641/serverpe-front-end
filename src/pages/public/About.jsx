import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Profile Header */}
          <section className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
               <div className="relative w-48 h-48 rounded-full bg-white p-1.5 shadow-xl">
                 <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center overflow-hidden text-7xl select-none">
                   👨‍💻
                 </div>
               </div>
            </div>
            
            <div className="text-center md:text-left space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <span className="text-3xl">👨‍🦱</span>
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 italic tracking-tight">
                    Shivakumar V K
                  </h1>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  Software Engineer & Creator
                </h2>
              </div>
              <p className="text-xl text-indigo-600 font-medium max-w-2xl">
                12+ Years of Professional Experience in the IT Industry
              </p>
            </div>
          </section>

          {/* Philosophy Section */}
          <div className="grid gap-10">
             <section className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-slate-200 border border-slate-100 relative overflow-hidden group hover:border-indigo-100 transition-colors">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity transform rotate-12">
                   <svg className="w-40 h-40 text-indigo-600" fill="currentColor" viewBox="0 0 24 24">
                     <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                   </svg>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 text-lg">#</span> 
                  My Approach
                </h3>
                <div className="text-slate-600 leading-relaxed text-lg space-y-6 relative z-10">
                  <p>
                    ServerPe is NOT a corporate giant or a company—it is a solo initiative run entirely by me. 
                    Throughout my career, even I faced a lot of challenges in UI development—constantly 
                    searching for dynamic and realistic APIs, only to be held back by industry restrictions, 
                    static mock data, or accessibility hurdles.
                  </p>
                  <p>
                    Truly understanding these challenges from a developer's perspective, I decided to take a 
                    small approach like this. My goal is to bridge that gap with robust, ready-to-use{' '}
                    <strong className="text-slate-900 bg-indigo-50 px-1 rounded">DESI APIs</strong> that reflect the actual complexity 
                    of real-world Indian systems, empowering individual developers and small teams to build 
                    without being blocked by backend availability.
                  </p>
                </div>
             </section>

             <section className="bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl p-10 sm:p-14 text-center shadow-2xl shadow-indigo-200 relative overflow-hidden text-white">
                <div className="absolute top-6 left-6 text-6xl opacity-10 animate-pulse">🇮🇳</div>
                <div className="absolute bottom-6 right-6 text-6xl opacity-10 animate-bounce">🚀</div>
                
                <h3 className="text-3xl sm:text-5xl font-extrabold mb-8 tracking-tight">
                  "Local is Vocal"
                </h3>
                <p className="text-indigo-100 text-xl leading-relaxed italic max-w-3xl mx-auto font-medium">
                  Why go global when we can build world-class solutions right here? These APIs are crafted 
                  with the Indian context in mind—from intricate Train Reservation logic to diverse Vehicle 
                  Specifications. Let's build products that resonate with our roots while matching global standards.
                </p>
                <div className="mt-10">
                  <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-2 rounded-full text-sm font-bold tracking-wide uppercase">
                    Made in India <span className="text-lg">🇮🇳</span> For the World
                  </span>
                </div>
             </section>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                 </div>
                 <h4 className="text-xl font-bold text-slate-900 mb-3">For UI Developers</h4>
                 <p className="text-slate-600 leading-relaxed">
                   Stop mocking JSON files manually. Get dynamic responses, error states, and realistic latency 
                   to test your loading skeletons and error boundaries effectively.
                 </p>
               </div>
               
               <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
                 <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                 </div>
                 <h4 className="text-xl font-bold text-slate-900 mb-3">For QA Engineers</h4>
                 <p className="text-slate-600 leading-relaxed">
                   Validate edge cases like "Waiting List" PNRs, "Sold Out" trains, and specific HTTP error 
                   codes without needing a live production database.
                 </p>
               </div>
             </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
