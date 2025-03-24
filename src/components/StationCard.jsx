import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiHeart, FiGlobe, FiMusic } from 'react-icons/fi';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

const StationCard = ({ station }) => {
  const { playStation, currentStation, isPlaying } = useAudioPlayer();
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    return favorites.some(fav => fav.stationuuid === station.stationuuid);
  });
  
  const isCurrentlyPlaying = currentStation?.stationuuid === station.stationuuid && isPlaying;
  
  const handlePlayClick = (e) => {
    e.preventDefault();
    playStation(station);
  };
  
  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (isFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.stationuuid !== station.stationuuid);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(station);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };
  
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);
  }, [station.favicon]);

  return (
    <Link 
      to={`/station/${station.stationuuid}`} 
      className={`relative flex items-center h-14 px-3 bg-dark-primary/90 hover:bg-dark-primary/95 border-l-4 border-secondary/0 group hover:border-secondary rounded-r-md transition-all duration-300 shadow-sm shadow-amber-400 rounded-lg ${
        isCurrentlyPlaying ? 'shadow-neon' : 'group-hover:shadow-neon'
      }`}
    >
      {/* Left color bar for playing status */}
      {isCurrentlyPlaying && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary"></div>
      )}

      {/* Station Image */}
      <div className="h-10 w-10 rounded-md overflow-hidden flex-shrink-0 mr-3">
        <img 
          src={station.favicon || '/src/assets/radio-icon-modern.svg'} 
          alt={station.name} 
          className={`h-full w-full object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => { 
            setImageError(true);
            setImageLoaded(true);
          }}
        />
        {!imageLoaded && (
          <div className="h-full w-full bg-dark-primary/40 flex items-center justify-center">
            <div className="w-6 h-6 bg-secondary/20 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>
      
      {/* Station Info */}
      <div className="flex-1 min-w-0 mr-2">
        <h3 className="text-sm font-medium text-light-primary truncate group-hover:text-secondary transition-colors duration-300">
          {station.name}
        </h3>
        
        <div className="flex items-center text-xs text-light-primary/60 mt-0.5 space-x-3">
          {/* Country */}
          <span className="inline-flex items-center space-x-1">
            <FiGlobe className="w-3 h-3 text-secondary/70" />
            <span className="truncate max-w-[80px]">{station.country || 'Unknown'}</span>
          </span>
          
          {/* Bitrate - only show if available */}
          {station.bitrate && (
            <span className="inline-flex items-center space-x-1">
              <FiMusic className="w-3 h-3 text-secondary/70" />
              <span>{station.bitrate}</span>
            </span>
          )}
          
          {/* Status dot - only if online */}
          {station.lastcheckok === 1 && (
            <span className="inline-flex items-center">
              <span className="h-1.5 w-1.5 bg-green-400 rounded-full"></span>
            </span>
          )}
        </div>
      </div>
      
      {/* Controls - with reveal animation */}
      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Favorite Button */}
        <button 
          onClick={toggleFavorite}
          className="p-1.5 rounded-full hover:bg-dark-primary/50 focus:outline-none"
          title={isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        >
          <FiHeart 
            className={`w-3.5 h-3.5 ${isFavorite ? 'text-secondary fill-secondary' : 'text-light-primary/70'}`} 
          />
        </button>
        
        {/* Play button */}
        <button 
          onClick={handlePlayClick}
          className={`p-1.5 rounded-full ${
            isCurrentlyPlaying 
              ? 'text-secondary bg-secondary/20' 
              : 'text-light-primary/80 hover:bg-dark-primary/50'
          } focus:outline-none transition-colors duration-300`}
          title={isCurrentlyPlaying ? 'Now Playing' : 'Play Station'}
        >
          <FiPlay className="w-3.5 h-3.5" />
        </button>
      </div>
      
      {/* Playing animation */}
      {isCurrentlyPlaying && (
        <div className="flex items-end h-4 space-x-0.5 ml-0.5">
          <div className="w-1 h-2 bg-secondary rounded-t-sm animate-pulse-slow"></div>
          <div className="w-1 h-3 bg-secondary rounded-t-sm animate-pulse-medium"></div>
          <div className="w-1 h-1.5 bg-secondary rounded-t-sm animate-pulse-fast"></div>
        </div>
      )}
    </Link>
  );
};

// Add this CSS to your global styles
const styles = `
@keyframes pulse-slow {
  0%, 100% { height: 8px; }
  50% { height: 12px; }
}

@keyframes pulse-medium {
  0%, 100% { height: 12px; }
  50% { height: 6px; }
}

@keyframes pulse-fast {
  0%, 100% { height: 6px; }
  50% { height: 10px; }
}

.animate-pulse-slow {
  animation: pulse-slow 1.8s ease-in-out infinite;
}

.animate-pulse-medium {
  animation: pulse-medium 1.4s ease-in-out infinite;
}

.animate-pulse-fast {
  animation: pulse-fast 1s ease-in-out infinite;
}

/* Neon shadow outline */
.shadow-neon {
  box-shadow: 0 0 8px 2px rgba(230, 175, 46, 0.5), 0 0 12px 4px rgba(230, 175, 46, 0.3);
}
`;

export default StationCard;