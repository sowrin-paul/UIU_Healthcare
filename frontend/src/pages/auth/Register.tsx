import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Eye,
    EyeOff,
    CheckCircle2,
    User,
    Loader2,
    X,
    Shield
} from 'lucide-react';

import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent } from '../../components/ui/card';
import { InlineLoader } from '../../components/common/Loader';
import uiuLogo from '../../assets/logo/uiu_logo.png';

interface FormData {
    name: string;
    email: string;
    uiuId: string;
    phone: string;
    password: string;
    confirmPassword: string;
    acceptTerms: boolean;
}

interface FormErrors {
    name?: string;
    email?: string;
    uiuId?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: string;
}

const Register: React.FC = () => {
    const navigate = useNavigate();

    // Form state
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        uiuId: '',
        phone: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [uiuIdAvailability, setUiuIdAvailability] = useState<'checking' | 'available' | 'unavailable' | null>(null);

    // Basic validation functions
    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Full name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        } else if (!/^[a-zA-Z\s.'-]+$/.test(formData.name)) {
            newErrors.name = 'Name can only contain letters, spaces, dots, hyphens, and apostrophes';
        }

        // UIU ID validation
        if (!formData.uiuId.trim()) {
            newErrors.uiuId = 'UIU ID is required';
        } else if (!/^011\d{5}$/.test(formData.uiuId)) {
            newErrors.uiuId = 'Invalid UIU ID format. Use: 011xxxxx (8 digits total)';
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email format';
        } else if (!formData.email.includes('@student.uiu.ac.bd') && !formData.email.includes('@uiu.ac.bd')) {
            newErrors.email = 'Email must be a valid UIU email address (@uiu.ac.bd or @student.uiu.ac.bd)';
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^(\+?880|0)?1[3-9]\d{8}$/.test(formData.phone.replace(/[-\s]/g, ''))) {
            newErrors.phone = 'Invalid phone number format. Use: +880-1xxxxxxxxx or 01xxxxxxxxx';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(formData.password)) {
            newErrors.password = 'Password must contain uppercase, lowercase, number, and special character';
        }

        // Confirm password validation
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Password confirmation is required';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        // Terms validation
        if (!formData.acceptTerms) {
            newErrors.acceptTerms = 'You must accept the terms and conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle input changes
    const handleInputChange = (field: keyof FormData, value: string | boolean) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: undefined }));
        }
    };

    // UIU ID availability check
    const checkUIUIdAvailability = useCallback(
        async (uiuId: string) => {
            if (!uiuId || uiuId.length !== 8) {
                setUiuIdAvailability(null);
                return;
            }

            setUiuIdAvailability('checking');
            try {
                // Simulate API call - replace with actual API
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // Mock availability check
                const isAvailable = Math.random() > 0.3; // 70% chance available
                setUiuIdAvailability(isAvailable ? 'available' : 'unavailable');
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
            if (formData.uiuId && formData.uiuId.length === 8) {
                checkUIUIdAvailability(formData.uiuId);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [formData.uiuId, checkUIUIdAvailability]);

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        
        try {
            // Simulate API call - replace with actual registration API
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            console.log('Registration data:', formData);
            
            setRegistrationSuccess(true);
            
            // Navigate to login after success
            setTimeout(() => {
                navigate('/auth/login', {
                    state: {
                        message: 'Registration successful! Please login with your credentials.',
                        email: formData.email
                    }
                });
            }, 3000);
            
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({ ...errors, acceptTerms: 'Registration failed. Please try again.' });
        } finally {
            setIsLoading(false);
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

                            <form onSubmit={handleSubmit} className="space-y-4">

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
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className={errors.name ? 'border-red-500 pl-4' : 'pl-4'}
                                        />
                                        <div className="h-5">
                                            {errors.name && (
                                                <p className="text-sm text-red-600">{errors.name}</p>
                                            )}
                                        </div>
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
                                                value={formData.uiuId}
                                                onChange={(e) => handleInputChange('uiuId', e.target.value)}
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
                                        <div className="h-10 space-y-1">
                                            {errors.uiuId && (
                                                <p className="text-sm text-red-600">{errors.uiuId}</p>
                                            )}
                                            {uiuIdAvailability === 'unavailable' && (
                                                <p className="text-sm text-red-600">This UIU ID is already registered</p>
                                            )}
                                            {uiuIdAvailability === 'available' && (
                                                <p className="text-sm text-green-600">UIU ID is available</p>
                                            )}
                                            <p className="text-xs text-gray-500">
                                                Format: 011xxxxx (8 digits total)
                                            </p>
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2 mt-5">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-800 flex items-center">
                                            UIU Email Address *
                                        </label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="  Enter your UIU email (e.g., yourname@student.uiu.ac.bd)"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className={errors.email ? 'border-red-500 pl-4' : 'pl-4'}
                                        />
                                        <div className="h-8 space-y-1">
                                            {errors.email && (
                                                <p className="text-sm text-red-600">{errors.email}</p>
                                            )}
                                            {!errors.email && (
                                                <p className="text-xs text-gray-500">
                                                    Please use your official UIU email address
                                                </p>
                                            )}
                                        </div>
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
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className={errors.phone ? 'border-red-500 pl-4' : 'pl-4'}
                                        />
                                        {errors.phone && (
                                            <p className="text-sm text-red-600">{errors.phone}</p>
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
                                                value={formData.password}
                                                onChange={(e) => handleInputChange('password', e.target.value)}
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
                                            <p className="text-sm text-red-600">{errors.password}</p>
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
                                                value={formData.confirmPassword}
                                                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
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
                                            <p className="text-sm text-red-600">{errors.confirmPassword}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Terms and Conditions */}
                                <div className="space-y-2" style={{ marginTop: 20 }}>
                                    <div className="flex items-start space-x-2">
                                        <input
                                            id="acceptTerms"
                                            type="checkbox"
                                            checked={formData.acceptTerms}
                                            onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
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
                                        <p className="text-sm text-red-600 ml-6">{errors.acceptTerms}</p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-0 mt-2"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
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