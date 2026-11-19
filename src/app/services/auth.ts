import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  // Credenciales utilizadas en el ejemplo del curso
  private readonly usuario = 'user';
  private readonly contrasena = 'password';

  // Iniciar sesión
  login(username: string, password: string): boolean {

    if (username === this.usuario && password === this.contrasena) {
      localStorage.setItem('username', username);
      return true;
    }

    return false;
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('username');
  }

  // Obtener el usuario autenticado
  getUser(): string | null {
    return localStorage.getItem('username');
  }

  // Comprobar si existe una sesión activa
  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}