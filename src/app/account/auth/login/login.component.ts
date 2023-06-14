import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthenticationService } from '../../../core/services/auth.service';
import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { UsuarioService } from '../../services/usuario.service';
import { IS_CLAVE, IS_EMAIL } from '../../constans/const';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login component
 */
export class LoginComponent implements OnInit {
  storage: Storage = window.localStorage;
  loginForm: FormGroup;
  submitted: boolean = false;
  error = '';
  returnUrl: string;

  /* Paera el pass */
  public showPassword: boolean = false;
  public password: string = '';


  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private authFackservice: AuthfakeauthenticationService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.loginForm = this.iniciarFormulario();
    /* this.loginForm = this.formBuilder.group({
      email: ['admin@themesbrand.com', [Validators.required, Validators.email]],
      password: ['123456', [Validators.required]],
    });

    // reset login status
    // this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    // tslint:disable-next-line: no-string-literal
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'; */
  }

  private iniciarFormulario() {
    return this.formBuilder.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.pattern(IS_EMAIL)]],
      password: ['', [Validators.required, Validators.pattern(IS_CLAVE), Validators.minLength(8)]],
      remember: [false]
    });
  }


  login() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.usuarioService.login(this.loginForm.value).subscribe(
      (resp) => {
        if (this.loginForm.get('remember')?.value) {
          this.storage.setItem('email', this.loginForm.get('email')?.value);
        } else {
          this.storage.removeItem('email');
        }
        this.router.navigate(['/dashboard']);
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err,
        });
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === 'firebase') {
        this.authenticationService.login(this.f.email.value, this.f.password.value).then((res: any) => {
          this.router.navigate(['/dashboard']);
        })
          .catch(error => {
            this.error = error ? error : '';
          });
      } else {
        this.authFackservice.login(this.f.email.value, this.f.password.value)
          .pipe(first())
          .subscribe(
            data => {
              this.router.navigate(['/dashboard']);
            },
            error => {
              this.error = error ? error : '';
            });
      }
    }
  }


  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
