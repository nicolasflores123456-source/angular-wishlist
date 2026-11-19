import { RouterLink } from '@angular/router';

import {
  NgIf,
  NgSwitch,
  NgSwitchCase,
  NgSwitchDefault
} from '@angular/common';

import {
  Component,
  Input,
  HostBinding,
  Output,
  EventEmitter
} from '@angular/core';

import { Store } from '@ngrx/store';

import {
  voteUp,
  voteDown
} from '../models/destinos-viajes.actions';

import { DestinosViajesState } from '../models/destinos-viajes-state.model';

@Component({
  selector: 'app-destino-viaje',
  imports: [
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    RouterLink
  ],
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.css'
})
export class DestinoViaje {

  @HostBinding('class')
  clases = 'd-block h-100';

  @Input() nombre: string = '';
  @Input() imagenUrl: string = '';
  @Input() posicion: number = 0;
  @Input() esFavorito: boolean = false;
  @Input() servicios: string[] = [];

  // Cantidad de votos
  @Input() votes: number = 0;

  @Output()
  destinoSeleccionado = new EventEmitter<string>();

  constructor(
    private store: Store<{ destinos: DestinosViajesState }>
  ) {}

  seleccionarDestino(): void {
    this.destinoSeleccionado.emit(this.nombre);
  }

  votarPositivo(): void {
    this.store.dispatch(
      voteUp({ nombre: this.nombre })
    );
  }

  votarNegativo(): void {
    this.store.dispatch(
      voteDown({ nombre: this.nombre })
    );
  }
}