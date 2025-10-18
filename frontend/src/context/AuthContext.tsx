import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export type UserRole = 'student' | 'staff' | 'admin';

export interface User {
  id: string;
  uiuId: string;
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (uiuId: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth on mount
    const storedUser = localStorage.getItem('uiu_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (uiuId: string, password: string) => {
    setIsLoading(true);
    try {
      // Mock authentication - in real app, call API
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data based on UIU ID
      let mockUser: User;

      if (uiuId.startsWith('admin')) {
        mockUser = {
          id: '1',
          uiuId,
          name: 'Dr. Admin User',
          email: `${uiuId}@uiu.ac.bd`,
          role: 'admin',
          department: 'Administration',
        };
      } else if (uiuId.startsWith('staff')) {
        mockUser = {
          id: '2',
          uiuId,
          name: 'Dr. Sarah Rahman',
          email: `${uiuId}@uiu.ac.bd`,
          role: 'staff',
          department: 'Medical Services',
        };
      } else {
        mockUser = {
          id: '3',
          uiuId,
          name: 'Ahmed Hasan',
          email: `${uiuId}@uiu.ac.bd`,
          role: 'student',
          department: 'CSE',
        };
      }

      setUser(mockUser);
      localStorage.setItem('uiu_user', JSON.stringify(mockUser));
    } catch (error) {
      console.log(error);
      throw new Error('Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('uiu_user');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('uiu_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
