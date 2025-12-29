const API_URL = 'http://localhost:3001/api';

const apiService = {
  // Authentication
  register: async (username, email, password) => {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Registration failed');
    }
    
    return await response.json();
  },

  login: async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Login failed');
    }
    
    return await response.json();
  },

  // Players
  getPlayers: async (token) => {
    const response = await fetch(`${API_URL}/players`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch players');
    }
    
    return await response.json();
  },

  getPlayer: async (id, token) => {
    const response = await fetch(`${API_URL}/players/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch player');
    }
    
    return await response.json();
  },

  createPlayer: async (playerData, token) => {
    const response = await fetch(`${API_URL}/players`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(playerData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create player');
    }
    
    return await response.json();
  },

  updatePlayer: async (id, playerData, token) => {
    const response = await fetch(`${API_URL}/players/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(playerData)
    });
    
    if (!response.ok) {
      throw new Error('Failed to update player');
    }
    
    return await response.json();
  },

  deletePlayer: async (id, token) => {
    const response = await fetch(`${API_URL}/players/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete player');
    }
    
    return await response.json();
  }
};

export default apiService;