import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vuelos-detalle',
  standalone: true,
  imports: [],
  templateUrl: './vuelos-detalle.html',
  styleUrl: './vuelos-detalle.css'
})
export class VuelosDetalle implements OnInit {

  private route = inject(ActivatedRoute);

  idVuelo: string = '';

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

      this.idVuelo = params.get('id') ?? '';

      console.log('ID del vuelo:', this.idVuelo);

    });

  }

}