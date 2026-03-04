import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Search, Share2, X, Plus, Minus, Send, Trash2, PenTool } from 'lucide-react';
// IMPORTANTE: Cambiamos el nombre de la importación para que use los productos de rotulaciones
import { PRODUCTS as ROTULACIONES_PRODUCTS } from '../types/products'; 

const fuzzyMatch = (text: string, query: string) => {
  const q = query.toLowerCase().replace(/\s/g, '');
  const t = text.toLowerCase().replace(/\s/g, '');
  let qIdx = 0;
  for (let tIdx = 0; tIdx < t.length && qIdx < q.length; tIdx++) {
    if (t[tIdx] === q[qIdx]) qIdx++;
  }
  return qIdx === q.length;
};

export const CatalogoRotulaciones = ({ onBack }: { onBack: () => void, theme: string }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [cart, setCart] = useState<{ product: any, quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerData, setCustomerData] = useState({
    nombre: '', cedula: '', ciudad: '', telefono: '', metodo: 'Delivery', pago: 'Dólares Efectivo', notas: ''
  });

  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item));
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(item => item.product.id !== id));
  const totalCart = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const shareProduct = async (product: any) => {
    const shareData = {
      title: `King Of Desing - ${product.name}`,
      text: `¡Mira este servicio de rotulación en King Of Desing! 🚀\n\n🎯 ${product.name}\n💰 Precio: $${product.price}`,
      url: window.location.href
    };
    try {
      if (navigator.share) await navigator.share(shareData);
      else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        alert('✨ ¡Enlace copiado!');
      }
    } catch (err) { console.log('Acción cancelada', err); }
  };

  const sendOrder = () => {
    const { nombre, cedula, ciudad, telefono, metodo, pago, notas } = customerData;
    const cedulaRegex = /^[VvJj]\d{1,8}$/;
    if (!nombre || !ciudad || !telefono || !cedula) return alert("Por favor, completa los campos obligatorios ⚡");
    if (!cedulaRegex.test(cedula)) return alert("Cédula inválida (Ej: V12345678)");

    const productList = cart.map(item => `• *${item.product.name}* (x${item.quantity}) - $${item.product.price * item.quantity}`).join('\n');
    const message = [
      `*SOLICITUD DE ROTULACIÓN - KING OF DESING* 🚀`,
      `----------------------------------`,
      `👤 *Cliente:* ${nombre}`,
      `🎫 *ID:* ${cedula.toUpperCase()}`,
      `📞 *Telf:* ${telefono}`,
      `📍 *Dir:* ${ciudad}`,
      `🛵 *Entrega:* ${metodo}`,
      `💳 *Pago:* ${pago}`,
      `----------------------------------`,
      `🛍️ *DETALLE DEL TRABAJO:*`,
      productList,
      `----------------------------------`,
      `💵 *TOTAL ESTIMADO:* $${totalCart}`,
      `----------------------------------`,
      notas ? `📝 *Medidas/Notas:* ${notas}` : '',
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/584146585228?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Usamos los productos de rotulaciones para las categorías y el filtrado
  const categories = useMemo(() => ['Todos', ...new Set(ROTULACIONES_PRODUCTS.map(p => p.category))], []);
  
  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const categoryFiltered = ROTULACIONES_PRODUCTS.filter(p => selectedCategory === 'Todos' || p.category === selectedCategory);
    if (!term) return categoryFiltered;
    return categoryFiltered.filter(p => p.name.toLowerCase().includes(term) || fuzzyMatch(p.name, term));
  }, [searchTerm, selectedCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-transparent backdrop-blur-xl m-0 p-0"
    >
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <div className="w-full max-w-7xl mx-auto h-full flex flex-col relative">
        <header className="w-full pt-8 pb-4 flex flex-col items-center shrink-0 px-4">
          <button onClick={onBack} className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity cursor-pointer border-none bg-transparent text-white">
            <ArrowLeft size={14} /> Volver al menú
          </button>
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-none m-0 text-white">
              Servicios de <span className="text-yellow-500">Rotulación</span>
            </h2>
            <div className="h-1 w-16 bg-yellow-500 mx-auto mt-3 rounded-full" />
          </div>
        </header>

        {/* Buscador y Categorías */}
        <div className="w-full max-w-2xl mx-auto px-4 space-y-5 mb-6 shrink-0">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500 opacity-50" size={18} />
            <input
              type="text" 
              placeholder="Buscar vinilos, avisos, rotulados..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border-none outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-yellow-500 transition-all bg-white/10 backdrop-blur-md text-white placeholder-white/40"
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar justify-start md:justify-center">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0 transition-all cursor-pointer border-none ${selectedCategory === cat ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'bg-white/10 text-white/60 hover:text-white backdrop-blur-md'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Productos de Rotulación */}
        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-32 no-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index % 4 * 0.05 }} className="group rounded-3xl p-3 border border-white/10 bg-black/20 backdrop-blur-sm transition-all hover:bg-white/5 hover:-translate-y-1">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-yellow-500/5">
                  <img src={product.image} onLoad={() => setLoadedImages(prev => ({ ...prev, [product.id]: true }))} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${loadedImages[product.id] ? 'opacity-100' : 'opacity-0'}`} alt={product.name} />
                  <button onClick={() => shareProduct(product)} className="absolute top-3 right-3 p-2 rounded-xl bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-yellow-500 hover:text-black transition-all cursor-pointer border-none">
                    <Share2 size={14} />
                  </button>
                </div>
                <div className="px-1 space-y-1">
                  <p className="text-[9px] text-yellow-500 font-black uppercase tracking-widest m-0">{product.category}</p>
                  <h3 className="text-sm font-bold leading-tight line-clamp-2 uppercase h-10 m-0 text-white">{product.name}</h3>
                  <div className="flex items-center justify-between pt-3">
                    <span className="text-lg font-black italic text-white">${product.price}</span>
                    <button onClick={() => addToCart(product)} className="p-3 rounded-xl bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 active:scale-90 transition-all cursor-pointer border-none">
                      <Plus size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* MODAL DEL CARRITO */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] text-white shadow-2xl overflow-hidden"
            >
              <div className="p-6 flex items-center justify-between border-b border-white/5 bg-white/5">
                <div>
                  <h3 className="text-2xl font-black italic uppercase m-0">Presupuesto <span className="text-yellow-500">Diseño</span></h3>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold m-0">{cart.length} Servicios en lista</p>
                </div>
                <button onClick={() => setIsCartOpen(false)} className="p-3 hover:bg-red-500/20 hover:text-red-500 rounded-2xl transition-all cursor-pointer border-none bg-white/5 text-white"><X size={20}/></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="text-center py-20">
                    <PenTool size={48} className="mx-auto mb-4 opacity-10" />
                    <p className="opacity-30 font-bold uppercase tracking-widest">No has seleccionado servicios</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div 
                      layout
                      key={item.product.id} 
                      className="flex gap-5 p-4 rounded-3xl bg-white/5 border border-white/10 items-center group hover:border-yellow-500/30 transition-colors"
                    >
                      <div className="relative w-24 h-24 shrink-0 overflow-hidden rounded-2xl bg-black">
                         <img src={item.product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-1">
                          <p className="font-black text-sm uppercase truncate pr-4 m-0">{item.product.name}</p>
                          <span className="font-black text-yellow-500 italic">${item.product.price * item.quantity}</span>
                        </div>
                        <p className="text-[10px] text-white/40 uppercase font-bold mb-3 m-0">{item.product.category} • Base: ${item.product.price}</p>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-white/5">
                            <button onClick={() => updateQuantity(item.product.id, -1)} className="w-8 h-8 flex items-center justify-center text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-lg transition-all cursor-pointer border-none bg-transparent"><Minus size={14} /></button>
                            <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, 1)} className="w-8 h-8 flex items-center justify-center text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-lg transition-all cursor-pointer border-none bg-transparent"><Plus size={14} /></button>
                          </div>
                          
                          <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-white/20 hover:text-red-500 transition-colors cursor-pointer border-none bg-transparent">
                             <Trash2 size={18}/>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Formulario para WhatsApp */}
              <div className="p-6 bg-[#0f0f0f] border-t border-white/10 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" placeholder="Nombre / Empresa" className="w-full p-4 rounded-xl bg-black border border-white/10 text-xs text-white focus:ring-1 focus:ring-yellow-500 outline-none uppercase font-bold" onChange={(e) => setCustomerData({ ...customerData, nombre: e.target.value })} />
                  <input type="text" placeholder="RIF o Cédula" className="w-full p-4 rounded-xl bg-black border border-white/10 text-xs text-white focus:ring-1 focus:ring-yellow-500 outline-none uppercase font-bold" value={customerData.cedula} onChange={(e) => setCustomerData({ ...customerData, cedula: e.target.value.toUpperCase() })} />
                  <input type="tel" placeholder="Teléfono" className="col-span-2 w-full p-4 rounded-xl bg-black border border-white/10 text-xs text-white focus:ring-1 focus:ring-yellow-500 outline-none font-bold" onChange={(e) => setCustomerData({ ...customerData, telefono: e.target.value })} />
                  <input type="text" placeholder="Ubicación de la instalación" className="col-span-2 w-full p-4 rounded-xl bg-black border border-white/10 text-xs text-white focus:ring-1 focus:ring-yellow-500 outline-none uppercase font-bold" onChange={(e) => setCustomerData({ ...customerData, ciudad: e.target.value })} />
                  <textarea placeholder="Cuéntanos las medidas o detalles específicos..." className="col-span-2 w-full p-4 rounded-xl bg-black border border-white/10 text-xs text-white focus:ring-1 focus:ring-yellow-500 outline-none uppercase font-bold resize-none h-20" onChange={(e) => setCustomerData({ ...customerData, notas: e.target.value })} />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold opacity-40 tracking-widest">Total Estimado</span>
                    <span className="text-4xl font-black text-yellow-500 italic leading-none">${totalCart}</span>
                  </div>
                  <button 
                    onClick={sendOrder} 
                    disabled={cart.length === 0}
                    className="px-10 py-5 bg-yellow-500 text-black font-black rounded-2xl shadow-[0_10px_30px_rgba(234,179,8,0.3)] active:scale-95 disabled:opacity-50 transition-all cursor-pointer border-none flex items-center gap-3 uppercase text-sm"
                  >
                    Pedir Cotización <Send size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Botón Flotante */}
      {cart.length > 0 && !isCartOpen && (
        <motion.button 
          initial={{ y: 100, scale: 0.8 }} 
          animate={{ y: 0, scale: 1 }} 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 md:left-auto md:right-8 md:translate-x-0 z-50 bg-yellow-500 text-black px-10 py-6 rounded-full shadow-[0_20px_50px_rgba(234,179,8,0.4)] flex items-center gap-5 font-black cursor-pointer border-none"
        >
          <div className="relative">
            <ShoppingBag size={28} />
            <span className="absolute -top-3 -right-3 bg-black text-white text-[11px] w-7 h-7 rounded-full flex items-center justify-center border-2 border-yellow-500 font-black shadow-xl">{cart.length}</span>
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="text-[10px] uppercase opacity-60 tracking-widest">Ver Cotización</span>
            <span className="text-2xl tracking-tighter italic">${totalCart}</span>
          </div>
        </motion.button>
      )}
    </motion.div>
  );
};