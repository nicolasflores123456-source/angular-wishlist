import { Component } from '@angular/core';
import { ListaDestinos } from './lista-destinos/lista-destinos';

@Component({
  selector: 'app-root',
  imports: [ListaDestinos],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'angular-wishlist';
}