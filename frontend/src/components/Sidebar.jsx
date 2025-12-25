import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Logout Admin Session?")) {
      localStorage.clear();
      navigate('/');
    }
  };

  return (
    <div className="w-64 bg-[#1e1e2f] text-white min-h-screen flex flex-col fixed left-0 top-0 z-50">
      {/* Brand Logo area */}
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-[#8B1E3F] rounded-lg flex items-center justify-center font-bold text-lg">
          SC
        </div>
        <h1 className="text-xl font-bold tracking-wider">StatCivic</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-2">
        <div className="px-4 py-3 bg-[#8B1E3F] rounded-xl text-sm font-bold flex items-center gap-3 shadow-lg cursor-pointer">
          <span>📂</span> All Grievances
        </div>
        <div className="px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl text-sm font-bold flex items-center gap-3 transition-all cursor-pointer">
          <span>📊</span> Analytics
        </div>
        <div className="px-4 py-3 text-gray-400 hover:bg-gray-800 hover:text-white rounded-xl text-sm font-bold flex items-center gap-3 transition-all cursor-pointer">
          <span>🏢</span> Departments
        </div>
      </nav>

      {/* Logout Button at bottom */}
      <div className="p-4 border-t border-gray-700">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-xl text-sm font-bold transition-all"
        >
          <span>🚪</span> Logout Admin
        </button>
      </div>
    </div>
  );
}

export default Sidebar;