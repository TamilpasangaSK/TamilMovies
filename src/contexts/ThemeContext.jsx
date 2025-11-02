import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthProvider } from './AuthContext';
import { MovieProvider } from './MovieContext';

const ThemeContext = createContext(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <AuthProvider>
      <MovieProvider>
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      </MovieProvider>
    </AuthProvider>
  );
};

// ✅ Add this line to fix the import error
export { ThemeContext };
