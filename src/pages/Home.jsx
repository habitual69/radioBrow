import { useState, useEffect } from 'react';
import StationTabs from '../components/StationTabs';
import { initApi, getTopStations, getRecentStations, getCountries, getLanguages, getTags } from '../services/api';

const Home = () => {
  const [topStations, setTopStations] = useState([]);
  const [recentStations, setRecentStations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        await initApi();

        const topData = await getTopStations(30);
        setTopStations(topData);

        const recentData = await getRecentStations(30);
        setRecentStations(recentData);

        const countriesData = await getCountries();
        setCountries(countriesData.sort((a, b) => b.stationcount - a.stationcount).slice(0, 600));

        const languagesData = await getLanguages();
        setLanguages(languagesData.sort((a, b) => b.stationcount - a.stationcount).slice(0, 600));

        const tagsData = await getTags();
        setTags(tagsData.sort((a, b) => b.stationcount - a.stationcount).slice(0, 600));

        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load stations. Please try again.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-b from-dark-primary to-trinary/10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary mb-4"></div>
        <p className="text-light-primary/70 text-sm animate-pulse">Loading stations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] bg-gradient-to-b from-dark-primary to-trinary/10 p-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 w-full max-w-md mx-4 shadow-lg">
          <p className="text-red-400 text-center mb-4 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-secondary text-dark-primary px-6 py-3 rounded-md hover:bg-secondary/90 transition-all duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-secondary/50 w-full sm:w-auto"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-dark-primary to-trinary/5 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-light-primary mb-6 bg-gradient-to-r from-secondary to-secondary/60 bg-clip-text text-transparent text-center sm:text-left">
          Radio Browser
        </h1>
        <div className="bg-dark-primary/50 rounded-xl p-4 sm:p-6 shadow-xl border border-trinary/20">
          <StationTabs
            topStations={topStations}
            recentStations={recentStations}
            countries={countries}
            languages={languages}
            tags={tags}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;