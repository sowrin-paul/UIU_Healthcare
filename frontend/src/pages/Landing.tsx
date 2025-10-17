import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Button, Card } from "../components/ui";

const Landing: React.FC = () => {
  const navigate = useNavigate(); // Router navigation

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar user={{ name: "Guest" } as any} onLogout={() => {}} />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20 bg-gradient-to-b from-blue-100 to-white">
        <h1 className="text-4xl md:text-5xl font-bold text-blue-700 mb-4">
          Welcome to UIU Healthcare
        </h1>
        <p className="text-gray-600 max-w-2xl mb-8">
          Empowering healthcare through technology — manage patients, appointments,
          and reports effortlessly.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/auth/register")}>Get Started</Button>
          <Button variant="outline" onClick={() => navigate("/auth/login")}>Login</Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 py-16 bg-white">
        <Card className="p-6 text-center shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Patients</h3>
          <p className="text-gray-600">
            Access prescriptions, book appointments, and view your medical records
            in one place.
          </p>
          <Button onClick={() => navigate("/auth/register")}>Learn More</Button>
        </Card>

        <Card className="p-6 text-center shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Doctors</h3>
          <p className="text-gray-600">
            Manage appointments, consult online, and view patient details easily.
          </p>
          <Button onClick={() => navigate("/auth/register")}>Learn More</Button>
        </Card>

        <Card className="p-6 text-center shadow-md">
          <h3 className="text-xl font-semibold mb-2 text-blue-600">Admins</h3>
          <p className="text-gray-600">
            Monitor activities, manage users, and ensure smooth operation of the
            healthcare system.
          </p>
          <Button onClick={() => navigate("/auth/register")}>Learn More</Button>
        </Card>
      </section>

      {/* CTA Section */}
      <section className="flex flex-col items-center text-center py-20 bg-blue-50">
        <h2 className="text-3xl font-semibold mb-4 text-blue-700">
          Join the UIU Healthcare Network
        </h2>
        <p className="text-gray-600 mb-8 max-w-lg">
          Whether you're a doctor, patient, or admin — UIU Healthcare connects
          everyone in a seamless experience.
        </p>
        <Button onClick={() => navigate("/auth/register")}>Register Now</Button>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Landing;
