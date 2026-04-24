import { ThemeProvider, CssBaseline } from '@mui/material';
import { useMemo, type ReactElement } from 'react';
import { UsersShow } from '@pages/main';
import { darkTheme, lightTheme } from '@theme/theme';

type MainLayoutProps = {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
};

const MainLayout = ({ toggleTheme, mode }: MainLayoutProps): ReactElement => {
  const theme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UsersShow toggleTheme={toggleTheme} mode={mode} />
    </ThemeProvider>
  );
};

export default MainLayout;
