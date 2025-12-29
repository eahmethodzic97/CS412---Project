const Footer = ({ darkMode }) => (
    <footer className={`backdrop-blur-lg py-6 sm:py-8 ${darkMode ? 'bg-gray-900/80 text-gray-400' : 'bg-black/20 text-white/80'}`}>
        <div className="container mx-auto px-4 text-center">
            <p className="text-sm sm:text-base">&copy; 2025 Soccer Management System</p>
        </div>
    </footer>
);

export default Footer;
