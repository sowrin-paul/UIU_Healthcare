import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import ProtectedWrapper from '../components/common/ProtectedWrapper';
import { verifyToken } from '../features/auth/authSlice';

interface User {
    id: string;
    name: string;
    email: string;
    uiuId: string;
    role: 'student' | 'staff' | 'doctor' | 'admin';
    isActive: boolean;
    isVerified: boolean;
}

interface RootState {
    auth: {
        isAuthenticated: boolean;
        isLoading: boolean;
        user: User | null;
        token: string | null;
        error: string | null;
    };
}

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRoles?: ('student' | 'staff' | 'doctor' | 'admin')[];
    requiresVerification?: boolean;
    fallbackPath?: string;
}

/**
 * ProtectedRoute component that checks authentication and authorization
 * before rendering the protected content.
 */
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    requiredRoles = [],
    requiresVerification = true,
    fallbackPath = '/auth/login',
}) => {
    const dispatch = useDispatch();
    const location = useLocation();

    const {
        isAuthenticated,
        isLoading,
        user,
        token,
        error
    } = useSelector((state: RootState) => state.auth);

    // Verify token on mount if we have one but aren't authenticated
    useEffect(() => {
        if (token && !isAuthenticated && !isLoading) {
            dispatch(verifyToken() as any);
        }
    }, [token, isAuthenticated, isLoading, dispatch]);

    // Custom auth check function for ProtectedWrapper
    const customAuthCheck = async () => {
        // If we already have auth state, return it
        if (isAuthenticated && user) {
            return {
                isAuthenticated: true,
                isLoading: false,
                user,
                error: null,
            };
        }

        // If we have a token but no user, try to verify
        if (token && !user) {
            return {
                isAuthenticated: false,
                isLoading: true,
                user: null,
                error: null,
            };
        }

        // No token, not authenticated
        return {
            isAuthenticated: false,
            isLoading: false,
            user: null,
            error: error || 'Authentication required',
        };
    };

    // If we're still loading initial auth state, let ProtectedWrapper handle it
    if (isLoading && !user) {
        return (
            <ProtectedWrapper
                requiredRoles={requiredRoles}
                requiresVerification={requiresVerification}
                fallbackPath={fallbackPath}
                customAuthCheck={customAuthCheck}
            >
                {children}
            </ProtectedWrapper>
        );
    }

    // If we have an error and no token, redirect to login
    if (error && !token) {
        return (
            <Navigate
                to={fallbackPath}
                state={{
                    from: location.pathname,
                    error: 'Your session has expired. Please login again.'
                }}
                replace
            />
        );
    }

    // Use ProtectedWrapper for all authentication and authorization logic
    return (
        <ProtectedWrapper
            requiredRoles={requiredRoles}
            requiresVerification={requiresVerification}
            fallbackPath={fallbackPath}
            customAuthCheck={customAuthCheck}
        >
            {children}
        </ProtectedWrapper>
    );
};

/**
 * Higher-order component for role-based route protection
 */
export const withRoleProtection = (
    Component: React.ComponentType,
    requiredRoles: ('student' | 'staff' | 'doctor' | 'admin')[],
    requiresVerification = true
) => {
    return function ProtectedComponent(props: any) {
        return (
            <ProtectedRoute
                requiredRoles={requiredRoles}
                requiresVerification={requiresVerification}
            >
                <Component {...props} />
            </ProtectedRoute>
        );
    };
};

/**
 * Route protection for students only
 */
export const StudentRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ProtectedRoute requiredRoles={['student']}>
        {children}
    </ProtectedRoute>
);

/**
 * Route protection for staff only
 */
export const StaffRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ProtectedRoute requiredRoles={['staff']}>
        {children}
    </ProtectedRoute>
);

/**
 * Route protection for doctors only
 */
export const DoctorRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ProtectedRoute requiredRoles={['doctor']}>
        {children}
    </ProtectedRoute>
);

/**
 * Route protection for admins only
 */
export const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ProtectedRoute requiredRoles={['admin']}>
        {children}
    </ProtectedRoute>
);

/**
 * Route protection for students and staff (patients)
 */
export const PatientRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ProtectedRoute requiredRoles={['student', 'staff']}>
        {children}
    </ProtectedRoute>
);

/**
 * Route protection for doctors and admins (medical staff)
 */
export const MedicalStaffRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ProtectedRoute requiredRoles={['doctor', 'admin']}>
        {children}
    </ProtectedRoute>
);

/**
 * Route protection for all authenticated users (any role)
 */
export const AuthenticatedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <ProtectedRoute requiredRoles={['student', 'staff', 'doctor', 'admin']}>
        {children}
    </ProtectedRoute>
);

/**
 * Public route that redirects authenticated users away
 */
export const PublicRoute: React.FC<{
    children: React.ReactNode;
    redirectTo?: string;
}> = ({ children, redirectTo = '/dashboard' }) => {
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);

    if (isAuthenticated) {
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
