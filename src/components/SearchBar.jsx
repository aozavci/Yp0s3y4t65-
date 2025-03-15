import { useState } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

const SearchBar = ({ onSearch, placeholder = 'Bilgilerde ara...' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-6">
      <div className="relative flex items-center">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 pl-10 pr-10 rounded-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="absolute left-3 text-gray-500 dark:text-gray-400">
          <FaSearch />
        </div>
        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-12 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <FaTimes />
          </button>
        )}
        <button
          type="submit"
          className="absolute right-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-1"
          aria-label="Ara"
        >
          <FaSearch />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
