import { Login } from '@pages/admin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './private-route';
import MainLayout from '@layouts/main-layout';
import AdminLayout from '@layouts/admin-layout';

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
              <AdminLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
