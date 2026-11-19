import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-protected',
  standalone: true,
  imports: [],
  templateUrl: './protected.html',
  styleUrl: './protected.css'
})
export class Protected {

  private auth = inject(Auth);
  private router = inject(Router);

  // Obtener el usuario que inició sesión
  getUser(): string {
    return this.auth.getUser() ?? 'Usuario';
  }

  // Cerrar sesión
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}