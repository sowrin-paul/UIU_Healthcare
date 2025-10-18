import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: "student" | "staff" | "admin";
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Mock login for development
    const storedUser = localStorage.getItem("user");
    const storedAuth = localStorage.getItem("isAuthenticated");

    if (!storedUser || storedAuth !== "true") {
      const mockUser = {
        id: "1",
        name: userRole === "admin" ? "System Administrator" : "Student Name",
        role: userRole,
      };
      localStorage.setItem("user", JSON.stringify(mockUser));
      localStorage.setItem("isAuthenticated", "true");
    }
  }, [userRole]);

  const handleSidebarItemClick = (path: string) => {
    console.log("Navigate to", path);
    // You can integrate real navigation later
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        user={{ name: JSON.parse(localStorage.getItem("user") || "{}").name || "User" }}
        onLogout={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("isAuthenticated");
          navigate("/auth/login");
        }}
      />
      <div className="flex flex-1">
        <Sidebar userRole={userRole} onItemClick={handleSidebarItemClick} />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
