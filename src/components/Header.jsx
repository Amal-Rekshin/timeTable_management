export default function Header({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📖' },
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'manage', label: 'Timetable', icon: '🗓️' },
  ];

  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-4 px-8 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4">
      <div>
        <h1 className="text-2xl font-black tracking-tight uppercase">College Staff Allocation</h1>
        <p className="text-xs opacity-80 font-medium">Workload Management System • Powered by Spark Team🔥</p>
      </div>

      <nav className="flex bg-white/10 p-1 rounded-xl backdrop-blur-sm border border-white/10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${activeTab === tab.id
                ? 'bg-white text-blue-800 shadow-md'
                : 'hover:bg-white/10 text-white/80'
              }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
