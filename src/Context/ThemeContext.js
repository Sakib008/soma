import { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    
  const [theme, setTheme] = useState(() => {
    // Get initial theme from localStorage or default to 'light'
    return localStorage.getItem('theme') || 'light';
  });

  // Update localStorage when theme changes
  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

    // Function to toggle theme
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const isDarkTheme = theme === 'dark';
  const isLightTheme = theme === 'light';

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDarkTheme, isLightTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
export const useTheme = () => useContext(ThemeContext);