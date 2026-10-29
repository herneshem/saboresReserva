import { Injectable } from '@angular/core';
import { Reserva } from '../shared/models/reserva.js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservas: Reserva[] = [];
  constructor(private http: HttpClient) { }


  crearReserva(data: any) {
    console.log("🔥 SERVICE HIT");
    return this.http.post('https://sabores-reserva-backend.onrender.com/api/reservas', data);
  }

  obtenerDisponibilidad(
    fecha: string,
    personas: number,
    servicio: string
  ) {
    return this.http.get<any>(
      'https://sabores-reserva-backend.onrender.com/api/reservas/disponibilidad',
      { params: { fecha, personas, servicio } }
    );
  }


}
