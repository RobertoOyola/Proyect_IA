import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ResponseCarnetDTO } from '../../models/inicioSesion';
import JsBarcode from 'jsbarcode';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QRCodeComponent } from 'angularx-qrcode';

@Component({
  selector: 'app-carnet',
  imports: [CommonModule, FormsModule, QRCodeComponent],
  templateUrl: './carnet.component.html',
  styleUrl: './carnet.component.css'
})
export class CarnetComponent implements OnInit, AfterViewInit {

  @Input() Usuario!: ResponseCarnetDTO;

  response = this.Usuario;

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    console.log('cartnet', this.Usuario)
  }




}
