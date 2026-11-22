import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { firstValueFrom } from 'rxjs';

import { APP_CONFIG } from './app-config';

import { DestinoViaje } from './models/destino-viaje.models';
import { DestinosViajesState } from './models/destinos-viajes-state.model';
import { inicializarDestinos } from './models/destinos-viajes.actions';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {

  private http = inject(HttpClient);
  private config = inject(APP_CONFIG);

  private store = inject<
    Store<{ destinos: DestinosViajesState }>
  >(Store);

  async initializeDestinos(): Promise<void> {

    try {

      const destinos = await firstValueFrom(
        this.http.get<DestinoViaje[]>(
          `${this.config.apiEndpoint}/my`
        )
      );

      this.store.dispatch(
        inicializarDestinos({ destinos })
      );

      console.log(
        'Destinos recuperados desde Express:',
        destinos
      );

    } catch (error) {

      console.error(
        'No se pudieron recuperar los destinos:',
        error
      );

    }
  }
}