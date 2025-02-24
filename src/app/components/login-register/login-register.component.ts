import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren, QueryList, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistroDTO } from '../../models/registro';
import { InicioSesionBiometricoDTO, InicioSesionDTO, ResponseCarnetDTO, ResponseInicioSesionDTO } from '../../models/inicioSesion';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-register.component.html',
  styleUrl: './login-register.component.css'
})
export class LoginRegisterComponent implements AfterViewInit, OnInit {
  formRegister: FormGroup;
  formLogin: FormGroup;
  fotoRegister: string | null = null;
  fotoLogin: string | null = null;
  mostrarModalRegister: boolean = false;
  mostrarModalLogin: boolean = false;
  stream!: MediaStream;

  carreras: string[] = ['Desarrollo de Software', 'Contabilidad', 'Acción Pastoral', 'Psicología'];
  semestres: string[] = ['Primer Semestre', 'Segundo Semestre', 'Tercer Semestre', 'Cuarto Semestre', 'Quinto Semestre'];

  router = inject(Router);
  service = inject(LoginService)

  resultRegistro!: RegistroDTO;
  resultLogin!: ResponseCarnetDTO;
  
  @ViewChildren('videoCamara') videosCamara!: QueryList<ElementRef>;

  constructor(
    private formBuilder: FormBuilder, 
    private toastr: ToastrService
    ) {

    this.formLogin = this.formBuilder.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.formRegister = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      image: ['', Validators.required],
      semestre: ['', Validators.required],
      carrera: ['', Validators.required],
      cedula: ['', Validators.required],
      matricula: ['0123456789', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
    });

  }

  ngOnInit(): void {
    this.recargarPag();
  }


  guardarCambiosRegistrar(): void {
    if (this.formRegister.valid) {
        this.resultRegistro = this.formRegister.value as RegistroDTO;
        console.log("Formulario enviado:", this.resultRegistro);

        this.service.crearRegistro(this.resultRegistro).subscribe(
            response => {
                console.log("Registro exitoso:", response);
            },
            error => {
                console.error("Error al registrar:", error);
            }
        );

    } else {
        console.log("Formulario inválido");
    }
}

  recargarPag(): void {
    if (!sessionStorage.getItem('reloaded')) {
      sessionStorage.setItem('reloaded', 'true');
      window.location.reload();
    }
  }

  guardarCambiosLogin(): void {
    if (this.formLogin.valid) {
      const loginDto  = this.formLogin.value as InicioSesionDTO
      this.service.login(loginDto.correo, loginDto.contrasena)
            .subscribe((respuesta: ResponseCarnetDTO) => {
              if(respuesta){
                this.resultLogin = respuesta;
                this.toastr.success("Inicio Session Con Exito")
                this.router.navigate(['/home'], { state: { Usuario: this.resultLogin } });
              }else{
                console.log("No se encontro el Usuario");
                this.toastr.error("No se encontro el Usuario");
              }
            }, error => {
              this.toastr.error("No se encontro el Usuario", "Error");
              console.error("Error en la petición:", error);
            });
    } else {
      this.toastr.info("Formulario inválido");
      console.log("Formulario inválido");
    }
  }

  async abrirModalRegisterCamara(): Promise<void> {
    try {
      this.mostrarModalRegister = true;
      setTimeout(async () => {
        const videoElement = this.videosCamara.first?.nativeElement;
        if (videoElement) {
          this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoElement.srcObject = this.stream;
        }
      }, 500);
    } catch (error) {
      console.error("No se pudo acceder a la cámara. Verifica los permisos.", error);
    }
  }

  async abrirModalLoginCamara(): Promise<void> {
    try {
      this.mostrarModalLogin = true;
      setTimeout(async () => {
        const videoElement = this.videosCamara.last?.nativeElement;
        if (videoElement) {
          this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoElement.srcObject = this.stream;
        }
      }, 500);
    } catch (error) {
      console.error("No se pudo acceder a la cámara. Verifica los permisos.", error);
    }
  }

  capturarFotoRegister(): void {
    const videoElement = this.videosCamara.first?.nativeElement as HTMLVideoElement;
    if (!videoElement) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      this.fotoRegister = canvas.toDataURL('image/png');
      this.formRegister.patchValue({ image: this.fotoRegister });
    }
    
    this.cerrarModalRegisterCamara();
  }

  capturarFotoLogin(): void {
    const videoElement = this.videosCamara.last?.nativeElement as HTMLVideoElement;
    if (!videoElement) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      this.fotoLogin = canvas.toDataURL('image/png');
      const datosBiometricos: InicioSesionBiometricoDTO = {
        image: this.fotoLogin
      };
      console.log(datosBiometricos);
    }
    
    this.cerrarModalLoginCamara();
  }

  cerrarModalRegisterCamara(): void {
    this.detenerCamara();
    this.mostrarModalRegister = false;
  }

  cerrarModalLoginCamara(): void {
    this.detenerCamara();
    this.mostrarModalLogin = false;
  }

  private detenerCamara(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
  }

  ngAfterViewInit(): void {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (signUpButton && signInButton && container) {
      signUpButton.addEventListener('click', () => {
        container.classList.add("right-panel-active");
      });

      signInButton.addEventListener('click', () => {
        container.classList.remove("right-panel-active");
      });
    }
  }
}
