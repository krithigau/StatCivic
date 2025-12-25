import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const departments = [
    { name: 'Metro Water', icon: '💧' },
    { name: 'TANGEDCO', icon: '⚡' },
    { name: 'Highways', icon: '🛣️' },
    { name: 'Sanitation', icon: '🧹' },
    { name: 'Health', icon: '🏥' },
    { name: 'Transport', icon: '🚌' },
    { name: 'Police', icon: '👮' },
    { name: 'Others', icon: '📋' }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      {/* 1. TOP NAV BAR */}
      <nav className="bg-[#8B1E3F] text-white p-4 flex justify-between items-center px-8 shadow-md">
        <div className="flex items-center gap-2">
          <div className="bg-white text-[#8B1E3F] rounded-full w-8 h-8 flex items-center justify-center font-bold">TN</div>
          <span className="font-bold uppercase tracking-tight text-sm">Government of Tamil Nadu</span>
        </div>
        <button onClick={() => navigate('/login')} className="text-xs hover:underline font-bold">Sign In</button>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="bg-[#8B1E3F] text-white py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-black leading-tight mb-6">Your Voice Matters. <br /> We Listen & Act.</h1>
          <p className="text-lg opacity-80 mb-10 max-w-xl font-medium">
            File your grievance, track its progress, and get resolution from state departments—all powered by AI routing.
          </p>
          <div className="flex gap-4">
            <button onClick={() => navigate('/login')} className="bg-[#FFC107] text-black px-8 py-4 rounded-lg font-black shadow-lg hover:bg-yellow-400 transition-all active:scale-95">
              File a Complaint →
            </button>
            <button onClick={() => navigate('/login')} className="border-2 border-white/30 px-8 py-4 rounded-lg font-bold hover:bg-white/10 transition-all">
              Track Your Complaint
            </button>
          </div>
        </div>
      </header>

      {/* 3. HOW IT WORKS */}
      <section className="py-20 px-8 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl font-black mb-16 uppercase tracking-widest text-[#8B1E3F]">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-4xl mb-4 grayscale hover:grayscale-0 transition cursor-default">📄</div>
            <h3 className="font-black text-lg mb-2">1. Submit</h3>
            <p className="text-sm text-gray-500 leading-relaxed">File your complaint with details. Our AI routes it to the right department automatically.</p>
          </div>
          <div>
            <div className="text-4xl mb-4 grayscale hover:grayscale-0 transition cursor-default">🕒</div>
            <h3 className="font-black text-lg mb-2">2. Track</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Monitor your complaint status in real-time. Get SMS updates at every step.</p>
          </div>
          <div>
            <div className="text-4xl mb-4 grayscale hover:grayscale-0 transition cursor-default">✅</div>
            <h3 className="font-black text-lg mb-2">3. Resolve</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Issue resolved? Mark it closed. Not satisfied? Easily reopen within 7 days.</p>
          </div>
        </div>
      </section>

      {/* 4. DEPARTMENTS GRID */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-black mb-12 text-gray-400 uppercase tracking-widest">Connected Departments</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {departments.map(dept => (
              <div key={dept.name} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center gap-3 group hover:border-[#8B1E3F]/30 transition-all">
                <span className="text-2xl group-hover:scale-110 transition">{dept.icon}</span>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-tighter">{dept.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOTER CALL TO ACTION */}
      <footer className="bg-[#8B1E3F] text-white py-16 text-center">
        <h2 className="text-2xl font-black mb-6">Ready to file your grievance?</h2>
        <div className="flex justify-center gap-4">
          <button onClick={() => navigate('/login')} className="bg-[#FFC107] text-black px-10 py-3 rounded-full font-black text-sm uppercase shadow-xl hover:bg-yellow-400 transition">
            Get Started as Citizen
          </button>
          <button onClick={() => navigate('/login')} className="border border-white/30 px-10 py-3 rounded-full font-bold text-sm uppercase hover:bg-white/10 transition">
            Staff Login
          </button>
        </div>
        <p className="mt-12 text-[10px] opacity-40 uppercase tracking-[0.2em]">© 2024 Government of Tamil Nadu</p>
      </footer>
    </div>
  );
}

export default Home;