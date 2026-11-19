import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ListaDestinos } from './lista-destinos/lista-destinos';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, AsyncPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App {
  title = 'angular-wishlist';
    time = new Observable<string>(observer => {
    const intervalo = setInterval(() => {
      observer.next(new Date().toString());
    }, 1000);

    return () => clearInterval(intervalo);
  });
}