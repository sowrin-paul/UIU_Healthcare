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

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

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

export const RegisterPage: React.FC = () => {
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
                await new Promise(resolve => setTimeout(resolve, 1000)); // needed to replace

                // Mock availability check
                const isAvailable = Math.random() > 0.3;
                setUiuIdAvailability(isAvailable ? 'available' : 'unavailable');
            } catch (error) {
                console.error('UIU ID check error:', error);
                setUiuIdAvailability(null);
            }
        },
        []
    );

    // UIU ID checking
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
            await new Promise(resolve => setTimeout(resolve, 2000)); // needed to replace

            console.log('Registration data:', formData);

            setRegistrationSuccess(true);

            // Navigate to login after success
            setTimeout(() => {
                navigate('/login', {
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
                <div className="relative w-full max-w-lg mx-auto">
                    <div className="absolute -inset-6 bg-gradient-to-r from-green-400 to-orange-400 rounded-3xl opacity-20 blur-xl animate-pulse"></div>
                    <div className="absolute -inset-3 bg-gradient-to-r from-green-300 to-orange-300 rounded-2xl opacity-30 blur-lg"></div>

                    <Card className="relative w-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
                        <CardContent className="pt-8 pb-8 px-8 text-center space-y-6">
                            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
                                <CheckCircle2 className="h-10 w-10 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl text-gray-900 mb-3">Registration Successful!</h2>
                                <p className="text-gray-600 text-sm">
                                    Your account has been created successfully. Please check your UIU email for a verification link.
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 text-left">
                                <p className="text-sm text-orange-800 mb-2">Next Steps:</p>
                                <ol className="text-sm text-orange-700 list-decimal list-inside space-y-1">
                                    <li>Check your UIU email inbox</li>
                                    <li>Click the verification link</li>
                                    <li>Return to login with your credentials</li>
                                </ol>
                            </div>
                            <Button
                                onClick={() => navigate('/login')}
                                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border-0"
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
        <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
            <div className="w-full max-w-6xl mx-auto relative">
                <div className="absolute -inset-3 bg-gradient-to-r from-orange-200 to-orange-300 rounded-2xl opacity-30 blur-lg"></div>

                <Card className="relative w-full bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Left side - Desktop only */}
                        <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-orange-200 via-orange-500 to-orange-400 p-12">
                            <div className="w-full max-w-sm mx-auto text-center text-white space-y-6">
                                <div className="flex items-center justify-center">
                                    <div className="w-50 h-50 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/30 p-4 flex items-center justify-center">
                                        <div className="w-full h-full  rounded-xl flex items-center justify-center">
                                            <img
                                                src={uiuLogo}
                                                alt="UIU Logo"
                                                className="w-full h-full object-contain"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <h2 className="text-3xl">Welcome to UIU Healthcare</h2>
                                    <p className="text-white/90 text-lg leading-relaxed">
                                        Join our comprehensive healthcare management system
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right side - Form */}
                        <div className="flex flex-col">
                            {/* Mobile Brand Header */}
                            <div className="lg:hidden bg-gradient-to-br from-orange-500 to-orange-600 text-center py-8 px-6">
                                <div className="flex justify-center mb-4">
                                    <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/30 p-2">
                                        <div className="w-full h-full bg-white rounded-lg flex items-center justify-center">
                                            <span className="text-orange-500 text-xs">UIU</span>
                                        </div>
                                    </div>
                                </div>
                                <h1 className="text-2xl text-white mb-2">UIU Healthcare</h1>
                                <p className="text-white/90">Create your account</p>
                            </div>

                            {/* Desktop Header */}
                            <div className="hidden lg:block text-center pt-8 px-8">
                                <h2 className="text-2xl text-gray-900 mb-2">Join UIU Healthcare System</h2>
                            </div>

                            {/* Form Content */}
                            <CardContent className="px-6 md:px-8 py-6 flex-1 overflow-y-auto max-h-[calc(100vh-8rem)] lg:max-h-[600px]">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Personal Information */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm text-gray-800 flex items-center">
                                            <User className="h-4 w-4 mr-2 text-orange-600" />
                                            Personal Information
                                        </h3>

                                        {/* Full Name */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="name" className="text-sm text-gray-800">
                                                Full Name <span className="text-red-600">*</span>
                                            </label>
                                            <Input
                                                id="name"
                                                type="text"
                                                placeholder="Enter your full name"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                className={errors.name ? 'border-red-500' : ''}
                                            />
                                            {errors.name && (
                                                <p className="text-xs text-red-600">{errors.name}</p>
                                            )}
                                        </div>

                                        {/* UIU ID */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="uiuId" className="text-sm text-gray-800">
                                                UIU Student ID <span className="text-red-600">*</span>
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="uiuId"
                                                    type="text"
                                                    placeholder="011xxxxx"
                                                    value={formData.uiuId}
                                                    onChange={(e) => handleInputChange('uiuId', e.target.value)}
                                                    className={`${errors.uiuId ? 'border-red-500' : ''} ${uiuIdAvailability === 'available' ? 'border-green-500' : ''
                                                        } ${uiuIdAvailability === 'unavailable' ? 'border-red-500' : ''
                                                        } pr-10`}
                                                />
                                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                    {uiuIdAvailability === 'checking' && (
                                                        <Loader2 className="h-4 w-4 animate-spin text-gray-500" />
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
                                                <p className="text-xs text-red-600">{errors.uiuId}</p>
                                            )}
                                            {uiuIdAvailability === 'unavailable' && (
                                                <p className="text-xs text-red-600">This UIU ID is already registered</p>
                                            )}
                                            {uiuIdAvailability === 'available' && (
                                                <p className="text-xs text-green-600">UIU ID is available</p>
                                            )}
                                            {!errors.uiuId && !uiuIdAvailability && (
                                                <p className="text-xs text-gray-500">Format: 011xxxxx (8 digits total)</p>
                                            )}
                                        </div>

                                        {/* Email */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="email" className="text-sm text-gray-800">
                                                UIU Email Address <span className="text-red-600">*</span>
                                            </label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="e.g. spaul21xxxx@bscse.uiu.ac.bd"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                className={errors.email ? 'border-red-500' : ''}
                                            />
                                            {errors.email && (
                                                <p className="text-xs text-red-600">{errors.email}</p>
                                            )}
                                            {!errors.email && (
                                                <p className="text-xs text-gray-500">Use your official UIU email address</p>
                                            )}
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="phone" className="text-sm text-gray-800">
                                                Phone Number <span className="text-red-600">*</span>
                                            </label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                placeholder="+880-1xxxxxxxxx"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                className={errors.phone ? 'border-red-500' : ''}
                                            />
                                            {errors.phone && (
                                                <p className="text-xs text-red-600">{errors.phone}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Security */}
                                    <div className="space-y-4 pt-2">
                                        <h3 className="text-sm text-gray-800 flex items-center">
                                            <Shield className="h-4 w-4 mr-2 text-orange-600" />
                                            Security
                                        </h3>

                                        {/* Password */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="password" className="text-sm text-gray-800">
                                                Password <span className="text-red-600">*</span>
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    placeholder="Create a strong password"
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
                                            {!errors.password && (
                                                <div className="text-xs text-gray-500 space-y-0.5">
                                                    <p>Must contain: 8+ chars, uppercase, lowercase, number & special char</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Confirm Password */}
                                        <div className="space-y-1.5">
                                            <label htmlFor="confirmPassword" className="text-sm text-gray-800">
                                                Confirm Password <span className="text-red-600">*</span>
                                            </label>
                                            <div className="relative">
                                                <Input
                                                    id="confirmPassword"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    placeholder="Confirm your password"
                                                    value={formData.confirmPassword}
                                                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                                    className={`${errors.confirmPassword ? 'border-red-500' : ''} pr-10`}
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
                                                <p className="text-xs text-red-600">{errors.confirmPassword}</p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Terms and Conditions */}
                                    <div className="space-y-2 pt-2">
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
                                            <p className="text-xs text-red-600 ml-6">{errors.acceptTerms}</p>
                                        )}
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
                                                Creating Account...
                                            </>
                                        ) : (
                                            'Create Account'
                                        )}
                                    </Button>

                                    {/* Login Link */}
                                    <div className="text-center pt-4 border-t border-gray-200">
                                        <p className="text-sm text-gray-600">
                                            Already have an account?{' '}
                                            <Link
                                                to="/login"
                                                className="text-orange-600 hover:text-orange-700 hover:underline transition-colors"
                                            >
                                                Sign in here
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

export default RegisterPage;