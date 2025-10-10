import { z } from 'zod';

// UIU ID validation regex patterns
const UIU_STUDENT_ID_REGEX = /^011\d{6}$/; // Format: 011xxxxxx (8 digits total)
const UIU_STAFF_ID_REGEX = /^(STAFF|DOC|ADMIN)-\d{3}$/; // Format: STAFF-001, DOC-001, ADMIN-001

// Login schema
export const loginSchema = z.object({
    uiuId: z
        .string()
        .min(1, 'UIU ID is required')
        .max(20, 'UIU ID must be less than 20 characters')
        .refine(
            (value) => {
                // Allow admin for testing
                if (value === 'admin') return true;

                // Check if it matches student ID pattern
                if (UIU_STUDENT_ID_REGEX.test(value)) return true;

                // Check if it matches staff/doctor/admin ID pattern
                if (UIU_STAFF_ID_REGEX.test(value)) return true;

                return false;
            },
            {
                message: 'Invalid UIU ID format. Use: 011xxxxxx for students, STAFF-001/DOC-001/ADMIN-001 for staff',
            }
        ),
    password: z
        .string()
        .min(1, 'Password is required')
        .min(6, 'Password must be at least 6 characters'),
    rememberMe: z.boolean().optional(),
});

// Register schema
export const registerSchema = z
    .object({
        name: z
            .string()
            .min(1, 'Full name is required')
            .min(2, 'Name must be at least 2 characters')
            .max(50, 'Name must be less than 50 characters')
            .regex(/^[a-zA-Z\s.'-]+$/, 'Name can only contain letters, spaces, dots, hyphens, and apostrophes'),

        email: z
            .string()
            .min(1, 'Email is required')
            .email('Invalid email format')
            .refine(
                (email) => {
                    // Check if email ends with @uiu.ac.bd or @student.uiu.ac.bd
                    return email.endsWith('@uiu.ac.bd') || email.endsWith('@student.uiu.ac.bd');
                },
                {
                    message: 'Email must be a valid UIU email address (@uiu.ac.bd or @student.uiu.ac.bd)',
                }
            ),

        uiuId: z
            .string()
            .min(1, 'UIU ID is required')
            .refine(
                (value) => {
                    // Students can only register with student IDs
                    return UIU_STUDENT_ID_REGEX.test(value);
                },
                {
                    message: 'Invalid student UIU ID format. Use: 011xxxxxx (e.g., 01112345)',
                }
            ),

        role: z.enum(['student', 'staff'], {
            message: 'Role must be either student or staff',
        }),

        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(128, 'Password must be less than 128 characters')
            .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
            .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
            .regex(/(?=.*\d)/, 'Password must contain at least one number')
            .regex(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character (@$!%*?&)'),

        confirmPassword: z
            .string()
            .min(1, 'Password confirmation is required'),

        phone: z
            .string()
            .min(1, 'Phone number is required')
            .refine(
                (value) => {
                    // Bangladesh phone number format: +880-1xxx-xxxxxx or 01xxx-xxxxxx
                    return /^(\+880-?)?01[3-9]\d{8}$/.test(value.replace(/\s/g, ''));
                },
                {
                    message: 'Invalid phone number format. Use: +880-1xxxxxxxxx or 01xxxxxxxxx',
                }
            ),

        acceptTerms: z
            .boolean()
            .refine((value) => value === true, {
                message: 'You must accept the terms and conditions',
            }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    })
    .refine(
        (data) => {
            // Ensure email matches UIU ID pattern
            if (data.role === 'student') {
                const expectedEmail = `${data.uiuId}@student.uiu.ac.bd`;
                return data.email === expectedEmail;
            }
            return true;
        },
        {
            message: 'Email must match your UIU ID format (e.g., 01112345@student.uiu.ac.bd)',
            path: ['email'],
        }
    );

// Forgot password schema
export const forgotPasswordSchema = z.object({
    email: z
        .string()
        .min(1, 'Email is required')
        .email('Invalid email format')
        .refine(
            (email) => {
                return email.endsWith('@uiu.ac.bd') || email.endsWith('@student.uiu.ac.bd');
            },
            {
                message: 'Email must be a valid UIU email address',
            }
        ),
});

// Reset password schema
export const resetPasswordSchema = z
    .object({
        token: z.string().min(1, 'Reset token is required'),
        password: z
            .string()
            .min(1, 'Password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(128, 'Password must be less than 128 characters')
            .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
            .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
            .regex(/(?=.*\d)/, 'Password must contain at least one number')
            .regex(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character'),
        confirmPassword: z.string().min(1, 'Password confirmation is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

// Change password schema (for authenticated users)
export const changePasswordSchema = z
    .object({
        currentPassword: z.string().min(1, 'Current password is required'),
        newPassword: z
            .string()
            .min(1, 'New password is required')
            .min(8, 'Password must be at least 8 characters')
            .max(128, 'Password must be less than 128 characters')
            .regex(/(?=.*[a-z])/, 'Password must contain at least one lowercase letter')
            .regex(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
            .regex(/(?=.*\d)/, 'Password must contain at least one number')
            .regex(/(?=.*[@$!%*?&])/, 'Password must contain at least one special character'),
        confirmNewPassword: z.string().min(1, 'Password confirmation is required'),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: 'Passwords do not match',
        path: ['confirmNewPassword'],
    })
    .refine((data) => data.currentPassword !== data.newPassword, {
        message: 'New password must be different from current password',
        path: ['newPassword'],
    });

// Type exports for TypeScript
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Helper functions for validation
export const validateUIUId = (uiuId: string): { isValid: boolean; type: 'student' | 'staff' | 'doctor' | 'admin' | null } => {
    if (UIU_STUDENT_ID_REGEX.test(uiuId)) {
        return { isValid: true, type: 'student' };
    }

    if (uiuId.startsWith('STAFF-')) {
        return { isValid: true, type: 'staff' };
    }

    if (uiuId.startsWith('DOC-')) {
        return { isValid: true, type: 'doctor' };
    }

    if (uiuId.startsWith('ADMIN-')) {
        return { isValid: true, type: 'admin' };
    }

    return { isValid: false, type: null };
};

export const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digits
    const digits = phone.replace(/\D/g, '');

    // Add Bangladesh country code if not present
    if (digits.startsWith('01') && digits.length === 11) {
        return `+880-${digits.slice(1, 4)}-${digits.slice(4)}`;
    }

    if (digits.startsWith('8801') && digits.length === 13) {
        return `+880-${digits.slice(3, 6)}-${digits.slice(6)}`;
    }

    return phone; // Return original if format is unclear
};
