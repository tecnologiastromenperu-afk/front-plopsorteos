import premioBalon from '@/assets/PREMIO BALON.png';
import premioTv50 from '@/assets/PREMIO TV 50P.png';
import premioEquipoSonido from '@/assets/PREMIO EQUIPO DE SONIDO.png';
import premioPackLineaVet from '@/assets/PREMIO PACK LINEA VET.png';
import premioSuperPack from '@/assets/PREMIO SUPER PACK.png';

export type Prize = {
  id: string;
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
  { id: "Pelota Oficial del Mundial 2026", name: 'Trionda Fifa 26', description: 'Pelota Oficial Trionda League Adidas Copa Mundial Fifa 26 En Caja', image: premioBalon },
  { id: "TELEVISOR QLED UHD HISENSE 50P", name: 'Smart TV 50"', description: 'TELEVISOR QLED UHD HISENSE 50P', image: premioTv50 },
  { id: "Minicomponente Panasonic SC-AKX110PSK 300W", name: 'Equipo de Sonido Panasonic', description: 'Equipo de Sonido Minicomponente Panasonic SC-AKX110PSK 300W', image: premioEquipoSonido },
  { id: "Super Pack Linea Vet", name: 'Super Pack Linea Vet MAXFL ', description: 'Super Pack de Linea Veterinaria Para Mascotas', image: premioPackLineaVet },
  { id: "Pack Linea Vet", name: 'Pack Linea Vet MAXFL', description: 'Pack de Linea Veterinaria Para Mascotas', image: premioSuperPack },
];

export const selfiePrizes: Prize[] = [
  { id: "6", name: 'Camara Digital', description: 'Para capturar momentos', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400' },
  { id: "7", name: 'Set de Accesorios', description: 'Para tu mascota', image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400' },
  { id: "8", name: 'Tarjeta Regalo', description: '$100 en productos', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400' },
  { id: "9", name: 'Altavoz Bluetooth', description: 'Musica donde vayas', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400' },
  { id: "10", name: 'Mochila Premium', description: 'Para paseos', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400' },
  { id: "11", name: 'Set de Juguetes', description: 'Para tu mascota', image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400' },
];

export const winners: Winner[] = [
  { name: 'Maria Garcia', prize: 'Smart TV 65" 4K Ultra HD', prizeImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', date: '2026-01-18', state: 'Arequipa', dni: 'ARQS524565' },
  { name: 'Roberto Torres', prize: 'Smart TV 55" OLED 4K', prizeImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', date: '2026-02-08', state: 'Iquitos', dni: 'IQTS892341' },
];
