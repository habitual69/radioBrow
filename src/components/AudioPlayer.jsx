import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiRadio, FiSkipForward, FiSkipBack, FiGlobe, FiMusic, FiRadio as FiRadioIcon, FiClock, FiHeart } from 'react-icons/fi';
import { useAudioPlayer } from '../contexts/AudioPlayerContext';

const AudioPlayer = () => {
  const { 
    currentStation, 
    isPlaying, 
    volume, 
    loading, 
    error,
    togglePlay, 
    stopPlaying, 
    changeVolume 
  } = useAudioPlayer();
  
  const [isMuted, setIsMuted] = useState(volume === 0);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [showVolumeTooltip, setShowVolumeTooltip] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [barHeights, setBarHeights] = useState(Array(20).fill(10)); // Initial heights for 20 bars

  // Sync isMuted state with volume changes
  useEffect(() => {
    setIsMuted(volume === 0);
    setPrevVolume(volume);
  }, [volume]);

  // Simulate music visualizer animation
  useEffect(() => {
    if (!isPlaying) {
      // Reset bar heights when not playing
      setBarHeights(Array(20).fill(10));
      return;
    }

    const interval = setInterval(() => {
      // Simulate audio frequency by randomly adjusting bar heights
      setBarHeights(barHeights.map(() => Math.random() * 30 + 10)); // Heights between 10px and 40px
    }, 150); // Update every 150ms for smooth animation

    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleMute = () => {
    if (isMuted) {
      const newVolume = prevVolume > 0 ? prevVolume : 0.5;
      changeVolume(newVolume);
    } else {
      setPrevVolume(volume);
      changeVolume(0);
    }
  };
  
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    changeVolume(newVolume);
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!currentStation) {
    return (
      <div className="flex items-center justify-center h-full p-4">
        <div className="bg-gradient-to-br from-dark-primary via-dark-primary/90 to-trinary/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl border border-trinary/10 backdrop-blur-lg">
          <div className="flex justify-center mb-4">
            <FiRadio className="w-12 h-12 text-secondary/70 animate-pulse" />
          </div>
          <h2 className="text-lg font-semibold text-center text-light-primary">No Station Selected</h2>
          <p className="text-center text-light-primary/70 mt-2 text-sm">Choose a station to start listening</p>
          <div className="mt-4 flex justify-center">
            <Link to="/stations" className="px-6 py-2 bg-secondary/20 hover:bg-secondary/30 text-secondary rounded-full transition-all duration-300 text-sm font-medium">
              Browse Stations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Prepare the details array
  const details = [];
  if (currentStation.codec) {
    details.push(
      <span key="codec" className="flex items-center">
        <FiMusic className="mr-1 text-secondary w-3.5 h-3.5" />
        <span>{currentStation.codec}</span>
      </span>
    );
  }
  if (currentStation.bitrate) {
    details.push(
      <span key="bitrate" className="flex items-center">
        <FiRadioIcon className="mr-1 text-secondary w-3.5 h-3.5" />
        <span>{currentStation.bitrate} kbps</span>
      </span>
    );
  }
  if (currentStation.lastcheckok !== undefined) {
    details.push(
      <span key="status" className="flex items-center">
        <FiGlobe className="mr-1 text-secondary w-3.5 h-3.5" />
        <span className={currentStation.lastcheckok === 1 ? 'text-green-400' : 'text-red-400'}>
          {currentStation.lastcheckok === 1 ? 'Online' : 'Offline'}
        </span>
      </span>
    );
  }
  if (currentStation.lastchecktime) {
    details.push(
      <span key="lastcheck" className="flex items-center">
        <FiClock className="mr-1 text-secondary w-3.5 h-3.5" />
        <span>{new Date(currentStation.lastchecktime).toLocaleTimeString()}</span>
      </span>
    );
  }

  // Join details with separators
  const detailsLine = details.reduce((acc, curr, index) => {
    if (index === 0) return [curr];
    return [...acc, <span key={`sep-${index}`} className="text-secondary/50 mx-2">•</span>, curr];
  }, []);
  
  return (
    <div className="flex flex-col items-center w-full p-4">
      {/* Player Card */}
      <div className="bg-gradient-to-br from-dark-primary/95 via-dark-primary/80 to-trinary/10 rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden border border-trinary/20 hover:border-trinary/30 transition-all duration-500 flex flex-col backdrop-blur-xl h-[400px]">
        {/* Station Image and Info */}
        <div className="flex items-center gap-4 p-4">
          <div className="relative w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden shadow-lg group">
            {!currentStation.favicon && (
              <div className="absolute inset-0 flex items-center justify-center bg-dark-primary/80">
                <FiRadio className="w-8 h-8 text-secondary/70" />
              </div>
            )}
            <img 
              src={currentStation.favicon || '/src/assets/radio-icon-modern.svg'} 
              alt="Station Logo" 
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
              onError={(e) => { e.target.src = '/src/assets/radio-icon-modern.svg'; }}
            />
            
            {/* Live Indicator */}
            {isPlaying && (
              <div className="absolute top-2 right-2 flex items-center bg-dark-primary/80 px-2 py-1 rounded-full border border-secondary/30 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 bg-secondary rounded-full mr-1.5 animate-pulse"></div>
                <span className="text-[9px] font-semibold text-secondary tracking-wider">LIVE</span>
              </div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <Link 
              to={`/station/${currentStation.stationuuid}`} 
              className="font-bold text-sm text-light-primary truncate block hover:text-secondary transition-colors duration-300"
            >
              {currentStation.name}
            </Link>
            <div className="flex items-center mt-1 text-xs text-light-primary/70">
              <span className="truncate">{currentStation.country || 'Unknown'}</span>
              {currentStation.tags && (
                <>
                  <span className="text-secondary/50 mx-1.5">•</span>
                  <span className="text-secondary/90 font-medium">{currentStation.tags.split(',')[0] || 'Radio'}</span>
                </>
              )}
            </div>
            
            {/* Favorite Button */}
            <button 
              onClick={toggleFavorite}
              className={`mt-2 flex items-center gap-1.5 py-1 px-3 rounded-full text-xs font-medium transition-all duration-300 ${
                isFavorite 
                  ? 'bg-secondary/20 text-secondary'
                  : 'bg-trinary/10 text-light-primary/70 hover:bg-trinary/20 hover:text-light-primary'
              }`}
            >
              <FiHeart className={`w-3 h-3 ${isFavorite ? 'fill-secondary' : ''}`} />
              {isFavorite ? 'Favorited' : 'Add to Favorites'}
            </button>
          </div>
        </div>
        
        {/* Visualizer Container with Gradient Background */}
        <div className="px-4">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-dark-primary/90 via-trinary/5 to-dark-primary/90 h-12 flex items-center justify-center">
            <div className="flex items-end h-full w-full px-2">
              {barHeights.map((height, index) => (
                <div
                  key={index}
                  className="flex-1 mx-0.5 rounded-t-sm transition-all duration-150"
                  style={{
                    height: `${height}px`,
                    background: `linear-gradient(to top, #e6af2e, rgba(230, 175, 46, 0.4))`,
                  }}
                />
              ))}
            </div>
            
            {/* Overlay for inactive/loading state */}
            {(!isPlaying || loading) && (
              <div className="absolute inset-0 bg-dark-primary/50 backdrop-blur-sm flex items-center justify-center">
                {loading ? (
                  <div className="w-6 h-6 rounded-full border-2 border-secondary border-t-transparent animate-spin"></div>
                ) : (
                  <span className="text-xs text-secondary/70 font-medium">Play to visualize</span>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Controls Container */}
        <div className="p-4 pt-2">
          {/* Volume Control */}
          <div className="flex items-center gap-3 relative mb-4">
            <button 
              onClick={toggleMute}
              className={`p-1.5 text-light-primary/80 hover:text-secondary hover:bg-trinary/20 rounded-full transition-all duration-300 ${isMuted ? 'bg-trinary/10' : ''}`}
            >
              {isMuted ? <FiVolumeX className="w-4 h-4" /> : <FiVolume2 className="w-4 h-4" />}
            </button>
            <div className="flex-1 relative">
              <div className="h-1.5 bg-trinary/15 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-secondary/70 to-secondary rounded-full transition-all"
                  style={{ width: `${volume * 100}%` }}
                ></div>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                onMouseDown={() => setShowVolumeTooltip(true)}
                onMouseUp={() => setShowVolumeTooltip(false)}
                onTouchStart={() => setShowVolumeTooltip(true)}
                onTouchEnd={() => setShowVolumeTooltip(false)}
                className="w-full h-6 absolute -top-2 left-0 appearance-none bg-transparent opacity-0 cursor-pointer"
              />
              {/* Volume Tooltip */}
              {showVolumeTooltip && (
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-dark-primary/95 text-secondary text-xs px-2.5 py-1 rounded-lg shadow-lg border border-trinary/20 backdrop-blur-md z-20">
                  {Math.round(volume * 100)}%
                </div>
              )}
            </div>
          </div>
          
          {/* Playback Controls */}
          <div className="flex justify-between items-center">
            <button className="p-3 text-light-primary/70 hover:text-secondary hover:bg-trinary/10 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-trinary/30">
              <FiSkipBack className="w-5 h-5" />
            </button>
            
            <button 
              onClick={togglePlay} 
              disabled={loading}
              className={`p-4 rounded-full ${
                isPlaying 
                  ? 'bg-gradient-to-br from-secondary to-secondary/90'
                  : 'bg-gradient-to-br from-trinary/40 to-trinary/20'
              } text-dark-primary hover:scale-105 disabled:opacity-60 disabled:scale-100 transition-all duration-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-secondary/50`}
            >
              {loading ? (
                <div className="w-6 h-6 rounded-full border-2 border-dark-primary border-t-transparent animate-spin"></div>
              ) : isPlaying ? (
                <FiPause className="w-6 h-6" />
              ) : (
                <FiPlay className="w-6 h-6 ml-0.5" />
              )}
            </button>
            
            <button className="p-3 text-light-primary/70 hover:text-secondary hover:bg-trinary/10 rounded-full transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-trinary/30">
              <FiSkipForward className="w-5 h-5" />
            </button>
          </div>
          
          {/* Details Line */}
          {details.length > 0 && (
            <div className="flex justify-center items-center text-xs text-light-primary/60 mt-4 flex-wrap">
              {detailsLine}
            </div>
          )}
        </div>
      </div>
      
      {/* Error Message */}
      {error && (
        <div className="mt-4 bg-red-500/10 text-red-400 text-xs p-3 rounded-xl border border-red-500/20 w-full max-w-sm text-center backdrop-blur-sm">
          <div className="font-semibold mb-1">Connection Error</div>
          {error}
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;