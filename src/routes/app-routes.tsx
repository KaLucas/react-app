import { UsersList, Login } from '@pages/admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './private-route';
import { Sidebar } from '@components/admin';
import { Box, Divider } from '@mui/material';
import MainLayout from '@layouts/main-layout';

export type modeProps = {
  toggleTheme: () => void;
  mode: 'light' | 'dark';
};

export default function AppRoutes({ toggleTheme, mode }: modeProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout toggleTheme={toggleTheme} mode={mode} />} />
        <Route path="/admin" element={<Login />} />
        <Route
          path="/admin/users-list"
          element={
            <PrivateRoute>
              <Box display="flex" height="100vh">
                <Box>
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
