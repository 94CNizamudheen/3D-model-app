



import { Menu, X } from 'lucide-react';

const Sidebar = ({ open, setOpen, activeTab, setActiveTab }) => (
  <aside className={`${open ? 'w-80' : 'w-16'} transition-all duration-300 bg-black/20 border-r border-purple-500/20`}>
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        {open && (
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Model Dashboard
          </h2>
        )}
        <button onClick={() => setOpen(!open)} className="p-2 hover:bg-purple-900/20 rounded-lg">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav className="space-y-2">
          {['dashboard', 'viewer'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-lg ${
                activeTab === tab
                  ? 'bg-purple-900/30 text-purple-300 border border-purple-500/20'
                  : 'text-purple-400 hover:bg-purple-900/20 hover:text-purple-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      )}
    </div>
  </aside>
);

export default Sidebar;
