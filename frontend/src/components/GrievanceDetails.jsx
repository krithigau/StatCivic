import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function GrievanceDetails() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [grievance, setGrievance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetails();
  });

  const fetchDetails = async () => {
    try {
      // 1. Fetch all tickets and find the right one
      const response = await axios.get(`http://localhost:3000/api/grievances`); 
      const found = response.data.find(g => g._id === id);
      setGrievance(found);
      setLoading(false);
    } catch (err) {
      console.error("Error loading details:", err);
      setLoading(false);
    }
  };

  // 2. Logic to Reopen the ticket
  const handleReopen = async () => {
    const reason = window.prompt("Please state the reason for reopening this ticket:");
    if (!reason) return;
    try {
      await axios.put(`http://localhost:3000/api/grievances/${id}`, {
        status: "Reopened",
        reopenReason: reason
      });
      alert("Ticket has been reopened!");
      fetchDetails(); // Refresh the page to show new status
    } catch {
      alert("Failed to reopen ticket");
    }
  };

  if (loading) return <div className="p-10 text-center">Loading details...</div>;
  if (!grievance) return <div className="p-10 text-center">Grievance not found.</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center font-sans">
      <div className="max-w-2xl w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        
        <button 
          onClick={() => navigate('/dashboard')}
          className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-6 hover:text-[#8B1E3F]"
        >
          ← Back to Dashboard
        </button>

        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-black text-[#8B1E3F] uppercase tracking-tighter">
            Issue Details
          </h1>
          <span className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider ${
            grievance.status === 'Resolved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
          }`}>
            {grievance.status}
          </span>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-gray-50 rounded-2xl">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Description</h3>
            <p className="font-medium text-gray-800">{grievance.description}</p>
          </div>

          {/* FIX: Removed 'AI Category', kept only Department */}
          <div className="p-4 border border-gray-100 rounded-xl">
            <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Assigned Department</h3>
            <p className="font-bold text-gray-700">{grievance.department}</p>
          </div>
          
          <div className="p-4 border border-gray-100 rounded-xl">
             <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Ticket ID</h3>
             <p className="font-mono text-xs text-gray-500">{grievance._id}</p>
          </div>

          {/* FIX: REOPEN OPTION - Only shows if status is NOT 'Pending' */}
          {grievance.status !== 'Pending' && grievance.status !== 'In Progress' && (
            <button 
              onClick={handleReopen}
              className="w-full py-4 rounded-xl bg-gray-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-gray-800 transition-all"
            >
              Reopen This Ticket
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default GrievanceDetails;