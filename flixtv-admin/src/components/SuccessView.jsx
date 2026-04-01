import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Activity, UserCheck, ShieldCheck, Cpu, Menu, Zap } from 'lucide-react';
import Sidebar from './Sidebar'; // Sidebar import kiya

const SuccessView = ({ user, dispatch }) => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed inset-0 w-screen h-screen bg-[#050505] text-slate-200 overflow-hidden font-sans flex">
      
      {/* --- SIDEBAR COMPONENT --- */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isMobileMenuOpen={isMobileMenuOpen} 
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        dispatch={dispatch}
      />

      {/* --- MAIN VIEWPORT --- */}
      <main className="flex-1 flex flex-col h-full min-w-0">
        
        {/* HEADER */}
        <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-white/5 bg-[#050505]/80 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden p-2 bg-white/5 rounded-lg text-purple-500 hover:bg-white/10 transition-colors"
            >
              <Menu size={20}/>
            </button>
            <div className="relative w-48 md:w-80 group hidden sm:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-purple-500" size={14} />
              <input 
                type="text" 
                placeholder="Search Terminal..." 
                className="w-full bg-[#111] border border-white/5 rounded-full py-2.5 pl-11 pr-4 text-xs focus:outline-none focus:border-purple-500/50 transition-all text-white placeholder:text-slate-600" 
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className="text-right hidden xs:block leading-tight">
              <p className="text-sm font-bold text-white uppercase tracking-tighter">{user.username}</p>
              <p className="text-[9px] text-green-500 font-mono tracking-widest mt-1">● ROOT_ADMIN</p>
            </div>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center font-black text-white shadow-lg shadow-purple-600/20 text-sm">
              {user.username?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <div className="w-full space-y-10">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                  {activeTab.replace(' ', '_').toUpperCase()}
                </h1>
                <p className="text-slate-500 text-sm font-medium tracking-tight">Real-time node metrics and operational logs.</p>
              </div>
              <div className="flex bg-[#111] p-1 rounded-xl border border-white/5 self-start">
                 <button className="px-5 py-2 bg-purple-600 text-white text-[10px] font-black rounded-lg shadow-lg uppercase tracking-wider">LIVE</button>
                 <button className="px-5 py-2 text-slate-500 text-[10px] font-black hover:text-white uppercase tracking-wider">HISTORY</button>
              </div>
            </div>

            {/* STATS SECTION */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[
                { t: 'Network Load', v: '2.4 GB/s', i: <Activity className="text-blue-500" size={24} /> },
                { t: 'Active Sessions', v: '18,402', i: <UserCheck className="text-purple-500" size={24} /> },
                { t: 'Server Health', v: '99.9%', i: <ShieldCheck className="text-emerald-500" size={24} /> },
              ].map((card, i) => (
                <motion.div key={i} whileHover={{ y: -5 }} className="bg-[#0c0c0c] border border-white/5 p-8 rounded-[32px] flex items-center gap-6 shadow-2xl hover:border-purple-500/20 transition-all group">
                  <div className="h-16 w-16 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-white/10 transition-colors">
                    {card.i}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[3px] mb-1">{card.t}</h4>
                    <p className="text-3xl font-black text-white tracking-tight leading-none">{card.v}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* TERMINAL EVENTS SECTION (Same as before) */}
            <section className="bg-[#0c0c0c] border border-white/5 rounded-[40px] p-8 md:p-10 shadow-2xl overflow-hidden">
               {/* ... (Previous logs table code) */}
               <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-3 italic uppercase tracking-tighter">
                  <Cpu size={22} className="text-purple-500" /> Terminal_Events
                </h3>
              </div>
              <div className="space-y-4">
                {[1,2,3,4].map((item) => (
                  <div key={item} className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-[#111]/30 border border-white/5 rounded-2xl hover:bg-[#111]/50 transition-all group gap-4">
                     <div className="flex items-center gap-5">
                       <div className="h-12 w-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform shrink-0">
                         <Zap size={18} />
                       </div>
                       <div className="min-w-0">
                         <p className="text-sm font-bold text-white uppercase tracking-tight truncate">Api_Gateway_Response_Auth</p>
                         <p className="text-[10px] text-slate-500 font-mono mt-1">Packet ID: #RT-00{item}</p>
                       </div>
                     </div>
                     <span className="text-[10px] font-black text-green-500 bg-green-500/10 px-4 py-1.5 rounded-full border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)] uppercase">Success</span>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default SuccessView;