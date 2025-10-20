import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useAppointments } from '../../hooks/useAppointments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, AlertCircle, Plus, CheckCircle, XCircle } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export const AppointmentsPage: React.FC = () => {
    const { user } = useAuth();
    const { appointments, cancelAppointment, updateAppointmentStatus } = useAppointments();
    const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);

    const upcomingAppointments = appointments.filter(
        apt => (apt.status === 'confirmed' || apt.status === 'pending') &&
            new Date(apt.date) >= new Date()
    );

    const pastAppointments = appointments.filter(
        apt => apt.status === 'completed' || apt.status === 'cancelled' ||
            (new Date(apt.date) < new Date() && apt.status !== 'confirmed')
    );

    const handleCancelConfirm = async () => {
        if (selectedAppointment) {
            await cancelAppointment(selectedAppointment);
            setSelectedAppointment(null);
        }
    };

    const getStatusBadge = (status: string) => {
        const variants: Record<string, { variant: unknown; icon: unknown }> = {
            confirmed: { variant: 'default', icon: CheckCircle },
            pending: { variant: 'secondary', icon: Clock },
            completed: { variant: 'outline', icon: CheckCircle },
            cancelled: { variant: 'destructive', icon: XCircle },
        };

        const config = variants[status] || variants.pending;
        const Icon = config.icon;

        return (
            <Badge variant={config.variant} className="gap-1">
                <Icon className="h-3 w-3" />
                {status}
            </Badge>
        );
    };

    const AppointmentCard = ({ appointment, isPast = false }: any) => (
        <Card className="border-[#E5E5E5]">
            <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg text-[#1A1A1A]">
                                {user?.role === 'student' ? appointment.doctorName : appointment.patientName}
                            </h3>
                            {appointment.emergency && (
                                <Badge variant="destructive" className="text-xs">
                                    <AlertCircle className="h-3 w-3 mr-1" />
                                    Emergency
                                </Badge>
                            )}
                        </div>
                        <p className="text-[#4B4B4B] mb-2">{appointment.reason}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-[#4B4B4B]">
                            <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{appointment.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                <span>{appointment.time}</span>
                            </div>
                        </div>

                        {appointment.notes && (
                            <div className="mt-3 p-3 bg-[#FDF7F2] rounded-lg">
                                <p className="text-sm text-[#4B4B4B]">
                                    <span className="text-[#1A1A1A]">Notes:</span> {appointment.notes}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                        {getStatusBadge(appointment.status)}

                        {!isPast && user?.role === 'student' && appointment.status === 'pending' && (
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => setSelectedAppointment(appointment.id)}
                            >
                                Cancel
                            </Button>
                        )}

                        {user?.role === 'staff' && appointment.status === 'pending' && (
                            <div className="flex gap-2">
                                <Button
                                    size="sm"
                                    className="bg-[#F68B1F] hover:bg-[#e67a12]"
                                    onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                >
                                    Approve
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl text-[#1A1A1A] mb-2">Appointments</h1>
                    <p className="text-[#4B4B4B]">Manage your medical appointments</p>
                </div>
                {user?.role === 'student' && (
                    <Link to="/dashboard/appointments/book">
                        <Button className="bg-[#F68B1F] hover:bg-[#e67a12]">
                            <Plus className="mr-2 h-4 w-4" />
                            Book Appointment
                        </Button>
                    </Link>
                )}
            </div>

            {/* Appointments List */}
            <Tabs defaultValue="upcoming" className="space-y-4">
                <TabsList>
                    <TabsTrigger value="upcoming">
                        Upcoming ({upcomingAppointments.length})
                    </TabsTrigger>
                    <TabsTrigger value="past">
                        Past ({pastAppointments.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                    {upcomingAppointments.length === 0 ? (
                        <Card className="border-[#E5E5E5]">
                            <CardContent className="p-12 text-center">
                                <Calendar className="h-12 w-12 text-[#4B4B4B] mx-auto mb-4" />
                                <p className="text-[#4B4B4B]">No upcoming appointments</p>
                                {user?.role === 'student' && (
                                    <Link to="/dashboard/appointments/book">
                                        <Button className="mt-4 bg-[#F68B1F] hover:bg-[#e67a12]">
                                            Book Your First Appointment
                                        </Button>
                                    </Link>
                                )}
                            </CardContent>
                        </Card>
                    ) : (
                        upcomingAppointments.map(apt => (
                            <AppointmentCard key={apt.id} appointment={apt} />
                        ))
                    )}
                </TabsContent>

                <TabsContent value="past" className="space-y-4">
                    {pastAppointments.length === 0 ? (
                        <Card className="border-[#E5E5E5]">
                            <CardContent className="p-12 text-center">
                                <Calendar className="h-12 w-12 text-[#4B4B4B] mx-auto mb-4" />
                                <p className="text-[#4B4B4B]">No past appointments</p>
                            </CardContent>
                        </Card>
                    ) : (
                        pastAppointments.map(apt => (
                            <AppointmentCard key={apt.id} appointment={apt} isPast />
                        ))
                    )}
                </TabsContent>
            </Tabs>

            {/* Cancel Confirmation Dialog */}
            <AlertDialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Cancel Appointment</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to cancel this appointment? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>No, Keep It</AlertDialogCancel>
                        <AlertDialogAction
                            className="bg-red-600 hover:bg-red-700"
                            onClick={handleCancelConfirm}
                        >
                            Yes, Cancel Appointment
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default AppointmentsPage;