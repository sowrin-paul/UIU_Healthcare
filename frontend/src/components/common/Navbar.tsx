import React from 'react';
import { Bell, Search, User, LogOut, Settings, ChevronDown } from 'lucide-react';
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

interface NavbarProps {
  user: {
    name: string;
    role: 'student' | 'staff' | 'doctor' | 'admin';
    uiuId: string;
    avatar?: string;
  };
  onLogout: () => void;
  notifications?: number;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout, notifications = 0 }) => {
  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'student': return 'Student';
      case 'staff': return 'Staff';
      case 'doctor': return 'Doctor';
      case 'admin': return 'Admin';
      default: return 'User';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'staff': return 'bg-green-100 text-green-800';
      case 'doctor': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <nav className="bg-white border-b border-[#E5E5E5] px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#F68B1F] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">UIU</span>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[#1A1A1A]">UIU Healthcare</h1>
              <p className="text-xs text-[#4B4B4B]">Medical Center Portal</p>
            </div>
          </div>
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B4B4B] h-4 w-4" />
            <Input
              type="text"
              placeholder="Search appointments, records..."
              className="pl-10 bg-[#FDF7F2] border-[#E5E5E5] focus:border-[#F68B1F]"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </Button>

          {/* User Profile Dropdown */}
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
                  <p className="text-xs text-[#4B4B4B]">{user.uiuId}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-[#4B4B4B]" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-[#4B4B4B]">{user.uiuId}</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium w-fit ${getRoleBadgeColor(user.role)}`}>
                    {getRoleDisplayName(user.role)}
                  </span>
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
        </div>
      </div>

      {/* Mobile Search - Shown on small screens */}
      <div className="md:hidden mt-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4B4B4B] h-4 w-4" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 bg-[#FDF7F2] border-[#E5E5E5] focus:border-[#F68B1F]"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
