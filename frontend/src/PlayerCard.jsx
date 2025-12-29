import React from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';

const PlayerCard = ({ player, onView, onEdit, onDelete, darkMode }) => (
  <div className={`${darkMode ? 'border-gray-700 bg-gray-700' : 'border'} border rounded-lg p-3 sm:p-4 hover:shadow-lg transition`}>
    {player.image && (
      <div className="mb-3 flex justify-center">
        <img src={player.image} alt={player.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-green-500" />
      </div>
    )}
    <div className="flex justify-between items-start mb-2">
      <div className="flex-1 min-w-0">
        <h3 className={`font-bold text-base sm:text-lg truncate ${darkMode ? 'text-white' : ''}`}>{player.name}</h3>
        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} text-xs sm:text-sm`}>#{player.jerseyNumber} - {player.position}</p>
      </div>
      <span className={`px-2 py-1 rounded text-xs flex-shrink-0 ml-2 ${player.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {player.status}
      </span>
    </div>
    <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-3`}>Age: {player.age} | {player.nationality}</p>
    <div className="flex flex-col sm:flex-row gap-2">
      <button onClick={() => onView(player)} className="flex-1 flex items-center justify-center gap-1 bg-blue-500 text-white px-2 py-1.5 rounded text-xs sm:text-sm hover:bg-blue-600">
        <Eye className="w-3 h-3" /> View
      </button>
      <button onClick={() => onEdit(player)} className="flex-1 flex items-center justify-center gap-1 bg-yellow-500 text-white px-2 py-1.5 rounded text-xs sm:text-sm hover:bg-yellow-600">
        <Edit className="w-3 h-3" /> Edit
      </button>
      <button onClick={() => onDelete(player.id)} className="flex-1 flex items-center justify-center gap-1 bg-red-500 text-white px-2 py-1.5 rounded text-xs sm:text-sm hover:bg-red-600">
        <Trash2 className="w-3 h-3" /> Del
      </button>
    </div>
  </div>
);

export default PlayerCard;