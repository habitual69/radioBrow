import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import StationCard from '../components/StationCard';
import { getStations } from '../services/api';

const Stations = () => {
  const { category, term } = useParams();
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const stationsPerPage = 20;
  
  // Format category for display
  const formatCategory = (cat) => {
    switch (cat) {
      case 'topclick': return 'Popular';
      case 'lastchange': return 'Recently Added';
      case 'bycountry': return 'Country';
      case 'bylanguage': return 'Language';
      case 'bytag': return 'Tag';
      case 'countries': return 'Countries';
      case 'languages': return 'Languages';
      case 'tags': return 'Tags';
      default: return cat;
    }
  };
  
  // Format term for display
  const formatTerm = (t) => {
    return t === 'all' ? 'All' : decodeURIComponent(t);
  };
  
  // Get the appropriate endpoint based on category
  const getEndpoint = () => {
    switch (category) {
      case 'topclick': return 'topclick';
      case 'lastchange': return 'lastchange';
      case 'bycountry': return 'bycountry/' + term;
      case 'bylanguage': return 'bylanguage/' + term;
      case 'bytag': return 'bytag/' + term;
      case 'countries': return 'bycountry';
      case 'languages': return 'bylanguage';
      case 'tags': return 'bytag';
      default: return '';
    }
  };
  
  useEffect(() => {
    const fetchStations = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const endpoint = getEndpoint();
        const offset = (page - 1) * stationsPerPage;
        
        const params = {
          offset,
          limit: stationsPerPage,
          hidebroken: true,
        };
        
        const data = await getStations(endpoint, params);
        
        if (page === 1) {
          setStations(data);
        } else {
          setStations(prev => [...prev, ...data]);
        }
        
        setHasMore(data.length === stationsPerPage);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stations:', err);
        setError('Failed to load stations. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchStations();
  }, [category, term, page]);
  
  const loadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
    }
  };
  
  return (
    <div>
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-secondary hover:underline mb-2">
          <FiArrowLeft className="mr-1" /> Back to Home
        </Link>
        <h1 className="text-3xl font-bold">
          {formatCategory(category)}: {formatTerm(term)}
        </h1>
      </div>
      
      {loading && page === 1 ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-secondary text-dark-primary px-4 py-2 rounded-md hover:bg-opacity-80"
          >
            Try Again
          </button>
        </div>
      ) : stations.length === 0 ? (
        <div className="text-center py-10">
          <p className="mb-4">No stations found for this category.</p>
          <Link 
            to="/" 
            className="bg-secondary text-dark-primary px-4 py-2 rounded-md hover:bg-opacity-80 inline-block"
          >
            Back to Home
          </Link>
        </div>
      ) : (
        <>
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

export default Stations;