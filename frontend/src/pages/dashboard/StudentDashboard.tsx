import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Calendar, FileText, Pill } from "lucide-react";
import LandingFooter from "@/components/common/LandingFooter";

const StudentDashboard: React.FC = () => {
  return (
    <DashboardLayout userRole="student">
      <div className="min-h-screen bg-white p-6">
        {/* Header */}
        <div className="max-w-7xl mx-auto text-center mb-12">
          <Badge className="mb-4 bg-[#FDF7F2] text-[#F68B1F] border-[#F68B1F]">
            Student Dashboard
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-2">
            Welcome to Your Health Dashboard
          </h1>
          <p className="text-[#4B4B4B] text-lg md:text-xl">
            Overview of your health activities, appointments, and tips.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="relative border border-[#E5E5E5] rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 opacity-20 blur-xl rounded-2xl"></div>
            <CardContent className="relative p-6">
              <div className="w-12 h-12 bg-[#F68B1F] rounded-lg flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#1A1A1A]">
                Upcoming Appointments
              </h2>
              <p className="text-[#4B4B4B] mt-2">No upcoming appointments.</p>
            </CardContent>
          </Card>

          <Card className="relative border border-[#E5E5E5] rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 opacity-20 blur-xl rounded-2xl"></div>
            <CardContent className="relative p-6">
              <div className="w-12 h-12 bg-[#e67a12] rounded-lg flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#1A1A1A]">
                Recent Health Reports
              </h2>
              <p className="text-[#4B4B4B] mt-2">No reports available yet.</p>
            </CardContent>
          </Card>

          <Card className="relative border border-[#E5E5E5] rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-200 via-orange-300 to-orange-400 opacity-20 blur-xl rounded-2xl"></div>
            <CardContent className="relative p-6">
              <div className="w-12 h-12 bg-[#F68B1F] rounded-lg flex items-center justify-center mb-4">
                <Pill className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-[#1A1A1A]">
                Health Tips
              </h2>
              <ul className="text-[#4B4B4B] mt-2 list-disc list-inside space-y-1">
                <li>Stay hydrated daily</li>
                <li>Maintain proper sleep</li>
                <li>Eat balanced meals</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Section */}
        <div className="max-w-7xl mx-auto mt-16 grid md:grid-cols-3 gap-6">
          <Card className="border border-[#E5E5E5] rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
            <h3 className="text-2xl font-bold text-[#1A1A1A]">0</h3>
            <p className="text-[#4B4B4B] mt-1">Appointments Today</p>
          </Card>
          <Card className="border border-[#E5E5E5] rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
            <h3 className="text-2xl font-bold text-[#1A1A1A]">0</h3>
            <p className="text-[#4B4B4B] mt-1">Reports Uploaded</p>
          </Card>
          <Card className="border border-[#E5E5E5] rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 text-center">
            <h3 className="text-2xl font-bold text-[#1A1A1A]">0</h3>
            <p className="text-[#4B4B4B] mt-1">Tips Read</p>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <LandingFooter />
    </DashboardLayout>
  );
};

export default StudentDashboard;
