import React from 'react';
import {
    Calendar,
    FileText,
    Pill,
    Users,
    BarChart3,
    Settings,
    AlertTriangle,
    Heart,
    Stethoscope,
    Shield,
    ChevronRight,
    Activity
} from 'lucide-react';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils.ts';

interface SidebarItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    href: string;
    badge?: number;
    children?: SidebarItem[];
}

interface SidebarProps {
    userRole: 'student' | 'staff' | 'doctor' | 'admin';
    activeItem?: string;
    collapsed?: boolean;
    onItemClick: (itemId: string, href: string) => void;
    onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
    userRole,
    activeItem,
    collapsed = false,
    onItemClick,
    onToggleCollapse
}) => {

    const getMenuItems = (role: string): SidebarItem[] => {
        const commonItems: SidebarItem[] = [
            {
                id: 'dashboard',
                label: 'Dashboard',
                icon: <Activity className="h-5 w-5" />,
                href: '/dashboard'
            }
        ];

        switch (role) {
            case 'student':
            case 'staff':
                return [
                    ...commonItems,
                    {
                        id: 'appointments',
                        label: 'Appointments',
                        icon: <Calendar className="h-5 w-5" />,
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
                        icon: <FileText className="h-5 w-5" />,
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
                        icon: <Pill className="h-5 w-5" />,
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
                        label: 'Emergency Info',
                        icon: <AlertTriangle className="h-5 w-5 text-red-500" />,
                        href: '/emergency'
                    },
                    {
                        id: 'health-awareness',
                        label: 'Health Awareness',
                        icon: <Heart className="h-5 w-5" />,
                        href: '/health-awareness'
                    }
                ];

            case 'doctor':
                return [
                    ...commonItems,
                    {
                        id: 'appointments',
                        label: 'Appointments',
                        icon: <Calendar className="h-5 w-5" />,
                        href: '/doctor/appointments',
                        badge: 5
                    },
                    {
                        id: 'patients',
                        label: 'Patients',
                        icon: <Users className="h-5 w-5" />,
                        href: '/doctor/patients'
                    },
                    {
                        id: 'prescriptions',
                        label: 'Prescriptions',
                        icon: <Stethoscope className="h-5 w-5" />,
                        href: '/doctor/prescriptions'
                    },
                    {
                        id: 'lab-reports',
                        label: 'Lab Reports',
                        icon: <FileText className="h-5 w-5" />,
                        href: '/doctor/lab-reports'
                    },
                    {
                        id: 'health-trends',
                        label: 'Health Trends',
                        icon: <BarChart3 className="h-5 w-5" />,
                        href: '/doctor/trends'
                    }
                ];

            case 'admin':
                return [
                    ...commonItems,
                    {
                        id: 'manage-users',
                        label: 'Manage Users',
                        icon: <Users className="h-5 w-5" />,
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
                        icon: <Calendar className="h-5 w-5" />,
                        href: '/admin/appointments'
                    },
                    {
                        id: 'analytics',
                        label: 'Analytics & Reports',
                        icon: <BarChart3 className="h-5 w-5" />,
                        href: '/admin/analytics'
                    },
                    {
                        id: 'announcements',
                        label: 'Announcements',
                        icon: <Shield className="h-5 w-5" />,
                        href: '/admin/announcements'
                    },
                    {
                        id: 'system-settings',
                        label: 'System Settings',
                        icon: <Settings className="h-5 w-5" />,
                        href: '/admin/settings'
                    }
                ];

            default:
                return commonItems;
        }
    };

    const menuItems = getMenuItems(userRole);

    const SidebarItem: React.FC<{
        item: SidebarItem;
        level?: number;
        isActive?: boolean;
    }> = ({ item, level = 0, isActive = false }) => {
        const [isExpanded, setIsExpanded] = React.useState(false);
        const hasChildren = item.children && item.children.length > 0;
        const isParentActive = item.children?.some(child => child.id === activeItem);

        React.useEffect(() => {
            if (isParentActive) {
                setIsExpanded(true);
            }
        }, [isParentActive]);

        const handleClick = () => {
            if (hasChildren) {
                setIsExpanded(!isExpanded);
            } else {
                onItemClick(item.id, item.href);
            }
        };

        return (
            <div className="w-full">
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start text-left h-10 px-3 mb-1",
                        level > 0 && "pl-8",
                        isActive && "bg-[#FDF7F2] text-[#F68B1F] border-r-2 border-[#F68B1F]",
                        !isActive && "text-[#4B4B4B] hover:bg-[#FDF7F2] hover:text-[#F68B1F]",
                        collapsed && "justify-center px-2"
                    )}
                    onClick={handleClick}
                >
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center space-x-2">
                            {item.icon}
                            {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
                        </div>
                        {!collapsed && (
                            <div className="flex items-center space-x-1">
                                {item.badge && (
                                    <span className="bg-[#F68B1F] text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                                        {item.badge}
                                    </span>
                                )}
                                {hasChildren && (
                                    <ChevronRight
                                        className={cn(
                                            "h-4 w-4 transition-transform",
                                            isExpanded && "rotate-90"
                                        )}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                </Button>

                {/* Children */}
                {hasChildren && isExpanded && !collapsed && (
                    <div className="ml-2 space-y-1">
                        {item.children?.map((child) => (
                            <SidebarItem
                                key={child.id}
                                item={child}
                                level={level + 1}
                                isActive={child.id === activeItem}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className={cn(
            "bg-white border-r border-[#E5E5E5] h-full transition-all duration-300",
            collapsed ? "w-16" : "w-64"
        )}>
            {/* Header */}
            <div className="p-4 border-b border-[#E5E5E5]">
                {!collapsed ? (
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-[#F68B1F] rounded-lg flex items-center justify-center">
                            <Heart className="h-4 w-4 text-white" />
                        </div>
                        <div>
                            <h2 className="text-sm font-semibold text-[#1A1A1A]">Health Portal</h2>
                            <p className="text-xs text-[#4B4B4B] capitalize">{userRole} Panel</p>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center">
                        <div className="w-8 h-8 bg-[#F68B1F] rounded-lg flex items-center justify-center">
                            <Heart className="h-4 w-4 text-white" />
                        </div>
                    </div>
                )}
            </div>

            {/* Navigation */}
            <div className="p-3 space-y-1 overflow-y-auto">
                {menuItems.map((item) => (
                    <SidebarItem
                        key={item.id}
                        item={item}
                        isActive={item.id === activeItem}
                    />
                ))}
            </div>

            {/* Collapse Toggle */}
            {onToggleCollapse && (
                <div className="absolute bottom-4 left-4 right-4">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onToggleCollapse}
                        className="w-full"
                    >
                        <ChevronRight
                            className={cn(
                                "h-4 w-4 transition-transform",
                                collapsed && "rotate-180"
                            )}
                        />
                        {!collapsed && <span className="ml-2 text-xs">Collapse Menu</span>}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
