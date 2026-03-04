import { motion } from 'framer-motion';
import type { LinkItem } from '../types';

export const LinkCard = ({ link, index }: { link: LinkItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        delay: index * 0.1, 
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1] 
      }}
      
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      
      className="relative group w-full mb-4 cursor-pointer"
    >
      {/* Glow de fondo - Tailwind v4 utiliza rounded-4xl para [2rem] */}
      <div className="absolute -inset-0.5 bg-yellow-500 rounded-4xl opacity-0 group-hover:opacity-20 blur transition duration-500" />
      
      <div className="relative flex items-center w-full p-4 rounded-3xl bg-black/40 backdrop-blur-xl border border-white/5 group-hover:border-yellow-500/50 transition-all duration-300">
        
        {/* Contenedor del Icono - shrink-0 (v4 compatible) */}
        <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 text-yellow-500 border border-white/5 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-black transition-all duration-500">
          <link.icon size={22} strokeWidth={2.5} />
        </div>
        
        {/* Texto - grow (v4 compatible) */}
        <div className="grow px-4 flex flex-col items-start">
          <span className="text-[10px] uppercase font-black tracking-[0.3em] text-yellow-500/50 group-hover:text-yellow-500 transition-colors">
            {/* Usamos una fallback si 'type' no existe para evitar el error de TS */}
            {('type' in link) ? (link as any).type : 'Desing'}
          </span>
          <span className="font-black italic uppercase text-sm sm:text-base tracking-tight text-white/90 group-hover:text-white transition-colors">
            {link.title}
          </span>
        </div>

        {/* Indicador de flecha - shrink-0 (v4 compatible) */}
        <div className="shrink-0 pr-2 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </motion.div>
  );
};