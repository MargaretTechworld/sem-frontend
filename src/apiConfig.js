// Point this to your Render URL now that backend is hosted
const BASE_URL = 'https://backend-tovanah.onrender.com';
// const BASE_URL = 'http://localhost:5000'; // Uncomment for local development

const API_URL = `${BASE_URL}/api`;

/**
 * Fixes broken image URLs that might still point to localhost:5000
 * @param {string} url - The image URL from the database
 * @returns {string} - The corrected URL pointing to the active BASE_URL
 */
const getImgUrl = (url) => {
  if (!url) return '/images/sample.jpg';

  // Support for localhost if migrating from local data to production
  if (url.includes('localhost:5000')) {
    return url.replace('http://localhost:5000', BASE_URL);
  }

  // If it's a relative path, prepend BASE_URL
  if (url.startsWith('/uploads')) {
    return `${BASE_URL}${url}`;
  }

  // If it's already an absolute URL (like Cloudinary), return as is
  // But first, handle a common error where an absolute URL is prefixed with / (e.g. /https://...)
  if (url.startsWith('/http')) {
    return url.substring(1);
  }
  return url;
};

export { BASE_URL, API_URL, getImgUrl };
