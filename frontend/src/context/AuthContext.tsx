<<<<<<< HEAD
import React, { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
=======
import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { authService } from '@/services/authServices';
>>>>>>> 2da7cf151fc45dd7781a4824a35686784136efbf

export type UserRole = 'student' | 'staff' | 'admin';

export interface User {
<<<<<<< HEAD
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
=======
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
    login: (user: User) => void;
    logout: () => Promise<void>;
    updateUser: (user: Partial<User>) => void;
    refreshProfile: () => Promise<void>;
>>>>>>> 2da7cf151fc45dd7781a4824a35686784136efbf
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

<<<<<<< HEAD
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
=======
interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const loadUser = () => {
            try {
                const storedUser = localStorage.getItem('user');
                const accessToken = localStorage.getItem('access_token');

                // Only set user if we have both stored user and token
                if (storedUser && accessToken) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Failed to load user:', error);
                // Clear potentially corrupted data
                localStorage.removeItem('user');
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadUser();
    }, []);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                await authService.logout(refreshToken);
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
        }
    };

    const updateUser = (updates: Partial<User>) => {
        if (user) {
            const updatedUser = { ...user, ...updates };
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));
        }
    };

    const refreshProfile = async () => {
        try {
            const freshUser = await authService.getProfile();
            setUser(freshUser);
            localStorage.setItem('user', JSON.stringify(freshUser));
        } catch (error: any) {
            console.error('Failed to refresh profile:', error);

            // If token is invalid, clear authentication
            if (error.response?.status === 403 || error.response?.status === 401) {
                console.log('Token invalid during refresh, clearing authentication');
                await logout();
            }
            throw error;
        }
    };

    const value = {
>>>>>>> 2da7cf151fc45dd7781a4824a35686784136efbf
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
<<<<<<< HEAD
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
=======
        refreshProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
>>>>>>> 2da7cf151fc45dd7781a4824a35686784136efbf
