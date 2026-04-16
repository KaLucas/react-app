import { UsersList, Login } from '@pages/admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './private-route';
import { Sidebar } from '@components/admin';
import { Box, Divider } from '@mui/material';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/users-list"
          element={
            <PrivateRoute>
              <Box display="flex" height="100vh">
                <Box p={2} mt={3}>
                  <Sidebar />
                </Box>
                <Divider orientation="vertical" flexItem />
                <Box flex={1} p={2} overflow="auto">
                  <UsersList />
                </Box>
              </Box>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
