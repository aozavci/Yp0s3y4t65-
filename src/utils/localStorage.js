/**
 * Utility functions for safely handling localStorage operations
 */

/**
 * Checks if localStorage is available in the current environment
 * @returns {boolean}
 */
const isLocalStorageAvailable = () => {
  try {
    const testKey = '__test__';
    localStorage.setItem(testKey, testKey);
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Safely gets an item from localStorage
 * @param {string} key - The key to retrieve
 * @param {any} defaultValue - The default value to return if the key doesn't exist or localStorage is unavailable
 * @returns {any} The retrieved value or defaultValue
 */
export const getItem = (key, defaultValue = null) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return defaultValue;
    }
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Safely sets an item in localStorage
 * @param {string} key - The key to set
 * @param {any} value - The value to store
 * @returns {boolean} True if the operation was successful
 */
export const setItem = (key, value) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return false;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    return false;
  }
};

/**
 * Safely removes an item from localStorage
 * @param {string} key - The key to remove
 * @returns {boolean} True if the operation was successful
 */
export const removeItem = (key) => {
  if (!isLocalStorageAvailable()) {
    console.warn('localStorage is not available');
    return false;
  }

  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error);
    return false;
  }
};