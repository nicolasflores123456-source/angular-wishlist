import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { DestinoViaje as DestinoViajeComponent } from '../destino-viaje/destino-viaje';
import { DestinoViaje } from '../models/destino-viaje.models';
import { FormDestinoViaje } from '../form-destino-viaje/form-destino-viaje';
import { DestinosApiClient } from '../destinos-api-client';
import { Store } from '@ngrx/store';
import { agregarDestino, elegirFavorito } from '../models/destinos-viajes.actions';
import { DestinosViajesState } from '../models/destinos-viajes-state.model';
import { resetVotes } from '../models/destinos-viajes.actions';

@Component({
  selector: 'app-lista-destinos',
  imports: [DestinoViajeComponent, NgFor, FormDestinoViaje],
  templateUrl: './lista-destinos.html',
  styleUrl: './lista-destinos.css'
})
export class ListaDestinos {

  updates: string[] = [];

  constructor(
  private destinosApiClient: DestinosApiClient,
  private store: Store<{ destinos: DestinosViajesState }>
) {

    this.store.select(estado => estado.destinos.favorito)
    .subscribe(favorito => {

      if (favorito !== null) {
        this.updates.push('Se ha elegido a ' + favorito.nombre);
      }

    });

    this.store.select(estado => estado.destinos.items)
    .subscribe(destinos => {
      this.destinos = destinos;
      console.log('Listado actualizado desde NgRx:', destinos);
    });

  }

  reiniciarVotos(): void {
    this.store.dispatch(resetVotes());
    this.updates.push('Se han reiniciado todos los votos');
  }
  
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

    destinosSeleccionados: string[] = [];
    destinoFavorito: string = '';


      agregar(destino: DestinoViaje): void {
        this.destinosApiClient.agregar(destino);

        this.updates.push('Se ha agregado ' + destino.nombre);
      }

      seleccionarDestino(nombre: string): void {
        this.destinoFavorito = nombre;
        this.destinosSeleccionados.push(nombre);

        const destino = this.destinos.find(d => d.nombre === nombre);

        if (destino) {
          this.destinosApiClient.elegir(destino);
        }

        console.log('Destino seleccionado:', nombre);
      }

      eliminarDestino(nombre: string): void {
        this.destinosApiClient.eliminar(nombre);

        this.destinosSeleccionados =
          this.destinosSeleccionados.filter(
            destino => destino !== nombre
          );

        if (this.destinoFavorito === nombre) {
          this.destinoFavorito = '';
        }

        console.log('Destino eliminado:', nombre);
      }


}