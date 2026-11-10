import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-destino-viaje',
  imports: [],
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.css'
})
export class DestinoViaje {
  @Input() nombre: string = '';
}