import { DestinoViaje } from './destino-viaje.models';

export interface DestinosViajesState {
  items: DestinoViaje[];
  loading: boolean;
  favorito: DestinoViaje | null;
}

export const initialDestinosViajesState: DestinosViajesState = {
  items: [
    new DestinoViaje(
      'Barcelona',
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600'
    ),
    new DestinoViaje(
      'Buenos Aires',
      'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600'
    ),
    new DestinoViaje(
      'Lima',
      'https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=600'
    ),
    new DestinoViaje(
      'Barranquilla',
      'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=600'
    )
  ],
  loading: false,
  favorito: null
};