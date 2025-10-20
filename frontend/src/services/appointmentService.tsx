import api from '../lib/api';

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
    createdAt: string;
    updatedAt: string;
}

export interface BookAppointmentData {
    doctorId: string;
    date: string;
    time: string;
    reason: string;
    emergency: boolean;
}

export interface UpdateStatusData {
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export const appointmentService = {
    // Get all appointments for the logged-in user
    getAppointments: async (filters?: { status?: string; date?: string; emergency?: boolean }): Promise<Appointment[]> => {
        try {
            const params = new URLSearchParams();
            if (filters?.status) params.append('status', filters.status);
            if (filters?.date) params.append('date', filters.date);
            if (filters?.emergency !== undefined) params.append('emergency', String(filters.emergency));

            const queryString = params.toString();
            const url = queryString ? `/appointments/?${queryString}` : '/appointments/';

            const response = await api.get(url);

            // Transform backend response to frontend format
            return response.data.map((apt: any) => ({
                id: apt.id,
                patientId: apt.patient_id,
                patientName: apt.patient_name,
                doctorId: apt.doctor_id,
                doctorName: apt.doctor_name,
                date: apt.date,
                time: apt.time,
                status: apt.status,
                reason: apt.reason,
                emergency: apt.emergency,
                notes: apt.notes,
                createdAt: apt.created_at,
                updatedAt: apt.updated_at,
            }));
        } catch (error: any) {
            console.error('Get appointments error:', error);
            throw error.response?.data || { error: 'Failed to fetch appointments' };
        }
    },

    // Get single appointment by ID
    getAppointmentById: async (id: string): Promise<Appointment> => {
        try {
            const response = await api.get(`/appointments/${id}/`);
            const apt = response.data;

            return {
                id: apt.id,
                patientId: apt.patient_id,
                patientName: apt.patient_name,
                doctorId: apt.doctor_id,
                doctorName: apt.doctor_name,
                date: apt.date,
                time: apt.time,
                status: apt.status,
                reason: apt.reason,
                emergency: apt.emergency,
                notes: apt.notes,
                createdAt: apt.created_at,
                updatedAt: apt.updated_at,
            };
        } catch (error: any) {
            console.error('Get appointment error:', error);
            throw error.response?.data || { error: 'Failed to fetch appointment' };
        }
    },

    // Book a new appointment
    bookAppointment: async (data: BookAppointmentData): Promise<Appointment> => {
        try {
            // Transform frontend data to backend format
            const backendData = {
                doctor_id: data.doctorId,
                date: data.date,
                time: data.time,
                reason: data.reason,
                emergency: data.emergency,
            };

            const response = await api.post('/appointments/book/', backendData);
            const apt = response.data;

            return {
                id: apt.id,
                patientId: apt.patient_id,
                patientName: apt.patient_name,
                doctorId: apt.doctor_id,
                doctorName: apt.doctor_name,
                date: apt.date,
                time: apt.time,
                status: apt.status,
                reason: apt.reason,
                emergency: apt.emergency,
                notes: apt.notes,
                createdAt: apt.created_at,
                updatedAt: apt.updated_at,
            };
        } catch (error: any) {
            console.error('Book appointment error:', error);
            throw error.response?.data || { error: 'Failed to book appointment' };
        }
    },

    // Update appointment status (for staff to approve/decline)
    updateAppointmentStatus: async (id: string, status: string): Promise<Appointment> => {
        try {
            const response = await api.patch(`/appointments/${id}/status/`, { status });
            const apt = response.data;

            return {
                id: apt.id,
                patientId: apt.patient_id,
                patientName: apt.patient_name,
                doctorId: apt.doctor_id,
                doctorName: apt.doctor_name,
                date: apt.date,
                time: apt.time,
                status: apt.status,
                reason: apt.reason,
                emergency: apt.emergency,
                notes: apt.notes,
                createdAt: apt.created_at,
                updatedAt: apt.updated_at,
            };
        } catch (error: any) {
            console.error('Update appointment status error:', error);
            throw error.response?.data || { error: 'Failed to update appointment status' };
        }
    },

    // Cancel appointment (for students)
    cancelAppointment: async (id: string): Promise<Appointment> => {
        try {
            const response = await api.post(`/appointments/${id}/cancel/`);
            const apt = response.data;

            return {
                id: apt.id,
                patientId: apt.patient_id,
                patientName: apt.patient_name,
                doctorId: apt.doctor_id,
                doctorName: apt.doctor_name,
                date: apt.date,
                time: apt.time,
                status: apt.status,
                reason: apt.reason,
                emergency: apt.emergency,
                notes: apt.notes,
                createdAt: apt.created_at,
                updatedAt: apt.updated_at,
            };
        } catch (error: any) {
            console.error('Cancel appointment error:', error);
            throw error.response?.data || { error: 'Failed to cancel appointment' };
        }
    },

    // Get list of available doctors
    getDoctors: async (): Promise<Array<{ id: string; name: string; specialty?: string }>> => {
        try {
            const response = await api.get('/doctors/');
            return response.data.map((doctor: any) => ({
                id: doctor.uiuId,
                name: doctor.name,
                specialty: doctor.department || 'General Physician',
            }));
        } catch (error: any) {
            console.error('Get doctors error:', error);
            throw error.response?.data || { error: 'Failed to fetch doctors' };
        }
    },
};

export default appointmentService;