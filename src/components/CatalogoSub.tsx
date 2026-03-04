import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Todos los iconos ahora están integrados en la UI
import { ArrowLeft, ShoppingBag, Search, Share2, X, Plus, Minus, Send, Trash2, Layers, Shirt, Box } from 'lucide-react';
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
        nombre: '', cedula: '', ciudad: '', telefono: '', metodo: 'Envío', notas: '', tallas: ''
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
        const { nombre, cedula, ciudad, telefono, tallas, notas } = customerData;

        // Validación de campos obligatorios
        if (!nombre || !cedula || !telefono || !ciudad) {
            return alert("Por favor, completa los datos de contacto (Nombre, ID, Telf y Ciudad) 👑");
        }

        const productList = cart.map(item => `• *${item.product.name}* (x${item.quantity}) - $${item.product.price * item.quantity}`).join('\n');

        const message = [
            `*PEDIDO DE SUBLIMACIÓN - KING OF DESIGN* 👑`,
            `----------------------------------`,
            `👤 *Cliente:* ${nombre}`,
            `🎫 *ID:* ${cedula.toUpperCase()}`,
            `📞 *Telf:* ${telefono}`,
            `📍 *Ciudad:* ${ciudad}`,
            `----------------------------------`,
            `🛍️ *PRODUCTOS:*`,
            productList,
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#050505] m-0 p-0 text-white"
        >
            {/* 1. Actualizado a bg-linear-to-br */}
            <div className="absolute inset-0 bg-linear-to-br from-yellow-900/20 via-black to-zinc-900 -z-10" />

            <div className="w-full max-w-7xl mx-auto h-full flex flex-col relative">
                <header className="w-full pt-8 pb-4 flex flex-col items-center shrink-0 px-4">
                    <button onClick={onBack} className="mb-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500/60 hover:text-yellow-500 transition-colors cursor-pointer border-none bg-transparent">
                        <ArrowLeft size={14} /> Volver al menú
                    </button>
                    <div className="text-center">
                        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter leading-none m-0 flex items-center gap-3">
                            <Layers className="text-yellow-500 md:w-10 md:h-10 w-8 h-8" /> {/* 2. ICONO LAYERS INTEGRADO */}
                            <span>Personalizados <span className="text-yellow-500">& Sublimación</span></span>
                        </h2>
                        <div className="h-1.5 w-12 bg-yellow-500 mx-auto mt-3 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.4)]" />
                    </div>
                </header>

                {/* Buscador y Categorías */}
                <div className="w-full max-w-2xl mx-auto px-4 space-y-5 mb-6 shrink-0">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500 opacity-60" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar láminas, franelas, mugs..."
                            className="w-full pl-12 pr-4 py-4 rounded-2xl border-none outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-yellow-500 transition-all bg-white/5 backdrop-blur-md text-white placeholder-zinc-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar justify-start md:justify-center">
                        {categories.map((cat) => (
                            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shrink-0 transition-all cursor-pointer border-none ${selectedCategory === cat ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20' : 'bg-zinc-800/50 text-zinc-400 hover:text-white border border-white/5'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid de Productos */}
                <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-32 no-scrollbar">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {filteredProducts.map((product, index) => (
                            <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index % 4 * 0.05 }} className="group rounded-3xl p-3 border border-white/5 bg-zinc-900/30 backdrop-blur-sm transition-all hover:bg-zinc-800/40 hover:border-yellow-500/30 hover:-translate-y-1 relative">
                                {/* 3. ICONO SHARE2 INTEGRADO */}
                                <button className="absolute top-5 right-5 z-20 p-2 bg-black/50 rounded-full text-white/50 hover:text-yellow-500 border-none cursor-pointer transition-colors backdrop-blur-md">
                                    <Share2 size={16} />
                                </button>

                                <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-black border border-white/5">
                                    <img src={product.image} onLoad={() => setLoadedImages(prev => ({ ...prev, [product.id]: true }))} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${loadedImages[product.id] ? 'opacity-100' : 'opacity-0'}`} alt={product.name} />
                                </div>
                                <div className="px-1 space-y-1">
                                    <p className="text-[9px] text-zinc-500 font-black uppercase tracking-widest m-0">{product.category}</p>
                                    <h3 className="text-sm font-bold leading-tight line-clamp-2 uppercase h-10 m-0 group-hover:text-yellow-500 transition-colors">{product.name}</h3>
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

            <AnimatePresence>
                {isCartOpen && (
                    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsCartOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-xl max-h-[90vh] flex flex-col rounded-[2.5rem] bg-[#0a0a0a] text-white shadow-2xl overflow-hidden border border-yellow-500/10">
                            <div className="p-6 flex items-center justify-between border-b border-white/5 bg-zinc-900/50">
                                <div>
                                    <h3 className="text-2xl font-black italic uppercase m-0">Mi <span className="text-yellow-500">Cotización</span></h3>
                                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold m-0">{cart.length} artículos</p>
                                </div>
                                <button onClick={() => setIsCartOpen(false)} className="p-3 bg-white/5 text-zinc-400 hover:text-red-500 rounded-2xl transition-all cursor-pointer border-none"><X size={20} /></button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
                                {cart.length === 0 ? (
                                    <div className="text-center py-20">
                                        <Box size={48} className="mx-auto mb-4 text-zinc-800" /> {/* 4. ICONO BOX INTEGRADO */}
                                        <p className="text-zinc-600 font-bold uppercase tracking-widest">El carrito está vacío</p>
                                    </div>
                                ) : (
                                    cart.map((item) => (
                                        <div key={item.product.id} className="flex gap-5 p-4 rounded-3xl bg-zinc-900/50 border border-white/5 items-center">
                                            <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl bg-black border border-white/5">
                                                <img src={item.product.image} className="w-full h-full object-cover" alt="" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-start">
                                                    <p className="font-black text-xs uppercase truncate pr-4 m-0">{item.product.name}</p>
                                                    <span className="font-black text-yellow-500 italic">${item.product.price * item.quantity}</span>
                                                </div>
                                                <div className="flex items-center justify-between mt-3">
                                                    <div className="flex items-center gap-1 bg-black p-1 rounded-xl border border-white/10">
                                                        <button onClick={() => updateQuantity(item.product.id, -1)} className="w-8 h-8 flex items-center justify-center text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-lg transition-all cursor-pointer border-none bg-transparent"><Minus size={14} /></button>
                                                        <span className="w-8 text-center font-black text-xs">{item.quantity}</span>
                                                        <button onClick={() => updateQuantity(item.product.id, 1)} className="w-8 h-8 flex items-center justify-center text-yellow-500 hover:bg-yellow-500 hover:text-black rounded-lg transition-all cursor-pointer border-none bg-transparent"><Plus size={14} /></button>
                                                    </div>
                                                    <button onClick={() => removeFromCart(item.product.id)} className="p-2 text-zinc-600 hover:text-red-500 transition-colors cursor-pointer border-none bg-transparent"><Trash2 size={18} /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>

                            <div className="p-6 bg-black border-t border-white/10 space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    {/* Fila 1: Nombre e ID */}
                                    <input type="text" placeholder="Nombre completo" className="w-full p-4 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white focus:ring-1 focus:ring-yellow-500 outline-none font-bold" onChange={(e) => setCustomerData({ ...customerData, nombre: e.target.value })} />
                                    <input type="text" placeholder="Cédula / RIF" className="w-full p-4 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white focus:ring-1 focus:ring-yellow-500 outline-none font-bold uppercase" onChange={(e) => setCustomerData({ ...customerData, cedula: e.target.value })} />

                                    {/* Fila 2: Teléfono y Ciudad */}
                                    <input type="text" placeholder="Teléfono" className="w-full p-4 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white focus:ring-1 focus:ring-yellow-500 outline-none font-bold" onChange={(e) => setCustomerData({ ...customerData, telefono: e.target.value })} />
                                    <input type="text" placeholder="Ciudad" className="w-full p-4 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white focus:ring-1 focus:ring-yellow-500 outline-none font-bold" onChange={(e) => setCustomerData({ ...customerData, ciudad: e.target.value })} />

                                    {/* Fila 3: Tallas con el icono Shirt */}
                                    <div className="col-span-2 relative">
                                        <Shirt className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500/40" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Tallas (ej: S, M, XL) o detalles de prenda"
                                            className="w-full pl-12 pr-4 py-4 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white focus:ring-1 focus:ring-yellow-500 outline-none font-bold"
                                            onChange={(e) => setCustomerData({ ...customerData, tallas: e.target.value })}
                                        />
                                    </div>

                                    {/* Fila 4: Notas */}
                                    <textarea placeholder="Especificaciones del diseño (Colores, nombres, etc)..." className="col-span-2 w-full p-4 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white focus:ring-1 focus:ring-yellow-500 outline-none font-bold h-16 resize-none" onChange={(e) => setCustomerData({ ...customerData, notas: e.target.value })} />
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-widest">Inversión Total</span>
                                        <span className="text-4xl font-black text-yellow-500 italic leading-none">${totalCart}</span>
                                    </div>
                                    <button onClick={sendOrder} disabled={cart.length === 0} className="px-10 py-5 bg-yellow-500 text-black font-black rounded-2xl shadow-lg shadow-yellow-500/20 active:scale-95 disabled:opacity-50 transition-all cursor-pointer border-none flex items-center gap-3 uppercase text-sm">
                                        Confirmar Pedido <Send size={20} />
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
                    initial={{ y: 100 }} animate={{ y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsCartOpen(true)}
                    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-yellow-500 text-black px-8 py-4 rounded-full shadow-[0_10px_40px_rgba(234,179,8,0.3)] flex items-center gap-4 font-black cursor-pointer border-none"
                >
                    <div className="relative">
                        <ShoppingBag size={24} />
                        <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-black border border-yellow-500">{cart.length}</span>
                    </div>
                    <span className="text-xl tracking-tighter italic">${totalCart}</span>
                </motion.button>
            )}
        </motion.div>
    );
};