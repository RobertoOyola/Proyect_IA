import { Component, inject, OnInit } from '@angular/core';
import { ResponseCarnetDTO } from '../../models/inicioSesion';
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

  Usuarios!: ResponseCarnetDTO;

  ngOnInit() {
    this.Usuarios = history.state as ResponseCarnetDTO;
  }

  regresasInicio() {
    this.router.navigate(['loginregister']);
  }
}
