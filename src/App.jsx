import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PrivateRoutes from './Utils/PrivateRoutes';
import Room from './Pages/Room';
// import LoginPage from './Pages/LoginPage';
import LoginPage from './Pages/LoginPage';
import RegisterPage from './Pages/RegisterPage';
import { AuthProvider } from './Utils/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Room />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
