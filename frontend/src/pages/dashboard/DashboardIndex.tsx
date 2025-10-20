import React from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card, Button } from "@/components/ui";

const DashboardIndex: React.FC = () => {
  return (
    <DashboardLayout userRole="student"> {/* default for layout, static for now */}
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Select Your Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="p-6 flex flex-col items-center space-y-4">
            <h2 className="text-xl font-semibold">Student Dashboard</h2>
            <p className="text-gray-500">View your health records, appointments, and tips.</p>
            <Link to="/dashboard/student">
              <Button className="bg-[#F68B1F] hover:bg-[#e67a12]">Go</Button>
            </Link>
          </Card>

          <Card className="p-6 flex flex-col items-center space-y-4">
            <h2 className="text-xl font-semibold">Staff Dashboard</h2>
            <p className="text-gray-500">Manage patient appointments and records.</p>
            <Link to="/dashboard/staff">
              <Button className="bg-[#F68B1F] hover:bg-[#e67a12]">Go</Button>
            </Link>
          </Card>

          <Card className="p-6 flex flex-col items-center space-y-4">
            <h2 className="text-xl font-semibold">Admin Dashboard</h2>
            <p className="text-gray-500">View analytics, users, and system reports.</p>
            <Link to="/dashboard/admin">
              <Button className="bg-[#F68B1F] hover:bg-[#e67a12]">Go</Button>
            </Link>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardIndex;
