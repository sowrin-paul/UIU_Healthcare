import api from '../lib/api/authApi';

export interface RegisterData {
    name: string;
    email: string;
    uiuId: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

export interface LoginData {
    uiuId: string;
    password: string;
}

export interface AuthResponse {
    user: {
        id: string;
        uiuId: string;
        name: string;
        email: string;
        role: string;
        phone?: string;
        department?: string;
    };
    tokens: {
        access: string;
        refresh: string;
    };
    message: string;
}

export const authService = {
    // Register new user
    register: async (data: RegisterData): Promise<AuthResponse> => {
        try {
            // Transform camelCase to snake_case for Django backend
            const backendData = {
                name: data.name,
                email: data.email,
                uiu_id: data.uiuId,  // Transform to snake_case
                phone: data.phone,
                password: data.password,
                confirmPassword: data.confirmPassword,  // Backend expects this exactly
            };

            const response = await api.post('/register/', backendData);
            return response.data;
        } catch (error: any) {
            // Transform backend errors back to camelCase
            const backendError = error.response?.data;
            if (backendError && backendError.uiu_id) {
                throw { uiu_id: backendError.uiu_id, ...backendError };
            }
            throw error.response?.data || { error: 'Registration failed' };
        }
    },

    // Login user
    login: async (data: LoginData): Promise<AuthResponse> => {
        try {
            // Send data in the format backend expects
            const backendData = {
                uiuId: data.uiuId,
                password: data.password,
            };

            const response = await api.post('/login/', backendData);
            console.log('Login API response:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Login API error:', error.response?.data);
            throw error.response?.data || { error: 'Login failed' };
        }
    },

    // Logout user
    logout: async (refreshToken?: string): Promise<void> => {
        try {
            // Only attempt API logout if we have a refresh token
            if (refreshToken) {
                await api.post('/logout/', { refresh: refreshToken });
            }
        } catch (error: any) {
            // Silently handle logout errors - still clear local storage
            console.log('Logout API call failed, clearing local session anyway');
        } finally {
            // Always clear local storage regardless of API response
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
        }
    },

    // Check UIU ID availability
    checkUIUIdAvailability: async (uiuId: string): Promise<boolean> => {
        try {
            // Transform to snake_case for backend
            const response = await api.get(`/check-uiuid/${uiuId}/`);
            return response.data.available;
        } catch (error: any) {
            // If endpoint doesn't exist yet, return true for now
            console.warn('UIU ID check endpoint not implemented');
            return true;
        }
    },

    // Get current user profile
    getProfile: async () => {
        try {
            const response = await api.get('/profile/');
            return response.data;
        } catch (error: any) {
            throw error.response?.data || { error: 'Failed to fetch profile' };
        }
    },
};

export default authService;