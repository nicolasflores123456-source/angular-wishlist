import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'app-destino-viaje',
  imports: [],
  templateUrl: './destino-viaje.html',
  styleUrl: './destino-viaje.css'
})
export class DestinoViaje {

  @HostBinding('class')
  clases = 'd-block h-100';

  @Input() nombre: string = '';

  @Input() imagenUrl: string = '';

}