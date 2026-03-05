import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, ShoppingBag, Search, X, Plus, Minus, 
    Send, Trash2, Layers, Box, CreditCard, Truck 
} from 'lucide-react';
import { PRODUCTS as SUBLIMACION_PRODUCTS } from '../types/products';

const fuzzyMatch = (text: string, query: string) => {
    const q = query.toLowerCase().replace(/\s/g, '');
    const t = text.toLowerCase().replace(/\s/g, '');
    let qIdx = 0;
    for (let tIdx = 0; tIdx < t.length && qIdx < q.length; tIdx++) {
        if (t[tIdx] === q[qIdx]) qIdx++;
    }
    return qIdx === q.length;
};

export const CatalogoSublimacion = ({ onBack }: { onBack: () => void, theme: string }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
    const [cart, setCart] = useState<{ product: any, quantity: number }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    
    const [customerData, setCustomerData] = useState({
        nombre: '', 
        cedula: '', 
        ciudad: '', 
        telefono: '', 
        notas: '', 
        tallas: '',
        metodoPago: 'Pago Móvil',
        metodoEntrega: 'Delivery'
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

    const sendOrder = () => {
        const { nombre, cedula, ciudad, telefono, tallas, notas, metodoPago, metodoEntrega } = customerData;
        if (!nombre || !cedula || !telefono || !ciudad) {
            return alert("Por favor, completa los datos de contacto (Nombre, ID, Telf y Ciudad) 👑");
        }
        const productList = cart.map(item => `• *${item.product.name}* (x${item.quantity}) - $${item.product.price * item.quantity}`).join('\n');
        const message = [
            `*PEDIDO DE SUBLIMACIÓN - KING OF DESING * 👑`,
            `----------------------------------`,
            `👤 *Cliente:* ${nombre}`,
            `🎫 *ID:* ${cedula.toUpperCase()}`,
            `📞 *Telf:* ${telefono}`,
            `📍 *Ciudad:* ${ciudad}`,
            `----------------------------------`,
            `🛍️ *PRODUCTOS:*`,
            productList,
            `----------------------------------`,
            `💳 *PAGO:* ${metodoPago}`,
            `🚚 *ENTREGA:* ${metodoEntrega}`,
            `----------------------------------`,
            tallas ? `👕 *Tallas/Detalles:* ${tallas}` : '',
            notas ? `📝 *Instrucciones:* ${notas}` : '',
            `----------------------------------`,
            `💵 *TOTAL ESTIMADO:* $${totalCart}`,
        ].filter(Boolean).join('\n');
        window.open(`https://wa.me/584146585228?text=${encodeURIComponent(message)}`, '_blank');
    };

    const categories = useMemo(() => ['Todos', ...new Set(SUBLIMACION_PRODUCTS.map(p => p.category))], []);

    const filteredProducts = useMemo(() => {
        const term = searchTerm.toLowerCase().trim();
        const categoryFiltered = SUBLIMACION_PRODUCTS.filter(p => selectedCategory === 'Todos' || p.category === selectedCategory);
        if (!term) return categoryFiltered;
        return categoryFiltered.filter(p => p.name.toLowerCase().includes(term) || fuzzyMatch(p.name, term));
    }, [searchTerm, selectedCategory]);

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#050505] m-0 p-0 text-white"
        >
            <div className="absolute inset-0 bg-gradient-br from-yellow-900/10 via-black to-zinc-900 -z-10" />

            <div className="w-full max-w-7xl mx-auto h-full flex flex-col relative px-4">
                <header className="w-full pt-6 pb-4 flex flex-col items-center shrink-0">
                    <button onClick={onBack} className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500/60 hover:text-yellow-500 transition-colors border-none bg-transparent cursor-pointer">
                        <ArrowLeft size={14} /> Volver al menú
                    </button>
                    <div className="text-center">
                        <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter leading-none m-0 flex items-center gap-3">
                            <Layers className="text-yellow-500 w-7 h-7 md:w-10 md:h-10" />
                            <span>Personalizados <span className="text-yellow-500">& Sublimación</span></span>
                        </h2>
                    </div>
                </header>

                <div className="w-full max-w-2xl mx-auto space-y-4 mb-6 shrink-0">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500 opacity-60" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar láminas, franelas, mugs..."
                            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-none outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 backdrop-blur-md text-white placeholder-zinc-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                        {categories.map((cat) => (
                            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-5 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest shrink-0 transition-all cursor-pointer border-none ${selectedCategory === cat ? 'bg-yellow-500 text-black' : 'bg-zinc-800/50 text-zinc-400'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto pb-32 no-scrollbar">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                        {filteredProducts.map((product, index) => (
                            <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index % 4 * 0.05 }} className="group rounded-2xl md:rounded-3xl p-2.5 md:p-3 border border-white/5 bg-zinc-900/30 backdrop-blur-sm hover:bg-zinc-800/40 transition-all relative">
                                <div className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden mb-3 bg-black border border-white/5">
                                    <img src={product.image} className={`w-full h-full object-cover transition-transform group-hover:scale-110 ${loadedImages[product.id] ? 'opacity-100' : 'opacity-0'}`} onLoad={() => setLoadedImages(p => ({ ...p, [product.id]: true }))} alt="" />
                                </div>
                                <div className="px-1">
                                    <p className="text-[8px] text-zinc-500 font-black uppercase tracking-widest m-0 mb-1">{product.category}</p>
                                    <h3 className="text-xs md:text-sm font-bold leading-tight uppercase line-clamp-2 h-8 md:h-10 m-0">{product.name}</h3>
                                    <div className="flex items-center justify-between mt-2 md:mt-3">
                                        <span className="text-base md:text-lg font-black italic">${product.price}</span>
                                        <button onClick={() => addToCart(product)} className="p-2.5 md:p-3 rounded-lg md:rounded-xl bg-yellow-500 text-black border-none cursor-pointer active:scale-90 transition-transform">
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isCartOpen && (
                    <div className="fixed inset-0 z-100 flex items-end md:items-center justify-center p-0 md:p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-sm" />
                        <motion.div 
                            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="relative w-full max-w-2xl h-[92vh] md:h-auto md:max-h-[90vh] flex flex-col rounded-t-[2.5rem] md:rounded-[2.5rem] bg-[#0a0a0a] text-white shadow-2xl overflow-hidden border-t md:border border-yellow-500/10"
                        >
                            {/* Header del Carrito */}
                            <div className="p-5 md:p-6 flex items-center justify-between border-b border-white/5 bg-zinc-900/50 shrink-0">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl md:text-2xl font-black italic uppercase m-0">Mi <span className="text-yellow-500">Cotización</span></h3>
                                    <span className="text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-md font-bold">{cart.length}</span>
                                </div>
                                <button onClick={() => setIsCartOpen(false)} className="p-2 bg-white/5 text-zinc-400 rounded-xl border-none cursor-pointer"><X size={20} /></button>
                            </div>

                            {/* Contenido con Scroll */}
                            <div className="flex-1 overflow-y-auto no-scrollbar">
                                {/* Lista de Productos */}
                                <div className="p-5 md:p-6 space-y-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Artículos en pedido:</p>
                                    {cart.length === 0 ? (
                                        <div className="text-center py-10 opacity-20"><Box size={40} className="mx-auto" /></div>
                                    ) : (
                                        cart.map((item) => (
                                            <div key={item.product.id} className="flex gap-4 p-3.5 rounded-2xl bg-zinc-900/50 border border-white/5 items-center">
                                                <div className="w-16 h-16 shrink-0 overflow-hidden rounded-xl bg-black"><img src={item.product.image} className="w-full h-full object-cover" alt="" /></div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex justify-between items-start">
                                                        <p className="font-black text-[11px] uppercase truncate m-0 pr-2">{item.product.name}</p>
                                                        <span className="font-black text-yellow-500 italic text-sm">${item.product.price * item.quantity}</span>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-2">
                                                        <div className="flex items-center gap-1 bg-black p-1 rounded-lg border border-white/10">
                                                            <button onClick={() => updateQuantity(item.product.id, -1)} className="w-7 h-7 flex items-center justify-center text-yellow-500 bg-transparent border-none"><Minus size={12} /></button>
                                                            <span className="w-6 text-center font-black text-xs">{item.quantity}</span>
                                                            <button onClick={() => updateQuantity(item.product.id, 1)} className="w-7 h-7 flex items-center justify-center text-yellow-500 bg-transparent border-none"><Plus size={12} /></button>
                                                        </div>
                                                        <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-zinc-600 bg-transparent border-none"><Trash2 size={16} /></button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* Formulario */}
                                <div className="p-5 md:p-6 bg-black/40 space-y-4">
                                    <div className="h-px bg-white/5 w-full mb-2" />
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <input type="text" placeholder="Nombre completo" className="w-full p-4 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white outline-none font-bold" onChange={(e) => setCustomerData({ ...customerData, nombre: e.target.value })} />
                                        <input type="text" placeholder="Cédula / RIF" className="w-full p-4 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white outline-none font-bold uppercase" onChange={(e) => setCustomerData({ ...customerData, cedula: e.target.value })} />
                                        <input type="text" placeholder="Teléfono" className="w-full p-4 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white outline-none font-bold" onChange={(e) => setCustomerData({ ...customerData, telefono: e.target.value })} />
                                        <input type="text" placeholder="Ciudad" className="w-full p-4 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white outline-none font-bold" onChange={(e) => setCustomerData({ ...customerData, ciudad: e.target.value })} />
                                        
                                        <div className="flex gap-2">
                                            <div className="flex-1 relative">
                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500/40" size={14} />
                                                <select className="w-full pl-9 pr-4 py-4 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white font-bold appearance-none outline-none" onChange={(e) => setCustomerData({ ...customerData, metodoPago: e.target.value })}>
                                                    <option>Pago Móvil</option><option>Zelle</option><option>Efectivo</option>
                                                </select>
                                            </div>
                                            <div className="flex-1 relative">
                                                <Truck className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500/40" size={14} />
                                                <select className="w-full pl-9 pr-4 py-4 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white font-bold appearance-none outline-none" onChange={(e) => setCustomerData({ ...customerData, metodoEntrega: e.target.value })}>
                                                    <option>Delivery</option><option>Pickup</option><option>Nacional</option>
                                                </select>
                                            </div>
                                        </div>

                                        <input type="text" placeholder="Tallas (ej: S, M, XL)" className="w-full p-4 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white outline-none font-bold" onChange={(e) => setCustomerData({ ...customerData, tallas: e.target.value })} />
                                        <textarea placeholder="Especificaciones del diseño..." className="md:col-span-2 w-full p-4 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white outline-none font-bold h-20 resize-none" onChange={(e) => setCustomerData({ ...customerData, notas: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            {/* Footer de Pago */}
                            <div className="p-5 md:p-6 bg-black border-t border-white/10 shrink-0">
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="flex flex-col items-center md:items-start">
                                        <span className="text-[10px] uppercase font-bold text-zinc-600">Total Estimado</span>
                                        <span className="text-3xl md:text-4xl font-black text-yellow-500 italic leading-none">${totalCart}</span>
                                    </div>
                                    <button onClick={sendOrder} disabled={cart.length === 0} className="w-full md:w-auto px-10 py-4 bg-yellow-500 text-black font-black rounded-2xl flex items-center justify-center gap-3 uppercase text-sm border-none cursor-pointer active:scale-95">
                                        Confirmar Pedido <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            {cart.length > 0 && !isCartOpen && (
                <motion.button
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    whileHover={{ scale: 1.05 }} onClick={() => setIsCartOpen(true)}
                    className="fixed bottom-6 right-6 md:left-1/2 md:-translate-x-1/2 z-50 bg-yellow-500 text-black px-6 py-4 rounded-2xl shadow-xl flex items-center gap-4 font-black border-none cursor-pointer"
                >
                    <div className="relative"><ShoppingBag size={22} /><span className="absolute -top-2 -right-2 bg-black text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center border border-yellow-500">{cart.length}</span></div>
                    <span className="text-lg italic font-black">${totalCart}</span>
                </motion.button>
            )}
        </motion.div>
    );
};