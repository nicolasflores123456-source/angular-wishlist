import { createReducer, on } from '@ngrx/store';

import {
  DestinosViajesState,
  initialDestinosViajesState
} from './destinos-viajes-state.model';

import {
  agregarDestino,
  elegirFavorito,
  eliminarDestino,
  voteUp,
  voteDown,
  resetVotes
} from './destinos-viajes.actions';

export const destinosViajesReducer = createReducer(
  initialDestinosViajesState,

  // Agregar destino
  on(agregarDestino, (state, { destino }): DestinosViajesState => ({
    ...state,
    items: [...state.items, destino]
  })),

  // Elegir favorito
  on(elegirFavorito, (state, { destino }): DestinosViajesState => ({
    ...state,
    favorito: destino
  })),

  // Eliminar destino
  on(eliminarDestino, (state, { nombre }): DestinosViajesState => ({
    ...state,
    items: state.items.filter(d => d.nombre !== nombre),
    favorito: state.favorito?.nombre === nombre
      ? null
      : state.favorito
  })),

  // Voto positivo
  on(voteUp, (state, { nombre }): DestinosViajesState => ({
    ...state,
    items: state.items.map(d =>
      d.nombre === nombre
        ? { ...d, votes: (d.votes ?? 0) + 1 }
        : d
    )
  })),

  // Voto negativo
  on(voteDown, (state, { nombre }): DestinosViajesState => ({
    ...state,
    items: state.items.map(d =>
      d.nombre === nombre
        ? { ...d, votes: (d.votes ?? 0) - 1 }
        : d
    )
  })),

  // Reiniciar todos los votos a cero
  on(resetVotes, (state): DestinosViajesState => ({
    ...state,
    items: state.items.map(destino => ({
      ...destino,
      votes: 0
    }))
  }))
);