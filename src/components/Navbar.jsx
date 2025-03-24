import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiSun, FiMoon, FiSearch, FiRadio, FiHeart, FiHome, FiMenu, FiX } from 'react-icons/fi';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isTogglingDarkMode, setIsTogglingDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isSidebarOpen && !event.target.closest('.sidebar') && !event.target.closest('.hamburger-menu')) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSidebarOpen]);
  
  useEffect(() => {
    document.body.style.overflow = isSidebarOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isSidebarOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setIsSearchOpen(false);
    }
  };

  const toggleDarkMode = () => {
    setIsTogglingDarkMode(true);
    setTimeout(() => {
      setDarkMode(!darkMode);
      setIsTogglingDarkMode(false);
    }, 300);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gradient-to-b from-dark-primary to-trinary/10' : 'bg-gradient-to-b from-light-primary to-trinary/10'} shadow-xl border-b border-trinary/20`}>
      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-r ${darkMode ? 'from-dark-primary to-trinary/30' : 'from-light-primary to-trinary/30'} shadow-2xl transform transition-transform duration-300 ease-in-out z-50 sidebar ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-4 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="flex items-center" onClick={() => setIsSidebarOpen(false)}>
              <FiRadio className="text-secondary text-2xl mr-2" />
              <span className="font-bold text-xl bg-gradient-to-r from-secondary to-secondary/60 bg-clip-text text-transparent">RadioBrow</span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-full hover:bg-trinary/20 transition-all duration-300">
              <FiX className="text-secondary w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col space-y-4 mt-6">
            <Link to="/" className="flex items-center p-3 rounded-lg hover:bg-trinary/20 transition-all duration-300" onClick={() => setIsSidebarOpen(false)}>
              <FiHome className="text-secondary w-5 h-5 mr-3" />
              <span className={`${darkMode ? 'text-light-primary' : 'text-dark-primary'}`}>Home</span>
            </Link>
            <Link to="/favorites" className="flex items-center p-3 rounded-lg hover:bg-trinary/20 transition-all duration-300" onClick={() => setIsSidebarOpen(false)}>
              <FiHeart className="text-secondary w-5 h-5 mr-3" />
              <span className={`${darkMode ? 'text-light-primary' : 'text-dark-primary'}`}>Favorites</span>
            </Link>
            <button onClick={() => { toggleDarkMode(); setIsSidebarOpen(false); }} className="flex items-center p-3 rounded-lg hover:bg-trinary/20 transition-all duration-300 w-full text-left" disabled={isTogglingDarkMode}>
              {isTogglingDarkMode ? (
                <div className="w-5 h-5 rounded-full border-2 border-secondary border-t-transparent animate-spin mr-3"></div>
              ) : darkMode ? (
                <FiSun className="text-secondary w-5 h-5 mr-3" />
              ) : (
                <FiMoon className="text-secondary w-5 h-5 mr-3" />
              )}
              <span className={`${darkMode ? 'text-light-primary' : 'text-dark-primary'}`}>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
          <div className={`mt-auto p-4 text-xs ${darkMode ? 'text-light-primary/50' : 'text-dark-primary/50'} text-center`}>
            <p>© {new Date().getFullYear()} RadioBrow</p>
          </div>
        </div>
      </div>
      
      {isSidebarOpen && (
        <div className={`fixed inset-0 ${darkMode ? 'bg-dark-primary/70' : 'bg-trinary/50'} backdrop-blur-sm z-40`} onClick={() => setIsSidebarOpen(false)}></div>
      )}
      
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Mobile Header */}
          <div className="flex items-center">
            <button onClick={() => setIsSidebarOpen(true)} className="md:hidden p-2 mr-2 rounded-full hover:bg-trinary/20 transition-all duration-300 hamburger-menu" aria-label="Open menu">
              <FiMenu className="text-secondary w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center">
              <FiRadio className="text-secondary text-2xl mr-2" />
              <span className="font-bold text-xl bg-gradient-to-r from-secondary to-secondary/60 bg-clip-text text-transparent">RadioBrow</span>
            </Link>
          </div>

          {/* Desktop Navigation - Only visible on md+ */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="flex-1 mr-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search stations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full py-1.5 pl-3 pr-10 rounded-full ${darkMode ? 'bg-trinary/50 text-light-primary' : 'bg-white/90 text-dark-primary'} focus:outline-none focus:ring-2 focus:ring-secondary shadow-md transition-all duration-200`}
                />
                <button type="submit" disabled={!searchTerm.trim()} className={`absolute right-0 top-0 h-full px-3 flex items-center justify-center ${searchTerm.trim() ? 'text-secondary' : 'text-secondary/50'} transition-all duration-200`}>
                  <FiSearch className="w-4 h-4" />
                </button>
              </div>
            </form>
            <Link to="/" className="p-2 rounded-full hover:bg-trinary/20 transition-all duration-300" title="Home">
              <FiHome className="text-secondary w-5 h-5" />
            </Link>
            <Link to="/favorites" className="p-2 rounded-full hover:bg-trinary/20 transition-all duration-300" title="Favorites">
              <FiHeart className="text-secondary w-5 h-5" />
            </Link>
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-trinary/20 transition-all duration-300" title={darkMode ? "Light Mode" : "Dark Mode"} disabled={isTogglingDarkMode}>
              {isTogglingDarkMode ? (
                <div className="w-5 h-5 rounded-full border-2 border-secondary border-t-transparent animate-spin"></div>
              ) : darkMode ? (
                <FiSun className="text-secondary w-5 h-5" />
              ) : (
                <FiMoon className="text-secondary w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Search Toggle */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2 rounded-full hover:bg-trinary/20 transition-all duration-300" aria-label="Toggle search">
              <FiSearch className="text-secondary w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden mt-3">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search stations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`w-full py-1.5 pl-3 pr-10 rounded-full ${darkMode ? 'bg-trinary/50 text-light-primary' : 'bg-white/90 text-dark-primary'} focus:outline-none focus:ring-2 focus:ring-secondary shadow-md transition-all duration-200`}
                />
                <button type="submit" disabled={!searchTerm.trim()} className={`absolute right-0 top-0 h-full px-3 flex items-center justify-center ${searchTerm.trim() ? 'text-secondary' : 'text-secondary/50'} transition-all duration-200`}>
                  <FiSearch className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;