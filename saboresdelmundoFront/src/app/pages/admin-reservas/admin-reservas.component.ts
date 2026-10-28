
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface Reserva {
  id: number;
  fecha: string;
  personas: number;
  servicio: string;
  hora: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  email: string;
  observaciones: string;
  estado: 'pendiente' | 'confirmada' | 'rechazada';
}

@Component({
  selector: 'app-admin-reservas',
  imports: [CommonModule],
  templateUrl: './admin-reservas.component.html',
  styleUrl: './admin-reservas.component.css'
})
export class AdminReservasComponent implements OnInit {
  reservas: Reserva[] = [];
  error = '';
  cargando = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.cargarReservas();
  }

  cargarReservas(): void {
    const token = sessionStorage.getItem('adminToken');

    if (!token) {
      this.error = 'Debes iniciar sesión para consultar las reservas.';
      return;
    }

    this.cargando = true;
    this.error = '';

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.get<Reserva[]>(
      'http://localhost:3000/api/reservas',
      { headers }
    ).subscribe({
      next: (datos) => {
        this.reservas = datos;
        this.cargando = false;
      },
      error: (err) => {
        this.error = err.status === 401 || err.status === 403
          ? 'Tu sesión no es válida. Inicia sesión de nuevo.'
          : 'No se pudieron cargar las reservas.';
        this.cargando = false;
      }
    });
  }

  cerrarSesion(): void {
    sessionStorage.removeItem('adminToken');
    window.location.href = '/admin';
  }


  cambiarEstado(id: number, estado: 'confirmada' | 'rechazada'): void {
    const token = sessionStorage.getItem('adminToken');

    if (!token) {
      this.error = 'Debes iniciar sesión de nuevo.';
      return;
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    this.http.patch<Reserva>(
      `http://localhost:3000/api/reservas/${id}/estado`,
      { estado },
      { headers }
    ).subscribe({
      next: (reservaActualizada) => {
        const indice = this.reservas.findIndex(
          reserva => reserva.id === id
        );

        if (indice !== -1) {
          this.reservas[indice] = reservaActualizada;
        }
      },
      error: (err) => {
        this.error = err.error?.error || 'No se pudo actualizar la reserva.';
      }
    });
  }

}
