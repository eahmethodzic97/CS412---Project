import React from 'react';
import { User } from 'lucide-react';
import DarkModeToggle from './ModeTogle';

const LoginPage = ({ username, setUsername, password, setPassword, error, onLogin, onGoToRegister, darkMode, toggleDarkMode }) => (
  <div className={`min-h-screen flex items-center justify-center p-3 sm:p-4 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-green-400 to-blue-500'}`}>
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
      <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>

    <div className={`rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-md ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
      <div className="flex justify-center mb-4 sm:mb-6">
        <div className={`p-3 sm:p-4 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-green-500'}`}>
          <User className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
        </div>
      </div>

      <h1 className={`text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
        Soccer Management
      </h1>

      <div>
        <div className="mb-3 sm:mb-4">
          <label className={`block mb-2 text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onLogin()}
            className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'border-gray-300 focus:ring-green-500'}`}
          />
        </div>

        <div className="mb-4 sm:mb-6">
          <label className={`block mb-2 text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onLogin()}
            className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'border-gray-300 focus:ring-green-500'}`}
          />
        </div>

        {error && <div className="mb-4 text-red-500 text-xs sm:text-sm">{error}</div>}

        <button
          onClick={onLogin}
          className={`w-full py-2 rounded-lg transition text-sm sm:text-base ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-green-500 text-white hover:bg-green-600'}`}
        >
          Login
        </button>

        <p className={`text-xs sm:text-sm mt-3 sm:mt-4 text-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Default: admin / admin123
        </p>

        <div className="mt-3 sm:mt-4 text-center">
          <span className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Don't have an account? </span>
          <button
            onClick={onGoToRegister}
            className={`font-semibold text-xs sm:text-sm hover:underline ${darkMode ? 'text-blue-400' : 'text-green-600'}`}
          >
            Register here
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;