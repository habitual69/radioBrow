import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiGlobe, FiTag, FiMusic, FiSearch, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import StationCard from './StationCard';

const StationTabs = ({ 
  topStations, 
  countries, 
  languages, 
  tags,
  loading,
  error
}) => {
  const [activeTab, setActiveTab] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Number of items per page

  // Filter items based on the active tab and search term
  useEffect(() => {
    let items = [];
    if (searchTerm) {
      switch (activeTab) {
        case 'popular':
          items = topStations.filter(station => 
            station.name?.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        case 'countries':
          items = countries.filter(country => 
            country.name?.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        case 'languages':
          items = languages.filter(language => 
            language.name?.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        case 'tags':
          items = tags.filter(tag => 
            tag.name?.toLowerCase().includes(searchTerm.toLowerCase())
          );
          break;
        default:
          items = [];
      }
    } else {
      switch (activeTab) {
        case 'popular': items = topStations || []; break;
        case 'countries': items = countries || []; break;
        case 'languages': items = languages || []; break;
        case 'tags': items = tags || []; break;
        default: items = [];
      }
    }
    setFilteredItems(items);
    setCurrentPage(1); // Reset to first page when tab or search changes

    // Debug logging to check data
    console.log(`Active Tab: ${activeTab}`);
    console.log(`Total items before filtering: ${activeTab === 'popular' ? topStations.length : activeTab === 'countries' ? countries.length : activeTab === 'languages' ? languages.length : tags.length}`);
    console.log(`Filtered items: ${items.length}`);
  }, [activeTab, searchTerm, topStations, countries, languages, tags]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchTerm('');
  };

  // Pagination logic
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gradient-to-b from-dark-primary/95 to-trinary/5 rounded-xl p-6 shadow-lg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
        <p className="ml-3 text-secondary animate-pulse">Loading stations...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-10 bg-gradient-to-br from-dark-primary/80 to-trinary/10 rounded-xl border border-red-500/20 shadow-lg max-w-md mx-auto">
        <p className="text-red-400 mb-4 text-sm font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-gradient-to-r from-secondary to-secondary/70 text-dark-primary px-4 py-2 rounded-md hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-secondary/50"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  return (
    <div className="station-tabs bg-gradient-to-b from-dark-primary/95 to-trinary/5 rounded-xl p-4 sm:p-6 shadow-lg backdrop-blur-sm">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row mb-6 gap-4">
        <div className="flex overflow-x-auto sm:overflow-visible border-b border-trinary/20 pb-2 sm:pb-0">
          <button
            className={`relative px-4 py-3 font-medium text-sm flex items-center transition-all duration-300 whitespace-nowrap hover:scale-105 ${
              activeTab === 'popular'
                ? 'text-dark-primary bg-gradient-to-r from-secondary to-secondary/70 border-b-2 border-secondary rounded-t-lg'
                : 'text-light-primary/70 hover:text-secondary'
            }`}
            onClick={() => handleTabChange('popular')}
          >
            <FiTrendingUp className="mr-2 w-5 h-5" />
            Popular
            {activeTab !== 'popular' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary/50 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            )}
          </button>
          <button
            className={`relative px-4 py-3 font-medium text-sm flex items-center transition-all duration-300 whitespace-nowrap hover:scale-105 ${
              activeTab === 'countries'
                ? 'text-dark-primary bg-gradient-to-r from-secondary to-secondary/70 border-b-2 border-secondary rounded-t-lg'
                : 'text-light-primary/70 hover:text-secondary'
            }`}
            onClick={() => handleTabChange('countries')}
          >
            <FiGlobe className="mr-2 w-5 h-5" />
            Countries
            {activeTab !== 'countries' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary/50 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            )}
          </button>
          <button
            className={`relative px-4 py-3 font-medium text-sm flex items-center transition-all duration-300 whitespace-nowrap hover:scale-105 ${
              activeTab === 'languages'
                ? 'text-dark-primary bg-gradient-to-r from-secondary to-secondary/70 border-b-2 border-secondary rounded-t-lg'
                : 'text-light-primary/70 hover:text-secondary'
            }`}
            onClick={() => handleTabChange('languages')}
          >
            <FiMusic className="mr-2 w-5 h-5" />
            Languages
            {activeTab !== 'languages' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary/50 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            )}
          </button>
          <button
            className={`relative px-4 py-3 font-medium text-sm flex items-center transition-all duration-300 whitespace-nowrap hover:scale-105 ${
              activeTab === 'tags'
                ? 'text-dark-primary bg-gradient-to-r from-secondary to-secondary/70 border-b-2 border-secondary rounded-t-lg'
                : 'text-light-primary/70 hover:text-secondary'
            }`}
            onClick={() => handleTabChange('tags')}
          >
            <FiTag className="mr-2 w-5 h-5" />
            Tags
            {activeTab !== 'tags' && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary/50 scale-x-0 hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            )}
          </button>
        </div>
        
        <div className="relative ml-auto w-full sm:w-auto">
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-dark-primary/50 border border-trinary/20 rounded-lg px-10 py-2 text-light-primary w-full focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary placeholder-light-primary/50 backdrop-blur-sm transition-all duration-300"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-light-primary/50" />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-primary/50 hover:text-secondary bg-dark-primary/80 rounded-full w-5 h-5 flex items-center justify-center"
            >
              ×
            </button>
          )}
        </div>
      </div>
      
      {/* Tab title and count */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold bg-gradient-to-r from-secondary to-secondary/60 bg-clip-text text-transparent">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          <span className="text-sm font-normal ml-2 text-light-primary/50">
            {totalItems} {activeTab === 'popular' ? 'stations' : activeTab}
          </span>
        </h2>
      </div>
      
      {/* Tab Content */}
      <div className="tab-content animate-fade-in">
        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 text-light-primary/50 bg-gradient-to-br from-dark-primary/80 to-trinary/10 rounded-lg">
            <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 13.5h.01M12 17.5h.01M12 21a9 9 0 110-18 9 9 0 010 18z" />
            </svg>
            <p className="text-center text-light-primary/70">No {activeTab} found {searchTerm ? `for "${searchTerm}"` : ''}</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-secondary hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
        
        {/* Popular Stations Tab */}
        {activeTab === 'popular' && filteredItems.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedItems.map((station) => (
              <StationCard key={station.stationuuid} station={station} />
            ))}
          </div>
        )}
        
        {/* Countries Tab */}
        {activeTab === 'countries' && filteredItems.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {paginatedItems.map((country) => (
              <Link 
                key={country.name} 
                to={`/stations/bycountry/${encodeURIComponent(country.name)}`}
                className="bg-gradient-to-br from-dark-primary/80 to-trinary/10 p-3 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 group border border-trinary/5"
              >
                <div className="font-medium truncate bg-gradient-to-r from-secondary to-secondary/60 bg-clip-text text-transparent group-hover:text-opacity-100 transition-all duration-300">
                  {country.name}
                </div>
                <div className="text-xs text-light-primary/70 mt-1">{country.stationcount} stations</div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Languages Tab */}
        {activeTab === 'languages' && filteredItems.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {paginatedItems.map((language) => (
              <Link 
                key={language.name} 
                to={`/stations/bylanguage/${encodeURIComponent(language.name)}`}
                className="bg-gradient-to-br from-dark-primary/80 to-trinary/10 p-3 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 group border border-trinary/5"
              >
                <div className="font-medium truncate bg-gradient-to-r from-secondary to-secondary/60 bg-clip-text text-transparent group-hover:text-opacity-100 transition-all duration-300">
                  {language.name}
                </div>
                <div className="text-xs text-light-primary/70 mt-1">{language.stationcount} stations</div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Tags Tab */}
        {activeTab === 'tags' && filteredItems.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {paginatedItems.map((tag) => (
              <Link 
                key={tag.name} 
                to={`/stations/bytag/${encodeURIComponent(tag.name)}`}
                className="bg-gradient-to-br from-dark-primary/80 to-trinary/10 p-3 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300 group border border-trinary/5"
              >
                <div className="font-medium truncate bg-gradient-to-r from-secondary to-secondary/60 bg-clip-text text-transparent group-hover:text-opacity-100 transition-all duration-300">
                  {tag.name}
                </div>
                <div className="text-xs text-light-primary/70 mt-1">{tag.stationcount} stations</div>
              </Link>
            ))}
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalItems > itemsPerPage && (
        <div className="mt-6 flex justify-center items-center gap-2">
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg bg-gradient-to-r from-dark-primary/50 to-trinary/20 border border-trinary/20 text-light-primary/70 hover:text-secondary transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <FiChevronLeft className="w-4 h-4 mr-1" />
            Prev
          </button>

          {/* Page Numbers */}
          <div className="flex gap-1 flex-wrap justify-center max-w-xs">
            {(() => {
              // Logic to display limited page numbers with ellipses
              const pageNumbers = [];
              const maxVisiblePages = 5; // Maximum number of page buttons to show
              
              // Always show first page
              if (totalPages > 0) {
                pageNumbers.push(
                  <button
                    key={1}
                    onClick={() => setCurrentPage(1)}
                    className={`px-3 py-1 rounded-lg border border-trinary/20 transition-all duration-300 ${
                      currentPage === 1
                        ? 'bg-gradient-to-r from-secondary to-secondary/70 text-dark-primary'
                        : 'bg-dark-primary/50 text-light-primary/70 hover:text-secondary'
                    }`}
                  >
                    1
                  </button>
                );
              }
              
              // Calculate range of pages to show around current page
              let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
              let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);
              
              // Adjust if we're near the beginning
              if (startPage > 2) {
                pageNumbers.push(
                  <span key="ellipsis-start" className="px-2 py-1 text-light-primary/50">...</span>
                );
              }
              
              // Add middle pages
              for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`px-3 py-1 rounded-lg border border-trinary/20 transition-all duration-300 ${
                      currentPage === i
                        ? 'bg-gradient-to-r from-secondary to-secondary/70 text-dark-primary'
                        : 'bg-dark-primary/50 text-light-primary/70 hover:text-secondary'
                    }`}
                  >
                    {i}
                  </button>
                );
              }
              
              // Add ellipsis if needed
              if (endPage < totalPages - 1) {
                pageNumbers.push(
                  <span key="ellipsis-end" className="px-2 py-1 text-light-primary/50">...</span>
                );
              }
              
              // Always show last page if we have more than one page
              if (totalPages > 1) {
                pageNumbers.push(
                  <button
                    key={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className={`px-3 py-1 rounded-lg border border-trinary/20 transition-all duration-300 ${
                      currentPage === totalPages
                        ? 'bg-gradient-to-r from-secondary to-secondary/70 text-dark-primary'
                        : 'bg-dark-primary/50 text-light-primary/70 hover:text-secondary'
                    }`}
                  >
                    {totalPages}
                  </button>
                );
              }
              
              return pageNumbers;
            })()} 
          </div>

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg bg-gradient-to-r from-dark-primary/50 to-trinary/20 border border-trinary/20 text-light-primary/70 hover:text-secondary transition-all duration-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            Next
            <FiChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}

      {/* Debug Info */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 text-sm text-light-primary/50">
          Showing {startIndex + 1} - {endIndex} of {totalItems} items
        </div>
      )}
    </div>
  );
};

export default StationTabs;