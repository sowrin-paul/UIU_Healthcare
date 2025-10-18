import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, User, Shield, Loader2, CheckCircle2 } from 'lucide-react';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';

import uiuLogo from '../../assets/logo/uiu_logo.png';

interface LoginFormData {
    uiuId: string;
    password: string;
    rememberMe: boolean;
}

interface LoginErrors {
    uiuId?: string;
    password?: string;
    general?: string;
}

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Form state
    const [formData, setFormData] = useState<LoginFormData>({
        uiuId: '',
        password: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState<LoginErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);

    const from = (location.state as { from?: string })?.from || '/dashboard';
    const messageFromState = (location.state as { message?: string })?.message;

    // Basic validation function
    const validateForm = (): boolean => {
        const newErrors: LoginErrors = {};

        // UIU ID validation
        if (!formData.uiuId.trim()) {
            newErrors.uiuId = 'UIU ID is required';
        } else if (!/^(011\d{5}|STAFF-\d{3}|DOC-\d{3}|ADMIN-\d{3}|admin)$/.test(formData.uiuId)) {
            newErrors.uiuId = 'Invalid UIU ID format';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleInputChange = (field: keyof LoginFormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    // Form submission handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setLoginAttempts(prev => prev + 1);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // needed to replace

            console.log('Login data:', formData);

            // Mock successful login
            const mockUser = {
                id: '1',
                uiuId: formData.uiuId,
                name: formData.uiuId === 'admin' ? 'System Administrator' : 'Student Name',
                role: formData.uiuId === 'admin' ? 'admin' : 'student'
            };

            // Store user in localStorage
            localStorage.setItem('user', JSON.stringify(mockUser));
            localStorage.setItem('isAuthenticated', 'true');

            // Navigate to dashboard
            navigate(from, { replace: true });

        } catch (error) {
            console.error('Login error:', error);
            setErrors({ general: 'Login failed. Please check your credentials and try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
            <div className="relative w-full max-w-5xl mx-auto">
                <div className="absolute -inset-3 bg-gradient-to-r from-orange-200 to-orange-300 rounded-2xl opacity-30 blur-lg"></div>

                <Card className="relative w-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                        {/* Left side - Desktop only */}
                        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-orange-200 via-orange-500 to-orange-400 p-12">
                            <div className="w-full max-w-sm mx-auto text-center text-white space-y-6">
                                <div className="flex items-center justify-center">
                                    <div className="w-50 h-50 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/30 p-4 flex items-center justify-center">
                                        <div className="w-full h-full rounded-xl flex items-center justify-center">
                                            <img
                                                src={uiuLogo}
                                                alt="UIU Logo"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-3xl">UIU Healthcare Portal</h2>
                                    <p className="text-white/90 text-lg leading-relaxed">
                                        Access your medical records and healthcare services
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Form */}
                        <div className="flex flex-col">
                            {/* Mobile Brand Header */}
                            <div className="lg:hidden bg-gradient-to-br from-orange-500 to-orange-600 text-center py-8 px-6">
                                <div className="flex justify-center mb-4">
                                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/30 p-3 flex items-center justify-center">
                                        <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                                            <span className="text-orange-500 text-xs">UIU</span>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="text-2xl text-white mb-2">UIU Healthcare</h1>
                                <p className="text-white/90">Sign in to your portal</p>
                            </div>

                            {/* Form Content */}
                            <CardContent className="flex flex-col justify-center px-6 md:px-12 py-10 flex-1">
                                {/* Desktop Header */}
                                <div className="hidden lg:block text-center mb-8">
                                    <h1 className="text-2xl text-gray-900 mb-2">Welcome Back</h1>
                                    <p className="text-gray-600">Sign in to your UIU Healthcare account</p>
                                </div>

                                {/* Success Message */}
                                {messageFromState && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-2 mb-6">
                                        <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-green-700">{messageFromState}</p>
                                    </div>
                                )}

                                {/* Form Error */}
                                {errors.general && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-2 mb-6">
                                        <div className="flex-1">
                                            <p className="text-sm text-red-700">{errors.general}</p>
                                            {loginAttempts >= 3 && (
                                                <p className="text-xs text-red-600 mt-1">
                                                    Too many failed attempts. Please check your credentials or contact support.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Login Credentials Section */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm text-gray-800 flex items-center">
                                            <User className="h-4 w-4 mr-2 text-orange-600" />
                                            Login Credentials
                                        </h3>

                                        {/* UIU ID Field */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="uiuId" className="text-sm text-gray-800">
                                                UIU ID <span className="text-red-600">*</span>
                                            </label>
                                            <Input
                                                id="uiuId"
                                                type="text"
                                                placeholder="Enter your UIU ID"
                                                value={formData.uiuId}
                                                onChange={(e) => handleInputChange('uiuId', e.target.value)}
                                                className={errors.uiuId ? 'border-red-500' : ''}
                                            />
                                            {errors.uiuId && (
                                                <p className="text-xs text-red-600">{errors.uiuId}</p>
                                            )}
                                        </div>

                                        {/* Password Field */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="password" className="text-sm text-gray-800 flex items-center">
                                                <Shield className="h-4 w-4 mr-1 text-orange-600" />
                                                Password <span className="text-red-600">*</span>
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Enter your password"
                                                    value={formData.password}
                                                    onChange={(e) => handleInputChange('password', e.target.value)}
                                                    className={`${errors.password ? 'border-red-500' : ''} pr-10`}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-orange-600 transition-colors"
                                                >
                                                    {showPassword ? (
                                                        <EyeOff className="h-4 w-4" />
                                                    ) : (
                                                        <Eye className="h-4 w-4" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.password && (
                                                <p className="text-xs text-red-600">{errors.password}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Remember Me & Forgot Password */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                id="rememberMe"
                                                type="checkbox"
                                                checked={formData.rememberMe}
                                                onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
                                                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                            />
                                            <label htmlFor="rememberMe" className="text-sm text-gray-600">
                                                Remember me
                                            </label>
                                        </div>
                                        <Link
                                            to="/forgot-password"
                                            className="text-sm text-orange-600 hover:text-orange-700 hover:underline transition-colors"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Signing in...
                                            </>
                                        ) : (
                                            'Sign In'
                                        )}
                                    </Button>

                                    {/* Register Link */}
                                    <div className="text-center pt-4 border-t border-gray-200">
                                        <p className="text-sm text-gray-600">
                                            Don't have an account?{' '}
                                            <Link
                                                to="/register"
                                                className="text-orange-600 hover:text-orange-700 hover:underline transition-colors"
                                            >
                                                Register here
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </CardContent>
                        </div>
                    </div>
                </Card>

                {/* Footer */}
                <p className="text-center text-xs text-gray-500 mt-6">
                    © 2025 United International University. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;