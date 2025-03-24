import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiPlay, FiPause, FiHeart, FiGlobe, FiMusic, FiRadio } from 'react-icons/fi';
import { getStationByUuid, voteForStation } from '../services/api';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

const StationDetails = () => {
  const { id } = useParams();
  const { playStation, currentStation, isPlaying, loading: playerLoading } = useAudioPlayer();
  const [station, setStation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voted, setVoted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);
  const [favoriteError, setFavoriteError] = useState(null);

  // Fetch station details and check if it's a favorite
  useEffect(() => {
    const fetchStation = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await getStationByUuid(id);
        setStation(data);
        
        // Check if station is in favorites
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setIsFavorite(favorites.some(fav => fav.stationuuid === id));
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching station details:', err);
        setError('Failed to load station details. Please try again.');
        setLoading(false);
      }
    };
    
    fetchStation();
  }, [id]);

  const handlePlay = () => {
    if (station) {
      playStation(station);
    }
  };
  
  const handleVote = async () => {
    if (voted || !station) return;
    
    try {
      await voteForStation(station.stationuuid);
      setVoted(true);
      setStation(prev => ({ ...prev, votes: prev.votes + 1 }));
    } catch (err) {
      console.error('Error voting for station:', err);
    }
  };
  
  const toggleFavorite = async () => {
    if (!station) return;
    
    setFavoriteLoading(true);
    setFavoriteError(null);

    try {
      let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      
      if (isFavorite) {
        // Remove from favorites
        favorites = favorites.filter(fav => fav.stationuuid !== station.stationuuid);
      } else {
        // Add to favorites
        favorites.push(station);
      }
      
      // Update localStorage
      localStorage.setItem('favorites', JSON.stringify(favorites));
      
      // Re-fetch favorites to ensure state is in sync
      const updatedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(updatedFavorites.some(fav => fav.stationuuid === station.stationuuid));
    } catch (err) {
      console.error('Error toggling favorite:', err);
      setFavoriteError('Failed to update favorites. Please try again.');
    } finally {
      setFavoriteLoading(false);
    }
  };
  
  const isCurrentlyPlaying = currentStation?.stationuuid === id && isPlaying;
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-b from-dark-primary to-trinary/10">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-secondary mb-4"></div>
        <p className="text-light-primary/70 text-sm animate-pulse">Loading station details...</p>
      </div>
    );
  }
  
  if (error || !station) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-b from-dark-primary to-trinary/10">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
          <p className="text-red-400 text-center mb-4 text-sm">{error || 'Station not found'}</p>
          <Link 
            to="/" 
            className="bg-secondary text-dark-primary px-4 py-2 rounded-md hover:bg-secondary/90 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/50 mx-auto block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-primary to-trinary/5 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <Link 
          to="/" 
          className="inline-flex items-center text-secondary hover:text-secondary/80 mb-6 transition-colors duration-200"
        >
          <FiArrowLeft className="mr-2 w-5 h-5" /> Back to Home
        </Link>
        
        <div className="bg-gradient-to-br from-dark-primary to-trinary/10 rounded-xl overflow-hidden shadow-xl border border-trinary/20 hover:border-trinary/40 transition-all duration-300">
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-dark-primary/90 rounded-lg flex items-center justify-center p-4 border border-trinary/30">
                  <img 
                    src={station.favicon || '/src/assets/radio-icon.svg'} 
                    alt={station.name} 
                    className="max-w-full max-h-full object-contain transition-transform duration-300 hover:scale-105"
                    onError={(e) => { e.target.src = '/src/assets/radio-icon.svg'; }}
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <h1 className="text-2xl md:text-3xl font-bold text-light-primary mb-3 bg-gradient-to-r from-secondary to-secondary/60 bg-clip-text text-transparent">
                  {station.name}
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {station.tags && station.tags.split(',').map(tag => (
                    <Link 
                      key={tag} 
                      to={`/stations/bytag/${encodeURIComponent(tag.trim())}`}
                      className="inline-block bg-dark-primary/50 px-2 py-1 rounded-full text-xs text-secondary border border-secondary/30 hover:bg-secondary/20 hover:text-secondary/90 transition-all duration-200"
                    >
                      {tag.trim()}
                    </Link>
                  ))}
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-light-primary/80">
                  {station.country && (
                    <div className="flex items-center">
                      <FiGlobe className="mr-1 text-secondary w-4 h-4" />
                      <Link 
                        to={`/stations/bycountry/${encodeURIComponent(station.country)}`} 
                        className="hover:text-secondary transition-colors duration-200"
                      >
                        {station.country}
                      </Link>
                    </div>
                  )}
                  
                  {station.language && (
                    <div className="flex items-center">
                      <FiMusic className="mr-1 text-secondary w-4 h-4" />
                      <Link 
                        to={`/stations/bylanguage/${encodeURIComponent(station.language.split(',')[0])}`} 
                        className="hover:text-secondary transition-colors duration-200"
                      >
                        {station.language.split(',').join(', ')}
                      </Link>
                    </div>
                  )}
                  
                  {station.bitrate && (
                    <div className="flex items-center">
                      <FiRadio className="mr-1 text-secondary w-4 h-4" />
                      <span>{station.bitrate} kbps</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <button 
                onClick={handlePlay}
                disabled={playerLoading}
                className={`flex items-center px-4 py-2 rounded-md ${isCurrentlyPlaying ? 'bg-secondary text-dark-primary' : 'bg-trinary/30 text-light-primary'} hover:bg-secondary hover:text-dark-primary transition-all duration-300 disabled:opacity-60 shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/50 transform hover:scale-105`}
              >
                {playerLoading ? (
                  <span className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-dark-primary mr-2"></div>
                    Loading...
                  </span>
                ) : isCurrentlyPlaying ? (
                  <>
                    <FiPause className="mr-2 w-4 h-4" /> Now Playing
                  </>
                ) : (
                  <>
                    <FiPlay className="mr-2 w-4 h-4" /> Play Station
                  </>
                )}
              </button>
              
              <button 
                onClick={toggleFavorite}
                disabled={favoriteLoading}
                className={`flex items-center px-4 py-2 rounded-md ${isFavorite ? 'bg-secondary text-dark-primary' : 'bg-trinary/30 text-light-primary'} hover:bg-secondary hover:text-dark-primary transition-all duration-300 disabled:opacity-60 shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/50 transform hover:scale-105`}
              >
                {favoriteLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-dark-primary mr-2"></div>
                ) : (
                  <FiHeart className="mr-2 w-4 h-4" fill={isFavorite ? 'currentColor' : 'none'} />
                )}
                {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              
              <button 
                onClick={handleVote}
                disabled={voted}
                className={`flex items-center px-4 py-2 rounded-md ${voted ? 'bg-secondary/50 text-dark-primary' : 'bg-trinary/30 text-light-primary'} hover:bg-secondary hover:text-dark-primary transition-all duration-300 disabled:opacity-60 shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/50 transform hover:scale-105`}
              >
                {voted ? '✓ Voted' : `Vote (${station.votes || 0})`}
              </button>
            </div>

            {/* Favorite Error Message */}
            {favoriteError && (
              <div className="mt-4 bg-red-500/10 text-red-400 text-sm p-3 rounded-lg border border-red-500/20 text-center">
                {favoriteError}
              </div>
            )}
          </div>
          
          <div className="border-t border-trinary/20 p-6">
            <h2 className="text-xl font-semibold text-light-primary mb-4">Station Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-light-primary/90">
              {station.homepage && (
                <div>
                  <h3 className="font-semibold text-sm text-light-primary mb-1">Homepage:</h3>
                  <a 
                    href={station.homepage} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-secondary/80 transition-colors duration-200 break-all text-sm"
                  >
                    {station.homepage}
                  </a>
                </div>
              )}
              
              {station.url_resolved && (
                <div>
                  <h3 className="font-semibold text-sm text-light-primary mb-1">Stream URL:</h3>
                  <a 
                    href={station.url_resolved} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-secondary/80 transition-colors duration-200 break-all text-sm"
                  >
                    {station.url_resolved}
                  </a>
                </div>
              )}
              
              {station.codec && (
                <div>
                  <h3 className="font-semibold text-sm text-light-primary mb-1">Codec:</h3>
                  <p className="text-sm">{station.codec}</p>
                </div>
              )}
              
              {station.lastcheckok !== undefined && (
                <div>
                  <h3 className="font-semibold text-sm text-light-primary mb-1">Status:</h3>
                  <p className={station.lastcheckok === 1 ? 'text-green-400' : 'text-red-400'}>
                    {station.lastcheckok === 1 ? 'Online' : 'Offline'}
                  </p>
                </div>
              )}
              
              {station.lastchecktime && (
                <div>
                  <h3 className="font-semibold text-sm text-light-primary mb-1">Last Checked:</h3>
                  <p className="text-sm">{new Date(station.lastchecktime).toLocaleString()}</p>
                </div>
              )}
              
              {station.clickcount !== undefined && (
                <div>
                  <h3 className="font-semibold text-sm text-light-primary mb-1">Click Count:</h3>
                  <p className="text-sm">{station.clickcount}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StationDetails;