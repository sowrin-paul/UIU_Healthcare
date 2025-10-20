import React, { useState } from 'react';
import { Bell, Search, User, LogOut, Settings, ChevronDown, Menu, X, Calendar, FileText, Pill, Users, BarChart3, AlertTriangle, Heart, Stethoscope, Shield, Activity } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { cn } from '../../lib/utils';

import uiuLogo from '../../assets/logo/uiu_logo.png';

interface NavLink {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  children?: NavLink[];
}

interface NavbarProps {
  user?: {
    name: string;
    role?: string;
    uiuId?: string;
    avatar?: string;
  };
  onLogout?: () => void;
  notifications?: number;
  userRole?: 'student' | 'staff' | 'admin';
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, notifications = 0, userRole = 'student' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const getNavLinks = (role: string): NavLink[] => {
    switch (role) {
      case 'student':
      case 'staff':
        return [
          {
            id: 'dashboard',
            label: 'Dashboard',
            icon: <Activity className="h-4 w-4" />,
            href: `/dashboard/${role}`
          },
          {
            id: 'appointments',
            label: 'Appointments',
            icon: <Calendar className="h-4 w-4" />,
            href: '/appointments',
            children: [
              {
                id: 'book-appointment',
                label: 'Book Appointment',
                icon: <Calendar className="h-4 w-4" />,
                href: '/appointments/book'
              },
              {
                id: 'my-appointments',
                label: 'My Appointments',
                icon: <Calendar className="h-4 w-4" />,
                href: '/appointments/my'
              }
            ]
          },
          {
            id: 'medical-records',
            label: 'Medical Records',
            icon: <FileText className="h-4 w-4" />,
            href: '/records',
            children: [
              {
                id: 'view-records',
                label: 'View Records',
                icon: <FileText className="h-4 w-4" />,
                href: '/records/view'
              },
              {
                id: 'upload-records',
                label: 'Upload Records',
                icon: <FileText className="h-4 w-4" />,
                href: '/records/upload'
              }
            ]
          },
          {
            id: 'pharmacy',
            label: 'Pharmacy',
            icon: <Pill className="h-4 w-4" />,
            href: '/pharmacy',
            children: [
              {
                id: 'order-medicine',
                label: 'Order Medicine',
                icon: <Pill className="h-4 w-4" />,
                href: '/pharmacy/order'
              },
              {
                id: 'order-history',
                label: 'Order History',
                icon: <Pill className="h-4 w-4" />,
                href: '/pharmacy/history'
              }
            ]
          },
          {
            id: 'emergency',
            label: 'Emergency',
            icon: <AlertTriangle className="h-4 w-4" />,
            href: '/emergency'
          },
          {
            id: 'health-awareness',
            label: 'Health Tips',
            icon: <Heart className="h-4 w-4" />,
            href: '/health-awareness'
          }
        ];

      case 'admin':
        return [
          {
            id: 'dashboard',
            label: 'Dashboard',
            icon: <Activity className="h-4 w-4" />,
            href: '/dashboard/admin'
          },
          {
            id: 'manage-users',
            label: 'Users',
            icon: <Users className="h-4 w-4" />,
            href: '/admin/users',
            children: [
              {
                id: 'doctors',
                label: 'Doctors',
                icon: <Stethoscope className="h-4 w-4" />,
                href: '/admin/users/doctors'
              },
              {
                id: 'staff',
                label: 'Staff',
                icon: <Users className="h-4 w-4" />,
                href: '/admin/users/staff'
              }
            ]
          },
          {
            id: 'appointments-management',
            label: 'Appointments',
            icon: <Calendar className="h-4 w-4" />,
            href: '/admin/appointments'
          },
          {
            id: 'analytics',
            label: 'Analytics',
            icon: <BarChart3 className="h-4 w-4" />,
            href: '/admin/analytics'
          },
          {
            id: 'announcements',
            label: 'Announcements',
            icon: <Shield className="h-4 w-4" />,
            href: '/admin/announcements'
          },
          {
            id: 'system-settings',
            label: 'Settings',
            icon: <Settings className="h-4 w-4" />,
            href: '/admin/settings'
          }
        ];

      default:
        return [];
    }
  };

  const navLinks = getNavLinks(userRole);

  const getRoleDisplayName = (role?: string) => {
    if (!role) return 'User';
    switch (role.toLowerCase()) {
      case 'student': return 'Student';
      case 'staff': return 'Staff';
      case 'admin': return 'Admin';
      default: return 'User';
    }
  };

