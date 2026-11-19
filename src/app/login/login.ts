import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private auth = inject(Auth);
  private router = inject(Router);

  username: string = '';
  password: string = '';
  mensajeError: string = '';

  // Iniciar sesión
  login(): void {

    const resultado = this.auth.login(
      this.username,
      this.password
    );

    if (resultado) {
      this.mensajeError = '';
      this.router.navigate(['/protected']);
    } else {
      this.mensajeError = 'Usuario o contraseña incorrectos';

      setTimeout(() => {
        this.mensajeError = '';
      }, 2500);
    }
  }

  // Cerrar sesión
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  // Comprobar si existe una sesión
  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }
}