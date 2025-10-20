import React, { createContext, useState, useEffect, type ReactNode } from 'react';
import { authService } from '../services/authServices';

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
    login: (user: User) => void;
    logout: () => Promise<void>;
    updateUser: (user: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load user from localStorage on mount
    useEffect(() => {
        const loadUser = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                const accessToken = localStorage.getItem('access_token');

                if (storedUser && accessToken) {
                    const parsedUser = JSON.parse(storedUser);
                    setUser(parsedUser);

                    // Optionally fetch fresh user data
                    try {
                        const freshUser = await authService.getProfile();
                        setUser(freshUser);
                        localStorage.setItem('user', JSON.stringify(freshUser));
                    } catch (error) {
                        console.error('Failed to fetch user profile:', error);
                    }
                }
            } catch (error) {
                console.error('Failed to load user:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
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
            await authService.logout(refreshToken || undefined);
        } catch (error) {
            // Silently handle logout errors
            console.log('Session cleared locally');
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

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateUser,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};