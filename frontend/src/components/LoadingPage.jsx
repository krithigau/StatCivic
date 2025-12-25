import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navbar */}
      <nav className="bg-[#8B1E3F] text-white p-4 flex justify-between items-center px-8">
        <div className="flex items-center gap-2">
          <div className="bg-white text-[#8B1E3F] rounded-full w-8 h-8 flex items-center justify-center font-bold">TN</div>
          <span className="font-bold uppercase tracking-tight">Tamil Nadu Grievance Portal</span>
        </div>
        <Link to="/login" className="text-sm hover:underline">Sign In</Link>
      </nav>

      {/* Hero Section */}
      <header className="bg-[#8B1E3F] text-white py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold leading-tight mb-4">Your Voice Matters. <br /> We Listen & Act.</h1>
          <p className="text-lg opacity-80 mb-8 max-w-xl">File your grievance, track its progress, and get resolution from Tamil Nadu Government departments - all in one place.</p>
          <div className="flex gap-4">
            <Link to="/submit" className="bg-[#FFC107] text-black px-6 py-3 rounded-md font-bold hover:bg-yellow-400">File a Complaint →</Link>
            <Link to="/login" className="border border-white/30 px-6 py-3 rounded-md font-medium hover:bg-white/10">Track Your Complaint</Link>
          </div>
        </div>
      </header>

      {/* Stats & Departments Grid */}
      <section className="py-16 px-8 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-bold mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-20">
          <div className="p-6">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="font-bold mb-2">1. Submit</h3>
            <p className="text-sm text-gray-500">File your complaint with details. Our AI routes it automatically.</p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-4">🕒</div>
            <h3 className="font-bold mb-2">2. Track</h3>
            <p className="text-sm text-gray-500">Monitor status in real-time and get updates.</p>
          </div>
          <div className="p-6">
            <div className="text-3xl mb-4">✅</div>
            <h3 className="font-bold mb-2">3. Resolve</h3>
            <p className="text-sm text-gray-500">Issue resolved? satisfied? Easily reopen within 7 days.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Metro Water', 'TANGEDCO', 'Highways', 'Sanitation', 'Health', 'Transport', 'Police', 'Others'].map(dept => (
            <div key={dept} className="border p-6 rounded-lg text-center hover:shadow-md transition cursor-default">
              <span className="text-xs font-bold text-gray-400 block mb-2">{dept}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
export default LandingPage;