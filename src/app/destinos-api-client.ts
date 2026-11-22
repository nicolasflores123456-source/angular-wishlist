import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, of, tap } from 'rxjs';

import { DestinoViaje } from './models/destino-viaje.models';

import {
  agregarDestino,
  elegirFavorito,
  eliminarDestino
} from './models/destinos-viajes.actions';

import { DestinosViajesState } from './models/destinos-viajes-state.model';

import { APP_CONFIG } from './app-config';

@Injectable({
  providedIn: 'root'
})
export class DestinosApiClient {

  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  constructor(
    private store: Store<{ destinos: DestinosViajesState }>
  ) {}

  agregar(destino: DestinoViaje): void {

    this.http.post<DestinoViaje[]>(
      `${this.config.apiEndpoint}/my`,
      { nuevo: destino }
    ).pipe(
      tap(() => {
        this.store.dispatch(
          agregarDestino({ destino })
        );
      }),
      catchError(error => {
        console.error('Error al guardar destino:', error);
        return of([]);
      })
    ).subscribe();
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