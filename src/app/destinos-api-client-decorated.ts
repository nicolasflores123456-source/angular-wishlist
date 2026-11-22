import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { DestinosApiClient } from './destinos-api-client';
import { DestinosViajesState } from './models/destinos-viajes-state.model';
import { DestinoViaje } from './models/destino-viaje.models';
import { APP_CONFIG, AppConfig } from './app-config';

@Injectable()
export class DestinosApiClientDecorated extends DestinosApiClient {

  constructor(
    store: Store<{ destinos: DestinosViajesState }>,
    @Inject(APP_CONFIG) private config: AppConfig
  ) {
    super(store);
  }

  override agregar(destino: DestinoViaje): void {
    console.log(
      'Agregando destino mediante el servicio decorado.',
      'API:', this.config.apiEndpoint
    );

    super.agregar(destino);
  }

}