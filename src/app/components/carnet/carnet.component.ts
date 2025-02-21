import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
export class CarnetComponent implements OnInit, OnChanges {

  @Input() usuario!: any;

  ngOnInit(): void {
    console.log('ngOnInit:', this.usuario);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario']) {
      console.log('usuario has changed:', changes['usuario'].currentValue);
    }
  }
}