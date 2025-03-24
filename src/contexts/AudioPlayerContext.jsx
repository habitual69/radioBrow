import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { recordStationClick } from '../services/api';

const AudioPlayerContext = createContext();

export const useAudioPlayer = () => {
  const context = useContext(AudioPlayerContext);
  if (!context) {
    throw new Error('useAudioPlayer must be used within an AudioPlayerProvider');
  }
  return context;
};

export const AudioPlayerProvider = ({ children }) => {
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(() => {
    // Load volume from localStorage, default to 0.8 if not set
    const savedVolume = localStorage.getItem('playerVolume');
    return savedVolume ? parseFloat(savedVolume) : 0.8;
  });
  const [audioElement, setAudioElement] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;

    // Event listeners for audio state changes
    const handlePlaying = () => {
      setIsPlaying(true);
      setLoading(false);
      setError(null);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setLoading(false);
    };

    const handleWaiting = () => {
      setLoading(true);
    };

    const handleError = (e) => {
      console.error('Audio error:', e);
      let errorMessage = 'Error playing this station. Please try another one.';
      if (e.target.error) {
        switch (e.target.error.code) {
          case e.target.error.MEDIA_ERR_NETWORK:
            errorMessage = 'Network error: Unable to load the station stream.';
            break;
          case e.target.error.MEDIA_ERR_DECODE:
            errorMessage = 'Format error: The station stream format is not supported.';
            break;
          case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
            errorMessage = 'Unsupported source: The station stream is not playable.';
            break;
          default:
            errorMessage = 'An unexpected error occurred while playing the station.';
        }
      }
      setError(errorMessage);
      setLoading(false);
      setIsPlaying(false);
    };

    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('error', handleError);

    setAudioElement(audio);

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.src = '';
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('error', handleError);
      setAudioElement(null);
    };
  }, []);

  // Persist volume to localStorage and update audio element
  useEffect(() => {
    if (audioElement) {
      audioElement.volume = volume;
      localStorage.setItem('playerVolume', volume.toString());
    }
  }, [volume, audioElement]);

  // Check if a station is playable based on its status
  const isStationPlayable = useCallback((station) => {
    if (!station || !station.url_resolved) {
      return false;
    }
    if (station.lastcheckok !== undefined && station.lastcheckok !== 1) {
      return false;
    }
    return true;
  }, []);

  // Play a station
  const playStation = useCallback(async (station) => {
    if (!isStationPlayable(station)) {
      setError('This station is currently offline or unavailable.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Record station click
      if (station.stationuuid) {
        await recordStationClick(station.stationuuid);
      }

      if (audioElement) {
        audioElement.pause();
        audioElement.src = station.url_resolved;
        audioElement.load();
        await audioElement.play();
        setCurrentStation(station);
      }
    } catch (err) {
      console.error('Error in playStation:', err);
      let errorMessage = 'Error playing this station. Please try another one.';
      if (err.name === 'NotAllowedError') {
        errorMessage = 'Playback was blocked. Please allow autoplay or try again.';
      } else if (err.name === 'NotSupportedError') {
        errorMessage = 'This station stream format is not supported.';
      }
      setError(errorMessage);
      setLoading(false);
      setIsPlaying(false);
    }
  }, [audioElement, isStationPlayable]);

  // Toggle play/pause
  const togglePlay = useCallback(() => {
    if (!audioElement || !currentStation) return;

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play().catch(err => {
        console.error('Error playing audio:', err);
        let errorMessage = 'Error playing this station. Please try another one.';
        if (err.name === 'NotAllowedError') {
          errorMessage = 'Playback was blocked. Please allow autoplay or try again.';
        }
        setError(errorMessage);
      });
    }
  }, [audioElement, currentStation, isPlaying]);

  // Stop playing
  const stopPlaying = useCallback(() => {
    if (!audioElement) return;

    audioElement.pause();
    audioElement.src = '';
    setCurrentStation(null);
    setIsPlaying(false);
    setLoading(false);
    setError(null);
  }, [audioElement]);

  // Change volume
  const changeVolume = useCallback((newVolume) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume)); // Ensure volume is between 0 and 1
    setVolume(clampedVolume);
  }, []);

  const value = {
    currentStation,
    isPlaying,
    volume,
    loading,
    error,
    playStation,
    togglePlay,
    stopPlaying,
    changeVolume,
  };

  return (
    <AudioPlayerContext.Provider value={value}>
      {children}
    </AudioPlayerContext.Provider>
  );
};