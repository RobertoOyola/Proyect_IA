import { Component, inject, OnInit } from '@angular/core';
import { InicioSesionBiometricoDTO, InicioSesionDTO, ResponseInicioSesionDTO } from '../../models/inicioSesion';
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

  Usuario!: ResponseInicioSesionDTO;

  ngOnInit() {
    this.Usuario = history.state.Usuario;
    console.log('En el home', this.Usuario);
  }

  regresasInicio() {
    this.router.navigate(['loginregister']);
  }
}
