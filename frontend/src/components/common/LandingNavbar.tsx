import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { ImageWithFallback } from '../ui/ImageWithFallback';
import { Menu, X } from 'lucide-react';
import Logoimg from '../../assets/logo/uiu_logo.png';

interface LandingNavbarProps {
  isAuthenticated?: boolean;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ isAuthenticated = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#E5E5E5] shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ImageWithFallback
              src={Logoimg}
              alt="UIU HealthCare Logo"
              className="w-10 h-10 rounded-lg object-contain"
            />
            <div>
              <h1 className="text-[#1A1A1A]">UIU HealthCare</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-[#4B4B4B] hover:text-[#F68B1F] transition-colors">
              Features
            </a>
            <a href="#services" className="text-[#4B4B4B] hover:text-[#F68B1F] transition-colors">
              Services
            </a>
            <a href="#about" className="text-[#4B4B4B] hover:text-[#F68B1F] transition-colors">
              About
            </a>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="bg-[#F68B1F] hover:bg-[#e67a12]">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="outline" className="border-[#F68B1F] text-[#F68B1F] hover:bg-[#FDF7F2]">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-[#F68B1F] hover:bg-[#e67a12]">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#1A1A1A]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3">
            <a
              href="#features"
              className="block text-[#4B4B4B] hover:text-[#F68B1F] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#services"
              className="block text-[#4B4B4B] hover:text-[#F68B1F] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#about"
              className="block text-[#4B4B4B] hover:text-[#F68B1F] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </a>
            {isAuthenticated ? (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#F68B1F] hover:bg-[#e67a12]">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <div className="space-y-2">
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full border-[#F68B1F] text-[#F68B1F] hover:bg-[#FDF7F2]">
                    Login
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#F68B1F] hover:bg-[#e67a12]">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default LandingNavbar;
