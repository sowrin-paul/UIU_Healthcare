import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Shield, AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { FullScreenLoader } from './Loader';

interface User {
    id: string;
    name: string;
    email: string;
    uiuId: string;
    role: 'student' | 'staff' | 'doctor' | 'admin';
    isActive: boolean;
    isVerified: boolean;
}

interface AuthState {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: User | null;
    error: string | null;
}

interface ProtectedWrapperProps {
    children: React.ReactNode;
    requiredRoles?: ('student' | 'staff' | 'doctor' | 'admin')[];
    requiresVerification?: boolean;
    fallbackPath?: string;
    customAuthCheck?: () => Promise<AuthState>;
}

const ProtectedWrapper: React.FC<ProtectedWrapperProps> = ({
    children,
    requiredRoles = [],
    requiresVerification = true,
    fallbackPath = '/auth/login',
    customAuthCheck
}) => {
    const location = useLocation();
    const [authState, setAuthState] = useState<AuthState>({
        isAuthenticated: false,
        isLoading: true,
        user: null,
        error: null
    });

    // Mock authentication check - replace with real authentication logic
    const checkAuthentication = async (): Promise<AuthState> => {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check for stored auth token
            const token = localStorage.getItem('uiu_healthcare_token');
            const userData = localStorage.getItem('uiu_healthcare_user');

            if (!token || !userData) {
                return {
                    isAuthenticated: false,
                    isLoading: false,
                    user: null,
                    error: null
                };
            }

            // Parse user data
            const user: User = JSON.parse(userData);

            // Validate token (in real app, this would be an API call)
            const isValidToken = token.length > 10; // Simple validation

            if (!isValidToken) {
                // Clear invalid token
                localStorage.removeItem('uiu_healthcare_token');
                localStorage.removeItem('uiu_healthcare_user');

                return {
                    isAuthenticated: false,
                    isLoading: false,
                    user: null,
                    error: 'Session expired. Please login again.'
                };
            }

            return {
                isAuthenticated: true,
                isLoading: false,
                user,
                error: null
            };
        } catch {
            return {
                isAuthenticated: false,
                isLoading: false,
                user: null,
                error: 'Authentication check failed. Please try again.'
            };
        }
    };

    useEffect(() => {
        const performAuthCheck = async () => {
            try {
                const result = customAuthCheck ? await customAuthCheck() : await checkAuthentication();
                setAuthState(result);
            } catch {
                setAuthState({
                    isAuthenticated: false,
                    isLoading: false,
                    user: null,
                    error: 'Authentication failed'
                });
            }
        };

        performAuthCheck();
    }, [location.pathname, customAuthCheck]);

    // Loading state
    if (authState.isLoading) {
        return <FullScreenLoader text="Verifying access..." showBrand={true} />;
    }

    // Not authenticated
    if (!authState.isAuthenticated) {
        return (
            <Navigate
                to={fallbackPath}
                state={{ from: location.pathname, error: authState.error }}
                replace
            />
        );
    }

    // User exists but not verified
    if (requiresVerification && authState.user && !authState.user.isVerified) {
        return <UnverifiedUserScreen user={authState.user} />;
    }

    // User is not active
    if (authState.user && !authState.user.isActive) {
        return <InactiveUserScreen user={authState.user} />;
    }

    // Role-based access control
    if (requiredRoles.length > 0 && authState.user && !requiredRoles.includes(authState.user.role)) {
        return <UnauthorizedScreen userRole={authState.user.role} requiredRoles={requiredRoles} />;
    }

    // All checks passed, render children
    return <>{children}</>;
};

// Unverified User Screen
const UnverifiedUserScreen: React.FC<{ user: User }> = ({ user }) => {
    const [isResending, setIsResending] = useState(false);

    const handleResendVerification = async () => {
        setIsResending(true);
        // Simulate API call to resend verification
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsResending(false);
        // Show success toast or message
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDF7F2] p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <CardTitle className="text-xl">Account Verification Required</CardTitle>
                    <CardDescription>
                        Hi {user.name}, please verify your UIU account to access the healthcare portal.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center space-y-2">
                        <p className="text-sm text-[#4B4B4B]">
                            We sent a verification link to your UIU email address.
                        </p>
                        <p className="text-xs text-[#4B4B4B] bg-[#FDF7F2] p-2 rounded">
                            <strong>UIU ID:</strong> {user.uiuId}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <Button
                            onClick={handleResendVerification}
                            disabled={isResending}
                            className="w-full"
                        >
                            {isResending ? (
                                <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    Sending...
                                </>
                            ) : (
                                'Resend Verification Email'
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => {
                                localStorage.removeItem('uiu_healthcare_token');
                                localStorage.removeItem('uiu_healthcare_user');
                                window.location.href = '/auth/login';
                            }}
                        >
                            Login with Different Account
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

// Inactive User Screen
const InactiveUserScreen: React.FC<{ user: User }> = ({ user }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDF7F2] p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <Shield className="h-6 w-6 text-red-600" />
                    </div>
                    <CardTitle className="text-xl">Account Suspended</CardTitle>
                    <CardDescription>
                        Hi {user.name}, your account has been temporarily suspended.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center space-y-2">
                        <p className="text-sm text-[#4B4B4B]">
                            Please contact the UIU Medical Center administration for assistance.
                        </p>
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-left">
                            <p className="text-xs font-medium text-red-800 mb-2">Contact Information:</p>
                            <p className="text-xs text-red-700">📞 +880-2-8431645</p>
                            <p className="text-xs text-red-700">✉️ medical@uiu.ac.bd</p>
                        </div>
                    </div>

                    <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                            localStorage.removeItem('uiu_healthcare_token');
                            localStorage.removeItem('uiu_healthcare_user');
                            window.location.href = '/auth/login';
                        }}
                    >
                        Return to Login
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
};

// Unauthorized Access Screen
const UnauthorizedScreen: React.FC<{
    userRole: string;
    requiredRoles: string[]
}> = ({ userRole, requiredRoles }) => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDF7F2] p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                        <Shield className="h-6 w-6 text-[#F68B1F]" />
                    </div>
                    <CardTitle className="text-xl">Access Restricted</CardTitle>
                    <CardDescription>
                        You don't have permission to access this page.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="text-center space-y-2">
                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                            <p className="text-xs font-medium text-orange-800 mb-1">Current Role:</p>
                            <p className="text-sm text-orange-700 capitalize font-medium">{userRole}</p>

                            <p className="text-xs font-medium text-orange-800 mt-3 mb-1">Required Role(s):</p>
                            <p className="text-sm text-orange-700 capitalize">
                                {requiredRoles.join(', ')}
                            </p>
                        </div>

                        <p className="text-xs text-[#4B4B4B]">
                            If you believe this is an error, please contact your system administrator.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Button
                            className="w-full"
                            onClick={() => window.history.back()}
                        >
                            Go Back
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={() => window.location.href = '/dashboard'}
                        >
                            Return to Dashboard
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProtectedWrapper;
