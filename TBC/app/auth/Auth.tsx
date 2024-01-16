import React, { useEffect, useState, createContext, ReactNode } from 'react';
import { auth } from '@/config/firebaseConfig';

interface AuthContextType {
  currentUser: any | null;
  isAuthenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  isAuthenticated: false,
  setAuthenticated: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setAuthenticated(!!user);
      setPending(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  if (pending) {
    // You might want to render a loading indicator here
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        setAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
