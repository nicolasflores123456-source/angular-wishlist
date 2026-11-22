import { createAction, props } from '@ngrx/store';
import { DestinoViaje } from './destino-viaje.models';

export const inicializarDestinos = createAction(
  '[Destinos] Inicializar Destinos',
  props<{ destinos: DestinoViaje[] }>()
);

export const agregarDestino = createAction(
  '[Destinos] Agregar Destino',
  props<{ destino: DestinoViaje }>()
);

export const elegirFavorito = createAction(
  '[Destinos] Elegir Favorito',
  props<{ destino: DestinoViaje }>()
);

export const eliminarDestino = createAction(
  '[Destinos] Eliminar Destino',
  props<{ nombre: string }>()
);

export const voteUp = createAction(
  '[Destinos] Vote Up',
  props<{ nombre: string }>()
);

export const voteDown = createAction(
  '[Destinos] Vote Down',
  props<{ nombre: string }>()
);

export const resetVotes = createAction(
  '[Destinos] Reset Votes'
);