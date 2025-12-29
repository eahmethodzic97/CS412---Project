import React from 'react';
import { Users, TrendingUp, Shield, Trophy, ArrowRight } from 'lucide-react';
import DarkModeToggle from './ModeTogle';
import FeatureCard from './FeatureCard';
import Footer from './Footer';
import logo from '/logo.png';

const Homepage = ({ onGetStarted, darkMode, toggleDarkMode }) => {
  const features = [
    { icon: Users, title: 'Player Management', desc: 'Comprehensive player profiles' },
    { icon: TrendingUp, title: 'Performance Tracking', desc: 'Monitor statistics in real-time' },
    { icon: Shield, title: 'Secure & Private', desc: 'Bank-level security' },
    { icon: Trophy, title: 'Team Success', desc: 'Organize efficiently' }
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-green-400 via-blue-500 to-purple-600'}`}>
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-12 lg:mb-16">
          <div className={`flex items-center mb-4 sm:mb-6 ${darkMode ? 'text-gray-100' : 'text-white'}`}>
            <img
              src={logo}
              alt="Logo"
              className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56 2xl:w-64"
            />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold -ml-6">
              Soccer Management System
            </h1>
          </div>
          <p className={`text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 max-w-2xl lg:max-w-3xl mx-auto px-4 ${darkMode ? 'text-gray-300' : 'text-white/90'}`}>
            The complete solution for managing your soccer team. Track players, monitor performance, and organize your team with ease.
          </p>
          <button
            onClick={onGetStarted}
            className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition transform hover:scale-105 shadow-2xl ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-white text-green-600 hover:bg-gray-100'}`}
          >
            Get Started <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 lg:mb-16">
          {features.map((feature, i) => (
            <FeatureCard key={i} {...feature} darkMode={darkMode} />
          ))}
        </div>
      </div>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Homepage;