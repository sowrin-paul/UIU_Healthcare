import React from 'react';
import { Heart, Phone, Mail, MapPin, Clock, Shield, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const currentYear = new Date().getFullYear();

  const emergencyContacts = [
    {
      label: 'UIU Medical Center',
      value: '+880-2-8431645',
      icon: <Phone className="h-4 w-4" />
    },
    {
      label: 'Emergency Hotline',
      value: '999',
      icon: <Phone className="h-4 w-4 text-red-500" />
    },
    {
      label: 'Ambulance Service',
      value: '+880-1711-000000',
      icon: <Phone className="h-4 w-4 text-red-500" />
    }
  ];

  const quickLinks = [
    { label: 'Book Appointment', href: '/appointments/book' },
    { label: 'Emergency Info', href: '/emergency' },
    { label: 'Health Awareness', href: '/health-awareness' },
    { label: 'Contact Medical Center', href: '/contact' }
  ];

  const medicalCenterInfo = {
    address: 'United International University, Madani Avenue, Badda, Dhaka-1212',
    email: 'medical@uiu.ac.bd',
    hours: {
      weekdays: '9:00 AM - 5:00 PM',
      weekends: '10:00 AM - 2:00 PM (Saturday)'
    }
  };

  return (
    <footer className={`bg-white border-t border-[#E5E5E5] mt-auto ${className}`}>
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* UIU Healthcare Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#F68B1F] rounded-lg flex items-center justify-center">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#1A1A1A]">UIU Healthcare</h3>
                <p className="text-xs text-[#4B4B4B]">Medical Center Portal</p>
              </div>
            </div>
            <p className="text-sm text-[#4B4B4B] leading-relaxed">
              Providing comprehensive healthcare services to the UIU community with modern facilities and dedicated medical professionals.
            </p>
            <div className="flex items-center space-x-2 text-sm text-[#4B4B4B]">
              <Shield className="h-4 w-4 text-[#F68B1F]" />
              <span>HIPAA Compliant & Secure</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide">
              Quick Links
            </h4>
            <nav className="space-y-2">
              {quickLinks.map((link, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="justify-start h-auto p-0 text-sm text-[#4B4B4B] hover:text-[#F68B1F]"
                  asChild
                >
                  <a href={link.href}>
                    <ExternalLink className="h-3 w-3 mr-2" />
                    {link.label}
                  </a>
                </Button>
              ))}
            </nav>
          </div>

          {/* Medical Center Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#1A1A1A] uppercase tracking-wide">
              Medical Center
            </h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-[#F68B1F] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-[#4B4B4B] leading-relaxed">
                  {medicalCenterInfo.address}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-[#F68B1F]" />
                <a 
                  href={`mailto:${medicalCenterInfo.email}`}
                  className="text-sm text-[#4B4B4B] hover:text-[#F68B1F] transition-colors"
                >
                  {medicalCenterInfo.email}
                </a>
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-[#F68B1F]" />
                  <span className="text-sm font-medium text-[#1A1A1A]">Operating Hours</span>
                </div>
                <div className="ml-6 space-y-1">
                  <p className="text-sm text-[#4B4B4B]">Mon-Fri: {medicalCenterInfo.hours.weekdays}</p>
                  <p className="text-sm text-[#4B4B4B]">{medicalCenterInfo.hours.weekends}</p>
                  <p className="text-xs text-red-600 font-medium">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-red-600 uppercase tracking-wide">
              Emergency Contacts
            </h4>
            <div className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex items-center space-x-2">
                  {contact.icon}
                  <div>
                    <p className="text-xs text-[#4B4B4B]">{contact.label}</p>
                    <a 
                      href={`tel:${contact.value}`}
                      className="text-sm font-medium text-[#1A1A1A] hover:text-[#F68B1F] transition-colors"
                    >
                      {contact.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-700 font-medium">
                🚨 For medical emergencies, call 999 immediately or visit the nearest hospital.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#E5E5E5] bg-[#FDF7F2]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-[#4B4B4B]">
              <p>© {currentYear} United International University. All rights reserved.</p>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <Button
                variant="ghost"
                size="sm"
                className="text-[#4B4B4B] hover:text-[#F68B1F] h-auto p-0"
                asChild
              >
                <a href="/privacy-policy">Privacy Policy</a>
              </Button>
              <span className="text-[#E5E5E5]">|</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#4B4B4B] hover:text-[#F68B1F] h-auto p-0"
                asChild
              >
                <a href="/terms-of-service">Terms of Service</a>
              </Button>
              <span className="text-[#E5E5E5]">|</span>
              <Button
                variant="ghost"
                size="sm"
                className="text-[#4B4B4B] hover:text-[#F68B1F] h-auto p-0"
                asChild
              >
                <a href="/contact">Contact Support</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
