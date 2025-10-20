<<<<<<< HEAD
import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card } from "@/components/ui";

const StaffDashboard: React.FC = () => {
  return (
    <DashboardLayout userRole="staff">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">Assigned Patients</h2>
          <p className="text-gray-500 mt-2">You currently have no assigned patients.</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">Daily Schedule</h2>
          <p className="text-gray-500 mt-2">Your schedule is empty for today.</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
          <p className="text-gray-500 mt-2">No new notifications.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StaffDashboard;
=======
import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useAppointments } from '../../hooks/useAppointments';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Users, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export const StaffDashboard: React.FC = () => {
  const { user } = useAuth();
  const { appointments, updateAppointmentStatus } = useAppointments();

  const todayAppointments = appointments.filter(
    apt => apt.date === new Date().toISOString().split('T')[0]
  );

  const pendingAppointments = appointments.filter(apt => apt.status === 'pending');
  const confirmedAppointments = appointments.filter(apt => apt.status === 'confirmed');
  const completedToday = todayAppointments.filter(apt => apt.status === 'completed');

  const stats = [
    {
      title: 'Today\'s Appointments',
      value: todayAppointments.length,
      icon: Calendar,
      color: 'text-[#F68B1F]',
    },
    {
      title: 'Pending Approval',
      value: pendingAppointments.length,
      icon: Clock,
      color: 'text-yellow-600',
    },
    {
      title: 'Confirmed',
      value: confirmedAppointments.length,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      title: 'Completed Today',
      value: completedToday.length,
      icon: Users,
      color: 'text-blue-600',
    },
  ];

  const handleApprove = async (id: string) => {
    await updateAppointmentStatus(id, 'confirmed');
  };

  const handleComplete = async (id: string) => {
    await updateAppointmentStatus(id, 'completed');
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl text-[#1A1A1A] mb-2">Welcome, {user?.name}!</h1>
        <p className="text-[#4B4B4B]">Staff Dashboard - Manage patient appointments</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="border-[#E5E5E5]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#4B4B4B] mb-1">{stat.title}</p>
                    <p className="text-3xl text-[#1A1A1A]">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-[#FDF7F2] flex items-center justify-center ${stat.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pending Appointments */}
      {pendingAppointments.length > 0 && (
        <Card className="border-[#E5E5E5]">
          <CardHeader>
            <CardTitle className="text-[#1A1A1A] flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Pending Approval ({pendingAppointments.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-4 bg-[#FDF7F2] rounded-lg border border-[#E5E5E5]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[#1A1A1A]">{apt.patientName}</p>
                      {apt.emergency && (
                        <Badge variant="destructive" className="text-xs">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Emergency
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-[#4B4B4B] mb-2">{apt.reason}</p>
                    <p className="text-sm text-[#4B4B4B]">
                      {apt.date} at {apt.time}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-[#F68B1F] hover:bg-[#e67a12]"
                      onClick={() => handleApprove(apt.id)}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateAppointmentStatus(apt.id, 'cancelled')}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Today's Schedule */}
      <Card className="border-[#E5E5E5]">
        <CardHeader>
          <CardTitle className="text-[#1A1A1A]">Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {todayAppointments.length === 0 ? (
            <p className="text-[#4B4B4B] text-center py-8">No appointments scheduled for today</p>
          ) : (
            todayAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-4 bg-[#FDF7F2] rounded-lg border border-[#E5E5E5]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-[#1A1A1A]">{apt.patientName}</p>
                      <Badge
                        variant={
                          apt.status === 'completed'
                            ? 'default'
                            : apt.status === 'confirmed'
                            ? 'secondary'
                            : 'outline'
                        }
                      >
                        {apt.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#4B4B4B] mb-1">{apt.reason}</p>
                    <p className="text-sm text-[#4B4B4B]">
                      <Clock className="inline h-3 w-3 mr-1" />
                      {apt.time}
                    </p>
                  </div>
                  {apt.status === 'confirmed' && (
                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleComplete(apt.id)}
                    >
                      Mark Complete
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StaffDashboard;
>>>>>>> 2da7cf151fc45dd7781a4824a35686784136efbf
