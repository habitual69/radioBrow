import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import StationCard from '../components/StationCard';
import { searchStations } from '../services/api';

const Search = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState('name');
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const stationsPerPage = 20;
  
  useEffect(() => {
    if (initialQuery) {
      handleSearch();
    }
  }, [initialQuery]);
  
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    
    try {
      setLoading(true);
      setError(null);
      setPage(1);
      
      const params = {
        limit: stationsPerPage,
        offset: 0,
        hidebroken: true,
      };
      
      // Add search parameter based on search type
      switch (searchType) {
        case 'name':
          params.name = query.trim();
          break;
        case 'tag':
          params.tag = query.trim();
          break;
        case 'country':
          params.country = query.trim();
          break;
        case 'language':
          params.language = query.trim();
          break;
        default:
          params.name = query.trim();
      }
      
      const data = await searchStations(params);
      setStations(data);
      setHasMore(data.length === stationsPerPage);
      setLoading(false);
    } catch (err) {
      console.error('Error searching stations:', err);
      setError('Failed to search stations. Please try again later.');
      setLoading(false);
    }
  };
  
  const loadMore = async () => {
    if (!query.trim() || loading || !hasMore) return;
    
    try {
      setLoading(true);
      
      const nextPage = page + 1;
      const params = {
        limit: stationsPerPage,
        offset: (nextPage - 1) * stationsPerPage,
        hidebroken: true,
      };
      
      // Add search parameter based on search type
      switch (searchType) {
        case 'name':
          params.name = query.trim();
          break;
        case 'tag':
          params.tag = query.trim();
          break;
        case 'country':
          params.country = query.trim();
          break;
        case 'language':
          params.language = query.trim();
          break;
        default:
          params.name = query.trim();
      }
      
      const data = await searchStations(params);
      setStations(prev => [...prev, ...data]);
      setPage(nextPage);
      setHasMore(data.length === stationsPerPage);
      setLoading(false);
    } catch (err) {
      console.error('Error loading more stations:', err);
      setError('Failed to load more stations. Please try again later.');
      setLoading(false);
    }
  };
  
  return (
    <div>
      <Link to="/" className="inline-flex items-center text-secondary hover:underline mb-4">
        <FiArrowLeft className="mr-1" /> Back to Home
      </Link>
      
      <h1 className="text-3xl font-bold mb-6">Search Stations</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for stations..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full py-3 pl-4 pr-12 rounded-lg bg-trinary text-light-primary focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-0 h-full px-4 flex items-center justify-center text-secondary"
                disabled={loading}
              >
                <FiSearch className="text-xl" />
              </button>
            </div>
          </div>
          
          <div className="flex">
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="py-3 px-4 rounded-lg bg-trinary text-light-primary focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              <option value="name">Name</option>
              <option value="tag">Tag</option>
              <option value="country">Country</option>
              <option value="language">Language</option>
            </select>
          </div>
        </div>
      </form>
      
      {loading && stations.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => handleSearch()} 
            className="bg-secondary text-dark-primary px-4 py-2 rounded-md hover:bg-opacity-80"
          >
            Try Again
          </button>
        </div>
      ) : stations.length === 0 ? (
        query.trim() ? (
          <div className="text-center py-10">
            <p className="mb-4">No stations found for "{query}".</p>
            <p>Try a different search term or category.</p>
          </div>
        ) : null
      ) : (
        <>
          <p className="mb-4">{stations.length} stations found</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {stations.map((station) => (
              <StationCard key={station.stationuuid} station={station} />
            ))}
          </div>
          
          {hasMore && (
            <div className="text-center mt-8">
              <button 
                onClick={loadMore}
                disabled={loading}
                className="bg-trinary text-light-primary px-6 py-3 rounded-md hover:bg-opacity-80 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-secondary mr-2"></div>
                    Loading...
                  </span>
                ) : (
                  'Load More'
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;