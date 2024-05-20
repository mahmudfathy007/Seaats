import { useState } from 'react';

const useLocationSearch = () => {
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);

  const searchLocation = async (query, setSuggestions) => {
    try {
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=7afbb0b21a78415684e02db67460ad50`;
      const response = await fetch(url);
      const data = await response.json();

      if (response.ok && data.results.length > 0) {
        setSuggestions(data.results);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setSuggestions([]);
    }
  };

  return {
    fromSuggestions,
    setFromSuggestions,
    toSuggestions,
    setToSuggestions,
    searchLocation,
  };
};

export default useLocationSearch;
