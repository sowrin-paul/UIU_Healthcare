import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';

export interface Appointment {
    id: string;
    patientId: string;
    patientName: string;
    doctorId: string;
    doctorName: string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    reason: string;
    emergency: boolean;
    notes?: string;
}

export const useAppointments = () => {
    const { user } = useAuth();
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const mockAppointments: Appointment[] = [
        {
            id: '1',
            patientId: '111901001',
            patientName: 'Ahmed Hasan',
            doctorId: 'staff001',
            doctorName: 'Dr. Sarah Rahman',
            date: '2025-10-20',
            time: '10:00 AM',
            status: 'confirmed',
            reason: 'General Checkup',
            emergency: false,
        },
        {
            id: '2',
            patientId: '111901002',
            patientName: 'Fatima Khan',
            doctorId: 'staff001',
            doctorName: 'Dr. Sarah Rahman',
            date: '2025-10-21',
            time: '11:30 AM',
            status: 'pending',
            reason: 'Fever and Cough',
            emergency: true,
        },
        {
            id: '3',
            patientId: '111901001',
            patientName: 'Ahmed Hasan',
            doctorId: 'staff002',
            doctorName: 'Dr. Kamal Ahmed',
            date: '2025-10-15',
            time: '02:00 PM',
            status: 'completed',
            reason: 'Follow-up',
            emergency: false,
            notes: 'Patient recovered well',
        },
    ];

    useEffect(() => {
        fetchAppointments();
    }, [user]);

    const fetchAppointments = async () => {
        setIsLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Filter based on user role
        if (user?.role === 'student') {
            setAppointments(mockAppointments.filter(apt => apt.patientId === user.uiuId));
        } else if (user?.role === 'staff') {
            setAppointments(mockAppointments.filter(apt => apt.doctorId === user.uiuId));
        } else {
            setAppointments(mockAppointments);
        }

        setIsLoading(false);
    };

    const bookAppointment = async (appointmentData: Partial<Appointment>) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newAppointment: Appointment = {
            id: Date.now().toString(),
            patientId: user?.uiuId || '',
            patientName: user?.name || '',
            status: 'pending',
            emergency: false,
            ...appointmentData,
        } as Appointment;

        setAppointments(prev => [...prev, newAppointment]);
        setIsLoading(false);
        return newAppointment;
    };

    const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 500));

        setAppointments(prev =>
            prev.map(apt => (apt.id === id ? { ...apt, status } : apt))
        );
        setIsLoading(false);
    };

    const cancelAppointment = async (id: string) => {
        await updateAppointmentStatus(id, 'cancelled');
    };

    return {
        appointments,
        isLoading,
        fetchAppointments,
        bookAppointment,
        updateAppointmentStatus,
        cancelAppointment,
    };
};