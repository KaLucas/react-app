import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {
  Box,
  Divider,
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
import { useGetUsersQuery } from '@services/api';
import { API_CONFIG } from '@config/api.config';
import logo from '@assets/react-app.png';
import UserSummary from './user-summary';
import type { User } from '@models/user.model';

export const Sidebar = (): ReactElement => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const { data: usersData } = useGetUsersQuery({
    project_id: API_CONFIG.projectId,
  });

  function handleLogout() {
    logout();
    navigate('/admin', { replace: true });
  }

  const total = usersData?.total ?? 0;
  const createdAt = usersData?.data?.[0]?.created_at as User['created_at'];

  return (
    <Stack
      data-test="sidebar"
      minHeight="100vh"
      justifyContent="space-between"
      sx={{ boxSizing: 'border-box' }}
    >
      <List sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2 }}>
        <ListItem disablePadding>
          <UserSummary total={total} createdAt={createdAt} />
        </ListItem>
        <ListItem disablePadding sx={{ mt: 'auto' }} data-test="logout-button">
          <ListItemButton sx={{ gap: 1 }} onClick={handleLogout}>
            <ListItemIcon sx={{ minWidth: 0 }}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Box alignSelf="center" p={2}>
        <img src={logo} alt="React App Logo" width="100px" />
      </Box>
    </Stack>
  );
};

export default Sidebar;
