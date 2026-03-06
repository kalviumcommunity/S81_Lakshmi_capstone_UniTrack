import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import StudentDashboard from './pages/StudentDashboard';
import FacultyDashboard from './pages/FacultyDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';
import WaterDropCursor from './components/WaterDropCursor';
import './App.css';

const AppLayout = () => {
  const { user } = useAuth();
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      <WaterDropCursor />
      <div className={`app-container ${isAuthPage ? 'auth-layout' : ''}`}>
        {user && !isAuthPage && <Sidebar />}
        <div className={isAuthPage ? 'auth-content' : 'main-content'}>
          <Routes>
            <Route path="/login" element={!user ? <Login /> : <Navigate to={`/${user.role}`} />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to={`/${user.role}`} />} />

            <Route element={<ProtectedRoute allowedRoles={['student', 'faculty', 'admin']} />}>
              <Route path="/" element={<Navigate to="/student" replace />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['student']} />}>
              <Route path="/student" element={<StudentDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['faculty']} />}>
              <Route path="/faculty" element={<FacultyDashboard />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
