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

export interface ResponseCarnetDTO{
    nombre: string;
    correo: string;
    image: string;
    semestre: string;
    carrera: string;
    cedula: string;
    matricula: string;
    telefono: string;
}

export interface CarnetDTO{
    Usuario: ResponseCarnetDTO;
}

export interface LoginDTO{
    correo: string;
    contrasena: string;
}