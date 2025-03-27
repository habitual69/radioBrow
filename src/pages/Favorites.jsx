import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiPause, FiHeart, FiRadio, FiArrowLeft } from 'react-icons/fi'; // Added FiPause here
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

const Favorites = () => {
  const { playStation, currentStation, isPlaying, loading: playerLoading } = useAudioPlayer();
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setFavorites(storedFavorites);
    } catch (err) {
      console.error('Error loading favorites:', err);
      setError('Failed to load favorites. Please try again.');
      setFavorites([]);
    }
  }, []);

  // Remove a station from favorites
  const removeFromFavorites = (stationuuid) => {
    try {
      const updatedFavorites = favorites.filter(fav => fav.stationuuid !== stationuuid);
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } catch (err) {
      console.error('Error removing from favorites:', err);
      setError('Failed to remove station from favorites.');
    }
  };

  // Play a station
  const handlePlay = (station) => {
    playStation(station);
  };

  // Check if a station is currently playing
  const isCurrentlyPlaying = (stationuuid) => {
    return currentStation?.stationuuid === stationuuid && isPlaying;
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-primary to-trinary/5 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Back to Home Link */}
        <Link 
          to="/" 
          className="inline-flex items-center text-secondary hover:text-secondary/80 mb-6 transition-colors duration-200"
        >
          <FiArrowLeft className="mr-2 w-5 h-5" /> Back to Home
        </Link>

        {/* Header */}
        <h1 className="text-3xl font-bold text-light-primary mb-8 bg-gradient-to-r from-secondary to-secondary/60 bg-clip-text text-transparent">
          Your Favorite Stations
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-500/10 text-red-400 text-sm p-3 rounded-lg border border-red-500/20 text-center">
            {error}
          </div>
        )}

        {/* Empty State */}
        {favorites.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-b from-dark-primary to-trinary/10 rounded-xl p-6">
            <FiRadio className="w-12 h-12 text-secondary/70 mb-4 animate-pulse" />
            <h2 className="text-lg font-semibold text-light-primary mb-2">No Favorites Yet</h2>
            <p className="text-center text-light-primary/70 text-sm">
              Add stations to your favorites by clicking the heart icon on a station's details page.
            </p>
            <Link 
              to="/" 
              className="mt-4 bg-secondary text-dark-primary px-4 py-2 rounded-md hover:bg-secondary/90 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/50"
            >
              Explore Stations
            </Link>
          </div>
        )}

        {/* Favorites List */}
        {favorites.length > 0 && (
          <div className="bg-dark-primary/50 rounded-xl p-6 shadow-xl border border-trinary/20">
            <div className="grid grid-cols-1 gap-4">
              {favorites.map(station => (
                <div 
                  key={station.stationuuid} 
                  className="bg-gradient-to-br from-dark-primary to-trinary/10 rounded-lg p-4 flex items-center gap-4 border border-trinary/20 hover:border-trinary/40 transition-all duration-300"
                >
                  {/* Station Image */}
                  <div className="w-12 h-12 bg-dark-primary/90 rounded-lg flex items-center justify-center p-2 flex-shrink-0">
                    <img 
                      src={station.favicon || '/src/assets/radio-icon-modern.svg'} 
                      alt={station.name} 
                      className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                      onError={(e) => { e.target.src = '/src/assets/radio-icon-modern.svg'; }}
                    />
                  </div>

                  {/* Station Info */}
                  <div className="flex-1">
                    <Link 
                      to={`/station/${station.stationuuid}`} 
                      className="font-semibold text-base text-light-primary truncate block hover:text-secondary transition-colors duration-200"
                    >
                      {station.name}
                    </Link>
                    <div className="text-xs text-light-primary/70 flex items-center gap-2 mt-1">
                      <span className="truncate">{station.country || 'Unknown'}</span>
                      {station.tags && (
                        <>
                          <span className="text-secondary/70">•</span>
                          <span className="text-secondary/90">{station.tags.split(',')[0] || 'Radio'}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handlePlay(station)}
                      disabled={playerLoading}
                      className={`p-2 rounded-full ${isCurrentlyPlaying(station.stationuuid) ? 'bg-secondary text-dark-primary' : 'bg-trinary/30 text-light-primary'} hover:bg-secondary hover:text-dark-primary transition-all duration-300 disabled:opacity-60 shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/50 transform hover:scale-105`}
                    >
                      {playerLoading && currentStation?.stationuuid === station.stationuuid ? (
                        <div className="w-4 h-4 rounded-full border-2 border-dark-primary border-t-transparent animate-spin"></div>
                      ) : isCurrentlyPlaying(station.stationuuid) ? (
                        <FiPause className="w-4 h-4" />
                      ) : (
                        <FiPlay className="w-4 h-4" />
                      )}
                    </button>

                    <button 
                      onClick={() => removeFromFavorites(station.stationuuid)}
                      className="p-2 rounded-full bg-trinary/30 text-light-primary hover:bg-secondary hover:text-dark-primary transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/50 transform hover:scale-105"
                    >
                      <FiHeart className="w-4 h-4" fill="currentColor" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;