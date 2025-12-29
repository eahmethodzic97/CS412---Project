import React, { useState, useEffect } from 'react';
import Homepage from './Homepage';
import LoginPage from './LoginPage';
import RegistrationPage from './RegistrationPage';
import Dashboard from './Dashboard';
import PlayerDetailsModal from './PlayerDetailsModal';
import PlayerFormModal from './PlayerFormModal';
import apiService from './apiService';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'login', 'register', 'dashboard'
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [players, setPlayers] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState('create');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '', age: '', position: '', jerseyNumber: '', nationality: '',
    height: '', weight: '', joinDate: '', contractEnd: '', salary: '',
    medicalHistory: '', emergencyContact: '', address: '', phone: '', email: '', status: 'active', image: ''
  });

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
      fetchPlayers(savedToken);
    }
  }, []);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  const fetchPlayers = async (authToken) => {
    try {
      const data = await apiService.getPlayers(authToken);
      setPlayers(data);
    } catch (err) {
      console.error('Error fetching players:', err);
    }
  };

  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  const handleGoToRegister = () => {
    setCurrentPage('register');
  };

  const handleBackToLogin = () => {
    setCurrentPage('login');
  };

  const handleRegister = async (userData) => {
    setError('');
    try {
      const data = await apiService.register(userData.username, userData.email, userData.password);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
      fetchPlayers(data.token);
    } catch (err) {
      throw err;
    }
  };

  const handleLogin = async () => {
    setError('');
    try {
      const data = await apiService.login(username, password);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setIsLoggedIn(true);
      setCurrentPage('dashboard');
      fetchPlayers(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setIsLoggedIn(false);
    setPlayers([]);
    setUsername('');
    setPassword('');
    setCurrentPage('home');
  };

  const handleViewPlayer = (player) => {
    setSelectedPlayer(player);
    setShowDetailsModal(true);
  };

  const handleAddPlayer = () => {
    setFormMode('create');
    setFormData({
      name: '', age: '', position: '', jerseyNumber: '', nationality: '',
      height: '', weight: '', joinDate: '', contractEnd: '', salary: '',
      medicalHistory: '', emergencyContact: '', address: '', phone: '', email: '', status: 'active', image: ''
    });
    setShowFormModal(true);
  };

  const handleEditPlayer = (player) => {
    setFormMode('edit');
    setFormData(player);
    setShowFormModal(true);
  };

  const handleDeletePlayer = async (id) => {
    if (!window.confirm('Are you sure you want to delete this player?')) return;

    try {
      await apiService.deletePlayer(id, token);
      fetchPlayers(token);
    } catch (err) {
      console.error('Error deleting player:', err);
      alert('Failed to delete player');
    }
  };
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async () => {
    try {
      if (formMode === 'create') {
        await apiService.createPlayer(formData, token);
      } else {
        await apiService.updatePlayer(formData.id, formData, token);
      }
      setShowFormModal(false);
      fetchPlayers(token);
    } catch (err) {
      console.error('Error saving player:', err);
      alert('Failed to save player');
    }
  };

  // Render Homepage
  if (currentPage === 'home') {
    return <Homepage onGetStarted={handleGetStarted} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
  }

  // Render Registration Page
  if (currentPage === 'register') {
    return (
      <RegistrationPage
        onRegisterSuccess={handleRegister}
        onBackToLogin={handleBackToLogin}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    );
  }

  // Render Login Page
  if (currentPage === 'login' && !isLoggedIn) {
    return (
      <LoginPage
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        error={error}
        onLogin={handleLogin}
        onGoToRegister={handleGoToRegister}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
    );
  }

  // Render Dashboard
  return (
    <div className="min-h-screen bg-gray-100">
      <Dashboard
        players={players}
        onAddPlayer={handleAddPlayer}
        onViewPlayer={handleViewPlayer}
        onEditPlayer={handleEditPlayer}
        onDeletePlayer={handleDeletePlayer}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        onLogout={handleLogout}
      />

      {showDetailsModal && (
        <PlayerDetailsModal
          player={selectedPlayer}
          onClose={() => setShowDetailsModal(false)}
          darkMode={darkMode}
        />
      )}

      {showFormModal && (
        <PlayerFormModal
          formMode={formMode}
          formData={formData}
          onFormChange={handleFormChange}
          onSubmit={handleFormSubmit}
          onClose={() => setShowFormModal(false)}
          darkMode={darkMode}
          onImageUpload={handleImageUpload}
          onRemoveImage={handleRemoveImage}
        />
      )}
    </div>
  );
}

export default App;