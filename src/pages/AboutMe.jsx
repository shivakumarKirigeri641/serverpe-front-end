import React from 'react';
import PublicNavbar from '../components/layout/PublicNavbar';
import Footer from '../components/layout/Footer';
import { FaGraduationCap, FaCode, FaHeart, FaLightbulb } from 'react-icons/fa';
import Card from '../components/common/Card';
import SEO from '../components/SEO/SEO';

const AboutMe = () => {
  return (
    <div className="min-h-screen">
      <SEO
        title="About ServerPe"
        description="Learn about ServerPe and how we help Computer Science and Information Science students with last-minute demo projects, presentations, and viva support."
        keywords="about serverpe, demo project help, CS student support, project documentation service"
        url="https://serverpe.in/about"
      />
      <PublicNavbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gradient text-center mb-8">
            About ServerPe
          </h1>
          
          <p className="text-center text-2xl font-semibold text-primary-600 mb-8 italic">
            "India's last minute demo project."
          </p>
          
          <div className="glass p-8 rounded-2xl mb-12">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Welcome to <span className="font-bold text-primary-600">ServerPe</span> - your trusted partner 
              in academic excellence! I specialize in providing premium, production-ready project solutions 
              for Computer Science and Information Science students.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              <span className="font-semibold text-gray-800">The Problem I Solved:</span> Like many students, 
              I've faced that stressful moment at the last minute when you don't know which project to fetch 
              and demo. The panic of scrambling for a working project, the uncertainty of whether it will even 
              run properly - I've been there. That's exactly why I created ServerPe. This is the solution born 
              from my own experience, so you never have to go through that last-minute chaos.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              My mission is to bridge the gap between academic learning and industry standards. Every project 
              I offer is meticulously crafted to reflect real-world scenarios, ensuring you gain practical 
              experience that matters in your career.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              With industry experience and a passion for education, I'm here to help you excel in your 
              academic presentations and kick-start your professional journey with confidence.
            </p>
          </div>

          <h2 className="text-3xl font-bold text-center text-gradient mb-8">My Core Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card hover className="text-center">
              <FaGraduationCap className="text-5xl text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Quality Education</h3>
              <p className="text-gray-600">
                I believe in providing top-notch educational resources that empower students 
                to succeed in their academic and professional endeavors.
              </p>
            </Card>

            <Card hover className="text-center">
              <FaCode className="text-5xl text-secondary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Industry Standards</h3>
              <p className="text-gray-600">
                All my projects follow industry best practices, clean code principles, 
                and modern development standards.
              </p>
            </Card>

            <Card hover className="text-center">
              <FaLightbulb className="text-5xl text-accent-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                I constantly update my projects with the latest technologies and 
                innovative approaches to keep you ahead of the curve.
              </p>
            </Card>

            <Card hover className="text-center">
              <FaHeart className="text-5xl text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Student Success</h3>
              <p className="text-gray-600">
                Your success is my success. I'm committed to helping you achieve 
                excellence in your presentations and projects.
              </p>
            </Card>
          </div>

          <div className="glass p-8 rounded-2xl mt-12">
            <h3 className="text-2xl font-bold text-center mb-6">Why Students Trust Me</h3>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-2">✓</span>
                <span>Real-time project scenarios that closely mimic industry applications</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-2">✓</span>
                <span>Comprehensive documentation including setup guides and technical specifications</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-2">✓</span>
                <span>Viva preparation materials based on actual interview experiences</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-2">✓</span>
                <span>Professional support throughout your project demo and presentation</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary-600 font-bold mr-2">✓</span>
                <span>Secure payment processing and instant delivery</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutMe;
