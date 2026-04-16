import './app.css';
import { AuthProvider } from '@context/auth-provider';
import AppRoutes from './routes/app-routes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
