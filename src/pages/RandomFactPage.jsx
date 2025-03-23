import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaRandom } from 'react-icons/fa';
import FactCard from '../components/FactCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { getItem, setItem } from '../utils/localStorage';

const RandomFactPage = () => {
  const navigate = useNavigate();
  const [randomFact, setRandomFact] = useState(null);
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
        
        // Rastgele bir bilgi seç
        if (flattenedFacts.length > 0) {
          const randomIndex = Math.floor(Math.random() * flattenedFacts.length);
          setRandomFact(flattenedFacts[randomIndex]);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Bilgiler yüklenirken hata oluştu:', error);
        setIsLoading(false);
      }
    };

    const loadFavorites = () => {
      const savedFavorites = getItem('favorites', []);
      setFavorites(savedFavorites);
    };

    const loadLikes = () => {
      const savedLikes = getItem('likes', {});
      setLikes(savedLikes);
    };

    loadAllFacts();
    loadFavorites();
    loadLikes();
  }, []);

  // Favori bilgileri kaydet
  useEffect(() => {
    setItem('favorites', favorites);
  }, [favorites]);

  // Beğenileri kaydet
  useEffect(() => {
    setItem('likes', likes);
  }, [likes]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const getNewRandomFact = () => {
    if (allFacts.length > 0) {
      const randomIndex = Math.floor(Math.random() * allFacts.length);
      const newFact = allFacts[randomIndex];
      setRandomFact({
        ...newFact,
        imageUrl: newFact.imageUrl // Ensure the image URL is updated
      });
    }
  };

  const toggleFavorite = () => {
    if (!randomFact) return;

    setFavorites((prevFavorites) => {
      const isFavorite = prevFavorites.some(fav => fav.id === randomFact.id);
      
      if (isFavorite) {
        return prevFavorites.filter(fav => fav.id !== randomFact.id);
      } else {
        return [...prevFavorites, randomFact];
      }
    });
  };

  const toggleLike = () => {
    if (!randomFact) return;

    setLikes((prevLikes) => {
      const newLikes = { ...prevLikes };
      newLikes[randomFact.id] = !newLikes[randomFact.id];
      return newLikes;
    });
  };

  const isFavorite = randomFact ? favorites.some(fav => fav.id === randomFact.id) : false;
  const isLiked = randomFact ? likes[randomFact.id] : false;

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Rastgele Bilgi
        </h1>
        <button 
          onClick={handleBackToHome}
          className="btn-secondary flex items-center"
        >
          <FaArrowLeft className="mr-2" /> Ana Sayfa
        </button>
      </div>

      {isLoading ? (
        <LoadingSpinner size="large" />
      ) : randomFact ? (
        <div className="max-w-2xl mx-auto">
          <FactCard 
            fact={randomFact}
            isFavorite={isFavorite}
            isLiked={isLiked}
            onToggleFavorite={toggleFavorite}
            onToggleLike={toggleLike}
            showFullContent={true}
          />
          
          <div className="mt-6 text-center">
            <button 
              onClick={getNewRandomFact}
              className="btn-primary flex items-center mx-auto"
            >
              <FaRandom className="mr-2" /> Başka Bir Bilgi Göster
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-gray-600 dark:text-gray-300">Bilgi bulunamadı.</p>
        </div>
      )}
    </div>
  );
};

export default RandomFactPage;
