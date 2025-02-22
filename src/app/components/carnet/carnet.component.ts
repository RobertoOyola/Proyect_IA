import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CarnetDTO, ResponseCarnetDTO } from '../../models/inicioSesion';
import JsBarcode from 'jsbarcode';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-carnet',
  imports: [CommonModule, FormsModule, QRCodeComponent,],
  templateUrl: './carnet.component.html',
  styleUrl: './carnet.component.css'
})
export class CarnetComponent implements OnInit {


  @Input() Usuario!: CarnetDTO;
  
  ngOnInit(): void {
    if(this.Usuario !== undefined){
      console.log(this.Usuario);
    }

    const usuarioJson = sessionStorage.getItem('usuario');
      if (usuarioJson) {
      } else {
        console.log("No se encontró el usuario en sessionStorage.");
      }
    }
  

}