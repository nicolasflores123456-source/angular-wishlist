import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive
} from '@angular/router';

import { Observable } from 'rxjs';
import { Auth } from './services/auth';

// Servicio de traducciones
import {
  TranslateService,
  TranslatePipe
} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AsyncPipe,
    TranslatePipe
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  title = 'angular-wishlist';

  // Servicio de autenticación
  auth = inject(Auth);

  // Servicio de navegación
  private router = inject(Router);

  // Servicio de traducciones
  translate = inject(TranslateService);

  // Idioma seleccionado
  idiomaActual = 'es';

  constructor() {
    this.translate.use(this.idiomaActual);
  }

  // Cambiar idioma
  cambiarIdioma(event: Event): void {
    const select = event.target as HTMLSelectElement;

    this.idiomaActual = select.value;

    this.translate.use(this.idiomaActual);
  }

  // Cerrar sesión
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  // Reloj que ya teníamos funcionando
  time = new Observable<string>(observer => {

    const intervalo = setInterval(() => {
      observer.next(new Date().toString());
    }, 1000);

    return () => clearInterval(intervalo);

  });

}