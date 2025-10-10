import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Heart, AlertCircle, CheckCircle2 } from 'lucide-react';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { loginSchema, LoginFormData } from '../../lib/validation/authSchema';
import { loginUser, clearError } from '../../features/auth/authSlice';
import { InlineLoader } from '../../components/common/Loader';

interface RootState {
    auth: {
        isAuthenticated: boolean;
        isLoading: boolean;
        error: string | null;
        user: any;
    };
}

const Login: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [loginAttempts, setLoginAttempts] = useState(0);

    const from = (location.state as any)?.from || '/dashboard';
    const errorFromState = (location.state as any)?.error;

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
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

            const result = await dispatch(loginUser(data) as any);

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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDF7F2] to-white p-4">
            <div className="w-full max-w-md space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="flex justify-center">
                        <div className="w-12 h-12 bg-[#F68B1F] rounded-lg flex items-center justify-center">
                            <Heart className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">UIU Healthcare</h1>
                    <p className="text-[#4B4B4B]">Sign in to your medical portal</p>
                </div>

                {/* Error from navigation state */}
                {errorFromState && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-red-700">{errorFromState}</p>
                    </div>
                )}

                {/* Login Form */}
                <Card>
                    <CardHeader>
                        <CardTitle>Welcome Back</CardTitle>
                        <CardDescription>
                            Enter your UIU credentials to access your healthcare portal
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">

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

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                            {/* UIU ID Field */}
                            <div className="space-y-2">
                                <label htmlFor="uiuId" className="text-sm font-medium text-[#1A1A1A]">
                                    UIU ID
                                </label>
                                <Input
                                    id="uiuId"
                                    type="text"
                                    placeholder="Enter your UIU ID (e.g., 01112345)"
                                    {...register('uiuId')}
                                    className={errors.uiuId ? 'border-red-500' : ''}
                                />
                                {errors.uiuId && (
                                    <p className="text-sm text-red-600">{errors.uiuId.message}</p>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-[#1A1A1A]">
                                    Password
                                </label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        {...register('password')}
                                        className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#4B4B4B] hover:text-[#F68B1F]"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-sm text-red-600">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                    <input
                                        id="rememberMe"
                                        type="checkbox"
                                        {...register('rememberMe')}
                                        className="h-4 w-4 text-[#F68B1F] focus:ring-[#F68B1F] border-[#E5E5E5] rounded"
                                    />
                                    <label htmlFor="rememberMe" className="text-sm text-[#4B4B4B]">
                                        Remember me
                                    </label>
                                </div>
                                <Link
                                    to="/auth/forgot-password"
                                    className="text-sm text-[#F68B1F] hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full"
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
                        <div className="text-center pt-4 border-t border-[#E5E5E5]">
                            <p className="text-sm text-[#4B4B4B]">
                                Don't have an account?{' '}
                                <Link
                                    to="/auth/register"
                                    className="text-[#F68B1F] hover:underline font-medium"
                                >
                                    Register here
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Demo Credentials */}
                <Card className="bg-blue-50 border-blue-200">
                    <CardContent className="pt-6">
                        <div className="flex items-center space-x-2 mb-3">
                            <CheckCircle2 className="h-4 w-4 text-blue-600" />
                            <h3 className="text-sm font-medium text-blue-800">Demo Credentials</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="flex flex-wrap gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fillDemoCredentials('admin')}
                                    className="text-xs"
                                >
                                    Admin Demo
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fillDemoCredentials('student')}
                                    className="text-xs"
                                >
                                    Student Demo
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => fillDemoCredentials('doctor')}
                                    className="text-xs"
                                >
                                    Doctor Demo
                                </Button>
                            </div>
                            <p className="text-xs text-blue-700">
                                Click any button above to fill demo credentials for testing.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Footer */}
                <p className="text-center text-xs text-[#4B4B4B]">
                    © 2025 United International University. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Login;
