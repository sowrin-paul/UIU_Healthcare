import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

// import env from '../../../.env';
// API Base URL - In production, use environment variable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  uiuId: string;
  role: 'student' | 'staff' | 'doctor' | 'admin';
  isActive: boolean;
  isVerified: boolean;
  avatar?: string;
  phone?: string;
  emergencyContact?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  lastLoginAt: string | null;
}

export interface LoginCredentials {
  uiuId: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  name: string;
  email: string;
  uiuId: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'staff';
  phone: string;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('uiu_healthcare_token'),
  isAuthenticated: false,
  isLoading: false,
  error: null,
  lastLoginAt: localStorage.getItem('uiu_healthcare_last_login'),
};

// Async thunks for API calls
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock authentication - replace with real API call
      if (credentials.uiuId === 'admin' && credentials.password === 'admin123') {
        const mockUser: User = {
          id: '1',
          name: 'Admin User',
          email: 'admin@uiu.ac.bd',
          uiuId: 'ADMIN-001',
          role: 'admin',
          isActive: true,
          isVerified: true,
          avatar: '',
          phone: '+880-1700-000000',
          emergencyContact: '+880-1800-000000',
          createdAt: new Date().toISOString(),
        };

        const mockToken = 'mock_jwt_token_admin_' + Date.now();
        
        return {
          user: mockUser,
          token: mockToken,
          lastLoginAt: new Date().toISOString(),
        };
      }

      // Mock student login
      if (credentials.uiuId.startsWith('011') && credentials.password === 'student123') {
        const mockUser: User = {
          id: '2',
          name: 'John Doe',
          email: `${credentials.uiuId}@student.uiu.ac.bd`,
          uiuId: credentials.uiuId,
          role: 'student',
          isActive: true,
          isVerified: true,
          avatar: '',
          phone: '+880-1700-000001',
          emergencyContact: '+880-1800-000001',
          createdAt: new Date().toISOString(),
        };

        const mockToken = 'mock_jwt_token_student_' + Date.now();
        
        return {
          user: mockUser,
          token: mockToken,
          lastLoginAt: new Date().toISOString(),
        };
      }

      // Mock doctor login
      if (credentials.uiuId === 'DOC-001' && credentials.password === 'doctor123') {
        const mockUser: User = {
          id: '3',
          name: 'Dr. Sarah Ahmed',
          email: 'sarah.ahmed@uiu.ac.bd',
          uiuId: 'DOC-001',
          role: 'doctor',
          isActive: true,
          isVerified: true,
          avatar: '',
          phone: '+880-1700-000002',
          emergencyContact: '+880-1800-000002',
          createdAt: new Date().toISOString(),
        };

        const mockToken = 'mock_jwt_token_doctor_' + Date.now();
        
        return {
          user: mockUser,
          token: mockToken,
          lastLoginAt: new Date().toISOString(),
        };
      }

      // Invalid credentials
      throw new Error('Invalid UIU ID or password');

    } catch (error: unknown) {
      let message = 'Login failed';
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData: RegisterData, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock validation - check for existing users
      if (userData.uiuId === '01199999') {
        throw new Error('This UIU ID is already registered');
      }

      if (userData.email === 'existing@student.uiu.ac.bd') {
        throw new Error('This email is already registered');
      }

      // Mock successful registration
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        uiuId: userData.uiuId,
        role: userData.role,
        isActive: true,
        isVerified: false, // New users need email verification
        avatar: '',
        phone: userData.phone,
        emergencyContact: '',
        createdAt: new Date().toISOString(),
      };

      // Return success response (user created but needs verification)
      return {
        user: newUser,
        message: 'Registration successful! Please check your email for verification.'
      };

    } catch (error: unknown) {
      let message = 'Registration failed';
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // In a real app, you might want to invalidate the token on the server
      // await api.post('/auth/logout');
      
      return true;
    } catch (error: unknown) {
      let message = 'Logout failed';
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      if (!token) {
        throw new Error('No token found');
      }

      // Simulate token verification
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock verification - in real app, this would be an API call
      if (token.includes('mock_jwt_token')) {
        // Extract user info from token (mock)
        const mockUser: User = {
          id: '1',
          name: 'Verified User',
          email: 'user@uiu.ac.bd',
          uiuId: 'VERIFIED-001',
          role: 'student',
          isActive: true,
          isVerified: true,
          createdAt: new Date().toISOString(),
        };

        return { user: mockUser, token };
      }

      throw new Error('Invalid token');

    } catch (error: unknown) {
      let message = 'Token verification failed';
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

// Email verification thunk
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (verificationToken: string, { rejectWithValue }) => {
    try {
      // Simulate API call for email verification
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock verification logic
      if (verificationToken === 'invalid-token') {
        throw new Error('Invalid or expired verification token');
      }

      return {
        message: 'Email verified successfully! You can now log in.',
        verified: true
      };

    } catch (error: unknown) {
      let message = 'Email verification failed';
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

// Resend verification email thunk
export const resendVerificationEmail = createAsyncThunk(
  'auth/resendVerificationEmail',
  async (email: string, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock success - in real implementation, email would be used to send verification
      console.log('Sending verification email to:', email);

      return {
        message: 'Verification email sent! Please check your inbox.'
      };

    } catch (error: unknown) {
      let message = 'Failed to send verification email';
      if (error instanceof Error) {
        message = error.message;
      }
      return rejectWithValue(message);
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('uiu_healthcare_user', JSON.stringify(state.user));
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    // Add action to handle successful email verification
    setEmailVerified: (state) => {
      if (state.user) {
        state.user.isVerified = true;
        localStorage.setItem('uiu_healthcare_user', JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.lastLoginAt = action.payload.lastLoginAt;
        state.error = null;

        // Store in localStorage
        localStorage.setItem('uiu_healthcare_token', action.payload.token);
        localStorage.setItem('uiu_healthcare_user', JSON.stringify(action.payload.user));
        localStorage.setItem('uiu_healthcare_last_login', action.payload.lastLoginAt);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = action.payload as string;
      });

    // Register
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        // Don't auto-login after registration, user needs to verify email
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.lastLoginAt = null;
        state.error = null;
        state.isLoading = false;

        // Clear localStorage
        localStorage.removeItem('uiu_healthcare_token');
        localStorage.removeItem('uiu_healthcare_user');
        localStorage.removeItem('uiu_healthcare_last_login');
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
      });

    // Verify Token
    builder
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(verifyToken.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        
        // Clear invalid token
        localStorage.removeItem('uiu_healthcare_token');
        localStorage.removeItem('uiu_healthcare_user');
        localStorage.removeItem('uiu_healthcare_last_login');
      });

    // Email Verification
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

    // Resend Verification Email
    builder
      .addCase(resendVerificationEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resendVerificationEmail.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(resendVerificationEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, updateProfile, setLoading, setEmailVerified } = authSlice.actions;
export default authSlice.reducer;
