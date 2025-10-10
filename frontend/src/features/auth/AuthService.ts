import type { LoginCredentials, RegisterData, User } from './authSlice';

// API Configuration
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Response types
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface LoginResponse {
  user: User;
  token: string;
  refreshToken?: string;
  expiresIn: number;
}

interface RegisterResponse {
  user: User;
  message: string;
  verificationRequired: boolean;
}

interface VerificationResponse {
  message: string;
  verified: boolean;
}

// HTTP Client with error handling
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultHeaders: HeadersInit = {
      'Content-Type': 'application/json',
    };

    // Add authorization header if token exists
    const token = localStorage.getItem('uiu_healthcare_token');
    if (token) {
      defaultHeaders.Authorization = `Bearer ${token}`;
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      // Handle network errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || 
          errorData.error || 
          `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      return {
        success: true,
        data,
      };

    } catch (error) {
      console.error('API Request Error:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Network request failed',
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

// Create API client instance
// const apiClient = new ApiClient(API_BASE_URL);

// Auth Service Class
export class AuthService {
  
  /**
   * Login user with credentials
   */
  static async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // For now, we'll use the mock logic from the slice
    // In production, replace with actual API call
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock authentication logic (replace with real API call)
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

      return {
        user: mockUser,
        token: 'mock_jwt_token_admin_' + Date.now(),
        expiresIn: 3600, // 1 hour
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

      return {
        user: mockUser,
        token: 'mock_jwt_token_student_' + Date.now(),
        expiresIn: 3600,
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

      return {
        user: mockUser,
        token: 'mock_jwt_token_doctor_' + Date.now(),
        expiresIn: 3600,
      };
    }

    throw new Error('Invalid UIU ID or password');

    /*
    // Real API call (uncomment when backend is ready)
    const response = await apiClient.post<LoginResponse>('/auth/login', {
      uiuId: credentials.uiuId,
      password: credentials.password,
      rememberMe: credentials.rememberMe,
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Login failed');
    }

    return response.data;
    */
  }

  /**
   * Register new user
   */
  static async register(userData: RegisterData): Promise<RegisterResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock validation (replace with real API call)
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
      isVerified: false,
      avatar: '',
      phone: userData.phone,
      emergencyContact: '',
      createdAt: new Date().toISOString(),
    };

    return {
      user: newUser,
      message: 'Registration successful! Please check your email for verification.',
      verificationRequired: true,
    };

    /*
    // Real API call (uncomment when backend is ready)
    const response = await apiClient.post<RegisterResponse>('/auth/register', {
      name: userData.name,
      email: userData.email,
      uiuId: userData.uiuId,
      password: userData.password,
      role: userData.role,
      phone: userData.phone,
      emergencyContact: userData.emergencyContact,
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Registration failed');
    }

    return response.data;
    */
  }

  /**
   * Verify email with token
   */
  static async verifyEmail(verificationToken: string): Promise<VerificationResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock verification (replace with real API call)
    if (verificationToken === 'invalid-token') {
      throw new Error('Invalid or expired verification token');
    }

    return {
      message: 'Email verified successfully! You can now log in.',
      verified: true,
    };

    /*
    // Real API call (uncomment when backend is ready)
    const response = await apiClient.post<VerificationResponse>('/auth/verify-email', {
      token: verificationToken,
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Email verification failed');
    }

    return response.data;
    */
  }

  /**
   * Resend verification email
   */
  static async resendVerificationEmail(email: string): Promise<{ message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message: 'Verification email sent! Please check your inbox.',
    };

    /*
    // Real API call (uncomment when backend is ready)
    const response = await apiClient.post<{ message: string }>('/auth/resend-verification', {
      email,
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to send verification email');
    }

    return response.data;
    */
  }

  /**
   * Verify JWT token
   */
  static async verifyToken(token: string): Promise<{ user: User; token: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock verification (replace with real API call)
    if (token.includes('mock_jwt_token')) {
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

    /*
    // Real API call (uncomment when backend is ready)
    const response = await apiClient.get<{ user: User }>('/auth/verify-token');

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Token verification failed');
    }

    return { user: response.data.user, token };
    */
  }

  /**
   * Logout user (optional server-side logout)
   */
  static async logout(): Promise<void> {
    try {
      // Optional: Call server to invalidate token
      // await apiClient.post('/auth/logout');
    } catch (error) {
      // Logout should always succeed on client side
      console.warn('Server logout failed:', error);
    }
  }

  /**
   * Request password reset
   */
  static async requestPasswordReset(email: string): Promise<{ message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message: 'Password reset email sent! Please check your inbox.',
    };

    /*
    // Real API call (uncomment when backend is ready)
    const response = await apiClient.post<{ message: string }>('/auth/forgot-password', {
      email,
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to send reset email');
    }

    return response.data;
    */
  }

  /**
   * Reset password with token
   */
  static async resetPassword(
    token: string,
    newPassword: string
  ): Promise<{ message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message: 'Password reset successfully! You can now log in with your new password.',
    };

    /*
    // Real API call (uncomment when backend is ready)
    const response = await apiClient.post<{ message: string }>('/auth/reset-password', {
      token,
      password: newPassword,
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Password reset failed');
    }

    return response.data;
    */
  }

  /**
   * Change password (for authenticated users)
   */
  static async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<{ message: string }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      message: 'Password changed successfully!',
    };

    /*
    // Real API call (uncomment when backend is ready)
    const response = await apiClient.put<{ message: string }>('/auth/change-password', {
      currentPassword,
      newPassword,
    });

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Password change failed');
    }

    return response.data;
    */
  }

  /**
   * Update user profile
   */
  static async updateProfile(profileData: Partial<User>): Promise<User> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Get current user from localStorage (mock)
    const currentUserStr = localStorage.getItem('uiu_healthcare_user');
    if (!currentUserStr) {
      throw new Error('No user found');
    }

    const currentUser = JSON.parse(currentUserStr) as User;
    const updatedUser = { ...currentUser, ...profileData };

    // Update localStorage (mock)
    localStorage.setItem('uiu_healthcare_user', JSON.stringify(updatedUser));

    return updatedUser;

    /*
    // Real API call (uncomment when backend is ready)
    const response = await apiClient.put<User>('/auth/profile', profileData);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Profile update failed');
    }

    return response.data;
    */
  }

  /**
   * Check if UIU ID is available
   */
  static async checkUIUIdAvailability(uiuId: string): Promise<{ available: boolean }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock check (replace with real API call)
    const unavailableIds = ['01199999', 'admin', 'DOC-001', 'STAFF-001'];
    
    return {
      available: !unavailableIds.includes(uiuId),
    };

    /*
    // Real API call (uncomment when backend is ready)
    const response = await apiClient.get<{ available: boolean }>(`/auth/check-uiu-id/${uiuId}`);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to check UIU ID availability');
    }

    return response.data;
    */
  }

  /**
   * Check if email is available
   */
  static async checkEmailAvailability(email: string): Promise<{ available: boolean }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock check (replace with real API call)
    const unavailableEmails = ['existing@student.uiu.ac.bd', 'admin@uiu.ac.bd'];
    
    return {
      available: !unavailableEmails.includes(email),
    };

    /*
    // Real API call (uncomment when backend is ready)
    const response = await apiClient.get<{ available: boolean }>(`/auth/check-email/${encodeURIComponent(email)}`);

    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to check email availability');
    }

    return response.data;
    */
  }
}

export default AuthService;
