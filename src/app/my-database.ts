import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

import { DestinoViaje } from './models/destino-viaje.models';

export interface DestinoGuardado extends DestinoViaje {
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class MyDatabase extends Dexie {

  destinos!: Table<DestinoGuardado, number>;

  constructor() {
    super('MyDatabase');

    this.version(1).stores({
      destinos: '++id, nombre, imagenUrl'
    });
  }

}