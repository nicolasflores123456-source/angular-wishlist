import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { catchError, of, tap } from 'rxjs';
import { MyDatabase } from './my-database';
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
  private db = inject(MyDatabase);

  constructor(
    private store: Store<{ destinos: DestinosViajesState }>
  ) {}

  agregar(destino: DestinoViaje): void {

  this.http.post<DestinoViaje[]>(
    `${this.config.apiEndpoint}/my`,
    { nuevo: destino }
  ).pipe(
    tap(() => {

      // Actualizar el estado de NgRx
      this.store.dispatch(
        agregarDestino({ destino })
      );

      // Guardar también en IndexedDB
      void this.db.destinos.add(destino)
        .then(() => {
          console.log(
            'Destino guardado en IndexedDB:',
            destino.nombre
          );

          return this.db.destinos.toArray();
        })
        .then(destinos => {
          console.log(
            'Destinos almacenados en IndexedDB:',
            destinos
          );
        })
        .catch(error => {
          console.error(
            'Error al guardar en IndexedDB:',
            error
          );
        });

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