export interface IRegistroUsuario {
    nombre: string;
    email: string;
    password: string;
    confirmpassword: string;
    terminos: boolean;
  }
  
  export interface ILoginUsuario {
    email: string;
    password: string;
    remember: boolean;
  }