import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { AuthfakeauthenticationService } from '../services/authfake.service';

import { environment } from '../../../environments/environment';
import { UsuarioService } from 'src/app/account/services/usuario.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate, CanLoad {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private authFackservice: AuthfakeauthenticationService,
        private usuarioService: UsuarioService,
    ) { }

    /*   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) { */
    canActivate(): Observable<boolean> | boolean {
        return this.usuarioService.validarToken().pipe(
            tap(isAuth => {
                if (!isAuth) {
                    this.router.navigateByUrl('/account/login');
                }
            })
        );
    }

    canLoad(): Observable<boolean> | boolean {
        return this.usuarioService.validarToken().pipe(
            tap(isAuth => {
                if (!isAuth) {
                    this.router.navigateByUrl('/account/login');
                }
            })
        );
    }
}
