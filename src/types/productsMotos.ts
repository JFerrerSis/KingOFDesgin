export const productMotos = [
  // --- CATEGORÍA: BERA SBR (10 Diseños) ---
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `BERA-SBR-${i + 1}`,
    name: `Kit Rotulación Bera SBR - ${['Carbon Edition', 'Monster Energy', 'Red Bull Racing', 'Sport Line', 'Black Gold', 'Neon Green', 'Classic Silver', 'HRC Special', 'Dark Matte', 'Graffiti Style'][i]}`,
    price: 35.00,
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=500&auto=format&fit=crop",
    category: "Bera SBR"
  })),

  // --- CATEGORÍA: EMPIRE KEWAY (10 Diseños) ---
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `EMP-KW-${i + 1}`,
    name: `Kit Empire Keeway - ${['Executive Style', 'Speed Blue', 'Night Rider', 'Titanium Force', 'Urban White', 'Cyberpunk', 'Gold Leaf', 'Racing Orange', 'Matte Grey', 'Limited Edition'][i]}`,
    price: 40.00,
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=500&auto=format&fit=crop",
    category: "Empire Owen/Keeway"
  })),

  // --- CATEGORÍA: MD EL AGUILA / TUCAN (10 Diseños) ---
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `MD-KIT-${i + 1}`,
    name: `Kit MD Haojin - ${['Desert Storm', 'Arctic Camo', 'Red Fury', 'Yellow Flash', 'Royal Purple', 'Vintage Racing', 'Modern Stealth', 'Skull Edition', 'Fire Dragon', 'Minimalist Black'][i]}`,
    price: 38.00,
    image: "https://images.unsplash.com/photo-1444491741275-3747c53c99b4?q=80&w=500&auto=format&fit=crop",
    category: "MD Motos"
  })),

  // --- CATEGORÍA: SUZUKI GN/DR (10 Diseños) ---
  ...Array.from({ length: 10 }).map((_, i) => ({
    id: `SUZ-GN-${i + 1}`,
    name: `Kit Suzuki GN/DR - ${['Retro Classic', 'Dirt King', 'Adventure Pro', 'Street Fighter', 'Old School', 'Chrome Finish', 'Matte Military', 'Electric Yellow', 'Deep Ocean', 'Ghost Edition'][i]}`,
    price: 45.00,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=500&auto=format&fit=crop",
    category: "Suzuki"
  })),

  // --- CATEGORÍA: EK EXPRESS / TX (10 Diseños) ---
  ...Array.from({ length: 100 }).map((_, i) => ({
    id: `EK-TX-${i + 1}`,
    name: `Kit EK Express/TX - ${['Enduro Cross', 'Mud Warrior', 'High Speed', 'Shadow Line', 'Toxic Green', 'Blood Red', 'Viper Skin', 'Stealth Ops', 'Galaxy Theme', 'Legendary Blue'][i]}`,
    price: 42.00,
    image: "https://images.unsplash.com/photo-1622185135505-2d795003994a?q=80&w=500&auto=format&fit=crop",
    category: "EK Motos"
  })),

  // --- CATEGORÍA: ACCESORIOS Y STICKERS ---
  {
    id: 'ACC-001',
    name: "Cintas de Rin Reflectivas (Set)",
    price: 12.00,
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=500&auto=format&fit=crop",
    category: "Accesorios"
  },
  {
    id: 'ACC-002',
    name: "Protector de Tanque Pro-Grip",
    price: 8.00,
    image: "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?q=80&w=500&auto=format&fit=crop",
    category: "Accesorios"
  }
];