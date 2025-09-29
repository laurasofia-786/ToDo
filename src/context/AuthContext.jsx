import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// Usuarios predefinidos
const USERS = [
  { username: 'DYLAM', password: '123456' },
  { username: 'LAURA', password: '123456' }
];


export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  function login(username, password) {
    const found = USERS.find(u => u.username === username && u.password === password);
    if (found) {
      setUser({ name: username });
      setError(null);
    } else {
      setError('Usuario o contraseña incorrectos');
    }
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
