import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../redux/store';
import {
    Eye,
    EyeOff,
    AlertCircle,
    CheckCircle2,
    User,
    Mail,
    Phone,
    Shield,
    Loader2,
    X
} from 'lucide-react';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { registerSchema, type RegisterFormData } from '../../lib/validation/authSchema';
import { registerUser, clearError } from '../../features/auth/authSlice';
import { InlineLoader } from '../../components/common/Loader';
import { toast } from '../../hooks/useToast';
import { AuthService } from '../../features/auth/AuthService';
import uiuLogo from '../../assets/logo/uiu_logo.png';

interface RootState {
    auth: {
        isLoading: boolean;
        error: string | null;
    };
}

const Register: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [uiuIdAvailability, setUiuIdAvailability] = useState<'checking' | 'available' | 'unavailable' | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            email: '',
            uiuId: '',
            role: 'student',
            password: '',
            confirmPassword: '',
            phone: '',
            acceptTerms: false,
        },
    });

    const watchedUIUId = watch('uiuId');

    // Remove auto-generation - user should input their own UIU email

    // Debounced UIU ID availability check
    const checkUIUIdAvailability = useCallback(
        async (uiuId: string) => {
            if (!uiuId || uiuId.length !== 8) {
                setUiuIdAvailability(null);
                return;
            }

            setUiuIdAvailability('checking');
            try {
                const result = await AuthService.checkUIUIdAvailability(uiuId);
                setUiuIdAvailability(result.available ? 'available' : 'unavailable');
            } catch (error) {
                console.error('UIU ID check error:', error);
                setUiuIdAvailability(null);
            }
        },
        []
    );

    // Debounce UIU ID checking
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (watchedUIUId) {
                checkUIUIdAvailability(watchedUIUId);
            }
        }, 500); // 500ms debounce

        return () => clearTimeout(timeoutId);
    }, [watchedUIUId, checkUIUIdAvailability]);

    // Clear errors when component mounts
    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);

    // Handle form submission
    const onSubmit = async (data: RegisterFormData) => {
        try {
            dispatch(clearError());

            const result = await dispatch(registerUser(data));

            if (registerUser.fulfilled.match(result)) {
                setRegistrationSuccess(true);
                toast.success({
                    title: 'Registration Successful!',
                    description: 'Please check your UIU email for a verification link.'
                });

                // Navigate after showing success message
                setTimeout(() => {
                    navigate('/auth/login', {
                        state: {
                            message: 'Registration successful! Please check your email for verification.',
                            email: data.email
                        }
                    });
                }, 3000);
            }
        } catch (err) {
            console.error('Registration error:', err);
            toast.error({
                title: 'Registration Failed',
                description: 'An unexpected error occurred. Please try again.'
            });
        }
    };

    // Success screen
    if (registrationSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 p-6">
                {/* Floating Success Card */}
                <div className="relative w-full max-w-lg mx-auto">
                    {/* Background blur effects for floating appearance */}
                    <div className="absolute -inset-6 bg-gradient-to-r from-green-400 to-orange-400 rounded-3xl opacity-20 blur-xl animate-pulse"></div>
                    <div className="absolute -inset-3 bg-gradient-to-r from-green-300 to-orange-300 rounded-2xl opacity-30 blur-lg"></div>

                    {/* Main floating success card */}
                    <Card className="relative w-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
                        <CardContent className="pt-8 pb-8 px-8 text-center space-y-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                <CheckCircle2 className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">Registration Successful!</h2>
                                <p className="text-gray-600 text-sm">
                                    Your account has been created successfully. Please check your UIU email for a verification link.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 text-left">
                                <p className="text-sm font-medium text-orange-800 mb-2">Next Steps:</p>
                                <ol className="text-sm text-orange-700 list-decimal list-inside space-y-1">
                                    <li>Check your UIU email inbox</li>
                                    <li>Click the verification link</li>
                                    <li>Return to login with your credentials</li>
                                </ol>
                            </div>
                            <Button
                                onClick={() => navigate('/auth/login')}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                            >
                                Go to Login
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen max-w-lvw flex items-center justify-center p-6">
            {/* Floating Registration Card */}
            <div className="w-full relative">
                {/* Background blur effects */}
                {/* <div className="absolute -inset-6 bg-gradient-to-r from-orange-200 to-orange-300 rounded-3xl opacity-20 blur-xl animate-pulse"></div> */}
                <div className="absolute -inset-3 bg-gradient-to-r from-orange-200 to-orange-300 rounded-2xl opacity-30 blur-lg"></div>

                {/* Main floating card */}
                <Card className="relative w-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
                    {/* Left side */}
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
                                <h2 className="text-3xl font-bold text-center">Welcome to UIU Healthcare</h2>
                                <p className="text-white/90 text-lg text-center leading-relaxed break-words">Join our comprehensive healthcare management system</p>
                            </div>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex flex-col justify-center items-center max-w-svw">
                        {/* Mobile Brand Header */}
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
                                <p className="text-white/90 text-center">Create your account</p>
                            </div>
                        </div>

                        {/* Desktop Header */}
                        <div className="hidden lg:block text-center pt-8 pb-4 px-8">
                            <div className="space-y-2">
                                {/* <h2 className="text-2xl font-bold text-gray-900">Create Account</h2> */}
                                <h2 className="text-2xl font-medium text-gray-900" style={{ marginTop: 20 }}>Join UIU Healthcare System</h2>
                            </div>
                        </div>

                        {/* Form Content */}
                        <CardContent className="px-8 pb-8 my-3.5 space-y-6 flex-1 overflow-y-auto">

                            {/* Form Error */}
                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                                    <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                                {/* Personal Information */}
                                <div className="space-y-5" style={{ marginTop: 20, }}>
                                    <h3 className="text-sm font-medium text-gray-800 flex items-center">
                                        <User className="h-4 w-4 mr-2 text-orange-600" />
                                        Personal Information
                                    </h3>

                                    {/* Full Name */}
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-gray-800">
                                            Full Name <span className='text-red-900'>*</span>
                                        </label>
                                        <Input
                                            id="name"
                                            type="text"
                                            placeholder="  Enter your full name"
                                            {...register('name')}
                                            className={errors.name ? 'border-red-500 pl-4' : 'pl-4'}
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-600">{errors.name.message}</p>
                                        )}
                                    </div>

                                    {/* UIU ID */}
                                    <div className="space-y-2">
                                        <label htmlFor="uiuId" className="text-sm font-medium text-gray-800">
                                            UIU Student ID <span className='text-red-900'>*</span>
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="uiuId"
                                                type="text"
                                                placeholder="  Enter your UIU ID (e.g., 01112345)"
                                                {...register('uiuId')}
                                                className={`${errors.uiuId ? 'border-red-500' : ''} ${uiuIdAvailability === 'available' ? 'border-green-500' : ''
                                                    } ${uiuIdAvailability === 'unavailable' ? 'border-red-500' : ''
                                                    } pr-10 pl-4`}
                                            />
                                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                {uiuIdAvailability === 'checking' && (
                                                    <Loader2 className="h-4 w-4 animate-spin text-[#4B4B4B]" />
                                                )}
                                                {uiuIdAvailability === 'available' && (
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                )}
                                                {uiuIdAvailability === 'unavailable' && (
                                                    <X className="h-4 w-4 text-red-500" />
                                                )}
                                            </div>
                                        </div>
                                        {errors.uiuId && (
                                            <p className="text-sm text-red-600">{errors.uiuId.message}</p>
                                        )}
                                        {uiuIdAvailability === 'unavailable' && (
                                            <p className="text-sm text-red-600">This UIU ID is already registered</p>
                                        )}
                                        {uiuIdAvailability === 'available' && (
                                            <p className="text-sm text-green-600">UIU ID is available</p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2 mt-5">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-800 flex items-center">
                                            UIU Email Address *
                                        </label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="  Enter your UIU email"
                                            {...register('email')}
                                            className={errors.email ? 'border-red-500 pl-4' : 'pl-4'}
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-600">{errors.email.message}</p>
                                        )}
                                        <p className="text-xs text-gray-500">
                                            Please use your official UIU email address
                                        </p>
                                    </div>
                                </div>

                                {/* Contact Information */}
                                <div className="space-y-4">
                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-gray-800">
                                            Phone Number *
                                        </label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="  +880-1xxxxxxxxx"
                                            {...register('phone')}
                                            className={errors.phone ? 'border-red-500 pl-4' : 'pl-4'}
                                        />
                                        {errors.phone && (
                                            <p className="text-sm text-red-600">{errors.phone.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Security */}
                                <div className="space-y-4" style={{ marginTop: 20 }}>
                                    <h3 className="text-sm font-medium text-gray-800 flex items-center">
                                        <Shield className="h-4 w-4 mr-2 text-orange-600" />
                                        Security
                                    </h3>

                                    {/* Password */}
                                    <div className="space-y-2">
                                        <label htmlFor="password" className="text-sm font-medium text-gray-800">
                                            Password *
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="  Create a strong password"
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
                                        {errors.password && (
                                            <p className="text-sm text-red-600">{errors.password.message}</p>
                                        )}
                                        <div className="text-xs text-gray-500 space-y-1">
                                            <p>Password must contain:</p>
                                            <ul className="list-disc list-inside space-y-0.5 ml-2">
                                                <li>At least 8 characters</li>
                                                <li>One uppercase and lowercase letter</li>
                                                <li>One number and one special character</li>
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Confirm Password */}
                                    <div className="space-y-2">
                                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-800">
                                            Confirm Password *
                                        </label>
                                        <div className="relative">
                                            <Input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? 'text' : 'password'}
                                                placeholder="  Confirm your password"
                                                {...register('confirmPassword')}
                                                className={errors.confirmPassword ? 'border-red-500 pr-10 pl-4' : 'pr-10 pl-4'}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-orange-600 transition-colors"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="space-y-2" style={{ marginTop: 20 }}>
                                    <div className="flex items-start space-x-2">
                                        <input
                                            id="acceptTerms"
                                            type="checkbox"
                                            {...register('acceptTerms')}
                                            className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded mt-0.5"
                                        />
                                        <label htmlFor="acceptTerms" className="text-sm text-gray-600">
                                            I accept the{' '}
                                            <Link to="/terms" className="text-orange-600 hover:text-orange-700 hover:underline transition-colors">
                                                Terms of Service
                                            </Link>{' '}
                                            and{' '}
                                            <Link to="/privacy" className="text-orange-600 hover:text-orange-700 hover:underline transition-colors">
                                                Privacy Policy
                                            </Link>
                                        </label>
                                    </div>
                                    {errors.acceptTerms && (
                                        <p className="text-sm text-red-600 ml-6">{errors.acceptTerms.message}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
                                    disabled={isLoading || isSubmitting}
                                    style={{ marginTop: 10 }}
                                >
                                    {(isLoading || isSubmitting) ? (
                                        <>
                                            <InlineLoader className="mr-2" />
                                            Creating Account...
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </Button>
                            </form>

                            {/* Login Link */}
                            <div className="text-center pt-4 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link
                                        to="/auth/login"
                                        className="text-orange-600 hover:text-orange-700 font-medium hover:underline transition-colors"
                                    >
                                        Sign in here
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </div>
                </Card>

                {/* Footer - Outside floating card */}
                <p className="text-center text-xs text-gray-500 mt-6"style={{ marginTop: 25 }}>
                    © 2025 United International University. All rights reserved.
                </p>
            </div>
        </div>
    );
};

export default Register;