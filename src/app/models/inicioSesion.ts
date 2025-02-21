export interface InicioSesionBiometricoDTO{
    image: string;
}

export interface InicioSesionDTO{
    correo: string;
    contrasena: string;
}

export interface ResponseInicioSesionDTO{
    nombre: string;
    correo: string;
    image: string;
}