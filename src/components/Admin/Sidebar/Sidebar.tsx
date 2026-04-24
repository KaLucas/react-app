import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from '@mui/material';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@context/use-auth-context';
import logo from '@assets/react-app.png';

export const Sidebar = (): ReactElement => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  function handleLogout() {
    logout();
    navigate('/admin', { replace: true });
  }

  return (
    <Stack minHeight="100vh" justifyContent="space-between" sx={{ boxSizing: 'border-box', p: 2 }}>
      <aside>
        <nav>
          <List>
            <ListItem disablePadding>
              <ListItemButton sx={{ gap: 1 }} onClick={handleLogout}>
                <ListItemIcon sx={{ minWidth: 0 }}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </aside>
      <Box alignSelf="center">
        <img src={logo} alt="React App Logo" width="100px" />
      </Box>
    </Stack>
  );
};

export default Sidebar;
