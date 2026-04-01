import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Radio, 
  UserCheck, 
  CircleDollarSign, 
  Settings, 
  LogOut, 
  Zap, 
  X,
  // Naye icons jo add kiye gaye hain
  Clapperboard, 
  Tv, 
  Ghost, 
  Trophy, 
  Smartphone 
} from 'lucide-react';

const Sidebar = ({ 
  activeTab, 
  setActiveTab, 
  isMobileMenuOpen, 
  setIsMobileMenuOpen, 
  dispatch 
}) => {
  
  const menuItems = [
    { n: 'Dashboard', i: <LayoutDashboard size={18}/> },
    { n: 'Movies', i: <Clapperboard size={18}/> }, 
    { n: 'TV Shows', i: <Tv size={18}/> }, 
    { n: 'Anime', i: <Ghost size={18}/> }, 
    { n: 'Sports', i: <Trophy size={18}/> }, 
    { n: 'Short Shows', i: <Smartphone size={18}/> }, 
    { n: 'Live Streams', i: <Radio size={18}/> },
    { n: 'User Management', i: <UserCheck size={18}/> },
    { n: 'Financials', i: <CircleDollarSign size={18}/> },
    { n: 'Settings', i: <Settings size={18}/> },
  ];

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-2 mb-10 shrink-0">
        <div className="h-10 w-10 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
          <Zap className="text-white" size={20} fill="white" />
        </div>
        <span className="text-xl font-black tracking-tighter text-white uppercase italic">
          FLIXTV <span className="text-purple-500 text-[10px] ml-1">CORE</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto custom-scrollbar pr-2">
        {menuItems.map((item) => (
          <button 
            key={item.n} 
            onClick={() => {
              setActiveTab(item.n);
              if(setIsMobileMenuOpen) setIsMobileMenuOpen(false);
            }}
            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
              activeTab === item.n 
              ? 'bg-purple-600/10 border-l-4 border-purple-500 text-white shadow-lg shadow-purple-500/5' 
              : 'text-slate-500 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className={activeTab === item.n ? 'text-purple-500' : ''}>
              {item.i}
            </span>
            <span className="text-sm font-semibold">{item.n}</span>
          </button>
        ))}
      </nav>

      {/* Logout/Terminate */}
      <div className="pt-6 mt-auto shrink-0 border-t border-white/5">
        <button 
          onClick={() => dispatch({type: 'LOGOUT'})} 
          className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-sm"
        >
          <LogOut size={18} />
          <span>TERMINATE</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-72 bg-[#0a0a0a] border-r border-white/5 p-6 shrink-0 h-full">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar with AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[60] lg:hidden"
            />
            {/* Drawer */}
            <motion.aside 
              initial={{ x: '-100%' }} 
              animate={{ x: 0 }} 
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-[#0a0a0a] p-6 flex flex-col z-[70] lg:hidden border-r border-white/10"
            >
              <button 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;