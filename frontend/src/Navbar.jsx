import React from 'react';
import { LogOut } from 'lucide-react';
import DarkModeToggle from './ModeTogle';
import logo from '/logo.png';
const Navbar = ({ darkMode, toggleDarkMode, onLogout }) => (
  <nav className={`${darkMode ? 'bg-gray-800' : 'bg-green-600'} text-white p-3 sm:p-4 shadow-lg`}>
    <div className="container mx-auto px-2 sm:px-4 flex justify-between items-center">
      <div className={`flex items-center ${darkMode ? 'text-gray-100' : 'text-white'}`}>
        <img
          src={logo}
          alt="Logo"
          className="w-16 md:w-24 lg:w-24 xl:w-36 2xl:w-48"
        />
        <h1 className="text-2xl xl:text-3xl font-bold">
          Soccer Management System
        </h1>
      </div>
      <div className="flex items-center gap-2 sm:gap-3">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <button
          onClick={onLogout}
          className={`flex items-center gap-1 sm:gap-2 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-700 hover:bg-green-800'} px-3 sm:px-4 py-1.5 sm:py-2 rounded transition text-sm sm:text-base`}
        >
          <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Logout</span>
          <span className="sm:hidden">Exit</span>
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;