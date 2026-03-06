import Algodon from '../assets/products/algodon.jfif';
import Taza from '../assets/products/taza.jfif';
import Over from '../assets/products/overside.jfif';
import Lam from '../assets/products/lamina.jfif';
import r80 from '../assets/products/rompe8.jfif';
import r120 from '../assets/products/rompe120.jfif';



// import tazaBlanca from '../assets/products/sublimacion/taza-blanca.jpeg';
// import franelaOversize from '../assets/products/sublimacion/franela-oversize.jpeg';

export const PRODUCTS = [
  // --- TEXTILES ---
  {
    id: 'SUB-004',
    name: "Camisa de Algodón Personalizada",
    price: 12.00, // Precio actualizado
    image: Algodon,
    category: "Textiles"
  },
  {
    id: 'SUB-011',
    name: "Franela Oversize Personalizada",
    price: 16.00, // Precio actualizado
    image: Over,
    category: "Textiles"
  },

  // --- LÁMINAS Y DECORACIÓN ---
  {
    id: 'SUB-007',
    name: "Lámina Sublimable A4 Personalizada",
    price: 6.00, // Precio actualizado
    image: Lam,
    category: "Decoración"
  },

  // --- ACCESORIOS Y JUEGOS ---
  {
    id: 'SUB-009',
    name: "Rompecabezas Grande 120 Piezas",
    price: 5.00, // Precio actualizado
    image: r80,
    category: "Accesorios"
  },
  {
    id: 'SUB-012',
    name: "Rompecabezas Pequeño 80 Piezas",
    price: 3.00, // Precio actualizado
    image: r120,
    category: "Accesorios"
  },

  // --- TAZAS Y MUGS (Se mantienen precios base) ---
  {
    id: 'SUB-001',
    name: "Taza Blanca Personalizada",
    price: "Proximamente",
    image: Taza,
    category: "Mugs"
  }
];