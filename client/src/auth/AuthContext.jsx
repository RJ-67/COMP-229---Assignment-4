import { createContext, useState, useEffect } from "react";
import auth from "./auth-helper";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(auth.isAuthenticated());

  // Keeps React in sync with JWT changes
  useEffect(() => {
    const storedUser = auth.isAuthenticated();
    setUser(storedUser);
  }, []);

  const login = (jwt, cb) => {
    auth.authenticate(jwt, () => {
      setUser(auth.isAuthenticated());
      if (cb) cb();
    });
  };

  const logout = () => {
    auth.clearJWT(() => {
      setUser(null);
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
