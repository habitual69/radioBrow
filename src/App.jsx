import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Stations from './pages/Stations'
import StationDetails from './pages/StationDetails'
import Favorites from './pages/Favorites'
import Search from './pages/Search'
import AudioPlayer from './components/AudioPlayer'
import { AudioPlayerProvider } from './contexts/AudioPlayerContext'

function App() {
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    // Apply theme class to body
    if (darkMode) {
      document.body.classList.remove('light-theme')
    } else {
      document.body.classList.add('light-theme')
    }
  }, [darkMode])

  return (
    <AudioPlayerProvider>
      <div className={`min-h-screen ${darkMode ? 'bg-dark-primary text-light-primary' : 'bg-light-primary text-dark-primary'}`}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)] mt-16">
          {/* Left Column - Web Player */}
          <div className="md:w-1/3 lg:w-1/4 p-4 border-r border-trinary border-opacity-20 h-full overflow-y-auto">
            <AudioPlayer />
          </div>
          
          {/* Right Column - Station Listings */}
          <div className="md:w-2/3 lg:w-3/4 h-full overflow-y-auto">
            <main className="p-4">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stations/:category/:term" element={<Stations />} />
                <Route path="/station/:id" element={<StationDetails />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/search" element={<Search />} />
              </Routes>
            </main>
          </div>
        </div>
      </div>
    </AudioPlayerProvider>
  )
}

export default App