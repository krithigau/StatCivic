import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

function AdminDashboard() {
  const [grievances, setGrievances] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  
  // FIX: This "activeTab" state controls which screen is visible
  const [activeTab, setActiveTab] = useState('grievances'); 
  
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/grievances');
      const data = response.data;
      setGrievances(data);
      processChartData(data);
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const processChartData = (data) => {
    // 1. Dept Data
    const deptCounts = {};
    data.forEach(g => {
      const dept = g.department || "Unassigned";
      deptCounts[dept] = (deptCounts[dept] || 0) + 1;
    });
    const dData = Object.keys(deptCounts).map(key => ({ name: key, value: deptCounts[key] }));
    setDeptData(dData);

    // 2. Priority Data
    const prioCounts = { High: 0, Medium: 0, Low: 0, Critical: 0 };
    data.forEach(g => {
      const p = g.priority || "Medium";
      if (prioCounts[p] !== undefined) prioCounts[p]++;
    });
    setPriorityData([
      { name: 'Critical', count: prioCounts.Critical },
      { name: 'High', count: prioCounts.High },
      { name: 'Medium', count: prioCounts.Medium },
      { name: 'Low', count: prioCounts.Low },
    ]);
  };

  const markResolved = async (e, id) => {
    e.stopPropagation(); 
    try {
      await axios.put(`http://localhost:3000/api/grievances/${id}`, { status: 'Resolved' });
      fetchGrievances(); 
    } catch {
      alert("Failed to update status");
    }
  };

  const handleLogout = () => {
    if (window.confirm("Logout Admin Session?")) {
      localStorage.clear();
      navigate('/'); 
    }
  };

  // Helper Styles
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#8B1E3F'];
  const getDeptBadge = (dept) => {
    const colors = ['bg-blue-50 text-blue-600', 'bg-purple-50 text-purple-600', 'bg-teal-50 text-teal-600'];
    const idx = (dept?.length || 0) % colors.length;
    return colors[idx];
  };
  const getPriorityBadge = (p) => {
    const styles = {
      'Critical': 'bg-red-100 text-red-700 border-red-200',
      'High': 'bg-orange-100 text-orange-700 border-orange-200',
      'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Low': 'bg-gray-100 text-gray-600 border-gray-200'
    };
    return styles[p] || styles['Medium'];
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex">
      
      {/* --- SIDEBAR WITH WORKING BUTTONS --- */}
      <div className="w-64 bg-[#1e1e2f] text-white min-h-screen flex flex-col fixed left-0 top-0 z-50">
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#8B1E3F] rounded-lg flex items-center justify-center font-bold text-lg">SC</div>
          <h1 className="text-xl font-bold tracking-wider">StatCivic</h1>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {/* Button 1: Grievances Table */}
          <div 
            onClick={() => setActiveTab('grievances')}
            className={`px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 cursor-pointer transition-all ${
              activeTab === 'grievances' ? 'bg-[#8B1E3F] shadow-lg' : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            <span>📂</span> All Grievances
          </div>

          {/* Button 2: Analytics Charts */}
          <div 
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 cursor-pointer transition-all ${
              activeTab === 'analytics' ? 'bg-[#8B1E3F] shadow-lg' : 'text-gray-400 hover:bg-gray-800'
            }`}
          >
            <span>📊</span> Analytics
          </div>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl text-sm font-bold transition-all">
            <span>🚪</span> Logout Admin
          </button>
        </div>
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 ml-64 p-10">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {activeTab === 'grievances' ? 'Administrative Control Panel' : 'Data Analytics Dashboard'}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">System Online</span>
            </div>
          </div>
        </div>

        {/* Stats Row (Always Visible) */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Total Issues</h3>
            <p className="text-4xl font-black text-gray-800">{grievances.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-red-100 border-l-4 border-l-red-500">
            <h3 className="text-red-400 text-xs font-bold uppercase tracking-widest mb-2">Critical Priority</h3>
            <p className="text-4xl font-black text-red-600">
              {grievances.filter(g => g.priority === 'Critical' || g.priority === 'High').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 border-l-4 border-l-green-500">
            <h3 className="text-green-400 text-xs font-bold uppercase tracking-widest mb-2">Resolved</h3>
            <p className="text-4xl font-black text-green-600">
              {grievances.filter(g => g.status === 'Resolved').length}
            </p>
          </div>
        </div>

        {/* --- CONDITIONAL RENDERING --- */}
        
        {/* VIEW 1: ANALYTICS CHARTS */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-2 gap-6 mb-8 animate-fade-in-up">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-gray-800 font-bold text-sm uppercase tracking-wider mb-4">Grievances by Department</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={deptData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                      {deptData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h3 className="text-gray-800 font-bold text-sm uppercase tracking-wider mb-4">Issue Severity Analysis</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={priorityData}>
                    <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="count" fill="#8B1E3F" radius={[4, 4, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: GRIEVANCES TABLE */}
        {activeTab === 'grievances' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fade-in-up">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-40">Citizen Mobile</th>
                  <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Grievance Details</th>
                  <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-48">Assigned Dept</th>
                  <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-32">Priority</th>
                  <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest w-40 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {grievances.length === 0 ? (
                  <tr><td colSpan="5" className="p-8 text-center text-gray-400">No active grievances found.</td></tr>
                ) : (
                  grievances.map((item) => (
                    <tr 
                      key={item._id} 
                      onClick={() => navigate(`/admin-grievance/${item._id}`)}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="p-5 align-top">
                        <div className="font-bold text-gray-700 text-sm">{item.citizenContact}</div>
                        <div className="text-[10px] text-gray-400 font-mono mt-1">ID: ...{item._id.slice(-4)}</div>
                      </td>
                      <td className="p-5 align-top">
                        <p className="text-sm text-gray-600 font-medium leading-relaxed">{item.description}</p>
                        {item.reopenReason && item.status === 'Reopened' && (
                          <div className="mt-2 p-2 bg-purple-50 text-purple-700 text-xs rounded border border-purple-100 italic">
                            "Reason: {item.reopenReason}"
                          </div>
                        )}
                        <span className="inline-block mt-2 text-[10px] bg-gray-100 text-gray-400 px-2 py-1 rounded">
                          {new Date(item.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="p-5 align-top">
                        <span className={`px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wide ${getDeptBadge(item.department)}`}>
                          {item.department}
                        </span>
                      </td>
                      <td className="p-5 align-top">
                        <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-wide ${getPriorityBadge(item.priority)}`}>
                          {item.priority || "Medium"}
                        </span>
                      </td>
                      <td className="p-5 align-top text-right">
                        {item.status === 'Resolved' ? (
                          <span className="flex items-center justify-end gap-1 text-green-600 font-bold text-xs uppercase tracking-wider">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            Closed
                          </span>
                        ) : item.status === 'Reopened' ? (
                          <div className="flex flex-col items-end gap-2">
                             <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest border border-purple-200 animate-pulse">
                               ⚠️ Reopened
                             </span>
                             <button onClick={(e) => markResolved(e, item._id)} className="text-[#8B1E3F] underline text-[10px] font-bold uppercase hover:text-red-700">
                               Resolve Again
                             </button>
                          </div>
                        ) : (
                          <button onClick={(e) => markResolved(e, item._id)} className="bg-[#8B1E3F] text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#6b1731] transition-all shadow-md active:scale-95">
                            Mark Resolved
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;