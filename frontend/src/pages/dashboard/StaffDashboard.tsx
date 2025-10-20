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
