const USER = {
  email: 'admin@email.com',
  password: '123456',
};

export function login(email: string, password: string) {
  if (email === USER.email && password === USER.password) {
    localStorage.setItem('token', 'fake-token');

    return true;
  }

  return false;
}

export function logout() {
  localStorage.removeItem('token');
}

export function isAuthenticated() {
  return !!localStorage.getItem('token');
}
