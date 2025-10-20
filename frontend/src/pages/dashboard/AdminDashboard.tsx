import React from "react";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Card } from "@/components/ui";

const AdminDashboard: React.FC = () => {
  return (
    <DashboardLayout userRole="admin">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
          <p className="text-gray-500 mt-2">View or edit registered users.</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">System Reports</h2>
          <p className="text-gray-500 mt-2">No new reports generated.</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-gray-800">Support Tickets</h2>
          <p className="text-gray-500 mt-2">No pending support tickets.</p>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
