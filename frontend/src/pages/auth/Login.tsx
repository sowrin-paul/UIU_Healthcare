import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, CheckCircle2, User, Shield } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { loginSchema, type LoginFormData } from '../../lib/validation/authSchema';
import { loginUser, clearError } from '../../features/auth/authSlice';
import { InlineLoader } from '../../components/common/Loader';
import uiuLogo from '../../assets/logo/uiu_logo.png';

interface RootState {
    auth: {
        isAuthenticated: boolean;
        isLoading: boolean;
        error: string | null;
        user: {
            id: string;
            uiuId: string;
            name: string;
            role: string;
        } | null;
    };
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);

    const from = (location.state as { from?: string })?.from || '/dashboard';
    const errorFromState = (location.state as { error?: string })?.error;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            uiuId: '',
            password: '',
            rememberMe: false,
        },
    });

    // Clear errors when component mounts or when user starts typing
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                dispatch(clearError());
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error, dispatch]);

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, from]);

    // Handle form submission
    const onSubmit = async (data: LoginFormData) => {
        try {
            setLoginAttempts(prev => prev + 1);
            dispatch(clearError());

            const result = await (dispatch as any)(loginUser(data));

            if (loginUser.fulfilled.match(result)) {
                // Success - navigation will be handled by useEffect
                console.log('Login successful');
            }
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    // Demo credentials helper
    const fillDemoCredentials = (role: 'admin' | 'student' | 'doctor') => {
        switch (role) {
            case 'admin':
                setValue('uiuId', 'admin');
                setValue('password', 'admin123');
                break;
            case 'student':
                setValue('uiuId', '01112345');
                setValue('password', 'student123');
                break;
            case 'doctor':
                setValue('uiuId', 'DOC-001');
                setValue('password', 'doctor123');
                break;
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-6">
            {/* Floating Login Card */}
            <div className="relative w-full max-w-4xl mx-auto">
                {/* Background blur effects for floating appearance */}
                <div className="absolute -inset-6 bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl opacity-20 blur-xl animate-pulse"></div>
                <div className="absolute -inset-3 bg-gradient-to-r from-orange-300 to-orange-400 rounded-2xl opacity-30 blur-lg"></div>

                {/* Main floating card */}
                {/* Floating Login Card */}
                <Card className="relative w-full max-w-6xl mx-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 h-[600px] max-h-[90vh]">
                    {/* Left side - UIU Branding */}
                    <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-orange-300 via-orange-600 to-orange-500 p-8">
                        <div className="w-full max-w-sm mx-auto text-center text-white space-y-6">
                            <div className="w-40 h-40 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto border border-white/30 p-4">
                                <img
                                    src={uiuLogo}
                                    alt="UIU Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div className="space-y-4 text-center">
                                <h2 className="text-3xl font-bold text-center">UIU Healthcare Portal</h2>
                                <p className="text-white/90 text-lg text-center leading-relaxed break-words">Access your medical records and healthcare services</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Login Form */}
                    <div className="flex flex-col">
                        {/* Mobile Brand Header - Only visible on mobile */}
                        <div className="lg:hidden text-center space-y-4 pt-8 pb-4 px-8 bg-gradient-to-br from-orange-500 to-orange-600">
                            <div className="flex justify-center">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 p-2">
                                    <img
                                        src={uiuLogo}
                                        alt="UIU Logo"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 text-center">
                                <h1 className="text-2xl font-bold text-white text-center">UIU Healthcare</h1>
                                <p className="text-white/90 text-center">Sign in to your portal</p>
                            </div>
                        </div>

                        {/* Desktop Header - Only visible on desktop */}
                        <div className="hidden lg:block text-center pt-8 pb-4 px-8">
                            <div className="space-y-2">
                                <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
                                <p className="text-gray-600">Sign in to your UIU Healthcare account</p>
                            </div>
                        </div>

                        {/* Form Content */}
                        <CardContent className="px-8 pb-8 space-y-6 flex-1 flex flex-col justify-center">
                            {/* Error from navigation state */}
                            {errorFromState && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-red-700">{errorFromState}</p>
                                </div>
                            )}

                            {/* Form Error */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1">
                                        <p className="text-sm text-red-700">{error}</p>
                                        {loginAttempts >= 3 && (
                                            <p className="text-xs text-red-600 mt-1">
                                                Too many failed attempts. Please check your credentials or contact support.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Login Credentials Section */}
                                <div className="space-y-4">
                                    <h3 className="text-sm font-medium text-gray-800 flex items-center">
                                        <User className="h-4 w-4 mr-2 text-orange-600" />
                                        Login Credentials
                                    </h3>

                                    {/* UIU ID Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="uiuId" className="text-sm font-medium text-gray-800">
                                            UIU ID *
                                        </label>
                                        <Input
                                            id="uiuId"
                                            type="text"
                                            placeholder="  Enter your UIU ID (e.g., 01112345)"
                                            {...register('uiuId')}
                                            className={errors.uiuId ? 'border-red-500 pl-4' : 'pl-4'}
                                        />
                                        <div className="h-5">
                                            {errors.uiuId && (
                                                <p className="text-sm text-red-600">{errors.uiuId.message}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Password Field */}
                                    <div className="space-y-2">
                                        <label htmlFor="password" className="text-sm font-medium text-gray-800 flex items-center">
                                            <Shield className="h-4 w-4 mr-1 text-orange-600" />
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="  Enter your password"
                                                {...register('password')}
                                                className={errors.password ? 'border-red-500 pr-10 pl-4' : 'pr-10 pl-4'}
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
                                        <div className="h-5">
                                            {errors.password && (
                                                <p className="text-sm text-red-600">{errors.password.message}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Remember Me & Forgot Password */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            id="rememberMe"
                                            type="checkbox"
                                            {...register('rememberMe')}
                                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                                        />
                                        <label htmlFor="rememberMe" className="text-sm text-gray-600">
                                            Remember me
                                        </label>
                                    </div>
                                    <Link
                                        to="/auth/forgot-password"
                                        className="text-sm text-orange-600 hover:text-orange-700 hover:underline transition-colors"
                                    >
                                        Forgot password?
                                    </Link>
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                                    disabled={isLoading || isSubmitting}
                                >
                                    {(isLoading || isSubmitting) ? (
                                        <>
                                            <InlineLoader className="mr-2" />
                                            Signing in...
                                        </>
                                    ) : (
                                        'Sign In'
                                    )}
                                </Button>
                            </form>

                            {/* Register Link */}
                            <div className="text-center pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    Don't have an account?{' '}
                                    <Link
                                        to="/auth/register"
                                        className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
                                    >
                                        Register here
                                    </Link>
                                </p>
                            </div>

                            {/* Demo Credentials */}
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 space-y-3">
                                <div className="flex items-center space-x-2">
                                    <CheckCircle2 className="h-4 w-4 text-orange-600" />
                                    <h3 className="text-sm font-medium text-orange-800">Demo Credentials</h3>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex flex-wrap gap-2">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fillDemoCredentials('admin')}
                                            className="text-xs border-orange-200 text-orange-700 hover:bg-orange-50"
                                        >
                                            Admin Demo
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fillDemoCredentials('student')}
                                            className="text-xs border-orange-200 text-orange-700 hover:bg-orange-50"
                                        >
                                            Student Demo
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => fillDemoCredentials('doctor')}
                                            className="text-xs border-orange-200 text-orange-700 hover:bg-orange-50"
                                        >
                                            Doctor Demo
                                        </Button>
                                    </div>
                                    <p className="text-xs text-orange-700">
                                        Click any button above to fill demo credentials for testing.
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </div>
                </Card>

                {/* Footer - Outside floating card */}
                <p className="text-center text-xs text-gray-500 mt-6">
                    © 2025 United International University. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
