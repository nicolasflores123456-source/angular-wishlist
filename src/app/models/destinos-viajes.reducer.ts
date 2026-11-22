import { createReducer, on } from '@ngrx/store';

import {
  DestinosViajesState,
  initialDestinosViajesState
} from './destinos-viajes-state.model';

import {
  inicializarDestinos,
  agregarDestino,
  elegirFavorito,
  eliminarDestino,
  voteUp,
  voteDown,
  resetVotes
} from './destinos-viajes.actions';

export const destinosViajesReducer = createReducer(
  initialDestinosViajesState,

  on(
    inicializarDestinos,
    (state, { destinos }): DestinosViajesState => ({
      ...state,
      items: destinos,
      loading: false
    })
  ),

  on(
    agregarDestino,
    (state, { destino }): DestinosViajesState => ({
      ...state,
      items: [...state.items, destino]
    })
  ),

  on(
    elegirFavorito,
    (state, { destino }): DestinosViajesState => ({
      ...state,
      favorito: destino
    })
  ),

  on(
    eliminarDestino,
    (state, { nombre }): DestinosViajesState => ({
      ...state,
      items: state.items.filter(d => d.nombre !== nombre),
      favorito: state.favorito?.nombre === nombre
        ? null
        : state.favorito
    })
  ),

  on(
    voteUp,
    (state, { nombre }): DestinosViajesState => ({
      ...state,
      items: state.items.map(d =>
        d.nombre === nombre
          ? { ...d, votes: (d.votes ?? 0) + 1 }
          : d
      )
    })
  ),

  on(
    voteDown,
    (state, { nombre }): DestinosViajesState => ({
      ...state,
      items: state.items.map(d =>
        d.nombre === nombre
          ? { ...d, votes: (d.votes ?? 0) - 1 }
          : d
      )
    })
  ),

  on(
    resetVotes,
    (state): DestinosViajesState => ({
      ...state,
      items: state.items.map(destino => ({
        ...destino,
        votes: 0
      }))
    })
  )
);