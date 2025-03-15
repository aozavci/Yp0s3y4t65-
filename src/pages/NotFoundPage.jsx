import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <motion.div
      className="container mx-auto px-4 py-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
        404 - Sayfa Bulunamadı
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
        Aradığınız sayfa bulunamadı. Ana sayfaya dönmek için aşağıdaki butonu kullanabilirsiniz.
      </p>
      <Link
        to="/"
        className="inline-block px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      >
        Ana Sayfaya Dön
      </Link>
    </motion.div>
  );
};

export default NotFoundPage;
