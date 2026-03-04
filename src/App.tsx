import { useState } from 'react';
import { Instagram, Send, Bike, ChevronRight, Crown, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
// Importamos el nuevo componente
import { CatalogoSublimacion } from './components/CatalogoSub'; 
import { CatalogoRotulaciones } from './components/CatalogoRotulaciones';

const DATA = {
  name: "King of Design",
  username: "@KingOfDesign",
  bio: "Especialistas en Rotulaciones de Alto Nivel ✨",
  links: [
    { id: '1', title: 'Rotulaciones & Motos', type: 'motos', icon: Bike, desc: 'Custom Wrapping' },
    // Reemplazamos Makeup por Sublimación
    { id: '2', title: 'Sublimación & Regalos', type: 'sublimacion', icon: LayoutGrid, desc: 'Láminas, Franelas y Mugs' },
    { id: '3', title: 'WhatsApp', type: 'social', icon: Send, url: 'https://wa.me/584146585228', desc: 'Atención VIP' },
    { id: '4', title: 'Instagram King of Design ', type: 'social', icon: Instagram, url: 'https://www.instagram.com/kingsofdesigns_?igsh=Y2Y2azk1ZzJsMjhz', desc: 'Portfolio' },
  ]
};

function App() {
  const [theme] = useState<'dark' | 'light'>('dark');
  const [view, setView] = useState<'links' | 'sublimacion' | 'motos'>('links');

  const getIconStyles = (id: string) => {
    switch (id) {
      case '1': return "bg-yellow-500/10 text-yellow-500"; // Dorado
      case '2': return "bg-yellow-500/10 text-yellow-500"; // Sublimación ahora Dorado
      case '3': return "bg-green-500/10 text-green-400";   // WhatsApp
      case '4': return "bg-pink-500/10 text-pink-400";    // Instagram
      default: return "bg-slate-500/10 text-slate-400";
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#050505] text-white transition-colors duration-700">

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] rounded-full blur-[120px] opacity-15 bg-yellow-900" />
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full blur-[120px] opacity-10 bg-slate-500" />
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6 h-full flex flex-col justify-center items-center">
        <AnimatePresence mode="wait">
          {view === 'links' && (
            <motion.div
              key="links"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full flex flex-col items-center"
            >
              <header className="text-center mb-8">
                <div className="relative w-24 h-24 mx-auto mb-4 group">
                  <div className="absolute inset-0 bg-yellow-500 rounded-full blur-xl opacity-20" />
                  <div className="relative w-full h-full rounded-full border border-yellow-500/30 flex items-center justify-center bg-black">
                    <Crown size={45} className="text-yellow-500 drop-shadow-[0_0_8px_rgba(212,175,55,0.4)]" />
                  </div>
                </div>
                <h1 className="text-3xl font-black tracking-tighter uppercase italic text-center">
                  KING OF <span className="text-yellow-500">DESIGN</span>
                </h1>
                <p className="text-slate-500 font-bold text-[9px] mt-1 tracking-[0.3em] uppercase">Premium Studio</p>
              </header>

              <section className="w-full space-y-3">
                {DATA.links.map((link) => (
                  <motion.div
                    key={link.id}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      if (link.type === 'sublimacion') setView('sublimacion');
                      else if (link.type === 'motos') setView('motos');
                      else window.open(link.url, '_blank');
                    }}
                    className="group relative flex items-center p-4 rounded-xl cursor-pointer border backdrop-blur-md transition-all bg-white/5 border-white/5 hover:border-yellow-500/20"
                  >
                    <div className={`p-2.5 rounded-lg mr-3 transition-colors ${getIconStyles(link.id)}`}>
                      <link.icon size={20} />
                    </div>

                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-sm uppercase tracking-tight group-hover:text-yellow-500 transition-colors">{link.title}</h3>
                      <p className="text-[8px] uppercase opacity-40 font-bold tracking-widest">{link.desc}</p>
                    </div>

                    <ChevronRight size={16} className="text-white/20 group-hover:text-yellow-500 group-hover:opacity-100 transition-all" />
                  </motion.div>
                ))}
              </section>

              <footer className="mt-10">
                <p className="text-[8px] tracking-[0.4em] uppercase opacity-30 font-black text-center">
                  Created by MIDNIGHT-SYSTEMS
                </p>
              </footer>
            </motion.div>
          )}

          {view === 'sublimacion' && (
            <motion.div key="sub-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full pt-10">
              <CatalogoSublimacion theme={theme} onBack={() => setView('links')} />
            </motion.div>
          )}

          {view === 'motos' && (
            <motion.div key="motos-view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full pt-10">
              <CatalogoRotulaciones theme={theme} onBack={() => setView('links')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default App;