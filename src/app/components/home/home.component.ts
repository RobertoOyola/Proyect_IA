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

  usuario!: ResponseCarnetDTO;

  ngOnInit() {
    this.usuario = history.state as ResponseCarnetDTO;
    console.log('Usuario en HomeComponent:', this.usuario);
    
  }

  regresasInicio() {
    this.router.navigate(['loginregister']);
  }
}
