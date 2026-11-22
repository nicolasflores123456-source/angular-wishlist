import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';

import { DestinoViaje } from './models/destino-viaje.models';

export interface DestinoGuardado extends DestinoViaje {
  id?: number;
}

export interface Traduccion {
  id?: number;
  lenguaje: string;
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class MyDatabase extends Dexie {

  destinos!: Table<DestinoGuardado, number>;
  translations!: Table<Traduccion, number>;

  constructor() {
    super('MyDatabase');

    // Versión original
    this.version(1).stores({
      destinos: '++id, nombre, imagenUrl'
    });

    // Nueva versión: incorpora traducciones
    this.version(2).stores({
      destinos: '++id, nombre, imagenUrl',
      translations: '++id, lenguaje, key'
    });
  }
}