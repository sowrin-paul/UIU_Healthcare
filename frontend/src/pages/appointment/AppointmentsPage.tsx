import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '../../hooks/useAppointments';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, AlertCircle, Plus, CheckCircle, XCircle, User } from 'lucide-react';
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
        const variants: Record<string, { className: string; icon: any }> = {
            confirmed: {
                className: 'bg-green-100 text-green-700 border-green-200',
                icon: CheckCircle
            },
            pending: {
                className: 'bg-orange-100 text-orange-700 border-orange-200',
                icon: Clock
            },
            completed: {
                className: 'bg-blue-100 text-blue-700 border-blue-200',
                icon: CheckCircle
            },
            cancelled: {
                className: 'bg-red-100 text-red-700 border-red-200',
                icon: XCircle
            },
        };

        const config = variants[status] || variants.pending;
        const Icon = config.icon;

        return (
            <Badge className={`${config.className} gap-1 capitalize`}>
                <Icon className="h-3 w-3" />
                {status}
            </Badge>
        );
    };

    const AppointmentCard = ({ appointment, isPast = false }: any) => (
        <Card className="border border-[#E5E5E5] hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1 space-y-4">
                        {/* Header */}
                        <div className="flex items-start justify-between lg:justify-start gap-3">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                    <div className="w-10 h-10 bg-[#FDF7F2] rounded-lg flex items-center justify-center">
                                        <User className="h-5 w-5 text-[#F68B1F]" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg text-[#1A1A1A]">
                                            {user?.role === 'student' ? appointment.doctorName : appointment.patientName}
                                        </h3>
                                        <p className="text-sm text-[#4B4B4B]">
                                            {user?.role === 'student' ? 'Healthcare Provider' : `Student ID: ${appointment.patientId || 'N/A'}`}
                                        </p>
                                    </div>
                                    {appointment.emergency && (
                                        <Badge className="bg-red-100 text-red-700 border-red-200 text-xs ml-auto lg:ml-2">
                                            <AlertCircle className="h-3 w-3 mr-1" />
                                            Emergency
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            {/* Status Badge - Mobile */}
                            <div className="lg:hidden">
                                {getStatusBadge(appointment.status)}
                            </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-3">
                            <div className="flex items-start gap-2">
                                <div className="w-1 h-4 bg-[#F68B1F] rounded-full mt-0.5"></div>
                                <div>
                                    <p className="text-sm text-[#4B4B4B]">Reason</p>
                                    <p className="text-[#1A1A1A]">{appointment.reason}</p>
                                </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3">
                                <div className="flex items-center gap-2 text-[#4B4B4B] bg-[#FDF7F2] p-3 rounded-lg">
                                    <Calendar className="h-4 w-4 text-[#F68B1F]" />
                                    <div>
                                        <p className="text-xs">Date</p>
                                        <p className="text-sm text-[#1A1A1A]">{appointment.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-[#4B4B4B] bg-[#FDF7F2] p-3 rounded-lg">
                                    <Clock className="h-4 w-4 text-[#F68B1F]" />
                                    <div>
                                        <p className="text-xs">Time</p>
                                        <p className="text-sm text-[#1A1A1A]">{appointment.time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {appointment.notes && (
                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                <p className="text-sm text-blue-900">
                                    <span className="font-medium">Notes:</span> {appointment.notes}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Actions & Status */}
                    <div className="flex lg:flex-col gap-2 items-start justify-between lg:justify-start">
                        {/* Status Badge - Desktop */}
                        <div className="hidden lg:block">
                            {getStatusBadge(appointment.status)}
                        </div>

                        {/* Student Actions */}
                        {!isPast && user?.role === 'student' && appointment.status === 'pending' && (
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-red-300 text-red-700 hover:bg-red-50"
                                onClick={() => setSelectedAppointment(appointment.id)}
                            >
                                <XCircle className="h-4 w-4 mr-1" />
                                Cancel
                            </Button>
                        )}

                        {/* Staff Actions */}
                        {user?.role === 'staff' && appointment.status === 'pending' && (
                            <div className="flex gap-2 flex-wrap">
                                <Button
                                    size="sm"
                                    className="bg-[#F68B1F] hover:bg-[#e67a12]"
                                    onClick={() => updateAppointmentStatus(appointment.id, 'confirmed')}
                                >
                                    <CheckCircle className="h-4 w-4 mr-1" />
                                    Approve
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-300 text-red-700 hover:bg-red-50"
                                    onClick={() => setSelectedAppointment(appointment.id)}
                                >
                                    <XCircle className="h-4 w-4 mr-1" />
                                    Decline
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
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F68B1F] to-[#e67a12] p-8 text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="h-8 w-8" />
                            <h1 className="text-3xl md:text-4xl">Appointments</h1>
                        </div>
                        <p className="text-white/90 text-lg">
                            {user?.role === 'student'
                                ? 'View and manage your medical appointments'
                                : 'Review and approve patient appointments'}
                        </p>
                    </div>
                    {user?.role === 'student' && (
                        <Link to="/dashboard/appointments/book">
                            <Button className="bg-white text-[#F68B1F] hover:bg-gray-100">
                                <Plus className="mr-2 h-4 w-4" />
                                Book Appointment
                            </Button>
                        </Link>
                    )}
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 py-2.5">
                <Card className="border border-[#E5E5E5]">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#4B4B4B]">Upcoming</p>
                                <p className="text-2xl text-[#F68B1F]">{upcomingAppointments.length}</p>
                            </div>
                            <div className="w-10 h-10 bg-[#FDF7F2] rounded-lg flex items-center justify-center">
                                <Calendar className="h-5 w-5 text-[#F68B1F]" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-[#E5E5E5]">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#4B4B4B]">Pending</p>
                                <p className="text-2xl text-orange-500">
                                    {appointments.filter(a => a.status === 'pending').length}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                                <Clock className="h-5 w-5 text-orange-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-[#E5E5E5]">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#4B4B4B]">Confirmed</p>
                                <p className="text-2xl text-green-500">
                                    {appointments.filter(a => a.status === 'confirmed').length}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-[#E5E5E5]">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-[#4B4B4B]">Completed</p>
                                <p className="text-2xl text-blue-500">
                                    {appointments.filter(a => a.status === 'completed').length}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                                <CheckCircle className="h-5 w-5 text-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Appointments List */}
            <Tabs defaultValue="upcoming" className="space-y-6">
                <TabsList className="bg-white border border-[#E5E5E5]">
                    <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#F68B1F] data-[state=active]:text-white">
                        Upcoming ({upcomingAppointments.length})
                    </TabsTrigger>
                    <TabsTrigger value="past" className="data-[state=active]:bg-[#F68B1F] data-[state=active]:text-white">
                        Past ({pastAppointments.length})
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                    {upcomingAppointments.length === 0 ? (
                        <Card className="border-2 border-dashed border-[#E5E5E5]">
                            <CardContent className="p-12 text-center">
                                <div className="w-16 h-16 bg-[#FDF7F2] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calendar className="h-8 w-8 text-[#F68B1F]" />
                                </div>
                                <h3 className="text-xl text-[#1A1A1A] mb-2">No Upcoming Appointments</h3>
                                <p className="text-[#4B4B4B] mb-6">
                                    {user?.role === 'student'
                                        ? 'You don\'t have any scheduled appointments.'
                                        : 'No pending appointments to review.'}
                                </p>
                                {user?.role === 'student' && (
                                    <Link to="/dashboard/appointments/book">
                                        <Button className="bg-[#F68B1F] hover:bg-[#e67a12]">
                                            <Plus className="mr-2 h-4 w-4" />
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
                        <Card className="border-2 border-dashed border-[#E5E5E5]">
                            <CardContent className="p-12 text-center">
                                <div className="w-16 h-16 bg-[#FDF7F2] rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calendar className="h-8 w-8 text-[#F68B1F]" />
                                </div>
                                <h3 className="text-xl text-[#1A1A1A] mb-2">No Past Appointments</h3>
                                <p className="text-[#4B4B4B]">Your appointment history will appear here.</p>
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
                        <AlertDialogTitle className="text-[#1A1A1A]">Cancel Appointment</AlertDialogTitle>
                        <AlertDialogDescription className="text-[#4B4B4B]">
                            Are you sure you want to cancel this appointment? This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="border-[#E5E5E5]">No, Keep It</AlertDialogCancel>
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