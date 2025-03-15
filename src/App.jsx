import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FactCardsPage from './pages/FactCardsPage';
import FavoritesPage from './pages/FavoritesPage';
import SearchPage from './pages/SearchPage';
import RandomFactPage from './pages/RandomFactPage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Dark mode ayarını localStorage'dan al
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    
    // Favorileri localStorage'dan al
    const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    console.log('App - Yüklenen favoriler:', savedFavorites);
    setFavorites(savedFavorites);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
  };

  const handleToggleFavorite = (fact) => {
    console.log('App - Favori değiştiriliyor:', fact);
    
    const factExists = favorites.some(f => f.id === fact.id);
    let newFavorites = [];
    
    if (factExists) {
      // Favorilerden çıkar
      newFavorites = favorites.filter(f => f.id !== fact.id);
      console.log('App - Favorilerden çıkarıldı:', fact.id);
    } else {
      // Favorilere ekle
      newFavorites = [...favorites, fact];
      console.log('App - Favorilere eklendi:', fact);
    }
    
    console.log('App - Yeni favoriler:', newFavorites);
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (factId) => {
    return favorites.some(f => f.id === factId);
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <motion.div 
        className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="pb-12">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route 
              path="/facts/:category" 
              element={
                <FactCardsPage 
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={isFavorite}
                />
              } 
            />
            <Route 
              path="/favorites" 
              element={
                <FavoritesPage 
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              } 
            />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/random" element={<RandomFactPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="bg-gray-100 dark:bg-gray-800 py-4 text-center text-gray-600 dark:text-gray-300">
          <p>Biliyor musun?</p>
        </footer>
      </motion.div>
    </div>
  );
}

export default App;
