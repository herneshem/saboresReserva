import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ReservaService } from '../../services/reserva.service';

@Component({
  selector: 'app-contact-reserve',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-reserve.component.html',
  styleUrl: './contact-reserve.component.css'
})
export class ContactReserveComponent {

  step = 1;

  form: FormGroup;

 horasComida: string[] = [
  '13:00','13:30','14:00','14:30','15:00'
];

horasCena: string[] = [
  '20:00','20:30','21:00','21:30','22:00'
];

horasDisponibles: string[] = this.horasCena; // por defecto

  constructor(
    private reservaService: ReservaService,
    private fb: FormBuilder
  ) {

    this.form = this.fb.group({
      fecha: [''],
      personas: [2],
      servicio: ['cena'],
      hora: [''],
      nombre: [''],
      apellidos: [''],
      telefono: [''],
      email: [''],
      observaciones: ['']
    });

  }

 seleccionarServicio(tipo: string) {
  this.form.patchValue({ servicio: tipo });

  if (tipo === 'comida') {
    this.horasDisponibles = this.horasComida;
  } else {
    this.horasDisponibles = this.horasCena;
  }

  // reset hora cuando cambia servicio
  this.form.patchValue({ hora: '' });
}

  seleccionarHora(hora: string) {
    this.form.patchValue({ hora });
  }

  siguientePaso() {
    this.step = 2;
  }

  volver() {
    this.step = 1;
  }

  confirmarReserva() {
    this.reservaService.crearReserva(this.form.value)
      .subscribe({
        next: () => {
          this.step = 3;
        },
        error: (err: any) => {
          console.error(err);
        }
      });
  }
}