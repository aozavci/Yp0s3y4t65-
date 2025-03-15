import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import FactCard from '../components/FactCard';
import LoadingSpinner from '../components/LoadingSpinner';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allFacts, setAllFacts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [likes, setLikes] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Tüm bilgileri ve favori bilgileri yükle
  useEffect(() => {
    const loadAllFacts = async () => {
      try {
        const response = await import('../data/facts.json');
        const factsData = response.default;
        
        // Tüm kategorilerden bilgileri düz bir diziye dönüştür
        const flattenedFacts = Object.entries(factsData).reduce((acc, [category, facts]) => {
          return [...acc, ...facts];
        }, []);
        
        setAllFacts(flattenedFacts);
        setIsLoading(false);
      } catch (error) {
        console.error('Bilgiler yüklenirken hata oluştu:', error);
        setIsLoading(false);
      }
    };

    const loadFavorites = () => {
      const savedFavorites = localStorage.getItem('favorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    };

    const loadLikes = () => {
      const savedLikes = localStorage.getItem('likes');
      if (savedLikes) {
        setLikes(JSON.parse(savedLikes));
      }
    };

    loadAllFacts();
    loadFavorites();
    loadLikes();
  }, []);

  // Favori bilgileri kaydet
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Beğenileri kaydet
  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  // Arama işlevi
  const handleSearch = (term) => {
    setSearchTerm(term);
    
    if (!term.trim()) {
      setSearchResults([]);
      return;
    }
    
    const normalizedTerm = term.toLowerCase().trim();
    
    const results = allFacts.filter(fact => 
      fact.title.toLowerCase().includes(normalizedTerm) || 
      fact.content.toLowerCase().includes(normalizedTerm)
    );
    
    setSearchResults(results);
  };

  const toggleFavorite = (fact) => {
    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(fav => fav.id === fact.id);
      
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== fact.id);
      } else {
        return [...prevFavorites, fact];
      }
    });
  };

  const toggleLike = (id) => {
    setLikes((prevLikes) => {
      const newLikes = { ...prevLikes };
      newLikes[id] = !newLikes[id];
      return newLikes;
    });
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Bilgilerde Ara
        </h1>
        <Link 
          to="/" 
          className="btn-secondary flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Ana Sayfa
        </Link>
      </div>

      <SearchBar onSearch={handleSearch} placeholder="Bilgilerde ara..." />

      {isLoading ? (
        <LoadingSpinner size="large" />
      ) : searchTerm && searchResults.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Sonuç bulunamadı</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            "{searchTerm}" için herhangi bir bilgi bulunamadı. Lütfen başka bir arama terimi deneyin.
          </p>
        </div>
      ) : searchResults.length > 0 ? (
        <div>
          <p className="mb-4 text-gray-600 dark:text-gray-300">
            "{searchTerm}" için {searchResults.length} sonuç bulundu
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((fact) => (
              <FactCard 
                key={fact.id}
                fact={fact}
                isFavorite={favorites.some(fav => fav.id === fact.id)}
                isLiked={likes[fact.id]}
                onToggleFavorite={() => toggleFavorite(fact)}
                onToggleLike={() => toggleLike(fact.id)}
                showFullContent={false}
              />
            ))}
          </div>
        </div>
      ) : searchTerm === '' && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">Aramaya başla</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Yukarıdaki arama çubuğunu kullanarak bilgilerde arama yapabilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
