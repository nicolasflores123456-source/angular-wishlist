import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ReservasApiClient } from '../reservas-api-client';

@Component({
  selector: 'app-reservas-listado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './reservas-listado.html',
  styleUrl: './reservas-listado.css'
})
export class ReservasListado {

  api = inject(ReservasApiClient);

}