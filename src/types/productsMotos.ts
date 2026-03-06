// 1. IMPORTACIONES DE ASSETS
import bera1 from '../assets/productRotulacion/sbr1.jpeg';
import bera2 from '../assets/productRotulacion/sbr2.jpeg';
import bera3 from '../assets/productRotulacion/sbr3.jfif';
import bera4 from '../assets/productRotulacion/srb4.jfif';
import bera5 from '../assets/productRotulacion/sbr5.jfif';

export const productMotos = [
  // --- CATEGORÍA: BERA SBR (5 Diseños) ---
  ...Array.from({ length: 5 }).map((_, i) => {
    const imagesSBR = [bera1, bera2, bera3, bera4, bera5];
   

    return {
      id: `BERA-SBR-${i + 1}`,
      name: `Kit Rotulación Moto Completa`,
      price: 25.00,
      image: imagesSBR[i],
      category: "Bera SBR"
    };
  }),

  // // --- CATEGORÍA: EMPIRE KEWAY (10 Diseños) ---
  // ...Array.from({ length: 10 }).map((_, i) => ({
  //   id: `EMP-KW-${i + 1}`,
  //   name: `Kit Empire Keeway - ${['Executive Style', 'Speed Blue', 'Night Rider', 'Titanium Force', 'Urban White', 'Cyberpunk', 'Gold Leaf', 'Racing Orange', 'Matte Grey', 'Limited Edition'][i]}`,
  //   price: 40.00,
  //   image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=500&auto=format&fit=crop",
  //   category: "Empire Owen/Keeway"
  // })),

  // // --- CATEGORÍA: MD EL AGUILA / TUCAN (10 Diseños) ---
  // ...Array.from({ length: 10 }).map((_, i) => ({
  //   id: `MD-KIT-${i + 1}`,
  //   name: `Kit MD Haojin - ${['Desert Storm', 'Arctic Camo', 'Red Fury', 'Yellow Flash', 'Royal Purple', 'Vintage Racing', 'Modern Stealth', 'Skull Edition', 'Fire Dragon', 'Minimalist Black'][i]}`,
  //   price: 38.00,
  //   image: "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=500&auto=format&fit=crop",
  //   category: "MD Motos"
  // })),

  // // --- CATEGORÍA: SUZUKI GN/DR (10 Diseños) ---
  // ...Array.from({ length: 10 }).map((_, i) => ({
  //   id: `SUZ-GN-${i + 1}`,
  //   name: `Kit Suzuki GN/DR - ${['Retro Classic', 'Dirt King', 'Adventure Pro', 'Street Fighter', 'Old School', 'Chrome Finish', 'Matte Military', 'Electric Yellow', 'Deep Ocean', 'Ghost Edition'][i]}`,
  //   price: 45.00,
  //   image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=500&auto=format&fit=crop",
  //   category: "Suzuki"
  // })),

  // // --- CATEGORÍA: EK EXPRESS / TX (10 Diseños) ---
  // ...Array.from({ length: 10 }).map((_, i) => ({
  //   id: `EK-TX-${i + 1}`,
  //   name: `Kit EK Express/TX - ${['Enduro Cross', 'Mud Warrior', 'High Speed', 'Shadow Line', 'Toxic Green', 'Blood Red', 'Viper Skin', 'Stealth Ops', 'Galaxy Theme', 'Legendary Blue'][i]}`,
  //   price: 42.00,
  //   image: "https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=500&auto=format&fit=crop",
  //   category: "EK Motos"
  // })),

  // --- CATEGORÍA: ACCESORIOS Y STICKERS ---
  // {
  //   id: 'ACC-001',
  //   name: "Cintas de Rin Reflectivas (Set)",
  //   price: 12.00,
  //   image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=500&auto=format&fit=crop",
  //   category: "Accesorios"
  // },
  // {
  //   id: 'ACC-002',
  //   name: "Protector de Tanque Pro-Grip",
  //   price: 8.00,
  //   image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=500&auto=format&fit=crop",
  //   category: "Accesorios"
  // }
];