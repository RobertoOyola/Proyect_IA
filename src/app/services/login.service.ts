import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDTO, ResponseCarnetDTO } from '../models/inicioSesion';
import { RegistroDTO } from '../models/registro';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private http = inject(HttpClient)
  private urlBase="http://127.0.0.1:8000/api/usuarios"
  constructor() { }

  public login(correo: string, contrasena: string):Observable<ResponseCarnetDTO>{
    const params = new HttpParams()
      .set('correo', correo)
      .set('contrasena', contrasena);

    return this.http.get<ResponseCarnetDTO>(`${this.urlBase}/loginusuario/`, {params})
  }

  public crearRegistro(usuario: RegistroDTO){
    return this.http.post(`${this.urlBase}/post/`,usuario);
  }

  public LoginBiometrico(img: string): Observable<LoginDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'  // ✅ Asegura que Angular envíe JSON
    });

    const body = { image: img };  // ✅ El backend espera un objeto JSON con la clave 'image'

    return this.http.post<LoginDTO>(`${this.urlBase}/compare_with_database/`, body, { headers });
  }

}

