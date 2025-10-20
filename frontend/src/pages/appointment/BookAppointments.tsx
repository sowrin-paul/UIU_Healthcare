import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../../hooks/useAppointments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useForm } from 'react-hook-form';
import { Calendar as CalendarIcon, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { appointmentService } from '../../services/appointmentService';

interface BookingFormData {
    doctorId: string;
    doctorName: string;
    date: Date;
    time: string;
    reason: string;
    emergency: boolean;
}

const DOCTORS = [
    { id: 'staff001', name: 'Dr. Sarah Rahman', specialty: 'General Physician' },
    { id: 'staff002', name: 'Dr. Kamal Ahmed', specialty: 'General Physician' },
    { id: 'staff003', name: 'Dr. Nusrat Jahan', specialty: 'Pediatrician' },
];

const TIME_SLOTS = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

export const BookAppointmentPage: React.FC = () => {
    const navigate = useNavigate();
    const { bookAppointment } = useAppointments();
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [isEmergency, setIsEmergency] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<BookingFormData>();

    const selectedDoctor = watch('doctorId');
    const selectedTime = watch('time');

    const [doctors, setDoctors] = useState<Array<{ id: string; name: string; specialty?: string }>>([]);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorsList = await appointmentService.getDoctors();
                setDoctors(doctorsList);
            } catch (error) {
                toast.error('Failed to load doctors');
            }
        };
        fetchDoctors();
    }, []);

    const onSubmit = async (data: BookingFormData) => {
        if (!selectedDate) {
            toast.error('Please select a date');
            return;
        }

        setIsLoading(true);
        try {
            await bookAppointment({
                doctorId: data.doctorId,
                date: selectedDate.toISOString().split('T')[0],
                time: data.time,
                reason: data.reason,
                emergency: isEmergency,
            });

            // Navigate to appointments page on success
            navigate('/appointments');
        } catch (error) {
            // Error is already handled by the hook
            console.error('Booking failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl text-[#1A1A1A] mb-2">Book Appointment</h1>
                <p className="text-[#4B4B4B]">Schedule a medical consultation</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Card className="border-[#E5E5E5]">
                    <CardHeader>
                        <CardTitle className="text-[#1A1A1A]">Appointment Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Doctor Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="doctor">Select Doctor *</Label>
                            <Select
                                onValueChange={(value) => {
                                    setValue('doctorId', value);
                                    const doctor = DOCTORS.find(d => d.id === value);
                                    if (doctor) setValue('doctorName', doctor.name);
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a doctor" />
                                </SelectTrigger>
                                {/* <SelectContent>
                                    {DOCTORS.map(doctor => (
                                        <SelectItem key={doctor.id} value={doctor.id}>
                                            {doctor.name} - {doctor.specialty}
                                        </SelectItem>
                                    ))}
                                </SelectContent> */}
                                <SelectContent>
                                    {doctors.map(doctor => (
                                        <SelectItem key={doctor.id} value={doctor.id}>
                                            {doctor.name} - {doctor.specialty}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.doctorId && (
                                <p className="text-sm text-red-500">Please select a doctor</p>
                            )}
                        </div>

                        {/* Date Selection */}
                        <div className="space-y-2">
                            <Label>Appointment Date *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={`w-full justify-start text-left ${!selectedDate && 'text-[#4B4B4B]'}`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {selectedDate ? selectedDate.toDateString() : 'Pick a date'}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={selectedDate}
                                        onSelect={setSelectedDate}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Time Selection */}
                        <div className="space-y-2">
                            <Label htmlFor="time">Preferred Time *</Label>
                            <Select onValueChange={(value) => setValue('time', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a time slot" />
                                </SelectTrigger>
                                <SelectContent>
                                    {TIME_SLOTS.map(time => (
                                        <SelectItem key={time} value={time}>
                                            <div className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                {time}
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.time && (
                                <p className="text-sm text-red-500">Please select a time</p>
                            )}
                        </div>

                        {/* Reason */}
                        <div className="space-y-2">
                            <Label htmlFor="reason">Reason for Visit *</Label>
                            <Textarea
                                id="reason"
                                placeholder="Describe your symptoms or reason for consultation"
                                {...register('reason', { required: 'Please provide a reason' })}
                                className={errors.reason ? 'border-red-500' : ''}
                                rows={4}
                            />
                            {errors.reason && (
                                <p className="text-sm text-red-500">{errors.reason.message}</p>
                            )}
                        </div>

                        {/* Emergency Toggle */}
                        <div className="flex items-center justify-between p-4 bg-[#FDF7F2] rounded-lg border border-[#E5E5E5]">
                            <div className="space-y-0.5">
                                <Label htmlFor="emergency" className="text-base">
                                    Mark as Emergency
                                </Label>
                                <p className="text-sm text-[#4B4B4B]">
                                    Emergency cases receive priority attention
                                </p>
                            </div>
                            <Switch
                                id="emergency"
                                checked={isEmergency}
                                onCheckedChange={setIsEmergency}
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1"
                                onClick={() => navigate('/dashboard/appointments')}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="flex-1 bg-[#F68B1F] hover:bg-[#e67a12]"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Booking...' : 'Book Appointment'}
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </form>
        </div>
    );
};

export default BookAppointmentPage;