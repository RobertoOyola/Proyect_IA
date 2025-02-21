import { Component, OnInit } from '@angular/core';
import { InicioSesionBiometricoDTO, InicioSesionDTO, ResponseInicioSesionDTO } from '../../models/inicioSesion';
import { CommonModule } from '@angular/common';
import { CarnetComponent } from '../carnet/carnet.component';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarnetComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  Usuario!: ResponseInicioSesionDTO;

  ngOnInit() {
    this.Usuario = history.state.Usuario;
    console.log('En el home', this.Usuario);
  }
}
