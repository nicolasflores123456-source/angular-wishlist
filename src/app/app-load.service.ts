import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import { APP_CONFIG } from './app-config';
import { MyDatabase } from './my-database';

import { DestinoViaje } from './models/destino-viaje.models';
import { DestinosViajesState } from './models/destinos-viajes-state.model';
import { inicializarDestinos } from './models/destinos-viajes.actions';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {

  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);
  private db = inject(MyDatabase);

  private store = inject<
    Store<{ destinos: DestinosViajesState }>
  >(Store);

  async initializeDestinos(): Promise<void> {

    let destinosLocales: DestinoViaje[] = [];
    let destinosRemotos: DestinoViaje[] = [];

    // 1. Recuperar destinos desde IndexedDB
    try {

      destinosLocales = await this.db.destinos.toArray();

      console.log(
        'Destinos recuperados desde IndexedDB:',
        destinosLocales
      );

    } catch (error) {

      console.error(
        'Error al recuperar destinos desde IndexedDB:',
        error
      );

    }

    // 2. Recuperar destinos desde Express
    try {

      destinosRemotos = await firstValueFrom(
        this.http.get<DestinoViaje[]>(
          `${this.config.apiEndpoint}/my`
        )
      );

      console.log(
        'Destinos recuperados desde Express:',
        destinosRemotos
      );

    } catch (error) {

      console.error(
        'No se pudieron recuperar los destinos desde Express:',
        error
      );

    }

    // 3. Combinar los destinos sin duplicar registros idénticos
    const destinosCombinados = [
      ...destinosLocales,
      ...destinosRemotos
    ].filter((destino, indice, arreglo) =>
      indice === arreglo.findIndex(otro =>
        otro.nombre === destino.nombre &&
        otro.imagenUrl === destino.imagenUrl
      )
    );

    // 4. Actualizar el estado de NgRx
    this.store.dispatch(
      inicializarDestinos({
        destinos: destinosCombinados
      })
    );

    console.log(
      'Destinos cargados en NgRx:',
      destinosCombinados
    );

  }
}