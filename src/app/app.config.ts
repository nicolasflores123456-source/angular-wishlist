import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { destinosViajesReducer } from './models/destinos-viajes.reducer';
import { DestinosViajesEffects } from './models/destinos-viajes.effects';

import {
  APP_CONFIG,
  APP_CONFIG_VALUE
} from './app-config';

import { AppLoadService } from './app-load.service';

export const appConfig: ApplicationConfig = {

  providers: [

    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideHttpClient(),

    {
      provide: APP_CONFIG,
      useValue: APP_CONFIG_VALUE
    },

    provideStore({
      destinos: destinosViajesReducer
    }),

    provideEffects(DestinosViajesEffects),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    }),

    provideAppInitializer(() => {
      return inject(AppLoadService).initializeDestinos();
    })

  ]
};