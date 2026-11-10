import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { DestinoViaje as DestinoViajeComponent } from '../destino-viaje/destino-viaje';
import { DestinoViaje } from '../models/destino-viaje.models';

@Component({
  selector: 'app-lista-destinos',
  imports: [DestinoViajeComponent, NgFor],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.css'
})
export class ListaDestinos {

  destinos: DestinoViaje[] = [
    new DestinoViaje(
      'Barcelona',
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600'
    ),
    new DestinoViaje(
      'Buenos Aires',
      'https://images.unsplash.com/photo-1589909202802-8f4aadce1849?w=600'
    ),
    new DestinoViaje(
      'Lima',
      'https://images.unsplash.com/photo-1531968455001-5c5272a41129?w=600'
    ),
    new DestinoViaje(
      'Barranquilla',
      'https://images.unsplash.com/photo-1512813195386-6cf811ad3542?w=600'
    )
  ];

  
    agregar(nombre: string, url: string) {
    if (nombre.trim() !== '') {
      this.destinos.push(
        new DestinoViaje(nombre.trim(), url.trim())
      );
    }
  }
}