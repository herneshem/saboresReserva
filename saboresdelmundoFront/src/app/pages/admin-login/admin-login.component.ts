
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  usuario = '';
  password = '';
  error = '';
  mensaje = '';
  cargando = false;

  constructor(private http: HttpClient, private router: Router) { }

  iniciarSesion() {
    this.error = '';
    this.mensaje = '';
    this.cargando = true;

    this.http.post<{ token: string }>(
      'http://localhost:3000/api/auth/login',
      {
        usuario: this.usuario,
        password: this.password
      }
    ).subscribe({
      next: (respuesta) => {
        sessionStorage.setItem('adminToken', respuesta.token);
        this.cargando = false;
        this.router.navigate(['/admin/reservas']);
      },
      error: (err) => {
        this.error =
          err.error?.error || 'No se pudo conectar con el servidor.';
        this.cargando = false;
      }
    });
  }
}
