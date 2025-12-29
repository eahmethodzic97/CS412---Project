import React from 'react';
import { X, Upload } from 'lucide-react';

const PlayerFormModal = ({ formMode, formData, onFormChange, onImageUpload, onRemoveImage, onSubmit, onClose, darkMode }) => {
  const formFields = [
    { name: 'name', label: 'Name *', type: 'text' },
    { name: 'age', label: 'Age *', type: 'number' },
    { name: 'position', label: 'Position *', type: 'select' },
    { name: 'jerseyNumber', label: 'Jersey #', type: 'number' },
    { name: 'nationality', label: 'Nationality', type: 'text' },
    { name: 'height', label: 'Height (cm)', type: 'number' },
    { name: 'weight', label: 'Weight (kg)', type: 'number' },
    { name: 'joinDate', label: 'Join Date', type: 'date' },
    { name: 'contractEnd', label: 'Contract End', type: 'date' },
    { name: 'salary', label: 'Salary', type: 'number' },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'status', label: 'Status', type: 'select' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} rounded-lg max-w-4xl w-full h-[75vh] flex flex-col`}>
        <div className={`flex-shrink-0 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white'} border-b p-3 sm:p-4 flex justify-between items-center rounded-t-lg`}>
          <h2 className="text-xl sm:text-2xl font-bold">{formMode === 'create' ? 'Add Player' : 'Edit Player'}</h2>
          <button onClick={onClose} className={`${darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}>
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto hide-scrollbar p-4 sm:p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2 text-center">Player Image</label>
            <div className="flex flex-col items-center gap-3">
              <div className="relative">
                {formData.image ? (
                  <div className="relative">
                    <img src={formData.image} alt="Preview" className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-green-500 shadow-lg" />
                    <button type="button" onClick={onRemoveImage} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600 shadow-lg font-bold text-sm">
                      ×
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-4 border-gray-300 shadow-inner">
                    <Upload className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                  </div>
                )}
              </div>
              <div className="text-center">
                <input type="file" accept="image/*" onChange={onImageUpload} className="hidden" id="img-upload" />
                <label htmlFor="img-upload" className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 inline-block text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition">
                  {formData.image ? '📷 Change' : '📤 Upload'}
                </label>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Max 10MB</p>
              </div>
            </div>
          </div>

          <div className={`border-t ${darkMode ? 'border-gray-700' : ''} pt-4 mb-4`}></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {formFields.map(field => (
              <div key={field.name}>
                <label className="block text-xs sm:text-sm font-medium mb-1">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    name={field.name}
                    value={formData[field.name] || ''}
                    onChange={(e) => onFormChange(e)}
                    className={`w-full px-2 py-1.5 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''} rounded text-xs sm:text-sm`}
                  >
                    {field.name === 'position' ? (
                      <>
                        <option value="">Select</option>
                        <option value="Goalkeeper">Goalkeeper</option>
                        <option value="Defender">Defender</option>
                        <option value="Midfielder">Midfielder</option>
                        <option value="Forward">Forward</option>
                      </>
                    ) : (
                      <>
                        <option value="active">Active</option>
                        <option value="injured">Injured</option>
                        <option value="suspended">Suspended</option>
                      </>
                    )}
                  </select>
                ) : (
                  <input
                    name={field.name}
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) => onFormChange(e)}
                    className={`w-full px-2 py-1.5 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''} rounded text-xs sm:text-sm`}
                  />
                )}
              </div>
            ))}
            <div className="md:col-span-2">
              <label className="block text-xs sm:text-sm font-medium mb-1">Address</label>
              <input
                name="address"
                value={formData.address || ''}
                onChange={(e) => onFormChange(e)}
                className={`w-full px-2 py-1.5 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''} rounded text-xs sm:text-sm`}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs sm:text-sm font-medium mb-1">Emergency Contact</label>
              <input
                name="emergencyContact"
                value={formData.emergencyContact || ''}
                onChange={(e) => onFormChange(e)}
                className={`w-full px-2 py-1.5 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''} rounded text-xs sm:text-sm`}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs sm:text-sm font-medium mb-1">Medical History</label>
              <textarea
                name="medicalHistory"
                value={formData.medicalHistory || ''}
                onChange={(e) => onFormChange(e)}
                className={`w-full px-2 py-1.5 border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : ''} rounded text-xs sm:text-sm`}
                rows="2"
              ></textarea>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-6 pb-2">
            <button
              onClick={onSubmit}
              className={`flex-1 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-500 hover:bg-green-600'} text-white py-2 rounded transition text-sm`}
            >
              {formMode === 'create' ? 'Create' : 'Update'}
            </button>
            <button
              onClick={onClose}
              className={`flex-1 ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'} ${darkMode ? 'text-white' : 'text-gray-700'} py-2 rounded transition text-sm`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerFormModal;