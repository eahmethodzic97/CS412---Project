import React, { useState } from 'react';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import DarkModeToggle from './ModeTogle';

const PasswordValidationIndicator = ({ validation, darkMode }) => {
  const requirements = [
    { key: 'minLength', text: 'At least 8 characters' },
    { key: 'hasLetter', text: 'At least 1 letter' },
    { key: 'hasNumber', text: 'At least 1 number' },
    { key: 'hasSpecial', text: 'At least 1 special character' }
  ];

  return (
    <div className="mt-2 space-y-1">
      {requirements.map(item => (
        <div key={item.key} className={`text-xs flex items-center gap-1 ${validation[item.key] ? 'text-green-600' : darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          <span>{validation[item.key] ? '✓' : '○'}</span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
};

const RegistrationPage = ({ onRegisterSuccess, onBackToLogin, darkMode, toggleDarkMode }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasNumber: false,
    hasLetter: false,
    hasSpecial: false
  });

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordValidation({
      minLength: value.length >= 8,
      hasNumber: /\d/.test(value),
      hasLetter: /[a-zA-Z]/.test(value),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value)
    });
  };

  const handleRegister = async () => {
    setError('');
    if (!username || !email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (!Object.values(passwordValidation).every(v => v)) {
      setError('Password does not meet all requirements');
      return;
    }
    try {
      await onRegisterSuccess({ username, email, password });
    } catch (err) {
      setError(err.message || 'Registration failed');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-3 sm:p-4 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-green-400 to-blue-500'}`}>
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
        <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>

      <div className={`rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-md max-h-[95vh] overflow-y-auto hide-scrollbar ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className={`p-3 sm:p-4 rounded-full ${darkMode ? 'bg-blue-600' : 'bg-green-500'}`}>
            <UserPlus className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
          </div>
        </div>

        <h1 className={`text-2xl sm:text-3xl font-bold text-center mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
          Create Account
        </h1>
        <p className={`text-center mb-4 sm:mb-6 text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Join Soccer Management System
        </p>

        <div>
          <div className="mb-3 sm:mb-4">
            <label className={`block mb-2 text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'border-gray-300 focus:ring-green-500'}`}
              placeholder="Choose a username"
            />
          </div>

          <div className="mb-3 sm:mb-4">
            <label className={`block mb-2 text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'border-gray-300 focus:ring-green-500'}`}
              placeholder="example@student.ius.edu.ba"
            />
            <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Must end with @student.ius.edu.ba or @ius.edu.ba
            </p>
          </div>

          <div className="mb-3 sm:mb-4">
            <label className={`block mb-2 text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'border-gray-300 focus:ring-green-500'}`}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
            <PasswordValidationIndicator validation={passwordValidation} darkMode={darkMode} />
          </div>

          <div className="mb-4 sm:mb-6">
            <label className={`block mb-2 text-sm sm:text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-3 sm:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${darkMode ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'border-gray-300 focus:ring-green-500'}`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
              </button>
            </div>
          </div>

          {error && <div className="mb-4 text-red-500 text-xs sm:text-sm">{error}</div>}

          <button
            onClick={handleRegister}
            className={`w-full py-2 rounded-lg transition mb-3 text-sm sm:text-base ${darkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-green-500 text-white hover:bg-green-600'}`}
          >
            Register
          </button>
          <button
            onClick={onBackToLogin}
            className={`w-full py-2 rounded-lg transition text-sm sm:text-base ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;