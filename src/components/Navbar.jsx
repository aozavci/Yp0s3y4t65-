import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSun, FaMoon, FaBars, FaTimes, FaHome, FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { getItem, setItem } from '../utils/localStorage';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Local storage'dan dark mode tercihini al
    const savedDarkMode = getItem('darkMode', false);
    setDarkMode(savedDarkMode);
    
    // Dark mode'u uygula
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    // Sayfa değiştiğinde menüyü kapat
    setIsMenuOpen(false);
  }, [location]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    
    // Dark mode'u güncelle ve local storage'a kaydet
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    setItem('darkMode', newDarkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Animasyon varyantları
  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const menuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const menuItemVariants = {
    closed: { 
      opacity: 0,
      x: -20
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      y: -2,
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

  const themeToggleVariants = {
    light: { 
      rotate: 0,
      scale: 1
    },
    dark: { 
      rotate: 180,
      scale: 1
    },
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 400
      }
    },
    tap: {
      scale: 0.9
    }
  };

  return (
    <motion.nav 
      className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md"
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.span 
              className="text-xl font-bold text-blue-500 dark:text-blue-400"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Biliyor musun?
            </motion.span>
          </Link>
          
          {/* Masaüstü menüsü */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/">
              <motion.div 
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg ${
                  location.pathname === '/' 
                    ? 'bg-blue-500 text-white dark:bg-blue-600' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700'
                } transition-all duration-300 ease-in-out`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaHome className={`${location.pathname === '/' ? 'text-white' : 'text-blue-500 dark:text-blue-400'}`} />
                <span className="font-medium">Ana Sayfa</span>
              </motion.div>
            </Link>
            
            <Link to="/favorites">
              <motion.div 
                className={`flex items-center space-x-1 px-4 py-2 rounded-lg ${
                  location.pathname === '/favorites' 
                    ? 'bg-blue-500 text-white dark:bg-blue-600' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700'
                } transition-all duration-300 ease-in-out`}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FaHeart className={`${location.pathname === '/favorites' ? 'text-white' : 'text-red-500 dark:text-red-400'}`} />
                <span className="font-medium">Favoriler</span>
              </motion.div>
            </Link>
            
            <motion.button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={darkMode ? 'Açık moda geç' : 'Karanlık moda geç'}
              variants={themeToggleVariants}
              animate={darkMode ? "dark" : "light"}
              whileHover="hover"
              whileTap="tap"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-700" />}
            </motion.button>
          </div>
          
          {/* Mobil menü butonu */}
          <div className="md:hidden flex items-center">
            <motion.button 
              onClick={toggleDarkMode}
              className="p-2 mr-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={darkMode ? 'Açık moda geç' : 'Karanlık moda geç'}
              variants={themeToggleVariants}
              animate={darkMode ? "dark" : "light"}
              whileHover="hover"
              whileTap="tap"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-blue-700" />}
            </motion.button>
            
            <motion.button 
              onClick={toggleMenu}
              className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
              aria-label={isMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.button>
          </div>
        </div>
        
        {/* Mobil menü */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden overflow-hidden"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link to="/">
                  <motion.div 
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                      location.pathname === '/' 
                        ? 'bg-blue-500 text-white dark:bg-blue-600' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700'
                    } transition-all duration-300 ease-in-out`}
                    variants={menuItemVariants}
                  >
                    <FaHome className={`${location.pathname === '/' ? 'text-white' : 'text-blue-500 dark:text-blue-400'}`} />
                    <span className="font-medium">Ana Sayfa</span>
                  </motion.div>
                </Link>
                
                <Link to="/favorites">
                  <motion.div 
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                      location.pathname === '/favorites' 
                        ? 'bg-blue-500 text-white dark:bg-blue-600' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-gray-700'
                    } transition-all duration-300 ease-in-out`}
                    variants={menuItemVariants}
                  >
                    <FaHeart className={`${location.pathname === '/favorites' ? 'text-white' : 'text-red-500 dark:text-red-400'}`} />
                    <span className="font-medium">Favoriler</span>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;
