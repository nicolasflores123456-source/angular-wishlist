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

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AsyncPipe
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