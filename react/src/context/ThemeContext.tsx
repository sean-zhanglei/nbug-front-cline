import React, { createContext, useContext, ReactNode } from 'react';

interface Theme {
  foreground: string;
  background: string;
}

const lightTheme: Theme = {
  foreground: '#000000',
  background: '#ffffff'
};

const darkTheme: Theme = {
  foreground: '#ffffff',
  background: '#222222'
};

const ThemeContext = createContext<Theme>(lightTheme);

interface ThemeProviderProps {
  children: ReactNode;
  theme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  theme = lightTheme 
}) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
