<<<<<<< HEAD
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
=======
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
>>>>>>> 2da7cf151fc45dd7781a4824a35686784136efbf
import Navbar from "@/components/common/Navbar";
import Sidebar from "@/components/common/Sidebar";
import Footer from "@/components/common/Footer";

interface DashboardLayoutProps {
  children: React.ReactNode;
<<<<<<< HEAD
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
=======
  userRole?: "student" | "staff" | "admin";
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole: propUserRole }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Use prop userRole if provided, otherwise use user's role from context
  const userRole = propUserRole || (user?.role as "student" | "staff" | "admin");

  const handleSidebarItemClick = (_itemId: string, path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // If no user data, show loading or redirect
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar
        user={{
          name: user.name,
          role: user.role,
          uiuId: user.uiuId,
          avatar: user.avatar,
        }}
        onLogout={handleLogout}
        notifications={0} // You can implement notification count later
        userRole={userRole}
      />
      <div className="flex flex-1">
        {/* Sidebar hidden on desktop (lg and above), shown on mobile */}
        <div className="lg:hidden">
          <Sidebar userRole={userRole} onItemClick={handleSidebarItemClick} />
        </div>
>>>>>>> 2da7cf151fc45dd7781a4824a35686784136efbf
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout;
