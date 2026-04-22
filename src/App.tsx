import './app.css';
import { useMemo, useState } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme/theme';

import { AuthProvider } from '@context/auth-provider';
import AppRoutes from './routes/app-routes';

function App() {
  const savedTheme = localStorage.getItem('theme');
  const [mode, setMode] = useState<'light' | 'dark'>(savedTheme === 'dark' ? 'dark' : 'light');
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppRoutes toggleTheme={toggleTheme} mode={mode} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
