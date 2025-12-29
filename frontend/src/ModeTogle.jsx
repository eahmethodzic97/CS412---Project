import React from 'react';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => (
    <button
        onClick={toggleDarkMode}
        className={`${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white/20 hover:bg-white/30'} backdrop-blur-lg px-4 py-2 rounded-lg transition text-white shadow-lg flex items-center gap-2 font-semibold`}
        title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
        {darkMode ? '☀️ Light' : '🌙 Dark'}
    </button>
);

export default DarkModeToggle;