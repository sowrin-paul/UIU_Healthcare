import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
    CheckCircle2,
    AlertCircle,
    Heart,
    ArrowLeft,
    RotateCcw,
    Mail
} from 'lucide-react';

import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { InlineLoader } from '../../components/common/Loader';
// import { toast } from 'sonner';

const EmailVerification: React.FC = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed' | 'expired'>('pending');
    const [emailForResend, setEmailForResend] = useState('');
    const [resendLoading, setResendLoading] = useState(false);

    const token = searchParams.get('token');
    const email = searchParams.get('email') || '';

    useEffect(() => {
        // Set email from URL params
        if (email) {
            setEmailForResend(email);
        }
    }, [email]);

    const handleVerification = useCallback(async (verificationToken: string) => {
        try {
            setIsLoading(true);
            setError(null);

            // Mock verify email function - simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Mock validation: token should be at least 10 characters for success
            const isValidToken = verificationToken.length >= 10;

            if (isValidToken) {
                setVerificationStatus('success');

                // Redirect to login after successful verification
                setTimeout(() => {
                    navigate('/auth/login', {
                        state: {
                            message: 'Email verified! You can now log in with your credentials.',
                            verified: true
                        }
                    });
                }, 3000);
            } else {
                setVerificationStatus('failed');
                setError('Invalid or expired verification token');
            }
        } catch (err) {
            console.error('Verification error:', err);
            setVerificationStatus('failed');
            setError('An error occurred during verification');
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        // Auto-verify if token is present in URL
        if (token) {
            handleVerification(token);
        }
    }, [token, handleVerification]);

    const handleResendVerification = async () => {
        if (!emailForResend.trim()) {
            setError('Please enter your email address');
            return;
        }

        try {
            setResendLoading(true);
            setError(null);

            // Mock resend verification email - simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailRegex.test(emailForResend)) {
                // Success - could set a success message state here
                setError('Verification email sent! Please check your inbox.');
            } else {
                setError('Invalid email address');
            }
        } catch (err) {
            console.error('Resend verification error:', err);
            setError('Failed to send verification email. Please try again.');
        } finally {
            setResendLoading(false);
        }
    };

    // Success Screen
    if (verificationStatus === 'success') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDF7F2] to-white p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6 text-center space-y-4">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="h-8 w-8 text-green-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Email Verified!</h2>
                            <p className="text-[#4B4B4B] text-sm">
                                Your email has been successfully verified. You can now access your UIU Healthcare account.
                            </p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-left">
                            <p className="text-xs font-medium text-green-800 mb-1">What's Next:</p>
                            <ul className="text-xs text-green-700 list-disc list-inside space-y-1">
                                <li>Log in with your UIU credentials</li>
                                <li>Complete your health profile</li>
                                <li>Book your first appointment</li>
                            </ul>
                        </div>
                        <Button
                            onClick={() => navigate('/auth/login')}
                            className="w-full"
                        >
                            Go to Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Failed Verification Screen
    if (verificationStatus === 'failed') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDF7F2] to-white p-4">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6 text-center space-y-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                            <AlertCircle className="h-8 w-8 text-red-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Verification Failed</h2>
                            <p className="text-[#4B4B4B] text-sm">
                                The verification link is invalid or has expired. Please request a new verification email.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <div className="text-left">
                                <label htmlFor="email" className="text-sm font-medium text-[#1A1A1A]">
                                    Email Address
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your UIU email"
                                    value={emailForResend}
                                    onChange={(e) => setEmailForResend(e.target.value)}
                                    className="mt-1"
                                />
                            </div>

                            <Button
                                onClick={handleResendVerification}
                                disabled={resendLoading}
                                className="w-full"
                            >
                                {resendLoading ? (
                                    <>
                                        <InlineLoader className="mr-2" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <RotateCcw className="h-4 w-4 mr-2" />
                                        Resend Verification Email
                                    </>
                                )}
                            </Button>
                        </div>

                        <div className="pt-4 border-t border-[#E5E5E5]">
                            <Link
                                to="/auth/login"
                                className="text-[#F68B1F] hover:underline text-sm"
                            >
                                Back to Login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    // Verification in Progress Screen
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FDF7F2] to-white p-4">
            <div className="w-full max-w-lg space-y-6">

                {/* Header */}
                <div className="text-center space-y-2">
                    <Link
                        to="/auth/login"
                        className="inline-flex items-center text-[#4B4B4B] hover:text-[#F68B1F] mb-4"
                    >
                        <ArrowLeft className="h-4 w-4 mr-1" />
                        Back to Login
                    </Link>
                    <div className="flex justify-center">
                        <div className="w-12 h-12 bg-[#F68B1F] rounded-lg flex items-center justify-center">
                            <Heart className="h-6 w-6 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-[#1A1A1A]">Email Verification</h1>
                    <p className="text-[#4B4B4B]">Verify your email to activate your account</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Mail className="h-5 w-5 mr-2 text-[#F68B1F]" />
                            Verify Your Email
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">

                        {/* Processing verification */}
                        {token && isLoading && (
                            <div className="text-center py-4">
                                <InlineLoader className="mx-auto mb-2" />
                                <p className="text-sm text-[#4B4B4B]">Verifying your email...</p>
                            </div>
                        )}

                        {/* Error display */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start space-x-2">
                                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        )}

                        {/* Manual verification section */}
                        {!token && (
                            <div className="space-y-4">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                    <h3 className="font-medium text-blue-800 mb-2">Check Your Email</h3>
                                    <p className="text-sm text-blue-700 mb-3">
                                        We sent a verification link to your UIU email address.
                                        Click the link in the email to verify your account.
                                    </p>
                                    <ul className="text-sm text-blue-600 list-disc list-inside space-y-1">
                                        <li>Check your inbox and spam folder</li>
                                        <li>The link expires in 24 hours</li>
                                        <li>Each link can only be used once</li>
                                    </ul>
                                </div>

                                <div className="space-y-3">
                                    <p className="text-sm text-[#4B4B4B]">
                                        Didn't receive the email? Enter your email to resend:
                                    </p>
                                    <div className="space-y-2">
                                        <Input
                                            type="email"
                                            placeholder="Enter your UIU email"
                                            value={emailForResend}
                                            onChange={(e) => setEmailForResend(e.target.value)}
                                        />
                                        <Button
                                            onClick={handleResendVerification}
                                            disabled={resendLoading || !emailForResend.trim()}
                                            className="w-full bg-white border border-[#E5E5E5] text-[#1A1A1A] hover:bg-[#FDF7F2]"
                                        >
                                            {resendLoading ? (
                                                <>
                                                    <InlineLoader className="mr-2" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    <RotateCcw className="h-4 w-4 mr-2" />
                                                    Resend Verification Email
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Help section */}
                        <div className="bg-[#FDF7F2] border border-[#F68B1F]/20 rounded-lg p-3">
                            <p className="text-xs font-medium text-[#F68B1F] mb-1">Need Help?</p>
                            <p className="text-xs text-[#4B4B4B]">
                                If you continue to have problems, contact UIU Healthcare support or
                                visit the campus health center.
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

export default EmailVerification;