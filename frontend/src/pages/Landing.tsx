import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import LandingNavbar from '../components/common/LandingNavbar';
import LandingFooter from '../components/common/LandingFooter';
import {
  Activity,
  Calendar,
  FileText,
  Pill,
  ShieldCheck,
  Clock,
  Stethoscope,
  UserCheck,
  // CheckCircle,
  ArrowRight,
} from 'lucide-react';
import Bannerimg from '../assets/logo/uiu_banner.jpg';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <LandingNavbar isAuthenticated={isAuthenticated} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-400 to-orange-300 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                United International University
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                Your Health, Our Priority
              </h1>
              <p className="text-lg md:text-xl mb-8 text-white/90">
                Comprehensive digital healthcare portal for UIU students and staff. Book appointments,
                access medical records, and manage your health - all in one secure platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link to="/dashboard">
                    <Button
                      size="lg"
                      className="bg-white text-[#F68B1F] hover:bg-gray-100 w-full sm:w-auto"
                    >
                      Go to Dashboard
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                ) : (
                  <Link to="/login">
                    <Button
                      size="lg"
                      className="bg-white text-[#F68B1F] hover:bg-gray-100 w-full sm:w-auto"
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <a href="#features">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-[#F68B1F] hover:bg-gray-100 w-full sm:w-auto"
                  >
                    Learn More
                  </Button>
                </a>
              </div>
              {/* <div className="mt-12 grid grid-cols-3 gap-6">
                <StatCard number="24/7" label="Support" />
                <StatCard number="500+" label="Active Users" />
                <StatCard number="98%" label="Satisfaction" />
              </div> */}
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-white/10 rounded-2xl blur-xl"></div>
                <ImageWithFallback
                  src={Bannerimg}
                  alt="UIU Campus - United International University"
                  className="relative rounded-2xl shadow-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#FDF7F2] text-[#F68B1F] border-[#F68B1F]">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-lg text-[#4B4B4B] max-w-2xl mx-auto">
              Our comprehensive platform provides all essential healthcare services in one secure,
              easy-to-use portal.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard
              icon={Calendar}
              title="Smart Appointment Booking"
              description="Schedule medical consultations with UIU healthcare staff. Emergency cases receive priority handling."
              color="bg-[#F68B1F]"
            />
            <FeatureCard
              icon={FileText}
              title="Digital Medical Records"
              description="Access your complete medical history, prescriptions, and lab reports securely anytime, anywhere."
              color="bg-[#e67a12]"
            />
            <FeatureCard
              icon={Pill}
              title="Pharmacy Services"
              description="Order medicines online and track your pharmacy requests with real-time status updates."
              color="bg-[#F68B1F]"
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Secure & Private"
              description="Enterprise-grade security with role-based access control protects your sensitive health data."
              color="bg-[#e67a12]"
            />
            <FeatureCard
              icon={Clock}
              title="Emergency Priority"
              description="Flag urgent cases for immediate attention with our emergency appointment system."
              color="bg-[#F68B1F]"
            />
            <FeatureCard
              icon={Activity}
              title="Health Dashboard"
              description="Visualize your health metrics, upcoming appointments, and medication schedules in one place."
              color="bg-[#e67a12]"
            />
          </div>
        </div>
      </section>

      {/* Role based access Section */}
      <section id="services" className="py-20 bg-[#FDF7F2]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-[#FDF7F2] text-[#F68B1F] border-[#F68B1F]">
              Role-Based Access
            </Badge>
            <h2 className="text-3xl md:text-4xl text-[#1A1A1A] mb-4">
              Designed for Everyone
            </h2>
            <p className="text-lg text-[#4B4B4B] max-w-2xl mx-auto">
              Customized dashboards and features for students, staff, and administrators.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <RoleCard
              icon={UserCheck}
              title="Students"
              description="Book appointments, access medical records, order medicines, and manage your health journey."
              bgColor="bg-[#FDF7F2]"
              iconColor="bg-[#F68B1F]"
            />
            <RoleCard
              icon={Stethoscope}
              title="Healthcare Staff"
              description="Manage appointments, update patient records, process pharmacy orders, and provide care."
              bgColor="bg-[#FDF7F2]"
              iconColor="bg-[#e67a12]"
            />
            <RoleCard
              icon={ShieldCheck}
              title="Administrators"
              description="View analytics, manage users, oversee operations, and ensure quality healthcare delivery."
              bgColor="bg-[#FDF7F2]"
              iconColor="bg-[#F68B1F]"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* <section id="about" className="py-20 bg-gradient-to-br from-[#F68B1F] to-[#e67a12] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-4 bg-white/20 text-white border-white/30">
                  About UIU HealthCare
                </Badge>
                <h2 className="text-3xl md:text-4xl mb-6">
                  Committed to Your Well-being
                </h2>
                <p className="text-lg mb-6 text-white/90">
                  The UIU HealthCare Portal is United International University's comprehensive
                  digital health management platform, designed to provide seamless healthcare
                  services to our entire university community.
                </p>
                <p className="text-white/90 mb-8">
                  Built with modern technology and security best practices, our platform ensures
                  that your health information is protected while providing you with easy access
                  to essential healthcare services.
                </p>
                <div className="space-y-3">
                  <BenefitItem text="Secure role-based authentication" />
                  <BenefitItem text="HIPAA-compliant data protection" />
                  <BenefitItem text="24/7 platform availability" />
                  <BenefitItem text="Mobile-responsive design" />
                </div>
              </div>
              <div className="space-y-4">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <Heart className="h-8 w-8 text-white mb-3" />
                    <h3 className="text-xl mb-2">Our Mission</h3>
                    <p className="text-white/90">
                      To provide accessible, efficient, and secure healthcare services to all UIU
                      community members through innovative digital solutions.
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6">
                    <Activity className="h-8 w-8 text-white mb-3" />
                    <h3 className="text-xl mb-2">Our Vision</h3>
                    <p className="text-white/90">
                      To be the leading university healthcare platform that sets the standard for
                      digital health management in educational institutions.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-2 border-[#F68B1F] bg-[#FDF7F2]">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-[#F68B1F] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl text-[#1A1A1A] mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-[#4B4B4B] mb-8 max-w-2xl mx-auto">
                Join hundreds of UIU students and staff who are already managing their health
                through our secure digital platform.
              </p>
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-[#F68B1F] hover:bg-[#e67a12]">
                    Go to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button size="lg" className="bg-[#F68B1F] hover:bg-[#e67a12]">
                    Login to Your Portal
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <LandingFooter />
    </div>
  );
};

// Helper Components
// interface StatCardProps {
//   number: string;
//   label: string;
// }

// const StatCard: React.FC<StatCardProps> = ({ number, label }) => {
//   return (
//     <div className="text-center">
//       <div className="text-2xl md:text-3xl mb-1">{number}</div>
//       <div className="text-sm text-white/80">{label}</div>
//     </div>
//   );
// };

interface FeatureCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, color }) => {
  return (
    <Card className="border border-[#E5E5E5] hover:shadow-lg transition-shadow hover:border-[#F68B1F]/50">
      <CardContent className="p-6">
        <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center mb-4`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        <h3 className="text-xl mb-3 text-[#1A1A1A]">{title}</h3>
        <p className="text-[#4B4B4B]">{description}</p>
      </CardContent>
    </Card>
  );
};

// interface ServiceCardProps {
//   image: string;
//   icon: React.ElementType;
//   title: string;
//   description: string;
//   features: string[];
// }

// const ServiceCard: React.FC<ServiceCardProps> = ({
//   image,
//   icon: Icon,
//   title,
//   description,
//   features,
// }) => {
//   return (
//     <Card className="overflow-hidden border border-[#E5E5E5] hover:shadow-xl transition-shadow">
//       <div className="relative h-48">
//         <ImageWithFallback src={image} alt={title} className="w-full h-full object-cover" />
//         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
//         <div className="absolute bottom-4 left-4">
//           <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
//             <Icon className="h-6 w-6 text-[#F68B1F]" />
//           </div>
//         </div>
//       </div>
//       <CardContent className="p-6">
//         <h3 className="text-xl mb-3 text-[#1A1A1A]">{title}</h3>
//         <p className="text-[#4B4B4B] mb-4">{description}</p>
//         <ul className="space-y-2">
//           {features.map((feature, index) => (
//             <li key={index} className="flex items-start gap-2 text-sm text-[#4B4B4B]">
//               <CheckCircle className="h-4 w-4 text-[#F68B1F] mt-0.5 flex-shrink-0" />
//               <span>{feature}</span>
//             </li>
//           ))}
//         </ul>
//       </CardContent>
//     </Card>
//   );
// };

interface RoleCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  bgColor: string;
  iconColor: string;
}

const RoleCard: React.FC<RoleCardProps> = ({
  icon: Icon,
  title,
  description,
  bgColor,
  iconColor,
}) => {
  return (
    <Card className={`${bgColor} border-0`}>
      <CardContent className="p-8 text-center">
        <div className={`w-16 h-16 ${iconColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        <h3 className="text-xl mb-3 text-[#1A1A1A]">{title}</h3>
        <p className="text-[#4B4B4B]">{description}</p>
      </CardContent>
    </Card>
  );
};

// interface BenefitItemProps {
//   text: string;
// }

// const BenefitItem: React.FC<BenefitItemProps> = ({ text }) => {
//   return (
//     <div className="flex items-center gap-3">
//       <CheckCircle className="h-5 w-5 text-white flex-shrink-0" />
//       <span className="text-white/90">{text}</span>
//     </div>
//   );
// };

export default HomePage;