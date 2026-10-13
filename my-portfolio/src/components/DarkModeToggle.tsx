import { useState, useEffect } from 'react';
import { IMAGES } from '../data';

const DarkModeToggle = () => {
  // Light is the default. Only an explicit toggle is remembered, under a new key, so values the
  // old version auto-saved on every visit ('theme') don't override the default.
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      return localStorage.getItem('theme-preference') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    try {
      localStorage.setItem('theme-preference', next ? 'dark' : 'light');
    } catch {
      // Storage unavailable (private mode): the choice just isn't remembered.
    }
  };

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