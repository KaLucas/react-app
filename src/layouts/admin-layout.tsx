import { type ReactElement } from 'react';
import { Sidebar } from '@components/admin';
import { Box, Divider } from '@mui/material';
import { UsersList } from '@pages/admin';

const AdminLayout = (): ReactElement => {
  return (
    <Box display="flex" height="100vh">
      <Box>
        <Sidebar />
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box flex={1} p={2} overflow="auto">
        <UsersList />
      </Box>
    </Box>
  );
};

export default AdminLayout;
