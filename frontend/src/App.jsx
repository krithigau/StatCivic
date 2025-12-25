import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import VerifyOtp from './components/VerifyOtp';
import CitizenDashboard from './components/CitizenDashboard';
import AdminDashboard from './components/AdminDashboard';
import GrievanceForm from './components/GrievanceForm';
import AdminGrievanceDetails from './components/AdminGrievanceDetails';
// --- CRITICAL IMPORT CHECK ---
// Ensure the file 'GrievanceDetails.jsx' exists inside the 'components' folder!
import GrievanceDetails from './components/GrievanceDetails'; 

function App() {
  return (
    <Routes>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-grievance/:id" element={<AdminGrievanceDetails />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      
      {/* Citizen Routes */}
      <Route path="/dashboard" element={<CitizenDashboard />} />
      <Route path="/submit-grievance" element={<GrievanceForm />} />
      
      {/* The Route causing the issue */}
      <Route path="/grievance/:id" element={<GrievanceDetails />} />

      {/* Admin Route */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;