import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FaArrowLeft, FaArrowRight, FaHome } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import FactCard from '../components/FactCard';
import factsData from '../data/facts.json';

const FactCardsPage = ({ favorites = [], onToggleFavorite, isFavorite }) => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [facts, setFacts] = useState([]);
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 sol, 1 sağ, 0 başlangıç

  useEffect(() => {
    // Kategori değiştiğinde, ilk bilgiye dön
    setCurrentFactIndex(0);
    setDirection(0);
    
    // Kategoriye ait bilgileri yükle
    if (category && factsData[category]) {
      setFacts(factsData[category]);
    } else {
      // Kategori bulunamadıysa ana sayfaya yönlendir
      navigate('/');
    }
  }, [category, navigate]);

  const handlePrevFact = () => {
    setDirection(-1);
    setCurrentFactIndex((prevIndex) => {
      if (prevIndex > 0) {
        return prevIndex - 1;
      }
      return facts.length - 1; // Başa dön
    });
  };

  const handleNextFact = () => {
    setDirection(1);
    setCurrentFactIndex((prevIndex) => {
      if (prevIndex < facts.length - 1) {
        return prevIndex + 1;
      }
      return 0; // Sona dön
    });
  };

  const handleToggleFavorite = () => {
    const currentFact = facts[currentFactIndex];
    if (!currentFact) return;
    
    // App bileşenindeki onToggleFavorite fonksiyonunu çağır
    onToggleFavorite(currentFact);
  };

  const currentFact = facts[currentFactIndex];
  const isCurrentFactFavorite = currentFact ? isFavorite(currentFact.id) : false;

  // Kategori adını daha okunabilir hale getir
  const getCategoryDisplayName = () => {
    if (!category) return '';
    
    switch(category) {
      case 'bilim':
        return 'Bilim';
      case 'teknoloji':
        return 'Teknoloji';
      case 'sanat':
        return 'Sanat';
      case 'tarih':
        return 'Tarih';
      case 'doğa':
        return 'Doğa';
      case 'gizemler_ve_teoriler':
        return 'Gizemler ve Teoriler';
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  };

  // Kategori rengini belirle
  const getCategoryColor = () => {
    if (!category) return 'bg-gray-500';
    
    switch(category) {
      case 'bilim':
        return 'bg-blue-500';
      case 'teknoloji':
        return 'bg-purple-500';
      case 'sanat':
        return 'bg-pink-500';
      case 'tarih':
        return 'bg-amber-500';
      case 'doğa':
        return 'bg-green-500';
      case 'gizemler_ve_teoriler':
        return 'bg-indigo-600';
      default:
        return 'bg-gray-500';
    }
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
    },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.3 
      }
    }
  };

  const factVariants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
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
    exit: (direction) => {
      return {
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        transition: {
          duration: 0.3
        }
      };
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 400
      }
    },
    tap: { 
      scale: 0.9,
      transition: {
        duration: 0.1
      }
    }
  };

  const progressVariants = {
    initial: { width: 0 },
    animate: { 
      width: `${((currentFactIndex + 1) / facts.length) * 100}%`,
      transition: { duration: 0.3 }
    }
  };

  // Eğer bilgi yoksa yükleniyor göster
  if (!currentFact) {
    return (
      <motion.div 
        className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[50vh]"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Yükleniyor...</h2>
        <Link 
          to="/"
          className="mt-4 inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <FaHome className="mr-2" /> Ana Sayfa
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="container mx-auto px-4 py-6"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
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
            <FaHome className="mr-2" />
            <span>Ana Sayfa</span>
          </Link>
        </motion.div>
        
        <div className={`px-4 py-1 ${getCategoryColor()} text-white rounded-full`}>
          {getCategoryDisplayName()}
        </div>
        
        <div className="w-20"></div> {/* Dengelemek için boş div */}
      </div>
      
      {/* İlerleme çubuğu */}
      <div className="w-full h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
        <motion.div 
          className={`h-full ${getCategoryColor()}`}
          variants={progressVariants}
          initial="initial"
          animate="animate"
        />
      </div>
      
      <div className="flex flex-col items-center">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentFactIndex}
            custom={direction}
            variants={factVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full max-w-2xl"
          >
            <FactCard 
              fact={currentFact}
              isFavorite={isCurrentFactFavorite}
              onToggleFavorite={handleToggleFavorite}
            />
          </motion.div>
        </AnimatePresence>
        
        <div className="flex justify-center mt-8 space-x-4">
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={handlePrevFact}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Önceki bilgi"
          >
            <FaArrowLeft />
          </motion.button>
          
          <motion.button
            whileHover="hover"
            whileTap="tap"
            variants={buttonVariants}
            onClick={handleNextFact}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Sonraki bilgi"
          >
            <FaArrowRight />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default FactCardsPage;
