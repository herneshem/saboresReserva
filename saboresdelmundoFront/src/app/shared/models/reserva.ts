export interface Reserva {

  nombre: string;
  email: string;
  telefono?: string;
  fecha: string;
  hora: string;
  personas: number;
  comentario?: string;
  aceptado: boolean; // para marcar si la reserva está confirmada
}
