import React from 'react';
import { X, User } from 'lucide-react';

const PlayerDetailsModal = ({ player, onClose, darkMode }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
    <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar`}>
      <div className={`sticky top-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} border-b p-3 sm:p-4 flex justify-between items-center`}>
        <h2 className="text-xl sm:text-2xl font-bold">Player Details</h2>
        <button onClick={onClose} className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex justify-center mb-4 sm:mb-6">
          {player.image ? (
            <img src={player.image} alt={player.name} className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-green-500 shadow-lg" />
          ) : (
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center border-4 border-green-500 shadow-lg">
              <User className="w-16 h-16 sm:w-20 sm:h-20 text-white" />
            </div>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
          <div><strong>Name:</strong> {player.name}</div>
          <div><strong>Age:</strong> {player.age}</div>
          <div><strong>Position:</strong> {player.position}</div>
          <div><strong>Jersey #:</strong> {player.jerseyNumber}</div>
          <div><strong>Nationality:</strong> {player.nationality}</div>
          <div><strong>Status:</strong> {player.status}</div>
          <div className="col-span-1 sm:col-span-2"><strong>Salary:</strong> ${player.salary?.toLocaleString()}</div>
          <div className="col-span-1 sm:col-span-2"><strong>Phone:</strong> {player.phone}</div>
          <div className="col-span-1 sm:col-span-2"><strong>Email:</strong> {player.email}</div>
          <div className="col-span-1 sm:col-span-2"><strong>Address:</strong> {player.address}</div>
          <div className="col-span-1 sm:col-span-2"><strong>Emergency Contact:</strong> {player.emergencyContact}</div>
          <div className="col-span-1 sm:col-span-2"><strong>Medical History:</strong> {player.medicalHistory}</div>
        </div>
      </div>
    </div>
  </div>
);

export default PlayerDetailsModal;