import { Component } from '@angular/core';
import { DestinoViaje } from '../destino-viaje/destino-viaje';

@Component({
  selector: 'app-lista-destinos',
  imports: [DestinoViaje],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.css'
})
export class ListaDestinos {
  destinos: string[] = [
    'Barcelona',
    'Buenos Aires',
    'Lima',
    'Barranquilla'
  ];

  agregar(titulo: string) {
    if (titulo.trim() !== '') {
      this.destinos.push(titulo.trim());
    }
  }
}