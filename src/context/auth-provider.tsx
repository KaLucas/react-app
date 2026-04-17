import { useState, type PropsWithChildren } from 'react';
import { AuthContext } from './auth-context';

const USER = {
  email: 'admin@email.com',
  password: '123456',
};

export function AuthProvider({ children }: PropsWithChildren) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('token');
  });

  function login(email: string, password: string) {
    if (email === USER.email && password === USER.password) {
      localStorage.setItem('token', 'fake-token');
      setIsAuthenticated(true);

      return true;
    }

    return false;
  }

  function logout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
