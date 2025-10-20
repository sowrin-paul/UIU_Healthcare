import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import DashboardLayout from '@/layouts/DashboardLayout';

// Lazy load components for better performance
const HomePage = lazy(() => import('@/pages/Landing'));
const LoginPage = lazy(() => import('@/pages/auth/Login'));
const RegisterPage = lazy(() => import('@/pages/auth/Register'));
const EmailVerification = lazy(() => import('@/pages/auth/EmailVerification'));

// Dashboard imports (lazy loaded)
const StudentDashboard = lazy(() => import('@/pages/dashboard/StudentDashboard'));
const StaffDashboard = lazy(() => import('@/pages/dashboard/StaffDashboard'));
const AdminDashboard = lazy(() => import('@/pages/dashboard/AdminDashboard'));

// Loading component
const LoadingSpinner = () => (
    <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
    </div>
);

// Protected Route Component - Requires Authentication
interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles?: Array<'student' | 'staff' | 'admin'>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (!isAuthenticated) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    // Check role-based access
    if (allowedRoles && user && !allowedRoles.includes(user.role)) {
        // Redirect to appropriate dashboard if user doesn't have permission
        return <Navigate to={`/dashboard/${user.role}`} replace />;
    }

    return <>{children}</>;
};

// Public Route Component - Redirects to dashboard if already logged in
interface PublicRouteProps {
    children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
    const { isAuthenticated, user, isLoading } = useAuth();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (isAuthenticated && user) {
        // Redirect to appropriate dashboard if already logged in
        return <Navigate to={`/dashboard/${user.role}`} replace />;
    }

    return <>{children}</>;
};

// Main AppRoutes Component
const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<LoadingSpinner />}>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <RegisterPage />
                        </PublicRoute>
                    }
                />

                <Route path="/verify-email" element={<EmailVerification />} />

                {/* Protected Routes - Student Dashboard */}
                <Route
                    path="/dashboard/student/*"
                    element={
                        <ProtectedRoute allowedRoles={['student']}>
                            <DashboardLayout userRole="student">
                                <StudentDashboard />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Protected Routes - Staff Dashboard */}
                <Route
                    path="/dashboard/staff/*"
                    element={
                        <ProtectedRoute allowedRoles={['staff']}>
                            <DashboardLayout userRole="staff">
                                <StaffDashboard />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Protected Routes - Admin Dashboard */}
                <Route
                    path="/dashboard/admin/*"
                    element={
                        <ProtectedRoute allowedRoles={['admin']}>
                            <DashboardLayout userRole="admin">
                                <AdminDashboard />
                            </DashboardLayout>
                        </ProtectedRoute>
                    }
                />

                {/* Catch-all route - 404 */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    );
};

export default AppRoutes;