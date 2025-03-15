import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <motion.div
      className="container mx-auto px-4 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Biliyor musun? Hakkında
      </h1>
      <div className="prose dark:prose-invert">
        <p>
          "Biliyor musun?" uygulaması, ilginç bilgileri kategoriler halinde sunan bir trivia uygulamasıdır. 
          Kullanıcılar ilginç buldukları bilgileri favorilerine ekleyebilir ve daha sonra tekrar inceleyebilir.
        </p>
        <h2 className="text-xl font-bold mt-6 mb-2">Özellikler</h2>
        <ul>
          <li>Çeşitli kategorilerde ilginç bilgiler</li>
          <li>Favorilere ekleme özelliği</li>
          <li>Karanlık mod desteği</li>
          <li>Responsive tasarım</li>
        </ul>
        <h2 className="text-xl font-bold mt-6 mb-2">Teknoloji</h2>
        <p>
          Bu uygulama React.js ve Tailwind CSS kullanılarak geliştirilmiştir. Animasyonlar için Framer Motion kütüphanesi kullanılmıştır.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutPage;
