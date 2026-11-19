import { Routes } from '@angular/router';

import { ListaDestinos } from './lista-destinos/lista-destinos';
import { DestinoDetalle } from './destino-detalle/destino-detalle';

import { Login } from './login/login';
import { Protected } from './protected/protected';
import { authGuard } from './guards/auth-guard';

// Componentes de vuelos
import { Vuelos } from './components/vuelos/vuelos';
import { VuelosMain } from './components/vuelos/vuelos-main/vuelos-main';
import { VuelosMasInfo } from './components/vuelos/vuelos-mas-info/vuelos-mas-info';
import { VuelosDetalle } from './components/vuelos/vuelos-detalle/vuelos-detalle';

// Rutas independientes de Reservas
import { RESERVAS_ROUTES } from './reservas/reservas.routes';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: ListaDestinos
  },

  {
    path: 'destino',
    component: DestinoDetalle
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'protected',
    component: Protected,
    canActivate: [authGuard]
  },

  // RUTAS ANIDADAS DE VUELOS
  {
    path: 'vuelos',
    component: Vuelos,
    canActivate: [authGuard],

    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      },
      {
        path: 'main',
        component: VuelosMain
      },
      {
        path: 'mas-info',
        component: VuelosMasInfo
      },
      {
        path: 'detalle/:id',
        component: VuelosDetalle
      }
    ]
  },

  // RUTAS INDEPENDIENTES DE RESERVAS
  {
    path: 'reservas',
    children: RESERVAS_ROUTES
  },

  // RUTA COMODÍN
  {
    path: '**',
    redirectTo: 'home'
  }

];