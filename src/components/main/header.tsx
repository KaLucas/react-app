import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AppBar, Button, Toolbar, Typography, Stack } from '@mui/material';
import type { ReactElement } from 'react';

type Props = {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
};

export const Header = ({ toggleTheme, mode }: Props): ReactElement => (
  <AppBar
    position="fixed"
    sx={(theme) => ({
      backgroundColor: theme.palette.primary.main,
      borderBottom: `1px solid ${theme.palette.divider}`,
    })}
  >
    <Toolbar
      sx={{
        height: '65px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Usuários cadastrados
      </Typography>
      <Stack direction="row" spacing={1}>
        <Button onClick={toggleTheme} sx={{ color: 'text.primary' }}>
          <FontAwesomeIcon icon={mode === 'light' ? faMoon : faSun} />
        </Button>
        <Button
          variant="contained"
          sx={(theme) => ({
            borderRadius: '200px',
            textTransform: 'none',
            px: 3,
            backgroundColor: theme.palette.primary.dark,
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
            },
          })}
        >
          Acessar Admin
        </Button>
      </Stack>
    </Toolbar>
  </AppBar>
);
