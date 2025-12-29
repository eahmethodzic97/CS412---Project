import React from 'react';
import { Plus } from 'lucide-react';
import PlayerCard from './PlayerCard';
import Navbar from './Navbar';

const Dashboard = ({ players, onAddPlayer, onViewPlayer, onEditPlayer, onDeletePlayer, darkMode, toggleDarkMode, onLogout }) => (
  <>
    <Navbar toggleDarkMode={toggleDarkMode} darkMode={darkMode} onLogout={onLogout} />
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg shadow-lg p-4 sm:p-6`}>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
            <h2 className={`text-xl sm:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Players Dashboard</h2>
            <button
              onClick={onAddPlayer}
              className={`flex items-center justify-center gap-2 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-600'} text-white px-4 py-2 rounded transition text-sm sm:text-base w-full sm:w-auto`}
            >
              <Plus className="w-4 h-4" /> Add Player
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {players.map(player => (
              <PlayerCard
                key={player.id}
                player={player}
                onView={onViewPlayer}
                onEdit={onEditPlayer}
                onDelete={onDeletePlayer}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
);
export default Dashboard;