  const getRoleBadgeColor = (role?: string) => {
    if (!role) return 'bg-gray-100 text-gray-800';
    switch (role.toLowerCase()) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'staff': return 'bg-green-100 text-green-800';
      case 'admin': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const isActiveLink = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <nav className="bg-white border-b border-[#E5E5E5] shadow-sm">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center cursor-pointer" onClick={() => navigate(`/dashboard/${userRole}`)}>
                <img
                  src={uiuLogo}
                  alt="UIU Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-[#1A1A1A]">UIU Healthcare</h1>
                <p className="text-xs text-[#4B4B4B]">Medical Center Portal</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links - Only show in dashboard context */}
          {userRole && (
            <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center">
              {navLinks.map((link) => (
                link.children ? (
                  <DropdownMenu key={link.id}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={cn(
                          "flex items-center space-x-1 text-sm font-medium",
                          isActiveLink(link.href) ? "text-[#F68B1F] bg-[#FDF7F2]" : "text-[#4B4B4B] hover:text-[#F68B1F] hover:bg-[#FDF7F2]"
                        )}
                      >
                        {link.icon}
                        <span>{link.label}</span>
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {link.children.map((child) => (
                        <DropdownMenuItem
                          key={child.id}
                          onClick={() => navigate(child.href)}
                          className={cn(
                            "cursor-pointer",
                            isActiveLink(child.href) && "bg-[#FDF7F2] text-[#F68B1F]"
                          )}
                        >
                          {child.icon}
                          <span className="ml-2">{child.label}</span>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button
                    key={link.id}
                    variant="ghost"
                    onClick={() => navigate(link.href)}
                    className={cn(
                      "flex items-center space-x-1 text-sm font-medium",
                      isActiveLink(link.href) ? "text-[#F68B1F] bg-[#FDF7F2]" : "text-[#4B4B4B] hover:text-[#F68B1F] hover:bg-[#FDF7F2]"
                    )}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </Button>
                )
              ))}
            </div>
          )}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Search Bar - Hidden on mobile */}
            {/* <div className="hidden md:flex">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B4B4B] h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 w-48 bg-[#FDF7F2] border-[#E5E5E5] focus:border-[#F68B1F]"
                />
              </div>
            </div> */}

            {/* Notifications */}
            {user && (
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications > 9 ? '9+' : notifications}
                  </span>
                )}
              </Button>
            )}

            {/* Mobile Menu Toggle - Only in dashboard context */}
            {userRole && (
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}

            {/* User Profile Dropdown */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 px-3">
                    <div className="w-8 h-8 bg-[#F68B1F] rounded-full flex items-center justify-center">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <User className="h-4 w-4 text-white" />
                      )}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-[#1A1A1A]">{user.name}</p>
                      {user.uiuId && (
                        <p className="text-xs text-[#4B4B4B]">{user.uiuId}</p>
                      )}
                    </div>
                    <ChevronDown className="h-4 w-4 text-[#4B4B4B] hidden md:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      {user.uiuId && (
                        <p className="text-xs text-[#4B4B4B]">{user.uiuId}</p>
                      )}
                      {user.role && (
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit ${getRoleBadgeColor(user.role)}`}>
                          {getRoleDisplayName(user.role)}
                        </span>
                      )}
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="text-sm text-[#4B4B4B]">Guest</div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu - Only show in dashboard context */}
      {isMobileMenuOpen && userRole && (
        <div className="lg:hidden border-t border-[#E5E5E5] bg-white">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B4B4B] h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 bg-[#FDF7F2] border-[#E5E5E5] focus:border-[#F68B1F]"
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            {navLinks.map((link) => (
              <div key={link.id}>
                {link.children ? (
                  <>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-sm font-medium",
                        isActiveLink(link.href) ? "text-[#F68B1F] bg-[#FDF7F2]" : "text-[#4B4B4B]"
                      )}
                    >
                      {link.icon}
                      <span className="ml-2">{link.label}</span>
                    </Button>
                    <div className="ml-6 space-y-1 mt-1">
                      {link.children.map((child) => (
                        <Button
                          key={child.id}
                          variant="ghost"
                          onClick={() => {
                            navigate(child.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className={cn(
                            "w-full justify-start text-sm",
                            isActiveLink(child.href) ? "text-[#F68B1F] bg-[#FDF7F2]" : "text-[#4B4B4B]"
                          )}
                        >
                          {child.icon}
                          <span className="ml-2">{child.label}</span>
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      navigate(link.href);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "w-full justify-start text-sm font-medium",
                      isActiveLink(link.href) ? "text-[#F68B1F] bg-[#FDF7F2]" : "text-[#4B4B4B]"
                    )}
                  >
                    {link.icon}
                    <span className="ml-2">{link.label}</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
