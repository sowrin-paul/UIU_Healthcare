import React from "react";
<<<<<<< HEAD
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
=======
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Calendar, FileText, Pill, Heart, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const StudentDashboard: React.FC = () => {
  return (
    <div className="space-y-8 gap-5">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 to-orange-500 p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <Badge className="mb-4 bg-white/20 text-white border-white/30">
            Student Dashboard
          </Badge>
          <h1 className="text-3xl md:text-4xl mb-3">
            Welcome to Your Health Dashboard
          </h1>
          <p className="text-white/90 text-lg max-w-2xl">
            Stay on top of your health with easy access to appointments, medical records, and personalized health tips.
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link to="/dashboard/appointments/book">
          <Card className="border border-[#E5E5E5] hover:shadow-lg transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-[#F68B1F] rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <ArrowRight className="h-5 w-5 text-[#4B4B4B] group-hover:text-[#F68B1F] transition-colors" />
              </div>
              <h3 className="text-[#1A1A1A] mb-1">Book Appointment</h3>
              <p className="text-sm text-[#4B4B4B]">Schedule a new visit</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/records">
          <Card className="border border-[#E5E5E5] hover:shadow-lg transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <ArrowRight className="h-5 w-5 text-[#4B4B4B] group-hover:text-green-500 transition-colors" />
              </div>
              <h3 className="text-[#1A1A1A] mb-1">View Records</h3>
              <p className="text-sm text-[#4B4B4B]">Access medical history</p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/dashboard/pharmacy">
          <Card className="border border-[#E5E5E5] hover:shadow-lg transition-all cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Pill className="h-6 w-6 text-white" />
                </div>
                <ArrowRight className="h-5 w-5 text-[#4B4B4B] group-hover:text-purple-500 transition-colors" />
              </div>
              <h3 className="text-[#1A1A1A] mb-1">Order Medicine</h3>
              <p className="text-sm text-[#4B4B4B]">Pharmacy services</p>
            </CardContent>
          </Card>
        </Link>

        <Card className="border border-[#E5E5E5] bg-[#FDF7F2]">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Activity className="h-6 w-6 text-white" />
              </div>
            </div>
            <h3 className="text-[#1A1A1A] mb-1">Health Status</h3>
            <p className="text-sm text-[#4B4B4B]">All systems normal</p>
          </CardContent>
        </Card>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointments */}
        <Card className="border border-[#E5E5E5]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-[#1A1A1A]">
                Upcoming Appointments
              </h2>
              <div className="w-10 h-10 bg-[#FDF7F2] rounded-lg flex items-center justify-center">
                <Calendar className="h-5 w-5 text-[#F68B1F]" />
              </div>
            </div>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-[#4B4B4B] mb-4">No upcoming appointments</p>
              <Link to="/dashboard/appointments/book">
                <Button className="bg-[#F68B1F] hover:bg-[#e67a12]">
                  Book Appointment
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Recent Health Reports */}
        <Card className="border border-[#E5E5E5]">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-[#1A1A1A]">
                Recent Reports
              </h2>
              <div className="w-10 h-10 bg-[#FDF7F2] rounded-lg flex items-center justify-center">
                <FileText className="h-5 w-5 text-[#F68B1F]" />
              </div>
            </div>
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <p className="text-[#4B4B4B] mb-4">No reports available yet</p>
              <Link to="/dashboard/records">
                <Button variant="outline" className="border-[#E5E5E5] hover:bg-[#FDF7F2]">
                  View Records
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Health Tips */}
        <Card className="border border-[#E5E5E5] bg-gradient-to-br from-[#FDF7F2] to-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl text-[#1A1A1A]">
                Health Tips
              </h2>
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <Heart className="h-5 w-5 text-[#F68B1F]" />
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#F68B1F] rounded-full mt-2"></div>
                <span className="text-[#4B4B4B]">Drink at least 8 glasses of water daily</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#F68B1F] rounded-full mt-2"></div>
                <span className="text-[#4B4B4B]">Get 7-9 hours of sleep each night</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#F68B1F] rounded-full mt-2"></div>
                <span className="text-[#4B4B4B]">Maintain a balanced diet with fruits and vegetables</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-[#F68B1F] rounded-full mt-2"></div>
                <span className="text-[#4B4B4B]">Exercise for at least 30 minutes daily</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div>
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-[#F68B1F]" />
          <h2 className="text-2xl text-[#1A1A1A]">Your Health Overview</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border border-[#E5E5E5]">
            <CardContent className="p-6 text-center">
              <div className="text-3xl text-[#F68B1F] mb-2">0</div>
              <p className="text-sm text-[#4B4B4B]">Appointments This Month</p>
            </CardContent>
          </Card>
          <Card className="border border-[#E5E5E5]">
            <CardContent className="p-6 text-center">
              <div className="text-3xl text-green-500 mb-2">0</div>
              <p className="text-sm text-[#4B4B4B]">Medical Records</p>
            </CardContent>
          </Card>
          <Card className="border border-[#E5E5E5]">
            <CardContent className="p-6 text-center">
              <div className="text-3xl text-purple-500 mb-2">0</div>
              <p className="text-sm text-[#4B4B4B]">Pharmacy Orders</p>
            </CardContent>
          </Card>
          <Card className="border border-[#E5E5E5]">
            <CardContent className="p-6 text-center">
              <div className="text-3xl text-blue-500 mb-2">100%</div>
              <p className="text-sm text-[#4B4B4B]">Health Score</p>
            </CardContent>
>>>>>>> 2da7cf151fc45dd7781a4824a35686784136efbf
          </Card>
        </div>
      </div>

<<<<<<< HEAD
      {/* Footer */}
      <LandingFooter />
    </DashboardLayout>
  );
};

export default StudentDashboard;
=======
      {/* Call to Action */}
      <Card className="border-2 border-[#F68B1F] bg-[#FDF7F2]">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-[#F68B1F] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Activity className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl text-[#1A1A1A] mb-3">
            Need Medical Assistance?
          </h2>
          <p className="text-[#4B4B4B] mb-6 max-w-2xl mx-auto">
            Our healthcare team is here to help. Book an appointment or contact us for any health-related concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/dashboard/appointments/book">
              <Button className="bg-[#F68B1F] hover:bg-[#e67a12]">
                Book Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" className="border-[#E5E5E5] hover:bg-white">
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentDashboard;
>>>>>>> 2da7cf151fc45dd7781a4824a35686784136efbf
