import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function VerifyOtp() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const navigate = useNavigate();
  const mobileNumber = localStorage.getItem('temp_mobile');

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) element.nextSibling.focus();
  };

  const handleVerify = async () => {
    try {
      // 1. Join the array into a single string (e.g., "5821")
      const enteredOtp = otp.join("");
      
      console.log("📤 Sending for Verification:", { mobileNumber, otp: enteredOtp });

      const response = await axios.post('http://localhost:3000/api/auth/verify-otp', {
        mobileNumber,
        otp: enteredOtp // Send as string
      });

      // 2. Success! Save data and redirect
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user_mobile', mobileNumber);
      localStorage.setItem('user_role', role);
      
      alert("Login Successful!"); // Optional feedback
      
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/dashboard');
      }
      
    } catch (err) {
      // 3. Improve Error Logging
      console.error("❌ Verification Failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Invalid OTP or Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#8B1E3F] p-4 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-sm text-center">
        <h2 className="text-3xl font-black text-[#8B1E3F] mb-2 uppercase tracking-tighter">Verify OTP</h2>
        <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-8">
          Sent to {mobileNumber}
        </p>

        <div className="flex justify-center gap-3 mb-8">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              className="w-12 h-16 border-2 border-gray-100 rounded-xl text-center text-2xl font-black text-gray-700 focus:border-[#8B1E3F] focus:outline-none transition-all"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onFocus={(e) => e.target.select()}
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-[#8B1E3F] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-[#6b1731] transition-transform active:scale-95"
        >
          Verify & Proceed
        </button>
      </div>
    </div>
  );
}

export default VerifyOtp;