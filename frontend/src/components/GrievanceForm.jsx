import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GrievanceForm() {
  const navigate = useNavigate();
  const storedMobile = localStorage.getItem('user_mobile');

  // 1. Define Categories explicitly
  const DEPARTMENTS = [
    "General Administration",
    "Electricity Board",
    "Metro Water & Sewage",
    "Sanitation (Garbage)",
    "Roads & Highways",
    "Traffic & Police",
    "Public Health",
    "Public Transport"
  ];

  const [formData, setFormData] = useState({
    citizenContact: storedMobile || '', 
    description: '',
    department: 'General Administration' // Default
  });

  useEffect(() => {
    if (!storedMobile) {
      alert("Please login first");
      navigate('/');
    }
  }, [storedMobile, navigate]);

  // --- 2. THE SMART LOGIC (Runs as you type) ---
  const detectDepartment = (text) => {
    const t = text.toLowerCase();
    
    // Massive Keyword List (Idea 2 implemented here)
    if (t.match(/light|current|power|electric|pole|wire|shock|fuse|meter|voltage|dark/)) return "Electricity Board";
    if (t.match(/water|pipe|leak|sewage|drain|supply|tank|overflow|drinking|thirst/)) return "Metro Water & Sewage";
    if (t.match(/garbage|waste|dustbin|trash|smell|stink|clean|dump|rubbish|bin/)) return "Sanitation (Garbage)";
    if (t.match(/road|pothole|street|highway|tar|bump|bridge|lane|path|repair/)) return "Roads & Highways";
    if (t.match(/theft|crime|police|traffic|signal|parking|stolen|safe|fight|jam|fine/)) return "Traffic & Police";
    if (t.match(/mosquito|dengue|malaria|hospital|doctor|clinic|health|poison|food|sick/)) return "Public Health";
    if (t.match(/bus|driver|ticket|conductor|stop|route|fare|transport/)) return "Public Transport";
    
    return "General Administration"; // Fallback
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'description') {
      // Auto-update department based on description
      const detected = detectDepartment(value);
      // Only auto-switch if the user hasn't manually selected something else yet (optional UX choice)
      // For now, let's just update it live to show the "AI" effect
      setFormData(prev => ({ ...prev, description: value, department: detected }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleDeptChange = (e) => {
    // Allow user to manually override the AI
    setFormData({ ...formData, department: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the FINAL department (User verified) to backend
      await axios.post('http://localhost:3000/api/grievances', formData);
      alert('Grievance Submitted Successfully!');
      navigate('/dashboard');
    } catch  {
      alert('Submit failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-lg w-full">
        <h2 className="text-2xl font-black text-[#8B1E3F] mb-6 uppercase tracking-tighter">
          File New Complaint
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Registered Mobile
            </label>
            <input
              type="text"
              name="citizenContact"
              value={formData.citizenContact}
              readOnly 
              className="w-full p-4 bg-gray-100 text-gray-500 border border-gray-200 rounded-xl font-bold cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
              Describe the Issue
            </label>
            <textarea
              name="description"
              rows="4"
              className="w-full p-4 bg-gray-50 border-2 border-gray-100 rounded-xl font-medium text-gray-800 focus:border-[#8B1E3F] focus:outline-none"
              placeholder="E.g. Street light not working..."
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* NEW: Department Dropdown (Auto-filled but Editable) */}
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex justify-between">
              <span>Assigned Department</span>
              <span className="text-[#8B1E3F] animate-pulse">AI Suggested</span>
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleDeptChange}
              className="w-full p-4 bg-white border-2 border-[#8B1E3F]/20 rounded-xl font-bold text-gray-700 focus:border-[#8B1E3F] focus:outline-none cursor-pointer"
            >
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <p className="text-[10px] text-gray-400 mt-2">
              * The system auto-detects the department. Change it if incorrect.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-4 rounded-xl font-bold text-xs uppercase tracking-widest text-gray-400 hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#8B1E3F] text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-[#6b1731] active:scale-95"
            >
              Submit Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GrievanceForm;