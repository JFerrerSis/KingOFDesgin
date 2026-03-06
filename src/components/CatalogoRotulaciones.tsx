import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Search, Share2, X, Plus, Minus, Send, Trash2, PenTool, Info } from 'lucide-react';
import { productMotos } from '../types/productsMotos';

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
    nombre: '', cedula: '', ciudad: '', telefono: '', pago: 'Dólares Efectivo', notas: ''
  });

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalCart = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  const categories = useMemo(() => ['Todos', ...new Set(productMotos.map(p => p.category))], []);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    const categoryFiltered = productMotos.filter(p => selectedCategory === 'Todos' || p.category === selectedCategory);
    if (!term) return categoryFiltered;
    return categoryFiltered.filter(p => p.name.toLowerCase().includes(term) || fuzzyMatch(p.name, term));
  }, [searchTerm, selectedCategory]);

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

  const sendOrder = () => {
    const { nombre, cedula, ciudad, telefono, pago, notas } = customerData;
    const cedulaRegex = /^[VvJjGg]\d{1,10}$/;

    if (!nombre || !ciudad || !telefono || !cedula) return alert("Por favor, completa los campos obligatorios ⚡");
    if (!cedulaRegex.test(cedula)) return alert("Cédula/RIF inválido (Ej: V12345678)");

    const productList = cart.map(item =>
      `• *${item.product.name}*\n  Cant: ${item.quantity} x $${item.product.price} = *$${item.product.price * item.quantity}*`
    ).join('\n\n');

    const message = [
      `*SOLICITUD DE COTIZACIÓN - KING OF DESIGN* 🚀`,
      `----------------------------------`,
      `👤 *Cliente:* ${nombre.toUpperCase()}`,
      `🎫 *ID:* ${cedula.toUpperCase()}`,
      `📞 *Telf:* ${telefono}`,
      `📍 *Ubicación:* ${ciudad.toUpperCase()}`,
      `💳 *Pago:* ${pago.toUpperCase()}`,
      `----------------------------------`,
      `🛍️ *DETALLE DEL PEDIDO:*`,
      productList,
      `----------------------------------`,
      `💰 *TOTAL A PAGAR: $${totalCart}*`,
      `----------------------------------`,
      notas ? `📝 *Notas:* ${notas}` : '',
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/584146585228?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-transparent backdrop-blur-xl m-0 p-0">
      <div className="absolute inset-0 bg-black/40 -z-10" />

      <div className="w-full max-w-7xl mx-auto h-full flex flex-col relative">
        <header className="w-full pt-8 pb-4 flex flex-col items-center shrink-0 px-4">
          <button onClick={onBack} className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] opacity-60 hover:opacity-100 transition-opacity cursor-pointer border-none bg-transparent text-white">
            <ArrowLeft size={14} /> Volver al menú
          </button>
          <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-none m-0 text-white text-center">
            Servicios de <span className="text-yellow-500">Rotulación</span>
          </h2>
        </header>

        <div className="w-full max-w-2xl mx-auto px-4 mb-6 shrink-0">
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500 opacity-50" size={18} />
            <input type="text" placeholder="Buscar servicios..." className="w-full pl-12 pr-4 py-4 rounded-2xl border-none bg-white/10 text-white outline-none focus:ring-2 focus:ring-yellow-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>

         
          {/* <div className="w-full overflow-x-auto no-scrollbar cursor-grab active:cursor-grabbing pb-4">
            <div className="flex flex-nowrap gap-2 min-w-max justify-center mx-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase shrink-0 border-none cursor-pointer transition-all ${selectedCategory === cat
                      ? 'bg-yellow-500 text-black scale-105 shadow-lg shadow-yellow-500/20'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div> */}
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-32 no-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group rounded-3xl p-3 border border-white/10 bg-black/20 backdrop-blur-sm">
                <div className="relative aspect-square rounded-2xl overflow-hidden mb-3">
                  <img src={product.image} onLoad={() => setLoadedImages(p => ({ ...p, [product.id]: true }))} className={`w-full h-full object-cover ${loadedImages[product.id] ? 'opacity-100' : 'opacity-0'}`} alt="" />
                  <button onClick={() => {
                    const shareData = { title: product.name, text: `Servicio: ${product.name}`, url: window.location.href };
                    navigator.share?.(shareData).catch(() => { });
                  }} className="absolute top-2 right-2 p-2 bg-black/60 rounded-xl text-white border-none cursor-pointer"><Share2 size={12} /></button>
                </div>
                <h3 className="text-xs font-bold uppercase text-white truncate m-0">{product.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-black text-yellow-500">${product.price}</span>
                  <button onClick={() => addToCart(product)} className="p-2 bg-yellow-500 rounded-lg border-none cursor-pointer"><Plus size={16} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-[2.5rem] border border-white/10 bg-[#0a0a0a] text-white overflow-hidden">
              <div className="p-6 flex items-center justify-between border-b border-white/5">
                <h3 className="text-xl font-black uppercase italic m-0">Presupuesto <span className="text-yellow-500">Diseño</span></h3>
                <button onClick={() => setIsCartOpen(false)} className="p-2 bg-white/5 rounded-xl text-white border-none cursor-pointer"><X size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                {cart.length === 0 ? (
                  <div className="text-center py-10 opacity-20">
                    <PenTool size={48} className="mx-auto mb-2" />
                    <p className="font-bold uppercase text-xs">Lista vacía</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-4 rounded-3xl bg-white/5 border border-white/10 items-center">
                      <img src={item.product.image} className="w-16 h-16 object-cover rounded-xl" alt="" />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <p className="font-bold text-xs uppercase truncate m-0">{item.product.name}</p>
                          <button onClick={() => removeFromCart(item.product.id)} className="text-red-500/40 hover:text-red-500 bg-transparent border-none cursor-pointer"><Trash2 size={16} /></button>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center gap-3 bg-black/50 p-1 px-2 rounded-xl border border-white/5">
                            <button onClick={() => updateQuantity(item.product.id, -1)} className="text-yellow-500 bg-transparent border-none cursor-pointer"><Minus size={14} /></button>
                            <span className="font-black text-xs">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, 1)} className="text-yellow-500 bg-transparent border-none cursor-pointer"><Plus size={14} /></button>
                          </div>
                          <span className="font-black text-yellow-500">${item.product.price * item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="p-6 bg-[#0f0f0f] border-t border-white/10 space-y-3">
                <div className="grid grid-cols-3 gap-2 p-1 bg-black rounded-xl border border-white/5">
                  {['Dólares Efectivo', 'Zelle', 'Pago Móvil'].map(p => (
                    <button key={p} onClick={() => setCustomerData({ ...customerData, pago: p })} className={`flex-1 py-2 rounded-lg text-[8px] font-black uppercase border-none cursor-pointer ${customerData.pago === p ? 'bg-white/20 text-white' : 'bg-transparent text-white/30'}`}>{p}</button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input type="text" placeholder="Nombre" className="p-3 rounded-xl bg-black border border-white/10 text-[10px] text-white outline-none uppercase font-bold" value={customerData.nombre} onChange={e => setCustomerData({ ...customerData, nombre: e.target.value })} />
                  <input type="text" placeholder="Cédula" className="p-3 rounded-xl bg-black border border-white/10 text-[10px] text-white outline-none uppercase font-bold" value={customerData.cedula} onChange={e => setCustomerData({ ...customerData, cedula: e.target.value.toUpperCase() })} />
                  <input type="text" placeholder="Teléfono" className="p-3 rounded-xl bg-black border border-white/10 text-[10px] text-white outline-none uppercase font-bold" value={customerData.telefono} onChange={e => setCustomerData({ ...customerData, telefono: e.target.value })} />
                  <input type="text" placeholder="Ciudad / Dirección" className="p-3 rounded-xl bg-black border border-white/10 text-[10px] text-white outline-none uppercase font-bold" value={customerData.ciudad} onChange={e => setCustomerData({ ...customerData, ciudad: e.target.value })} />
                  <input type="text" placeholder="Notas adicionales (opcional)" className="col-span-2 p-3 rounded-xl bg-black border border-white/10 text-[10px] text-white outline-none uppercase font-bold" value={customerData.notas} onChange={e => setCustomerData({ ...customerData, notas: e.target.value })} />
                </div>

                {/* NOTA DE DISEÑOS ADICIONALES */}
                <div className="flex items-start gap-2 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10 mb-2">
                  <Info size={14} className="text-yellow-500 shrink-0 mt-0.5" />
                  <p className="text-[9px] text-zinc-400 m-0 leading-relaxed font-medium">
                    <span className="text-yellow-500 font-bold uppercase">Nota:</span> Tenemos muchos más diseños disponibles. Si buscas algo específico que no está en el catálogo, ¡escríbenos y lo creamos para ti!
                  </p>
                </div>

                <button onClick={sendOrder} className="w-full py-4 bg-yellow-500 text-black font-black rounded-2xl border-none cursor-pointer uppercase text-xs flex items-center justify-center gap-2 active:scale-95 transition-transform">
                  Enviar Pedido <Send size={16} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {cart.length > 0 && !isCartOpen && (
        <button onClick={() => setIsCartOpen(true)} className="fixed bottom-8 right-8 z-50 bg-yellow-500 text-black px-8 py-4 rounded-full border-none cursor-pointer shadow-2xl flex items-center gap-3 group active:scale-95 transition-transform">
          <div className="relative">
            <ShoppingBag size={22} />
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-yellow-500">
              {totalItems}
            </span>
          </div>
          <span className="font-black italic text-lg">${totalCart}</span>
        </button>
      )}
    </motion.div>
  );
};