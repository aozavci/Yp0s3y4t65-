import { useState } from 'react';
import { FaHeart, FaRegHeart, FaShare } from 'react-icons/fa';
import { 
  TwitterShareButton, 
  WhatsappShareButton, 
  FacebookShareButton,
  TwitterIcon,
  WhatsappIcon,
  FacebookIcon
} from 'react-share';
import { motion } from 'framer-motion';

const FactCard = ({ 
  fact, 
  isFavorite, 
  onToggleFavorite, 
  showFullContent = true,
  showShareOptions = true
}) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Kategori adını bilgi ID'sinden çıkar
  const getCategoryFromId = (id) => {
    if (!id) return '';
    const parts = id.split('-');
    return parts[0];
  };

  const category = getCategoryFromId(fact.id);

  // Kategori renklerini tanımla
  const categoryColors = {
    bilim: 'bg-blue-500',
    teknoloji: 'bg-purple-500',
    sanat: 'bg-pink-500',
    tarih: 'bg-amber-500',
    doğa: 'bg-green-500',
    gizemler_ve_teoriler: 'bg-indigo-600'
  };

  // Kategori ikonlarını tanımla
  const categoryIcons = {
    bilim: '🔬',
    teknoloji: '💻',
    sanat: '🎨',
    tarih: '📜',
    doğa: '🌿',
    gizemler_ve_teoriler: '🔮'
  };

  const toggleShareOptions = () => {
    setIsShareOpen(!isShareOpen);
    setCopied(false);
  };

  const copyToClipboard = () => {
    const textToCopy = `${fact.title}: ${fact.content} - Kaynak: ${fact.source}`;
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error('Panoya kopyalama başarısız:', err));
  };

  const shareUrl = window.location.href;
  const shareTitle = fact.title ? `Biliyor musun? ${fact.title}` : 'Biliyor musun?';

  // Animasyon varyantları
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.3
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: 0.2,
        duration: 0.4
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delay: 0.3,
        duration: 0.4
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 300
      }
    },
    tap: { 
      scale: 0.9,
      transition: {
        duration: 0.1
      }
    }
  };

  const shareMenuVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 10
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  // Favori butonuna tıklandığında
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite();
    }
  };

  return (
    <motion.div 
      className="card hover:shadow-lg transition-shadow"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <div className={`${categoryColors[category] || 'bg-blue-500'} text-white p-2 sm:p-3 flex justify-between items-center`}>
        <div className="flex items-center">
          <span className="mr-2">{categoryIcons[category] || '📚'}</span>
          <h3 className="font-semibold text-sm sm:text-base capitalize">{category}</h3>
        </div>
      </div>
      
      <div className="p-3 sm:p-4">
        {fact.imageUrl && (
          <motion.div 
            className="mb-3 sm:mb-4 overflow-hidden rounded-lg"
            variants={imageVariants}
          >
            <img 
              src={fact.imageUrl} 
              alt={fact.title} 
              className="w-full h-32 sm:h-40 object-cover"
              loading="lazy"
            />
          </motion.div>
        )}
        
        <motion.div variants={contentVariants}>
          <h4 className="text-lg sm:text-xl font-bold mb-2 text-gray-800 dark:text-white">{fact.title}</h4>
          <p className={`text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 ${showFullContent ? '' : 'line-clamp-3'}`}>
            {fact.content}
          </p>
          
          <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3 sm:mb-4">
            Kaynak: {fact.source}
          </div>
        </motion.div>
        
        <div className="flex justify-between items-center">
          <div className="flex space-x-1 sm:space-x-2">
            {onToggleFavorite && (
              <motion.button 
                onClick={handleFavoriteClick}
                className="p-1 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label={isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle'}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                {isFavorite ? 
                  <FaHeart className="text-red-500 text-lg sm:text-xl" /> : 
                  <FaRegHeart className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl" />
                }
              </motion.button>
            )}
            
            {showShareOptions && (
              <div className="relative">
                <motion.button 
                  onClick={toggleShareOptions}
                  className="p-1 sm:p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                  aria-label="Paylaş"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FaShare className="text-gray-500 dark:text-gray-400 text-lg sm:text-xl" />
                </motion.button>
                
                {isShareOpen && (
                  <motion.div 
                    className="absolute bottom-full right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-2 z-10"
                    variants={shareMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="flex space-x-2 mb-2">
                      <TwitterShareButton url={shareUrl} title={shareTitle}>
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      
                      <WhatsappShareButton url={shareUrl} title={shareTitle}>
                        <WhatsappIcon size={32} round />
                      </WhatsappShareButton>
                      
                      <FacebookShareButton url={shareUrl} quote={shareTitle}>
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                    </div>
                    
                    <button 
                      onClick={copyToClipboard}
                      className="w-full text-xs sm:text-sm py-1 px-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                      {copied ? 'Kopyalandı!' : 'Metni Kopyala'}
                    </button>
                  </motion.div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FactCard;
