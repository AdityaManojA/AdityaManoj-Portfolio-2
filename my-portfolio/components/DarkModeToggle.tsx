import { useState, useEffect } from 'react';
import { IMAGES } from '../data';

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('theme');
    if (storedMode) return storedMode === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleMode = () => setIsDarkMode(!isDarkMode);

  return (
    <button 
      onClick={toggleMode}
      className="toggle-btn"
      title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="toggle-thumb">
        <img 
          src={IMAGES.profile} 
          alt="Toggle Theme" 
          className="toggle-img"
        />
      </div>
    </button>
  );
};

export default DarkModeToggle;