import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminGrievanceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [grievance, setGrievance] = useState(null);

  useEffect(() => {
    fetchDetails();
  });

  const fetchDetails = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/grievances');
      const found = response.data.find(g => g._id === id);
      setGrievance(found);
    } catch (err) {
      console.error(err);
    }
  };

  if (!grievance) return <div className="p-10 text-center">Loading Case File...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation */}
        <button onClick={() => navigate('/admin-dashboard')} className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6 hover:text-[#8B1E3F]">
          ← Back to Command Center
        </button>

        {/* 1. Header Card */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[#8B1E3F] font-mono text-xs font-bold mb-2">CASE ID: {grievance._id}</p>
              <h1 className="text-3xl font-black text-gray-800 capitalize">{grievance.description}</h1>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Department:</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold uppercase">{grievance.department}</span>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest ${
                grievance.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {grievance.status}
              </span>
              <p className="mt-3 text-[10px] text-gray-400 font-bold uppercase">Priority: {grievance.priority || "Medium"}</p>
            </div>
          </div>
        </div>

        {/* 2. Info Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Reported On</h3>
            <p className="text-lg font-bold text-gray-700">
              📅 {new Date(grievance.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
             <h3 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">Citizen Contact</h3>
             <p className="text-lg font-bold text-gray-700">📞 {grievance.citizenContact}</p>
          </div>
        </div>

        {/* 3. Description Box */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 mb-6">
          <h3 className="text-gray-800 font-bold text-sm uppercase tracking-wider mb-4 border-b pb-2">Issue Description</h3>
          <p className="text-gray-600 leading-relaxed font-medium">
            "{grievance.description}"
          </p>
        </div>

        {/* 4. Activity Timeline (Matches your image style) */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
          <h3 className="text-gray-800 font-bold text-sm uppercase tracking-wider mb-6">Activity Timeline</h3>
          
          <div className="space-y-8 pl-4 border-l-2 border-gray-100 ml-2">
            
            {/* Timeline Item 1: Registered */}
            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-100 border-2 border-blue-500"></div>
              <h4 className="text-sm font-bold text-gray-800">Complaint Registered Successfully</h4>
              <p className="text-xs text-gray-400 mt-1">System • {new Date(grievance.createdAt).toLocaleTimeString()}</p>
            </div>

            {/* Timeline Item 2: Assigned */}
            <div className="relative pl-6">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-100 border-2 border-purple-500"></div>
              <h4 className="text-sm font-bold text-gray-800">Assigned to {grievance.department}</h4>
              <p className="text-xs text-gray-400 mt-1">Automated Routing Engine</p>
            </div>

            {/* Timeline Item 3: Resolved (Conditional) */}
            {grievance.status === 'Resolved' && (
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-100 border-2 border-green-500"></div>
                <h4 className="text-sm font-bold text-green-700">Issue Resolved & Verified</h4>
                <p className="text-xs text-gray-400 mt-1">Field Officer Action</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminGrievanceDetails;