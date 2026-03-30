import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsersList } from "../pages";

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

