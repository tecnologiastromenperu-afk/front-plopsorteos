import premioBalon from '@/assets/PREMIO BALON.png';
import premioTv50 from '@/assets/PREMIO TV 50P.png';
import premioEquipoSonido from '@/assets/PREMIO EQUIPO DE SONIDO.png';
import premioPackLineaVet from '@/assets/PREMIO PACK LINEA VET.png';
import premioSuperPack from '@/assets/PREMIO SUPER PACK.png';

export type Prize = {
  name: string;
  description: string;
  image: string;
};

export type Winner = {
  name: string;
  prize: string;
  prizeImage: string;
  date: string;
  state: string;
  dni: string;
};

export const prizes: Prize[] = [
  { name: 'Trionda', description: 'Balón de Fútbol FIFA', image: premioBalon },
  { name: 'Smart TV 50"', description: 'OLED 4K', image: premioTv50 },
  { name: 'Equipo de Sonido', description: 'SOUND MAX', image: premioEquipoSonido },
  { name: 'Laptop Pro', description: 'Intel i7 32GB RAM', image: premioPackLineaVet },
  { name: 'Pack de productos MAXFL', description: 'MAXFL PACK', image: premioSuperPack },
];

export const selfiePrizes: Prize[] = [
  { name: 'Camara Digital', description: 'Para capturar momentos', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400' },
  { name: 'Set de Accesorios', description: 'Para tu mascota', image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400' },
  { name: 'Tarjeta Regalo', description: '$100 en productos', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400' },
  { name: 'Altavoz Bluetooth', description: 'Musica donde vayas', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400' },
  { name: 'Mochila Premium', description: 'Para paseos', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' },
  { name: 'Set de Juguetes', description: 'Para tu mascota', image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400' },
];

export const winners: Winner[] = [
  { name: 'Juan Perez', prize: 'iPhone 15 Pro Max 256GB', prizeImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400', date: '2026-01-15', state: 'Lima', dni: 'LCPS256862' },
  { name: 'Maria Garcia', prize: 'Smart TV 65" 4K Ultra HD', prizeImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', date: '2026-01-18', state: 'Arequipa', dni: 'ARQS524565' },
  { name: 'Carlos Lopez', prize: 'PlayStation 5 Consola + 2 Juegos', prizeImage: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400', date: '2026-01-22', state: 'Cusco', dni: 'CZCO785432' },
  { name: 'Ana Martinez', prize: 'Laptop Gaming RTX 4060 16GB RAM', prizeImage: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400', date: '2026-01-25', state: 'Trujillo', dni: 'TRUJ452198' },
  { name: 'Pedro Sanchez', prize: 'iPad Pro 12.9" 256GB WiFi', prizeImage: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400', date: '2026-02-01', state: 'Piura', dni: 'PIUR364821' },
  { name: 'Laura Ramirez', prize: 'Samsung Galaxy S24 128GB 5G', prizeImage: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', date: '2026-02-05', state: 'Chiclayo', dni: 'CHIC987456' },
  { name: 'Roberto Torres', prize: 'Smart TV 55" OLED 4K', prizeImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', date: '2026-02-08', state: 'Iquitos', dni: 'IQTS892341' },
  { name: 'Sofia Flores', prize: 'Laptop Pro Intel i7 32GB RAM', prizeImage: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400', date: '2026-02-12', state: 'Tacna', dni: 'TCNA765234' },
];
