import { Component, inject, OnInit } from '@angular/core';
import { CarnetDTO, ResponseCarnetDTO } from '../../models/inicioSesion';
import { CommonModule } from '@angular/common';
import { CarnetComponent } from '../carnet/carnet.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CarnetComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  router = inject(Router);

  Usuarios!: CarnetDTO;

  ngOnInit() {
    this.Usuarios = history.state as CarnetDTO;
  }

  regresasInicio() {
    sessionStorage.removeItem('reloaded');
    this.router.navigate(['loginregister']);
  }
}
