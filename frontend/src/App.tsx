

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Import pages
import Register from './pages/auth/Register';
import EmailVerification from './pages/auth/EmailVerification';
import Login from './pages/auth/Login';

// Import UI components
import { Toaster } from './components/ui/toaster';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Routes>
                        {/* Auth Routes */}
                        <Route path="/auth/register" element={<Register />} />
                        <Route path="/auth/verify-email" element={<EmailVerification />} />
                        {/* <Route path="/auth/login" element={<Login />} /> */}

                        {/* Default redirect */}
                        <Route path="/" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>

                    {/* Global Toaster */}
                    <Toaster />
                </div>
            </Router>
        </Provider>
    );
}

export default App
