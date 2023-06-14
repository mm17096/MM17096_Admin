import { Injectable, NgZone, inject } from '@angular/core';
import { Usuario } from '../models/usuario.models';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ILoginUsuario, IRegistroUsuario } from '../interfaces/usuario';
import { environment } from 'src/environments/environment.prod';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

const base_url = environment.baseUrl;
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
storage: Storage = window.localStorage;
public usuario!: Usuario;
private http = inject(HttpClient);

  constructor(
    private router: Router, 
    private ngZone: NgZone,
    private cookies: CookieService) {}

  /* Creacion de usuario */
  crearUsuario(forData: IRegistroUsuario){
     console.log();
     return this.http.post(`${base_url}/usuarios`, forData).pipe(
      tap((resp: any) => {
        this.guardarLocalSotrage(resp.token, resp.menu)
      })
     );
  }

  /* Para guardar en el local storage del navegador */
  guardarLocalSotrage(token: string, menu: any){
    this.storage.setItem('token', token);
    this.storage.setItem('menu', JSON.stringify(menu));   }

  /* Para obtener el token del localstorage */
  get token(): string {
     return this.storage.getItem("token" || "");
  }

  /* Para autentificar la entrada */

  login(forData: ILoginUsuario){
     return this.http.post(`${base_url}/login`, forData).pipe(
      tap((resp: any) => {
        this.guardarLocalSotrage(resp.token, resp.menu);
        const user = resp;
        return user;
      }),
      catchError(err => {
        return throwError("Error inesperado");
      })
     );
  }

  logout(){
    this.storage.removeItem("token");
    this.storage.removeItem("menu");
    this.ngZone.run(() => {
      this.router.navigateByUrl('/account/login');
    });
  }

  
/*   login(forData: ILoginUsuario){
    return this.http.post(`${base_url}/login`, forData).pipe(
      tap((resp: any) => {
        this.setTokenCookies(resp.token);
        const user = resp;
        return user;
      }),
      catchError(err => {
        return throwError("Error inesperado");
      })
    )
  }

  logout(){
    this.cookies.deleteAll();
    this.ngZone.run(() =>{
      this.router.navigateByUrl('/acount/login');
    })
  } */



 /*  private setTokenCookies(token: string) {
    this.cookies.set('token', token);
  }

  private get TokenCookies(){
    return this.cookies.get('token');
  }
 */
  validarToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token,
      },
    }) . pipe(
      map((resp: any) => {
        const {email, google, img, nombre, rol, uid} = resp.usuario;
        this. usuario = new Usuario(nombre, email, "", img, google, rol, uid);
        this.guardarLocalSotrage(resp.token, resp.menu);

        return true;
      }),
      catchError((err) => of(false))
    );
  }
  
}
