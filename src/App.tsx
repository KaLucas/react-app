import './App.css';
import { useState } from 'react';

import { AuthProvider } from '@context/auth-provider';
import AppRoutes from './routes/app-routes';

function App() {
  const savedTheme = localStorage.getItem('theme');
  const [mode, setMode] = useState<'light' | 'dark'>(savedTheme === 'dark' ? 'dark' : 'light');

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };

  return (
    <AuthProvider>
      <AppRoutes toggleTheme={toggleTheme} mode={mode} />
    </AuthProvider>
  );
}

export default App;
