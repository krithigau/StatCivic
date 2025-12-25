import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [role, setRole] = useState('citizen'); // Defaults to citizen
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      // Send role to backend to verify if the user exists with this role
      const response = await axios.post('http://localhost:3000/api/auth/send-otp', { 
        mobileNumber
      });
      
      alert(`DEMO OTP: ${response.data.otp}`);
      
      // Store the intended role temporarily for the VerifyOtp page
      localStorage.setItem('temp_mobile', mobileNumber);
      //localStorage.setItem('temp_role', role); 
      
      navigate('/verify-otp');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to send OTP. Is your backend running?');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <div className="bg-[#8B1E3F] text-white p-4 flex items-center gap-4 shadow-md">
        <div className="bg-white text-[#8B1E3F] rounded-full w-8 h-8 flex items-center justify-center font-bold">TN</div>
        <h1 className="text-lg font-semibold uppercase tracking-wider">Tamil Nadu Grievance Portal</h1>
      </div>

      <div className="flex-grow flex items-center justify-center p-6">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl border border-gray-100">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
            <p className="text-gray-500 mt-2">Sign in to access the grievance portal</p>
          </div>

          {/* ROLE TOGGLE */}
          
          <div className="bg-gray-100 p-1 rounded-xl flex mb-8">
            <button 
              type="button"
              onClick={() => setRole('citizen')}
              className={`flex-1 py-2.5 rounded-lg transition ${role === 'citizen' ? 'bg-white shadow-md text-gray-900 font-bold' : 'text-gray-400'}`}
            >
              👤 Citizen
            </button>
            <button 
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 py-2.5 rounded-lg transition ${role === 'admin' ? 'bg-white shadow-md text-[#8B1E3F] font-bold' : 'text-gray-400'}`}
            >
              🔒 Admin
            </button>
          </div>

          <form onSubmit={handleSendOtp} className="space-y-6">
            <input
              type="tel"
              placeholder="Enter 10-digit number"
              className="w-full px-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#8B1E3F] outline-none transition-all"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
            <button type="submit" className="w-full bg-[#8B1E3F] text-white py-4 rounded-xl font-bold text-lg shadow-lg active:scale-95 transition-all">
              Continue
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
             <button type="button" className="text-[#8B1E3F] text-sm font-semibold hover:underline">
                Forgot Password or Mobile?
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;