const FeatureCard = ({ icon: Icon, title, desc, darkMode }) => (
    <div className={`rounded-xl p-4 sm:p-6 transition ${darkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-100' : 'bg-white/10 backdrop-blur-lg text-white hover:bg-white/20'}`}>
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center mb-3 sm:mb-4 ${darkMode ? 'bg-blue-600' : 'bg-white/20'}`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h3 className="text-lg sm:text-xl font-bold mb-2">{title}</h3>
        <p className={`text-sm sm:text-base ${darkMode ? 'text-gray-400' : 'text-white/80'}`}>{desc}</p>
    </div>
);

export default FeatureCard;
