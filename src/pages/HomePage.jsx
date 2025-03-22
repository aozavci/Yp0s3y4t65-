import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import factsData from '../data/facts.json';

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Kategorileri facts.json dosyasından çek
    const uniqueCategories = [...new Set(Object.keys(factsData))];
    
    // Kategori bilgilerini oluştur
    const categoryInfo = uniqueCategories.map(category => {
      // Kategori renklerini ve ikonlarını tanımla
      let color, icon, displayName;
      
      switch(category) {
        case 'bilim':
          color = 'bg-blue-500';
          icon = '🔬';
          displayName = 'Bilim';
          break;
        case 'teknoloji':
          color = 'bg-purple-500';
          icon = '💻';
          displayName = 'Teknoloji';
          break;
        case 'sanat':
          color = 'bg-pink-500';
          icon = '🎨';
          displayName = 'Sanat';
          break;
        case 'tarih':
          color = 'bg-amber-500';
          icon = '📜';
          displayName = 'Tarih';
          break;
        case 'doğa':
          color = 'bg-green-500';
          icon = '🌿';
          displayName = 'Doğa';
          break;
        case 'gizemler_ve_teoriler':
          color = 'bg-indigo-600';
          icon = '🔮';
          displayName = 'Gizemler ve Teoriler';
          break;
        default:
          color = 'bg-gray-500';
          icon = '❓';
          displayName = category;
      }
      
      return {
        id: category,
        name: displayName,
        color,
        icon
      };
    });
    
    setCategories(categoryInfo);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <img src="./logo.svg" alt="Biliyor musun? Logo" className="w-20 h-20 object-contain dark:invert" />
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Biliyor musun?</h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 mt-4">
          İlginç bilgiler dünyasına hoş geldiniz!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/facts/${category.id}`}
            className={`${category.color} rounded-lg p-6 text-white hover:opacity-90 transition-opacity shadow-lg`}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center justify-center space-y-4"
            >
              <span className="text-4xl">{category.icon}</span>
              <h2 className="text-2xl font-semibold">{category.name}</h2>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center mt-12"
      >
        <Link
          to="/random"
          className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-colors shadow-lg"
        >
          <span className="mr-2">🎲</span>
          Öğrenmeye Başla
        </Link>
      </motion.div>
    </div>
  );
};

export default HomePage;
