import { Component, inject } from '@angular/core';

import { DestinosApiClient } from '../destinos-api-client';
import { DestinosApiClientViejo } from '../destinos-api-client-viejo';
import { DestinosApiClientDecorated } from '../destinos-api-client-decorated';

import { APP_CONFIG, APP_CONFIG_VALUE } from '../app-config';

@Component({
  selector: 'app-destino-detalle',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: APP_CONFIG_VALUE
    },
    {
      provide: DestinosApiClient,
      useClass: DestinosApiClientDecorated
    },
    {
      provide: DestinosApiClientViejo,
      useExisting: DestinosApiClient
    }
  ],
  templateUrl: './destino-detalle.html',
  styleUrl: './destino-detalle.css'
})
export class DestinoDetalle {

  private apiActual = inject(DestinosApiClient);
  private apiVieja = inject(DestinosApiClientViejo);

  constructor() {
    console.log(
      '¿Ambos servicios utilizan la misma instancia?',
      this.apiActual === this.apiVieja
    );

    console.log(
      '¿Se utiliza el servicio decorado?',
      this.apiActual instanceof DestinosApiClientDecorated
    );
  }

}