import { Component, inject, OnInit } from '@angular/core';
import { InicioSesionBiometricoDTO, InicioSesionDTO, ResponseCarnetDTO, ResponseInicioSesionDTO } from '../../models/inicioSesion';
import { CommonModule } from '@angular/common';
import { CarnetComponent } from '../carnet/carnet.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarnetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  router = inject(Router);

  Usuario!: ResponseCarnetDTO;

  ngOnInit() {
    console.log('Estado del history:', history.state);
  
    if (history.state && Object.keys(history.state).length > 0) {
      this.Usuario = history.state as ResponseCarnetDTO; // Asegura que los datos se asignan correctamente
      console.log('Usuario en HomeComponent:', this.Usuario);
    } else {
      console.warn('No se encontró Usuario en history.state. Redirigiendo...');
      this.router.navigate(['/loginregister']); // Redirigir si no hay datos
    }
  }

  regresasInicio() {
    this.router.navigate(['loginregister']);
  }
}
