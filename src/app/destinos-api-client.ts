import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { DestinoViaje } from './models/destino-viaje.models';

import {
  agregarDestino,
  elegirFavorito,
  eliminarDestino
} from './models/destinos-viajes.actions';

import { DestinosViajesState } from './models/destinos-viajes-state.model';

@Injectable({
  providedIn: 'root'
})
export class DestinosApiClient {

  constructor(
    private store: Store<{ destinos: DestinosViajesState }>
  ) {}

  agregar(destino: DestinoViaje): void {
    this.store.dispatch(
      agregarDestino({ destino })
    );
  }

  elegir(destino: DestinoViaje): void {
    this.store.dispatch(
      elegirFavorito({ destino })
    );
  }

  eliminar(nombre: string): void {
    this.store.dispatch(
      eliminarDestino({ nombre })
    );
  }

}