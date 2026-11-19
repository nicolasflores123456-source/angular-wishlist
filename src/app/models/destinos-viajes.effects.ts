import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';

import {
  agregarDestino,
  elegirFavorito
} from './destinos-viajes.actions';

@Injectable()
export class DestinosViajesEffects {

  seleccionarNuevoDestino$;

  constructor(private actions$: Actions) {

    this.seleccionarNuevoDestino$ = createEffect(() =>
      this.actions$.pipe(

        ofType(agregarDestino),

        map(({ destino }) =>
          elegirFavorito({ destino })
        )

      )
    );

  }
}