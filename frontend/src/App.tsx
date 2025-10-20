import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />

          {/* Global Toaster */}
          <Toaster />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
