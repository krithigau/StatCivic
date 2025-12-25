import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CitizenDashboard() {
  const [grievances, setGrievances] = useState([]);
  const navigate = useNavigate();
  const userMobile = localStorage.getItem('user_mobile'); 

  useEffect(() => {
    if (!userMobile) {
      navigate('/'); 
    } else {
      fetchUserGrievances();
    }
  }, [userMobile]);

  const fetchUserGrievances = async () => {
    try {
      // Use the smart search query we fixed earlier
      const response = await axios.get(`http://localhost:3000/api/grievances?mobileNumber=${userMobile}`);
      setGrievances(response.data);
    } catch (err) {
      console.error("Failed to load tickets:", err);
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem('user_mobile');
      localStorage.removeItem('token');
      navigate('/');
    }
  };

  // --- NEW: DELETE FUNCTION ---
  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Prevents opening the details page when clicking delete
    
    if (window.confirm("Are you sure you want to delete this ticket? This cannot be undone.")) {
      try {
        await axios.delete(`http://localhost:3000/api/grievances/${id}`);
        // Remove it from the list instantly without reloading
        setGrievances(grievances.filter(item => item._id !== id));
      } catch {
        alert("Failed to delete ticket");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-black text-[#8B1E3F] uppercase tracking-tighter">
              Tamil Nadu Grievance Portal
            </h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">
              Active Tickets for {userMobile}
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={handleLogout} className="px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest border border-gray-200 text-gray-500 hover:bg-gray-100 transition-all">
              Logout
            </button>
            <button onClick={() => navigate('/submit-grievance')} className="bg-[#8B1E3F] text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-[#6b1731] transition-all">
              + File New Complaint
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
           {['Total', 'Open', 'In Progress', 'Closed'].map((status, idx) => (
             <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
               <h3 className="text-3xl font-black text-gray-800">
                 {status === 'Total' 
                   ? grievances.length 
                   : grievances.filter(g => {
                       if(status === 'Open') return g.status === 'Pending' || g.status === 'Reopened';
                       if(status === 'Closed') return g.status === 'Resolved' || g.status === 'Closed';
                       return g.status === status;
                     }).length
                 }
               </h3>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">{status}</p>
             </div>
           ))}
        </div>

        {/* Grievance List Section */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 min-h-[300px] p-8">
          {grievances.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-300">
              <p className="text-xs font-bold uppercase tracking-widest">No history found for this identifier.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {grievances.map((item) => (
                <div 
                  key={item._id} 
                  onClick={() => navigate(`/grievance/${item._id}`)}
                  className="p-6 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all flex justify-between items-center cursor-pointer group"
                >
                  <div>
                    <h3 className="font-bold text-gray-800 text-sm mb-1 group-hover:text-[#8B1E3F] transition-colors">
                      {item.description}
                    </h3>
                    <div className="flex gap-2">
                       <span className="bg-gray-100 text-gray-500 text-[10px] font-black px-2 py-1 rounded uppercase">
                         {item.department || "General"}
                       </span>
                       <span className="text-[10px] text-gray-400 font-mono py-1">
                         {new Date(item.createdAt).toLocaleDateString()}
                       </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      item.status === 'Resolved' ? 'bg-green-100 text-green-600' : 
                      item.status === 'Reopened' ? 'bg-purple-100 text-purple-600' : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {item.status}
                    </span>

                    {/* NEW: DELETE BUTTON (Only shows for user to clean up) */}
                    <button 
                      onClick={(e) => handleDelete(e, item._id)}
                      className="p-2 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                      title="Delete Ticket"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CitizenDashboard;