import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../../core/services/auth.service';
import { environment } from '../../../../environments/environment';
import { first } from 'rxjs/operators';
import { UserProfileService } from '../../../core/services/user.service';
import { IS_CLAVE, IS_EMAIL } from '../../constans/const';
import { IS_NAME } from '../../constans/const';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { ILoginUsuario } from '../../interfaces/usuario';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  /* Para Password */
  msgpass: string = '';
  colormsj: string;
  isInputRed: boolean = false;
  isInputOrange: boolean = false;
  isInputGreen: boolean = false;

  /* Para mostrar */
  public showPassword: boolean = false;
  public password: string = '';

  /* Para Confirm Password */
  colorconfirmmsj: string;
  msgconfirmpass: string = '';
  isInputConfirmOrange: boolean = false;
  isInputConfirmGreen: boolean = false;

  /* Para mostrar */
  public showConfirmPass: boolean = false;
  public confirmpassword: string = '';


  signupForm: FormGroup;
  submitted = false;
  error = '';
  successmsg = false;

  // set the currenr year
  year: number = new Date().getFullYear();

  // tslint:disable-next-line: max-line-length
  constructor(
    private formBuilder: FormBuilder, 
    private route: ActivatedRoute, 
    private router: Router, 
    private authenticationService: AuthenticationService,
    private userService: UserProfileService,
    private usuarioService: UsuarioService) { }

  ngOnInit() {
 
    this.iniciarformulario();
  }

  private iniciarformulario(): void {
    this.signupForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.pattern(IS_NAME), Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(IS_EMAIL)]],
      password: ['', [Validators.required, Validators.pattern(IS_CLAVE), Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required, Validators.pattern(IS_CLAVE), Validators.minLength(8)]],
    }
  /*   , {
      validators: this.claveSonIguales('password'. 'confirmpassword');
    } */
    );
  }

  claveSonIguales(pass1: string, pass2: string){
    /* retornasmos una funcion porque los form group reciben una funcion para validar */
    return (FormGroup: FormGroup) => {
      const password = FormGroup.controls[pass1];
      const confirmpassword = FormGroup.controls[pass2];
      if(password?.value == confirmpassword?.value){
        confirmpassword.setErrors(null);
      }else{
        confirmpassword.setErrors({ noSonIguales: true});
      }
    }
  }

  crearUsuario(){
    this.submitted = true;
    if(this.signupForm.valid){
      this.usuarioService.crearUsuario(this.signupForm.value).subscribe((resp) => {
        this.router.navigate(['/account/login']);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Guardado con exitos',
          showConfirmButton: false,
          timer: 2000
        });
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err,
        });
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Algo salio mal",
      });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  /**
   * On submit form
   */
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      if (environment.defaultauth === 'firebase') {
        this.authenticationService.register(this.f.email.value, this.f.password.value).then((res: any) => {
          this.successmsg = true;
          if (this.successmsg) {
            this.router.navigate(['/dashboard']);
          }
        })
          .catch(error => {
            this.error = error ? error : '';
          });
      } else {
        this.userService.register(this.signupForm.value)
          .pipe(first())
          .subscribe(
            data => {
              this.successmsg = true;
              if (this.successmsg) {
                this.router.navigate(['/account/login']);
              }
            },
            error => {
              this.error = error ? error : '';
            });
      }
    }
  }

  validated(event: KeyboardEvent) {
    const inputPass = (event.target as HTMLInputElement).value;
    const regexUppercase = /[A-Z]/;
    const regexLowercase = /[a-z]/;
    const regexDigit = /[0-9]/;
    const regexSpecialChar = /[#?!@$%^&*-]/;
  
    const count = [
      regexUppercase.test(inputPass),
      regexLowercase.test(inputPass),
      regexDigit.test(inputPass),
      regexSpecialChar.test(inputPass)
    ].filter(valid => valid).length;
  
    if (inputPass.length >= 8 && count === 4) {
      this.colormsj = 'green';
      this.isInputRed = false;
      this.isInputOrange = false;
     // this.isInputGreen = true;
      this.msgpass = 'muy segura';
    } else if (count > 1) {
      this.colormsj = 'orange';
      this.isInputRed = false;
      this.isInputGreen = false;
      this.isInputOrange = true;
      this.msgpass = 'poco segura';
    } else {
      this.colormsj = 'red';
      this.isInputRed = true;
      this.isInputGreen = false;
      this.isInputOrange = false;
      this.msgpass = 'insegura';
    }
  }

  public Passwordvisibility(): void {
    this.showPassword = !this.showPassword;
  }

  public ConfirmPassvisibility(): void {
    this.showConfirmPass = !this.showConfirmPass;
  }


  /**Metodo para validar si es campo valido */
  esCampoValido(campo: string){
    const validarCampo = this.signupForm.get(campo);
    return !validarCampo?.valid && validarCampo?.touched? 'is-invalid' :
    validarCampo?.touched ? 'is-valid' : '';
  }

  validatedconfirm(event: KeyboardEvent) {
    const inputConfirmPass = (event.target as HTMLInputElement).value;
    const inputPass = this.signupForm.get('password').value;

    if (inputConfirmPass === inputPass && inputConfirmPass != "" && inputPass != "" ) {
      this.colorconfirmmsj = 'green';
      this.msgconfirmpass = 'confirmado';
      this.isInputConfirmOrange = false;
      //this.isInputConfirmGreen = true;
    } else {
      this.colorconfirmmsj = 'orange';
      this.msgconfirmpass = 'no coincide';
      this.isInputConfirmGreen = false;
      this.isInputConfirmOrange = true;
    }
  }
  
}
