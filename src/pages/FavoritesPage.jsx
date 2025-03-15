import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import FactCard from '../components/FactCard';

const FavoritesPage = ({ favorites = [], onToggleFavorite }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Arama fonksiyonu
  const filteredFavorites = searchTerm
    ? favorites.filter(fact => 
        fact.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        fact.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : favorites;

  const handlePrevFact = () => {
    setDirection(-1);
    setCurrentFactIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return filteredFavorites.length - 1;
    });
  };

  const handleNextFact = () => {
    setDirection(1);
    setCurrentFactIndex((prevIndex) => {
      if (prevIndex < filteredFavorites.length - 1) {
        return prevIndex + 1;
      }
      return 0;
    });
  };

  // Animasyon varyantları
  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  const factVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    })
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 400
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-6 sm:py-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="flex justify-between items-center mb-6">
        <motion.div
          whileHover="hover"
          whileTap="tap"
          variants={buttonVariants}
        >
          <Link 
            to="/"
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
          >
            <FaArrowLeft className="mr-2" />
            <span>Ana Sayfa</span>
          </Link>
        </motion.div>
        
        <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-white">
          Favorilerim
        </h2>
        
        <div className="w-10"></div>
      </div>

      {/* Arama kutusu */}
      {favorites.length > 0 && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Favorilerimde ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
          />
        </div>
      )}
      
      {favorites.length === 0 ? (
        <motion.div 
          className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <FaHeart className="text-red-500 text-4xl mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Henüz favori bilginiz yok
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            İlginizi çeken bilgileri favorilere ekleyerek burada görüntüleyebilirsiniz.
          </p>
          <motion.div
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
          >
            <Link 
              to="/"
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Bilgileri Keşfet
            </Link>
          </motion.div>
        </motion.div>
      ) : filteredFavorites.length === 0 ? (
        <motion.div 
          className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Arama sonucu bulunamadı
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Farklı bir arama terimi deneyin veya tüm favorilerinizi görmek için arama kutusunu temizleyin.
          </p>
        </motion.div>
      ) : (
        <div className="max-w-2xl mx-auto">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentFactIndex}
              custom={direction}
              variants={factVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="mb-6"
            >
              <FactCard 
                fact={filteredFavorites[currentFactIndex]}
                isFavorite={true}
                onToggleFavorite={() => onToggleFavorite(filteredFavorites[currentFactIndex])}
                showFullContent={true}
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between items-center mt-6">
            <motion.button
              onClick={handlePrevFact}
              className="btn-secondary flex items-center"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FaArrowLeft className="mr-2" /> Önceki
            </motion.button>

            <span className="text-gray-600 dark:text-gray-400">
              {currentFactIndex + 1} / {filteredFavorites.length}
            </span>

            <motion.button
              onClick={handleNextFact}
              className="btn-secondary flex items-center"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Sonraki <FaArrowRight className="ml-2" />
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default FavoritesPage;
