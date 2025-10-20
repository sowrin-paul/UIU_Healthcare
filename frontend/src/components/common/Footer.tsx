import React from 'react';
import { Link } from 'react-router-dom';
import uiuLogo from '../../assets/logo/uiu_logo.png';

export const LandingFooter: React.FC = () => {
  return (
    <footer className="bg-[#1A1A1A] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center">
                <img
                  src={uiuLogo}
                  alt="UIU Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="text-white">UIU HealthCare</h3>
              </div>
            </div>
            <p className="text-white/70 text-sm">
              Comprehensive digital healthcare portal for United International University.
            </p>
          </div>
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-white/70 hover:text-[#F68B1F] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/70 hover:text-[#F68B1F] transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-[#F68B1F] transition-colors">
                  About
                </a>
              </li>
              <li>
                <Link to="/login" className="text-white/70 hover:text-[#F68B1F] transition-colors">
                  Login
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>Appointment Booking</li>
              <li>Medical Records</li>
              <li>Pharmacy Orders</li>
              <li>Emergency Care</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>United International University</li>
              <li>Dhaka, Bangladesh</li>
              <li>healthcare@uiu.ac.bd</li>
              <li>+880-1234-567890</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-sm text-white/70">
          <p>© 2025 United International University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
