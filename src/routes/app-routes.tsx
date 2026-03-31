import { UsersList } from '@pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/lista" element={<UsersList />} />
        {/* <Route path="/rascunho" element={<Rascunho />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
