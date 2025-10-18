import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/auth/Register";
import EmailVerification from "./pages/auth/EmailVerification";
import Login from "./pages/auth/Login";
import HomePage from "./pages/Landing";
import { Toaster } from "./components/ui/toaster";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import StaffDashboard from "./pages/dashboard/StaffDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

// Import Auth Context
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<HomePage />} />

            {/* Auth Routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/auth/verify-email" element={<EmailVerification />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard/student" element={<StudentDashboard />} />
            <Route path="/dashboard/staff" element={<StaffDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />


          </Routes>

          {/* Global Toaster */}
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
