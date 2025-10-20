import { useState, useEffect } from 'react';
import { appointmentService, type Appointment, type BookAppointmentData } from '@/services/appointmentService';
import { toast } from 'sonner';

export const useAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch appointments
    const fetchAppointments = async (filters?: { status?: string; date?: string; emergency?: boolean }) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await appointmentService.getAppointments(filters);
            setAppointments(data);
        } catch (err: any) {
            const errorMessage = err.error || 'Failed to fetch appointments';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Book appointment
    const bookAppointment = async (data: BookAppointmentData) => {
        setIsLoading(true);
        setError(null);
        try {
            const newAppointment = await appointmentService.bookAppointment(data);
            setAppointments(prev => [newAppointment, ...prev]);
            toast.success('Appointment booked successfully!');
            return newAppointment;
        } catch (err: any) {
            const errorMessage = err.error || err.doctor_id?.[0] || 'Failed to book appointment';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Update appointment status
    const updateAppointmentStatus = async (id: string, status: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const updatedAppointment = await appointmentService.updateAppointmentStatus(id, status);
            setAppointments(prev =>
                prev.map(apt => apt.id === id ? updatedAppointment : apt)
            );
            toast.success(`Appointment ${status} successfully!`);
            return updatedAppointment;
        } catch (err: any) {
            const errorMessage = err.error || 'Failed to update appointment';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Cancel appointment
    const cancelAppointment = async (id: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const cancelledAppointment = await appointmentService.cancelAppointment(id);
            setAppointments(prev =>
                prev.map(apt => apt.id === id ? cancelledAppointment : apt)
            );
            toast.success('Appointment cancelled successfully!');
            return cancelledAppointment;
        } catch (err: any) {
            const errorMessage = err.error || 'Failed to cancel appointment';
            setError(errorMessage);
            toast.error(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    // Load appointments on mount
    useEffect(() => {
        fetchAppointments();
    }, []);

    return {
        appointments,
        isLoading,
        error,
        fetchAppointments,
        bookAppointment,
        updateAppointmentStatus,
        cancelAppointment,
    };
};